import { Injectable } from '@nestjs/common';
import { CandidatesRepository } from '../repository/candidates.repository';
import { CandidatesJobApplications } from '../models/candidatesJobApplications';

@Injectable()
export class CandidatesService {
  constructor(private readonly candidatesRepository: CandidatesRepository) {}

  async getAllCandidatesData(): Promise<CandidatesJobApplications> {
    return this.candidatesRepository.getAllCandidates();
  }
}
