import { CandidateResponseDto } from './candidateResponse.dto';
import { JobApplicationDto } from './jobApplication.dto';

export class GetAllCandidatesResponseDto {
  data: CandidateResponseDto[];
  included: JobApplicationDto[];
  meta: MetaDataDto;
  links: LinksDto;
}

export class MetaDataDto {
  'record-count': number;
  'page-count': number;
}

export class LinksDto {
  next: string;
}
