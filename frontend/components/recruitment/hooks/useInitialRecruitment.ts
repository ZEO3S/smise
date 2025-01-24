import { useCallback, useEffect } from 'react';

import { PARAMS } from '@/constants/api/queryParams';

import { DEFAULT_PARAMS } from '@/components/recruitment/constants';

import { usePushRouteWithQueryParam } from '@/hooks/usePushRouteWithQueryParam';

export const useInitialRecruitment = () => {
  const { pushRoute, deleteQueryParam } = usePushRouteWithQueryParam();

  const initialQueryParams = useCallback(
    () => Object.values(PARAMS).forEach((name) => deleteQueryParam(name)),
    [deleteQueryParam],
  );

  const initialPagination = useCallback(() => {
    pushRoute(PARAMS.SIZE, String(DEFAULT_PARAMS.SIZE));
    pushRoute(PARAMS.PAGE, String(DEFAULT_PARAMS.PAGE));
  }, [pushRoute]);

  useEffect(() => {
    initialQueryParams();
    initialPagination();
  }, []);
};
