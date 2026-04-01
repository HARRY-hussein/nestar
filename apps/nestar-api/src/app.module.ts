import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'; // .env file mantig'ini NestJSda ishlashi un yordam beradigan mantiq
import {GraphQLModule} from "@nestjs/graphql"
import {ApolloDriver} from "@nestjs/apollo";
import { AppResolver } from './app.resolver';
import { ComponentsModule } from './components/components.module';
import { DatabaseModule } from './database/database.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		GraphQLModule.forRoot({
			driver: ApolloDriver,
      playground: true, 
      uploads: false,
      autoSchemaFile: true,
		}),
		ComponentsModule,
		DatabaseModule,
	],
	controllers: [AppController],
	providers: [AppService, AppResolver],
})
export class AppModule {} // JSni oddiy classi -> Module decorater orqali boyitilgan class
