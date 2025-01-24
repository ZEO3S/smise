import { useSearchParams } from 'next/navigation';

import { PARAMS } from '@/constants/api';

export const useKeyword = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get(PARAMS.KEYWORD);

  return typeof keyword === 'string' ? keyword : null;
};
