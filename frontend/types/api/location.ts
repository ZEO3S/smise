import { LOCATIONS } from '@/constants/api/location';

export type District = keyof typeof LOCATIONS;

export interface Location {
  district: District;
  cities: string[];
}
