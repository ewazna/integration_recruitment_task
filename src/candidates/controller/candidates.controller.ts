import { Controller, Get } from '@nestjs/common';
import { CandidatesService } from '../service/candidates.service';
import { CandidatesJobApplications } from '../models/candidatesJobApplications';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Get()
  async getAllCandidatesData(): Promise<CandidatesJobApplications> {
    return this.candidatesService.getAllCandidatesData();
  }
}
