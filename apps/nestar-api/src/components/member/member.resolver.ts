import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { InternalServerErrorException, UseGuards } from '@nestjs/common';
import { AgentsInquiry, LoginInput, MemberInput, MembersInquiry } from '../../libs/dto/member/member.input';
import { Member, Members } from '../../libs/dto/member/member';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import * as mongoose from 'mongoose';
import { MemberType } from '../../libs/enums/member.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberUpdate } from '../../libs/dto/member/member.update';
import { WithoutGuard } from '../auth/guards/without.guard';
import { getSerialForImage, shapeIntoMongoObjectId, validMimeTypes } from '../../libs/config';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { Message } from '../../libs/enums/common.enum';


@Resolver()
export class MemberResolver {
	constructor(private readonly memberService: MemberService) {} // DI
	@Mutation(() => Member)
	// @UsePipes(ValidationPipe) // DTO
	public async signup(@Args('input') input: MemberInput): Promise<Member> {
		// Member DTO qiymatdagi data yuborishi kk: kirib kelayotgan Argumentimizni input qilib belgiladik
		console.log('Mutation: signup');
		console.log('input:', input);
		return await this.memberService.signup(input); // call
	}
	@Mutation(() => Member)
	public async login(@Args('input') input: LoginInput): Promise<Member> {
		// LoginInput DTOsi bn belgiladik
		console.log('Mutation: login');
		return await this.memberService.login(input);
	}

	@UseGuards(AuthGuard)
	@Query(() => String)
	public async checkAuth(@AuthMember('memberNick') memberNick: string): Promise<string> {
		console.log('Query: checkAuth');
		console.log('memberNick:', memberNick);
		return `Hi ${memberNick}`;
	}

	@Roles(MemberType.USER, MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Query(() => String)
	public async checkAuthRoles(@AuthMember() authMember: Member): Promise<string> {
		// Custom[param] decorator
		console.log('Query: checkAuthRoles');
		return `Hi ${authMember.memberNick}! You are ${authMember.memberType} (memberId: ${authMember._id})`;
	}

	// Authenticated: AGENT, ADMIN, USER
	@UseGuards(AuthGuard)
	@Mutation(() => Member) // ObjectTypedagi datani qaytarish kk
	public async updateMember(
		@Args('input') input: MemberUpdate, // memberupdate typeni argument decorator orqali qabul qildik
		@AuthMember('_id') memberId: mongoose.ObjectId,
	): Promise<Member> {
		console.log('Mutation: updateMember');
		delete input._id; // memberupdate typeda _id ham kirib kelsin deyilgandi, o'shani ochirdik, sababi _idni yuqorida AuthMember orqali allaqachon olib bolganmiz
		return await this.memberService.updateMember(memberId, input); // memberId - AuthMemberdan kirib kelayotgani, input - _idsi delete qilingan MemberUpdatedan kirib kelyapti
	}

	// bir member (login bolgan/bolmagan) boshqa userni kora oladi
	@UseGuards(WithoutGuard) // memberId: null qaytarib, shunchaki otkazib yuboradi
	@Query(() => Member) // qaytarayotgan natija Member korinishida
	public async getMember(
		@Args('memberId') input: string, // FDdan keladi: boshqa tekshirilayotgan user
		@AuthMember('_id') memberId: mongoose.ObjectId, // authMember orqali kiradi va aynan qaysi user ko'rmoqchi; statistika: tekshirilayotgan userni aynan AuthMemberdan otgan user bir martta tomosha qildi
	): Promise<Member> {
		console.log('Query: getMember');
		const targetId = shapeIntoMongoObjectId(input); // FDdan barcha member data keladi, lekin id=string boladi va ObjectIdga o'girildi
		return await this.memberService.getMember(memberId, targetId); // tekshirayotgan va tekshirilayotgan user faqat IDlari asosida service ichida ruxsat va data olish amalga oshadi
	}

	@UseGuards(WithoutGuard)
	@Query(() => Members)
	public async getAgents(
		@Args('input') input: AgentsInquiry,
		@AuthMember('_id') memberId: mongoose.ObjectId,
	): Promise<Members> {
		console.log('Query: getAgents');
		return await this.memberService.getAgents(memberId, input); // kim AGENTlarni koryapti &
	}

	/** ADMIN **/

	// Authorization: ADMIN
	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Query(() => Members)
	public async getAllMembersByAdmin(@Args('input') input: MembersInquiry): Promise<Members> {
		console.log('Query: getAllMembersByAdmin');
		return await this.memberService.getAllMembersByAdmin(input);
	}

	// Authorization: ADMIN
	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Mutation(() => Member)
	public async updateMemberByAdmin(@Args('input') input: MemberUpdate): Promise<Member> {
		console.log('Mutation: updateMemberByAdmin');
		return await this.memberService.updateMemberByAdmin(input);
	}

	/** UPLOADER **/
	@UseGuards(AuthGuard)
	@Mutation((returns) => String)
	public async imageUploader(
		@Args({ name: 'file', type: () => GraphQLUpload })
		{ createReadStream, filename, mimetype }: FileUpload,
		@Args('target') target: String,
	): Promise<string> {
		console.log('Mutation: imageUploader');

		if (!filename) throw new Error(Message.UPLOAD_FAILED);
		const validMime = validMimeTypes.includes(mimetype);
		if (!validMime) throw new Error(Message.PROVIDE_ALLOWED_FORMAT);

		const imageName = getSerialForImage(filename);
		const url = `uploads/${target}/${imageName}`;
		const stream = createReadStream();

		const result = await new Promise((resolve, reject) => {
			stream
				.pipe(createWriteStream(url))
				.on('finish', async () => resolve(true))
				.on('error', () => reject(false));
		});
		if (!result) throw new Error(Message.UPLOAD_FAILED);

		return url;
	}

	@UseGuards(AuthGuard)
	@Mutation((returns) => [String])
	public async imagesUploader(
		@Args('files', { type: () => [GraphQLUpload] })
		files: Promise<FileUpload>[],
		@Args('target') target: String,
	): Promise<string[]> {
		console.log('Mutation: imagesUploader');

		const uploadedImages = [];
		const promisedList = files.map(async (img: Promise<FileUpload>, index: number): Promise<Promise<void>> => {
			try {
				const { filename, mimetype, encoding, createReadStream } = await img;

				const validMime = validMimeTypes.includes(mimetype);
				if (!validMime) throw new Error(Message.PROVIDE_ALLOWED_FORMAT);

				const imageName = getSerialForImage(filename);
				const url = `uploads/${target}/${imageName}`;
				const stream = createReadStream();

				const result = await new Promise((resolve, reject) => {
					stream
						.pipe(createWriteStream(url))
						.on('finish', () => resolve(true))
						.on('error', () => reject(false));
				});
				if (!result) throw new Error(Message.UPLOAD_FAILED);

				uploadedImages[index] = url;
			} catch (err) {
				console.log('Error, file missing!');
			}
		});

		await Promise.all(promisedList);
		return uploadedImages;
	}
}
