import { https } from '@/apis/fetch';

import { PARAMS, RECRUITMENT_URL } from '@/constants/api';

import type { ResponseRecruitment } from '@/components/recruitment/types';

import { useFetch } from '@/hooks/useFetch';
import { usePage } from '@/hooks/usePage';
import { usePushRouteWithQueryParam } from '@/hooks/usePushRouteWithQueryParam';
import { useQueryParams } from '@/hooks/useQueryParams';

export const useRecruitment = () => {
  const queryParams = useQueryParams();
  const url = queryParams ? `${RECRUITMENT_URL}?${queryParams}` : RECRUITMENT_URL;
  const { data, isLoading, error } = useFetch<string, ResponseRecruitment>({
    fetch: () => https.get<ResponseRecruitment>(url),
    key: url,
    suspense: true,
  });
  const { pushRoute } = usePushRouteWithQueryParam();
  const page = usePage();
  const hasNext = data ? data.totalPages - data.page > 1 : false;

  const fetchNextPage = () => {
    if (!hasNext || isLoading) return;

    pushRoute(PARAMS.PAGE, String(Number(page) + 1));
  };

  return {
    recruitment: data?.recruitment ?? [],
    isLoading,
    error,
    hasNext,
    fetchNextPage,
  };
};
