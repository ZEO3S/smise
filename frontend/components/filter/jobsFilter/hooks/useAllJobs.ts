import { https } from '@/apis/fetch';

import { ResponseJobs } from '@/types/api/jobs';

import { JOBS_URL } from '@/constants/api/url';

import { useFetch } from '@/hooks/useFetch';
import { useServiceType } from '@/hooks/useServiceType';

export const useAllJobs = () => {
  const url = `${JOBS_URL}?serviceType=${useServiceType() ?? '전체'}`;
  const { data, isLoading, error } = useFetch<string, ResponseJobs>({
    fetch: () => https.get<ResponseJobs>(url),
    key: url,
  });

  return { allJobs: data?.jobs ?? [], isLoading, error };
};
