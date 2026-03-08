import { Controller, Get } from '@nestjs/common';
import { CandidatesService } from '../service/candidates.service';
import { GetAllCandidatesResponseDto } from '../dto/getAllCandidatesResponse.dto';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Get()
  async getAllCandidatesData(): Promise<GetAllCandidatesResponseDto> {
    return this.candidatesService.getAllCandidatesData();
  }
}
