import { NestFactory } from '@nestjs/core';
import { UiHttpModule } from './ui/http/ui-http.module';

async function bootstrap() {
  const app = await NestFactory.create(UiHttpModule);
  await app.listen(3000);
}
bootstrap();
