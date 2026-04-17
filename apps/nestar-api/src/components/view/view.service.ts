import { Injectable } from '@nestjs/common';
import { View } from '../../libs/dto/view/view';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ViewInput } from '../../libs/dto/view/view.input';
import { T } from '../../libs/types/common';

@Injectable()
export class ViewService {
	constructor(@InjectModel('View') private readonly viewModel: Model<View>) {} // viewModuleda import qilingan schemani inject qilib ishlatdik va instance oldik

	public async recordView(input: ViewInput): Promise<View | null> {
		// view hosil bolsa | hosil bolmasa
		const viewExist = await this.checkViewExistence(input); // checkViewExistencedan kelayotgan inputni joyladik
		if (!viewExist) {
			console.log('- New View insert -');
			return await this.viewModel.create(input);
		} else return null;
	}

	private async checkViewExistence(input: ViewInput): Promise<View> {
		const { memberId, viewRefId } = input; // destruction
		const search: T = { memberId: memberId, viewRefId: viewRefId };
		return await this.viewModel.findOne(search).exec(); // search ichidagi qiymatlarini joyladik
	}
}
