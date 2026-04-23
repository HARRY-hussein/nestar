import { Injectable } from '@nestjs/common';
import { MemberService } from '../member/member.service';
import { InjectModel } from '@nestjs/mongoose';
import { Follower, Following } from '../../libs/dto/follow/follow';
import { Model } from 'mongoose';

@Injectable()
export class BoardArticleService {
	constructor(
		@InjectModel('FollowService') private readonly followModel: Model<Follower | Following>,
		private readonly memberService: MemberService,
		// private readonly viewService: ViewService,
		// private likeService: LikeService,
	) {}
}
export class FollowService {}
