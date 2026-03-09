import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { GetAllCandidatesResponseDto } from '../dto/getAllCandidatesResponse.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CandidatesJobApplications } from '../models/candidatesJobApplications';

@Injectable()
export class CandidatesRepository {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

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
      let data: GetAllCandidatesResponseDto;
      try {
        data = (
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
        throw error;
      }

      yield { candidates: data.data, jobApplications: data.included };

      if (!data.links.next) {
        break;
      }

      requestUrl = data.links.next;
    }
  }
}
