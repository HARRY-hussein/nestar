import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import * as mongoose from 'mongoose';
import { ViewGroup } from '../../enums/view.enum';

@InputType() // Frontenddan kirib kelayotgan data
export class ViewInput {
	// signup bolayotganda
	@IsNotEmpty() // bo'sh bo'lmasligi/ kiritilishi kk bolgan data
	@Field(() => String)
	memberId: mongoose.ObjectId;

	@IsNotEmpty()
	@Field(() => String)
	viewRefId: mongoose.ObjectId;

	@IsNotEmpty()
	@Field(() => ViewGroup)
	viewGroup: ViewGroup;
}

