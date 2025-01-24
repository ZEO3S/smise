import { useSearchParams } from 'next/navigation';

import { https } from '@/apis/fetch';

import { ResponseJobs } from '@/types/api/jobs';
import { isValidServiceType } from '@/types/guards/queryParams';

import { JOBS_URL, PARAMS } from '@/constants/api';

import { useFetch } from '@/hooks';

export const useAllJobs = () => {
  const searchParams = useSearchParams();
  const serviceType = searchParams.get(PARAMS.SERVICE_TYPE);
  const url = `${JOBS_URL}?serviceType=${isValidServiceType(serviceType) ? serviceType : '전체'}`;
  const { data, isLoading, error } = useFetch<string, ResponseJobs>({
    fetch: () => https.get<ResponseJobs>(url),
    key: url,
  });

  return { allJobs: data?.jobs ?? [], isLoading, error };
};
