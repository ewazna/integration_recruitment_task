import { Test, TestingModule } from '@nestjs/testing';
import { CandidatesService } from './candidates.service';
import {
  candidateMock_1,
  candidateMock_2,
  jobApplicationMock_123,
  jobApplicationMock_456,
} from '../mocks/mocks';
import { CandidatesRepository } from '../repository/candidates.repository';

describe('CandidatesService', () => {
  let service: CandidatesService;

  async function* mockGenerator() {
    yield await Promise.resolve({
      candidates: [candidateMock_1],
      jobApplications: [jobApplicationMock_123],
    });
    yield await Promise.resolve({
      candidates: [candidateMock_2],
      jobApplications: [jobApplicationMock_456],
    });
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CandidatesService,
        {
          provide: CandidatesRepository,
          useValue: { getAllCandidates: jest.fn(() => mockGenerator()) },
        },
      ],
    }).compile();

    service = module.get<CandidatesService>(CandidatesService);
  });

  it('should transform candidates data into CSV rows', async () => {
    const generator = service.getAllCandidatesData(
      new AbortController().signal,
    );

    const rows = [];
    for await (const row of generator) {
      rows.push(row);
    }

    expect(rows[0]).toBe(
      'candidate_id,first_name,last_name,email,job_application_id,job_application_created_at\n',
    );
    expect(rows[1]).toBe(
      '1,Ewa,Ważna,candidate@gmail.com,123,2026-03-08T15:00:00.000+01:00\n',
    );
    expect(rows[2]).toBe(
      '2,Jane,Doe,jane.doe@gmail.com,456,2026-03-08T15:00:00.000+01:00\n',
    );
  });
});
