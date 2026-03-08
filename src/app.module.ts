import { Module } from '@nestjs/common';
import { CandidatesModule } from './candidates/candidates.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] }), CandidatesModule],
})
export class AppModule {}
