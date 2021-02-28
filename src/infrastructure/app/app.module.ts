import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ConfigInterface } from '../config/config.interface';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      'imports': [ConfigModule],
      'inject': [ConfigService],
      'useFactory': async (config: ConfigInterface) => {
        return config.getMysqlConfig();
      }
    }),
  ],
})
export class AppModule {}
