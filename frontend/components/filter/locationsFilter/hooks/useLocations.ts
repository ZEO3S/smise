import { useSearchParams } from 'next/navigation';

import { isValidLocations } from '@/types/guards/queryParams';

import { PARAMS } from '@/constants/api';

export const useLocations = () => {
  const searchParams = useSearchParams();
  const locationsQueryParam = searchParams.get(PARAMS.LOCATIONS);

  if (!locationsQueryParam) return null;

  const parseLocationsParam = (queryParam: string) => {
    return queryParam.split('&').map((jobsWithCategory) => {
      const [district, ...cities] = jobsWithCategory.split(',');

      return { district, cities };
    });
  };

  const locations = parseLocationsParam(locationsQueryParam);

  return isValidLocations(locations) ? locations : null;
};
