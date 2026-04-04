import { Schema } from 'mongoose';
import { MemberAuthType, MemberStatus, MemberType } from '../libs/enums/member.enum';

const MemberSchema = new Schema(
	{
		memberType: {
			type: String,
			enum: MemberType,
			default: MemberType.USER,
		},

		MemberStatus: {
			type: String,
			enum: MemberStatus,
			default: MemberStatus.ACITVE,
		},

		MemberAuthType: {
			type: String,
			enum: MemberAuthType,
			default: MemberAuthType.PHONE,
		},

		memberPhone: { // number deb belgilasak-u, raqam 0 dan boshlansa 0 tushib qoladi,
			type: String,
			index: { unique: true, sparse: true }, // unique: Har bir foydalanuvchining telefoni takrorlanmasin;  sparse: telefon raqami bo'sh (null) bo'lgan foydalanuvchilarga unique qoidasini qo'llamaydi, bo'sh bo'lsa ham xato bermaydi
			required: true,
		},

		memberNick: {
			type: String,
			index: { unique: true, sparse: true },
			required: true,
		},

		memberPassword: {
			type: String,
			select: false, // privacy: Bazadan member ma'lumotlari so'ralganda parol avtomatik kelmaydi, maxsus so'ralmasa ko'rinmaydi:
			required: true,
		},

		memberFullName: {
			type: String,
		},

		memberImage: {
			type: String,
			default: '', // Foydalanuvchi ro'yxatdan o'tganda rasm yuklamagan bo'lishi mumkin. default: '' — rasm yo'q bo'lsa bo'sh string saqlanadi, null yoki undefined o'rniga.
		},

		memberAddress: {
			type: String,
		},

		memberDesc: {
			type: String,
		},

		memberProperties: {
			type: Number,
			default: 0,
		},

		memberArticles: {
			type: Number,
			default: 0,
		},

		memberFollowers: {
			type: Number,
			default: 0,
		},

		memberFollowings: {
			type: Number,
			default: 0,
		},

		memberPoints: {
			type: Number,
			default: 0,
		},

		memberLikes: {
			type: Number,
			default: 0,
		},

		memberViews: {
			type: Number,
			default: 0,
		},

		memberComments: {
			type: Number,
			default: 0,
		},

		memberRank: {
			type: Number,
			default: 0,
		},

		memberWarnings: {
			type: Number,
			default: 0,
		},

		memberBlocks: {
			type: Number,
			default: 0,
		},

		deletedAt: {
			type: Date,
		},
	},
	{ timestamps: true, collection: 'members' },
);

export default MemberSchema;