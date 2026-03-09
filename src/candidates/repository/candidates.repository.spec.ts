import { Test, TestingModule } from '@nestjs/testing';
import { CandidatesRepository } from './candidates.repository';
import { responseMock_1, responseMock_2 } from '../mocks/mocks';
import { HttpService } from '@nestjs/axios';
import { GetAllCandidatesResponseDto } from '../dto/getAllCandidatesResponse.dto';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';
import type { AxiosResponse } from 'axios';

describe('CandidatesRepository', () => {
  let repository: CandidatesRepository;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CandidatesRepository,
        {
          provide: HttpService,
          useValue: { get: jest.fn() },
        },
        {
          provide: ConfigService,
          useValue: { get: jest.fn(() => 'TEST_PARAM_VALUE') },
        },
      ],
    }).compile();

    repository = module.get<CandidatesRepository>(CandidatesRepository);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should stream candidates for all pages', async () => {
    const getSpy = jest
      .spyOn(httpService, 'get')
      .mockReturnValueOnce(
        of({
          data: responseMock_1,
        } as AxiosResponse<GetAllCandidatesResponseDto>),
      )
      .mockReturnValueOnce(
        of({
          data: responseMock_2,
        } as AxiosResponse<GetAllCandidatesResponseDto>),
      );
    const generator = repository.getAllCandidates(new AbortController().signal);

    const results = [];
    for await (const candidate of generator) {
      results.push(candidate);
    }

    expect(results).toHaveLength(2);
    expect(getSpy).toHaveBeenCalledTimes(2);
  });
});
