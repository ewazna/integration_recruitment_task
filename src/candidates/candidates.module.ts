import { Module } from '@nestjs/common';
import { CandidatesController } from './controller/candidates.controller';
import { CandidatesService } from './service/candidates.service';
import { HttpModule } from '@nestjs/axios';
import { CandidatesRepository } from './repository/candidates.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [CandidatesController],
  providers: [CandidatesService, CandidatesRepository],
})
export class CandidatesModule {}
