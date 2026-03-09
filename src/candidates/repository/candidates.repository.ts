import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { GetAllCandidatesResponseDto } from '../dto/getAllCandidatesResponse.dto';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CandidatesJobApplications } from '../models/candidatesJobApplications';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class CandidatesRepository {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  private readonly logger = new Logger(CandidatesRepository.name, {
    timestamp: true,
  });

  async *getAllCandidates(
    signal: AbortSignal,
  ): AsyncGenerator<CandidatesJobApplications> {
    if (signal.aborted) {
      return;
    }

    const apiKey = this.configService.get<string>('API_KEY');
    const xApiVersion = this.configService.get<string>('X_API_VERSION');
    const baseUrl = this.configService.get<string>('API_BASE_URL');

    let requestUrl = `${baseUrl}/candidates?include=job-applications&page[size]=30`;

    while (true) {
      let candidateResponse: GetAllCandidatesResponseDto;
      try {
        this.logger.log(`Outgoing request for ${requestUrl}`);

        candidateResponse = (
          await firstValueFrom(
            this.httpService.get<GetAllCandidatesResponseDto>(requestUrl, {
              headers: {
                Authorization: `Token token=${apiKey}`,
                'X-Api-Version': xApiVersion,
              },
              signal,
            }),
          )
        ).data;
      } catch (error) {
        if (signal.aborted) {
          return;
        }

        this.logger.error(`Error during fetching ${requestUrl}`);
        throw error;
      }

      await this.validateCandidatesResponse(candidateResponse);

      yield {
        candidates: candidateResponse.data,
        jobApplications: candidateResponse.included,
      };

      if (!candidateResponse.links.next) {
        break;
      }

      requestUrl = candidateResponse.links.next;
    }
  }

  private async validateCandidatesResponse(data: GetAllCandidatesResponseDto) {
    const dataInstance = plainToInstance(GetAllCandidatesResponseDto, data, {
      excludeExtraneousValues: true,
    });
    const errors = await validate(dataInstance);

    if (errors.length > 0) {
      this.logger.error(
        'External API response validation failed.',
        JSON.stringify(errors),
      );
      throw new InternalServerErrorException(
        'External API response validation failed.',
      );
    }
  }
}
