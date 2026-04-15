import { Module } from '@nestjs/common';
import { PropertyResolver } from './property.resolver';
import { PropertyService } from './property.service';
import { MongooseModule } from '@nestjs/mongoose';
import PropertySchema from '../../schemas/Property.model';
import { AuthModule } from '../auth/auth.module';
import { ViewModule } from '../view/view.module';
import { MemberModule } from '../member/member.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			// DBni alohida ulab oldik va Database Connection mantig'i bn Schemani bog'ladik
			{
				name: 'Property', // shu nom ostida yoziladi
				schema: PropertySchema, // shu nom bn export qilingan schema Model
			},
		]),
		AuthModule, // both => member moduleni qurishda yordam beradigan boshqa modulelarni chaqirib oldik
		ViewModule, //
		MemberModule,
	],
	providers: [PropertyService, PropertyResolver], // MemberModulega xizmat qiluvchi asosiy mantiqlar
})
export class PropertyModule {}
