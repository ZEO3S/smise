import { useSearchParams } from 'next/navigation';

import { isValidJobs } from '@/types/guards/queryParams';

import { PARAMS } from '@/constants/api/queryParams';

export const useJobs = () => {
  const searchParams = useSearchParams();
  const jobsQueryParam = searchParams.get(PARAMS.JOBS);
  const jobsWithCategories = jobsQueryParam?.split('&');
  const jobs = jobsWithCategories?.map((jobsWithCategory) => {
    const jobsWithCategoryList = jobsWithCategory.split(',');

    return {
      category: jobsWithCategoryList.shift(),
      details: jobsWithCategoryList,
    };
  });

  return isValidJobs(jobs) ? jobs : null;
};
