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

  async getAllCandidates(): Promise<CandidatesJobApplications> {
    const baseUrl = this.configService.get<string>('API_BASE_URL');

    const firstRequestData = await this.getSinglePageData(
      `${baseUrl}/candidates?include=job-applications&page[size]=30`,
    );

    const candidates = firstRequestData.data;
    const jobApplications = firstRequestData.included;
    const numberOfPages = firstRequestData.meta['page-count'];
    let nextRequestUrl = firstRequestData.links.next;

    let pageCounter = 1;

    while (pageCounter < numberOfPages) {
      const data = await this.getSinglePageData(nextRequestUrl);
      nextRequestUrl = data.links.next;
      candidates.push(...data.data);
      jobApplications.push(...data.included);
      pageCounter++;
    }

    return { candidates, jobApplications };
  }

  private async getSinglePageData(
    url: string,
  ): Promise<GetAllCandidatesResponseDto> {
    const apiKey = this.configService.get<string>('API_KEY');
    const xApiVersion = this.configService.get<string>('X_API_VERSION');

    const { data } = await firstValueFrom(
      this.httpService.get<GetAllCandidatesResponseDto>(url, {
        headers: {
          Authorization: `Token token=${apiKey}`,
          'X-Api-Version': xApiVersion,
        },
      }),
    );
    return data;
  }
}
