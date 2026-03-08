export class CandidateResponseDto {
  id: string;
  attributes: CandidateResponseAttributesDto;
  relationships: CandidateResponseRelationshipsDto;
}

export class CandidateResponseAttributesDto {
  email: string;
  'first-name': string;
  'last-name': string;
}

export class CandidateResponseRelationshipsDto {
  'job-applications': JobApplicationRelationshipDto;
}

export class JobApplicationRelationshipDto {
  data: { type: string; id: string }[];
}
