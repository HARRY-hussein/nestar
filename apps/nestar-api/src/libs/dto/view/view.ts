import { Field, Int, ObjectType } from '@nestjs/graphql';
import type { ObjectId } from 'mongoose';
import { ViewGroup } from '../../enums/view.enum';

@ObjectType() // Backenddan Frontendga chiqib ketayotgan DTO
export class View {
	@Field(() => String)
	_id: ObjectId; // Backendda Databasega aynan ObjectId korinishida yoziladi

	@Field(() => ViewGroup)
	viewGroup: ViewGroup;

	@Field(() => String)
	viewRefId: ObjectId;

	@Field(() => Int)
	memberId: ObjectId;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date)
	updatedAt: Date;
}
