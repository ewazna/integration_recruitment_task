import { Test, TestingModule } from '@nestjs/testing';
import { CandidatesController } from './candidates.controller';
import { CandidatesService } from '../service/candidates.service';
import { PassThrough } from 'stream';
import type { Response, Request } from 'express';

describe('CandidatesController', () => {
  let controller: CandidatesController;

  async function* mockGenerator() {
    yield await Promise.resolve('candidate_id,first_name\n');
    yield await Promise.resolve('1,Ewa\n');
    yield await Promise.resolve('2,Jane\n');
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandidatesController],
      providers: [
        {
          provide: CandidatesService,
          useValue: { getAllCandidatesData: jest.fn(() => mockGenerator()) },
        },
      ],
    }).compile();

    controller = module.get<CandidatesController>(CandidatesController);
  });

  it('should export csv file', async () => {
    const writtenChunks: string[] = [];
    const mockReq = { on: jest.fn() } as unknown as Request;
    const mockRes = new PassThrough() as unknown as Response;
    mockRes.setHeader = jest.fn();
    mockRes.on('data', (chunk: Buffer) => {
      writtenChunks.push(chunk.toString());
    });
    const streamFinished = new Promise((resolve) =>
      mockRes.on('finish', resolve),
    );

    await controller.exportCSVFile(mockReq, mockRes);
    await streamFinished;
    expect(writtenChunks).toHaveLength(3);
    expect(writtenChunks[0]).toBe('candidate_id,first_name\n');
    expect(writtenChunks[1]).toBe('1,Ewa\n');
    expect(writtenChunks[2]).toBe('2,Jane\n');
    expect(mockRes.setHeader).toHaveBeenCalledWith('Content-Type', 'text/csv');
    expect(mockRes.setHeader).toHaveBeenCalledWith(
      'Content-Disposition',
      'attachment; filename="candidates.csv"',
    );
  });
});
