import { Expose, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class JobApplicationAttributesDto {
  @Expose()
  @IsString()
  @IsOptional()
  'created-at': string;
}

export class JobApplicationDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Expose()
  @Type(() => JobApplicationAttributesDto)
  @ValidateNested()
  attributes: JobApplicationAttributesDto;
}
