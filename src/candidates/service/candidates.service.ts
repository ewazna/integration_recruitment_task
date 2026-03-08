import { Injectable } from '@nestjs/common';
import { CandidatesRepository } from '../repository/candidates.repository';

@Injectable()
export class CandidatesService {
  constructor(private readonly candidatesRepository: CandidatesRepository) {}

  async getAllCandidatesData(): Promise<string> {
    const { candidates, jobApplications } =
      await this.candidatesRepository.getAllCandidates();

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

    const header = Object.keys(csvFileData[0]).join(',') + '\n';

    return (
      header +
      csvFileData.map((data) => Object.values(data).join(',')).join('\n')
    );
  }
}
