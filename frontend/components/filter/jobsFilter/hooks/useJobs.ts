import { useSearchParams } from 'next/navigation';

import { isValidJobs } from '@/types/guards/queryParams';

import { PARAMS } from '@/constants/api';

export const useJobs = () => {
  const searchParams = useSearchParams();
  const jobsQueryParam = searchParams.get(PARAMS.JOBS);

  if (!jobsQueryParam) return null;

  const parseJobsParam = (queryParam: string) => {
    return queryParam.split('&').map((jobsWithCategory) => {
      const [category, ...details] = jobsWithCategory.split(',');

      return { category, details };
    });
  };

  const jobs = parseJobsParam(jobsQueryParam);

  return isValidJobs(jobs) ? jobs : null;
};
