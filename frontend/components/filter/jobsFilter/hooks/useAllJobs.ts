import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { https } from '@/apis/fetch';

import { ResponseJobs } from '@/types/api/jobs';
import { isValidServiceType } from '@/types/guards/queryParams';

import { JOBS_URL, PARAMS } from '@/constants/api';

import { useFetch } from '@/hooks';

export const useAllJobs = () => {
  const searchParams = useSearchParams();
  const serviceType = searchParams.get(PARAMS.SERVICE_TYPE);
  const serviceTypeParam = isValidServiceType(serviceType) ? `?serviceType=${serviceType}` : '';
  const url = `${JOBS_URL}${serviceTypeParam}`;
  const { data, isLoading, error } = useFetch<string, ResponseJobs>({
    fetch: useCallback(() => https.get<ResponseJobs>(url), [url]),
    key: url,
  });

  return { allJobs: data?.jobs ?? [], isLoading, error };
};
