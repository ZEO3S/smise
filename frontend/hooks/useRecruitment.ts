import { useEffect, useState } from 'react';

import { https } from '@/apis/fetch';

import { Recruitment, ResponseRecruitment } from '@/types/api/recruitment';

import { PARAMS } from '@/constants/api/queryParams';
import { DEFAULT_PARAMS } from '@/constants/api/recruitment';
import { RECRUITMENT_URL } from '@/constants/api/url';

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
  const { pushRoute, deleteQueryParam } = usePushRouteWithQueryParam();
  const page = usePage();
  const [recruitment, setRecruitment] = useState<Array<Recruitment>>([]);

  const initialQueryParams = () => Object.values(PARAMS).forEach((name) => deleteQueryParam(name));

  const initialPagination = () => {
    pushRoute(PARAMS.SIZE, String(DEFAULT_PARAMS.SIZE));
    pushRoute(PARAMS.PAGE, String(DEFAULT_PARAMS.PAGE));
  };

  const hasNext = data ? data.totalPages - data.page > 1 : false;
  const fetchNextPage = () => {
    if (!hasNext || isLoading) return;

    pushRoute(PARAMS.PAGE, String(Number(page) + 1));
  };

  useEffect(() => {
    setRecruitment((prev) => {
      if (!data) return [];
      if (page === '0' && DEFAULT_PARAMS.SIZE === data.recruitment.length) return data.recruitment;

      return [...prev, ...data.recruitment];
    });
  }, [data]);

  useEffect(() => {
    initialQueryParams();
    initialPagination();
  }, []);

  return {
    recruitment,
    isLoading,
    error,
    hasNext,
    fetchNextPage,
  };
};
