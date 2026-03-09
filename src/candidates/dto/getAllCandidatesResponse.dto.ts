import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CandidateResponseDto } from './candidateResponse.dto';
import { JobApplicationDto } from './jobApplication.dto';
import { Expose, Type } from 'class-transformer';

export class MetaDataDto {
  @Expose()
  @IsNumber()
  'record-count': number;

  @Expose()
  @IsNumber()
  'page-count': number;
}

export class LinksDto {
  @Expose()
  @IsString()
  @IsOptional()
  next: string;
}

export class GetAllCandidatesResponseDto {
  @Expose()
  @IsArray()
  @Type(() => CandidateResponseDto)
  @ValidateNested({ each: true })
  data: CandidateResponseDto[];

  @Expose()
  @IsArray()
  @Type(() => JobApplicationDto)
  @ValidateNested({ each: true })
  included: JobApplicationDto[];

  @Expose()
  @Type(() => MetaDataDto)
  @ValidateNested()
  meta: MetaDataDto;

  @Expose()
  @Type(() => LinksDto)
  @ValidateNested()
  links: LinksDto;
}
