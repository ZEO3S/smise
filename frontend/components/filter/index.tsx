import EducationLevelFilter from './educationLevelFilter';
import ExperienceLevelFilter from './experienceLevelFilter';
import JobsFilter from './jobsFilter';
import LocationFilter from './locationFilter';
import ServiceStatusFilter from './serviceStatusFilter';
import ServiceTypesFilter from './serviceTypesFilter';

export default function Filter() {
  return (
    <div className='flex flex-col sticky top-16 w-80 h-[724px] [&>*]:border-b [&>*]:border-default-color [&>*]:border-opacity-10'>
      <ServiceTypesFilter />
      <ServiceStatusFilter />
      <JobsFilter />
      <LocationFilter />
      <EducationLevelFilter />
      <ExperienceLevelFilter />
    </div>
  );
}
