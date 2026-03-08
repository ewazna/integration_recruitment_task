import { Injectable } from '@nestjs/common';
import { CandidatesRepository } from '../repository/candidates.repository';
import { GetAllCandidatesResponseDto } from '../dto/getAllCandidatesResponse.dto';

@Injectable()
export class CandidatesService {
  constructor(private readonly candidatesRepository: CandidatesRepository) {}

  async getAllCandidatesData(): Promise<GetAllCandidatesResponseDto> {
    return this.candidatesRepository.getAllCandidates();
  }
}
