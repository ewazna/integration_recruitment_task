import { CandidateResponseDto } from './candidateResponse.dto';
import { JobApplicationDto } from './jobApplication.dto';

export class GetAllCandidatesResponseDto {
  data: CandidateResponseDto[];
  included: JobApplicationDto[];
}
