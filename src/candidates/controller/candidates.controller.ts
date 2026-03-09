import { Controller, Get, Req, Res } from '@nestjs/common';
import { CandidatesService } from '../service/candidates.service';
import type { Response, Request } from 'express';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Get()
  async exportCSVFile(@Req() request: Request, @Res() response: Response) {
    const abortController = new AbortController();

    request.on('close', () => {
      abortController.abort();
    });
    response.setHeader('Content-Type', 'text/csv');
    response.setHeader(
      'Content-Disposition',
      'attachment; filename="candidates.csv"',
    );

    const csvFileRows = this.candidatesService.getAllCandidatesData(
      abortController.signal,
    );

    const stream = Readable.from(csvFileRows);

    await pipeline(stream, response);
  }
}
