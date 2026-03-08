import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { GetAllCandidatesResponseDto } from '../dto/getAllCandidatesResponse.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CandidatesRepository {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getAllCandidates(): Promise<GetAllCandidatesResponseDto> {
    const baseUrl = this.configService.get<string>('API_BASE_URL');
    const apiKey = this.configService.get<string>('API_KEY');
    const xApiVersion = this.configService.get<string>('X_API_VERSION');

    const { data } = await firstValueFrom(
      this.httpService.get<GetAllCandidatesResponseDto>(
        `${baseUrl}/candidates?include=job-applications`,
        {
          headers: {
            Authorization: `Token token=${apiKey}`,
            'X-Api-Version': xApiVersion,
          },
        },
      ),
    );
    return data;
  }
}
