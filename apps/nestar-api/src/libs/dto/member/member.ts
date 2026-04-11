import { Field, Int, ObjectType } from '@nestjs/graphql';
import type { ObjectId } from 'mongoose';
import { MemberAuthType, MemberStatus, MemberType } from '../../enums/member.enum';

@ObjectType() // Backenddan Frontendga chiqib ketayotgan DTO
export class Member {
	@Field(() => String)
	_id: ObjectId; // Backendda Databasega aynan ObjectId korinishida yoziladi

	@Field(() => MemberType) // Field, GraphQL unsuri bn ishlata oldik, sababi, MemberType enumida register mantig'i orqali enumlarni GraphQLda ishlatishga imkon bergandik
	memberType: MemberType; // TypeScriptga type integrationini amalga oshirdik

	@Field(() => MemberStatus) // MemberStatus enumlaridan malumot olsin
	memberStatus: MemberStatus;

	@Field(() => MemberAuthType)
	memberAuthType: MemberAuthType;

	@Field(() => String, { nullable: true })
	memberPhone?: string;

	@Field(() => String)
	memberNick: string;

	memberPassword?: string; // Fieldga biriktirmadik, sababi GraphQL tashqariga chiqarib yubormasligi kk

	@Field(() => String, { nullable: true })
	memberFullName?: string;

	@Field(() => String)
	memberImage: string; // default: '' qilganimiz uchun nullable qilmadik

	@Field(() => String, { nullable: true })
	memberAddress?: string;

	@Field(() => String, { nullable: true })
	memberDesc?: string;

	@Field(() => Int)
	memberProperties: number;

	@Field(() => Int)
	memberArticles: number;

	@Field(() => Int)
	memberFollowers: number;

	@Field(() => Int)
	memberFollowings: number;

	@Field(() => Int)
	memberPoints: number;

	@Field(() => Int)
	memberLikes: number;

	@Field(() => Int)
	memberViews: number;

	@Field(() => Int)
	memberComments: number;

	@Field(() => Int)
	memberRank: number;

	@Field(() => Int)
	memberWarnings: number;

	@Field(() => Int)
	memberBlocks: number;

	@Field(() => Date, { nullable: true })
	deletedAt?: Date;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date)
	updatedAt: Date;

	@Field(() => String, { nullable: true })
	accessToken?: string;
}
