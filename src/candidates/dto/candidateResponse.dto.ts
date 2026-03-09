import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CandidateResponseAttributesDto {
  @Expose()
  @IsString()
  @IsOptional()
  email: string;

  @Expose()
  @IsString()
  @IsOptional()
  'first-name': string;

  @Expose()
  @IsString()
  @IsOptional()
  'last-name': string;
}

export class DataRelationshipDto {
  @Expose()
  @IsString()
  type: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class JobApplicationRelationshipDto {
  @Expose()
  @IsArray()
  @Type(() => DataRelationshipDto)
  @ValidateNested({ each: true })
  data: DataRelationshipDto[];
}

export class CandidateResponseRelationshipsDto {
  @Expose()
  @Type(() => JobApplicationRelationshipDto)
  @ValidateNested()
  'job-applications': JobApplicationRelationshipDto;
}

export class CandidateResponseDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Expose()
  @Type(() => CandidateResponseAttributesDto)
  @ValidateNested()
  attributes: CandidateResponseAttributesDto;

  @Expose()
  @Type(() => CandidateResponseRelationshipsDto)
  @ValidateNested()
  relationships: CandidateResponseRelationshipsDto;
}
