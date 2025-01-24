import { useSearchParams } from 'next/navigation';

import { isValidLocations } from '@/types/guards/queryParams';

import { PARAMS } from '@/constants/api/queryParams';

export const useLocations = () => {
  const searchParams = useSearchParams();
  const locationsQueryParam = searchParams.get(PARAMS.LOCATIONS);
  const citiesWithDistricts = locationsQueryParam?.split('&');
  const locations = citiesWithDistricts?.map((citiesWithDistrict) => {
    const citiesWithDistrictList = citiesWithDistrict.split(',');

    return {
      district: citiesWithDistrictList.shift(),
      cities: citiesWithDistrictList,
    };
  });

  return isValidLocations(locations) ? locations : null;
};
