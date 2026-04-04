import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'; // .env file mantig'ini NestJSda ishlashi un yordam beradigan mantiq
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { ComponentsModule } from './components/components.module';
import { DatabaseModule } from './database/database.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		GraphQLModule.forRoot({ // GraphQL ni sozlaydi:
			driver: ApolloDriver, // GraphQL ishlashi uchun engine (runtime executor)
			playground: true, // Brauzarda GraphQL so'rovlarini sinab ko'rish uchun UI ochiladi
			uploads: false, // GraphQL orqali fayl yuklash o'chirilgan, fayl yuklash alohida maxsus sozlash talab qilganligi un
			autoSchemaFile: true, // GraphQL schema ni qo'lda yozmasdan, code dan avtomatik yaratadi
		}),
		ComponentsModule, // Loyihaning asosiy business logic moduli(Service).
		DatabaseModule, // MongoDB ulanish moduli.
	],
	controllers: [AppController], // HTTP so'rovlarni qabul qiladi (REST API uchun)
	providers: [AppService, AppResolver], // Dependency Injection: ichidagilar boshqa joylarda inject qilib ishlatilaveradi
})
export class AppModule {} // JSni oddiy classi -> Module decorater orqali boyitilgan class