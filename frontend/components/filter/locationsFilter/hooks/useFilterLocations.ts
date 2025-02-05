import { useState } from 'react';

import { District, Location } from '@/types/api/location';

interface FilterLocations {
  selectedDistrict: District | null;
  locations: Array<Location> | null;
}

export const useFilterLocations = (locations: Array<Location> | null) => {
  const [filterLocations, setFilterLocations] = useState<FilterLocations>({
    locations,
    selectedDistrict: null,
  });

  const updateDistrict = (district: District) => {
    setFilterLocations((prev) => ({ ...prev, selectedDistrict: district }));
  };

  const updateCity = (id: string, action: 'add' | 'delete') => {
    setFilterLocations((prev) => {
      const { selectedDistrict, locations } = prev;

      if (!selectedDistrict) return prev;

      const targetIndex = locations?.findIndex((prevLocation) => prevLocation.district === selectedDistrict);

      if (action === 'add') {
        const newLocation = { district: selectedDistrict, cities: [id] };

        if (!locations) {
          return {
            selectedDistrict,
            locations: [newLocation],
          };
        } else if (targetIndex === -1) {
          return {
            selectedDistrict,
            locations: [...locations, newLocation],
          };
        }

        return {
          selectedDistrict,
          locations: locations.map((prevLocation, index) =>
            index === targetIndex ? { ...prevLocation, cities: [...prevLocation.cities, id] } : prevLocation,
          ),
        };
      } else {
        if (!locations || targetIndex === undefined || targetIndex === -1) return prev;

        const updatedCities = locations[targetIndex].cities.filter((cityId) => cityId !== id);

        if (!updatedCities.length) {
          return {
            selectedDistrict,
            locations: locations.filter((_, index) => index !== targetIndex),
          };
        }

        return {
          selectedDistrict,
          locations: locations.map((prevLocation, index) =>
            index === targetIndex ? { ...prevLocation, cities: updatedCities } : prevLocation,
          ),
        };
      }
    });
  };

  const clearFilterLocations = () => {
    setFilterLocations({
      locations: null,
      selectedDistrict: null,
    });
  };

  return {
    selectedDistrict: filterLocations.selectedDistrict,
    selectedLocations: filterLocations.locations,
    cities:
      filterLocations.locations?.find((location) => location.district === filterLocations.selectedDistrict)?.cities ??
      null,
    updateDistrict,
    addCity: (id: string) => updateCity(id, 'add'),
    deleteCity: (id: string) => updateCity(id, 'delete'),
    clearFilterLocations,
  };
};
