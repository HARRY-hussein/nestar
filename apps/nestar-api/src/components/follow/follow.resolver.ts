import { Resolver } from '@nestjs/graphql';
import { FollowService } from './follow.service';

@Resolver()
export class BoardArticleResolver {
	constructor(private readonly followService: FollowService) {}
}

export class FollowResolver {}
