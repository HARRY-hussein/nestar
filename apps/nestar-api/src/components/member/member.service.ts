import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Member } from '../../libs/dto/member/member';
import { MemberInput } from '../../libs/dto/member/member.input';

@Injectable()
export class MemberService {
	constructor(@InjectModel('Member') private readonly memberModel: Model<Member>) {}

	public async signup(input: MemberInput): Promise<Member> {
		try {
			const result = await this.memberModel.create(input);
			return result;
		} catch (err) {
			console.log('error. Service.model:', err);
			throw new BadRequestException(err);
		}
	}

	public async login(): Promise<string> {
		return 'login executed!';
	}

	public async updateMember(): Promise<string> {
		return 'updateMember executed!';
	}

	public async getMember(): Promise<string> {
		return 'getMember executed!';
	}
}
