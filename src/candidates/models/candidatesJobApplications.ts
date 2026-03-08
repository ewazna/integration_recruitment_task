import { CandidateResponseDto } from '../dto/candidateResponse.dto';
import { JobApplicationDto } from '../dto/jobApplication.dto';

export class CandidatesJobApplications {
  candidates: CandidateResponseDto[];
  jobApplications: JobApplicationDto[];
}
