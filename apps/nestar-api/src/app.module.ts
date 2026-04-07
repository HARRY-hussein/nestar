import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'; // .env file mantig'ini NestJSda ishlashi un yordam beradigan mantiq
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { ComponentsModule } from './components/components.module';
import { DatabaseModule } from './database/database.module';
import { T } from './libs/common';

@Module({
	imports: [
		ConfigModule.forRoot(),
		GraphQLModule.forRoot({
			// GraphQL ni sozlaydi:
			driver: ApolloDriver, // GraphQL ishlashi uchun engine (runtime executor)
			playground: true, // Brauzarda GraphQL so'rovlarini sinab ko'rish uchun UI ochiladi
			uploads: false, // GraphQL orqali fayl yuklash o'chirilgan, fayl yuklash alohida maxsus sozlash talab qilganligi un
			autoSchemaFile: true, // GraphQL schema ni qo'lda yozmasdan, code dan avtomatik yaratadi
			formatError: (error: T) => { // GraphQL serverida sodir bolgan ixtiyoriy errorni biz yaratgan customized error sifatida olib beradi
				const graphQLFormattedError = { // errorni formatlashtirish jarayoni: 2ta narsani jamlaydi: CODE & MESSAGE
					code: error?.extensions.code,
					message:
						error?.extensions?.exception?.response?.message || error?.extensions?.response?.message || error?.message, // 3 turdagi holat errodagi messageni qabul qiladi
				};
				console.log('GRAPHQL GLOBAL ERR:', graphQLFormattedError);
				return graphQLFormattedError; // server qotib qolmasligi un return qildik
			},
		}),
		ComponentsModule, // Loyihaning Backendini asosiy mantig'i / business logic moduli(Service).
		DatabaseModule, // MongoDB Databasega ulanish moduli.
	],
	controllers: [AppController], // [Rest API] HTTP so'rovlarni qabul qiladi (REST API uchun)
	providers: [AppService, AppResolver], // [GraphQL API] Dependency Injection: ichidagilar boshqa joylarda inject qilib ishlatilaveradi
})
export class AppModule {} // JSni oddiy classi -> Module decorater orqali boyitilgan class
