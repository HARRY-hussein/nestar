import { NestFactory } from '@nestjs/core'; // class NestJS ilovasini yaratish uchun ishlatiladi.
import { AppModule } from './app.module'; // Barcha boshqa modullar yig'ilgan asosiy module
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './libs/interceptor/Logging.interceptor';

// Global Integration
async function bootstrap() { // define: baza ulanishi, port tinglashini kutish kerak
  const app = await NestFactory.create(AppModule); // NestJS ilovasini yaratadi. AppModuleni beramiz: "shu moduldan boshlab ilovani qur" Express + NestJS
  app.useGlobalPipes(new ValidationPipe()); // Pipe Validation Global tarzda integratsiyasi
  app.useGlobalInterceptors(new LoggingInterceptor()); // log malumotlari 
  await app.listen(process.env.PORT_API ?? 3000); // envdagi portda sorovlarni tinglasin, port belgilanmagan bolsa 3000.
}
bootstrap(); // call
 
// loyihaning kirish nuqtasi: NestJS ilovasini yaratadi, portga ulaydi va ishga tushiradi.