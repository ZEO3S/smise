import { isValidDistrict } from '@/types/guards/queryParams';

import { LOCATIONS, PARAMS } from '@/constants/api';

import FilterModal from '@/components/filter/filterModal';
import { useFilterLocations, useLocations } from '@/components/filter/locationsFilter/hooks';
import { formatQueryParam } from '@/components/filter/utils/filterModal';

import { usePushRouteWithQueryParam } from '@/hooks';

export default function LocationsFilter() {
  const locations = useLocations();
  const { selectedDistrict, cities, selectedLocations, updateDistrict, addCity, deleteCity, clearFilterLocations } =
    useFilterLocations(locations);
  const { pushRoute, deleteQueryParam } = usePushRouteWithQueryParam();

  const applyFilter = () => {
    if (selectedLocations && selectedLocations.length)
      pushRoute(PARAMS.LOCATIONS, formatQueryParam(selectedLocations, 'district', 'cities'));
    else deleteQueryParam(PARAMS.LOCATIONS);
  };

  const selectDistrict = (district: string) => {
    if (!isValidDistrict(district)) return;

    updateDistrict(district);
  };

  return (
    <FilterModal
      title="지역"
      items={locations}
      noneSelectText="원하는 지역을 선택하고 적용을 눌러 확인하세요"
      categories={Object.keys(LOCATIONS)}
      selectedCategory={selectedDistrict}
      selectedDetails={selectedDistrict ? [...LOCATIONS[selectedDistrict]] : []}
      checkedDetails={cities}
      onCategory전체Click={clearFilterLocations}
      onCategoryItemClick={selectDistrict}
      onDetailCheck={addCity}
      onDetailUncheck={deleteCity}
      onResetClick={clearFilterLocations}
      onApplyClick={applyFilter}
    />
  );
}
