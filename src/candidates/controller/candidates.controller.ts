import { Controller, Get, Res } from '@nestjs/common';
import { CandidatesService } from '../service/candidates.service';
import type { Response } from 'express';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Get()
  async getAllCandidatesData(@Res() response: Response) {
    const csvFileRows = await this.candidatesService.getAllCandidatesData();

    response.setHeader('Content-Type', 'text/csv');
    response.setHeader(
      'Content-Disposition',
      'attachment; filename="users.csv"',
    );

    response.send(csvFileRows);
  }
}
