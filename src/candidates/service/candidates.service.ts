import { Injectable } from '@nestjs/common';
import { CandidatesRepository } from '../repository/candidates.repository';

@Injectable()
export class CandidatesService {
  constructor(private readonly candidatesRepository: CandidatesRepository) {}

  async *getAllCandidatesData(signal: AbortSignal): AsyncGenerator<string> {
    yield 'candidate_id,first_name,last_name,email,job_application_id,job_application_created_at\n';

    for await (const data of this.candidatesRepository.getAllCandidates(
      signal,
    )) {
      const { candidates, jobApplications } = data;

      const jobApplicationsMap: Map<string, string> = new Map();

      jobApplications.forEach((jobApplication) =>
        jobApplicationsMap.set(
          jobApplication.id,
          jobApplication.attributes['created-at'],
        ),
      );

      const csvFileData = candidates.flatMap((candidate) => {
        return candidate.relationships['job-applications'].data.map(
          ({ id: jobId }) => {
            return {
              candidate_id: candidate.id,
              first_name: candidate.attributes['first-name'] || '',
              last_name: candidate.attributes['last-name'] || '',
              email: candidate.attributes.email || '',
              job_application_id: jobId || '',
              job_application_created_at:
                jobApplicationsMap.get(`${jobId}`) || '',
            };
          },
        );
      });

      yield csvFileData.map((data) => Object.values(data).join(',')).join('\n');
    }
  }
}
