import { CandidateResponseDto } from '../dto/candidateResponse.dto';
import { GetAllCandidatesResponseDto } from '../dto/getAllCandidatesResponse.dto';
import { JobApplicationDto } from '../dto/jobApplication.dto';

export const candidateMock_1: CandidateResponseDto = {
  id: '1',
  attributes: {
    email: 'candidate@gmail.com',
    'first-name': 'Ewa',
    'last-name': 'Ważna',
  },
  relationships: {
    'job-applications': {
      data: [
        {
          type: 'job-application',
          id: '123',
        },
      ],
    },
  },
};

export const candidateMock_2: CandidateResponseDto = {
  id: '2',
  attributes: {
    email: 'jane.doe@gmail.com',
    'first-name': 'Jane',
    'last-name': 'Doe',
  },
  relationships: {
    'job-applications': {
      data: [
        {
          type: 'job-application',
          id: '456',
        },
      ],
    },
  },
};

export const jobApplicationMock_123: JobApplicationDto = {
  id: '123',
  attributes: {
    'created-at': '2026-03-08T15:00:00.000+01:00',
  },
};

export const jobApplicationMock_456: JobApplicationDto = {
  id: '456',
  attributes: {
    'created-at': '2026-03-08T15:00:00.000+01:00',
  },
};

const metaDataMock = {
  'record-count': 2,
  'page-count': 2,
};

const linksMock = {
  next: 'https://test.com',
};

export const responseMock_1: GetAllCandidatesResponseDto = {
  data: [candidateMock_1],
  included: [jobApplicationMock_123],
  meta: metaDataMock,
  links: linksMock,
};

export const responseMock_2: GetAllCandidatesResponseDto = {
  data: [candidateMock_2],
  included: [jobApplicationMock_456],
  meta: metaDataMock,
  links: {},
};
