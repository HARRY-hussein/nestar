import { Module } from '@nestjs/common';
import { MemberResolver } from './member.resolver';
import { MemberService } from './member.service';
import { MongooseModule } from '@nestjs/mongoose';
import MemberSchema from '../../schemas/Member.model';
import { AuthModule } from '../auth/auth.module';
import { ViewModule } from '../view/view.module';

@Module({
	imports: [
		MongooseModule.forFeature([ // DBni alohida ulab oldik va Database Connection mantig'i bn Schemani bog'ladik
			{
				name: 'Member', // shu nom ostida yoziladi
				schema: MemberSchema, // object -> model; shu nom bn export qilingan schema Model
			},
		]),
		AuthModule, // both => member moduleni qurishda yordam beradigan boshqa modulelarni chaqirib oldik 
		ViewModule, // 
	],
	providers: [MemberResolver, MemberService], // MemberModulega xizmat qiluvchi asosiy mantiqlar
	exports: [MemberService],
})
export class MemberModule {}
