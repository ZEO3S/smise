import { PARAMS } from '@/constants/api';

import FilterModal from '@/components/filter/filterModal';
import {
  useAllJobs,
  useCheckedDetails,
  useJobs,
  useSelectedCategory,
  useSelectedJobs,
} from '@/components/filter/jobsFilter/hooks';
import { formatQueryParam } from '@/components/filter/utils/filterModal';

import { usePushRouteWithQueryParam } from '@/hooks';

export default function JobsFilter() {
  const { allJobs } = useAllJobs();
  const jobs = useJobs();
  const { selectedJobs, addSelectedJobs, deleteSelectedJobs, clearSelectedJobs } = useSelectedJobs();
  const { selectedCategory, clearSelectedCategory, updateSelectedCategory } = useSelectedCategory();
  const { checkedDetails, addCheckedDetail, deleteCheckedDetail, clearCheckedDetails } = useCheckedDetails();
  const { pushRoute, deleteQueryParam } = usePushRouteWithQueryParam();
  const selectedJob = allJobs.find((job) => job.category === selectedCategory);

  const applyFilter = () => {
    if (selectedJobs && selectedJobs.length)
      pushRoute(PARAMS.JOBS, formatQueryParam(selectedJobs, 'category', 'details'));
    else deleteQueryParam(PARAMS.JOBS);
  };

  const clearAll = () => {
    clearSelectedCategory();
    clearSelectedJobs();
    clearCheckedDetails();
  };

  const handleCheck = (id: string) => {
    if (!selectedCategory) return;

    addCheckedDetail(id);
    addSelectedJobs(selectedCategory, id);
  };

  const handleUncheck = (id: string) => {
    if (!selectedCategory) return;

    deleteCheckedDetail(id);
    deleteSelectedJobs(selectedCategory, id);
  };

  return (
    <FilterModal
      title="직무"
      items={jobs}
      noneSelectText="원하는 직무를 선택하고 적용을 눌러 확인하세요"
      categories={allJobs.map(({ category }) => category)}
      selectedCategory={selectedCategory}
      selectedDetails={selectedJob ? selectedJob.details : []}
      checkedDetails={checkedDetails}
      onCategory전체Click={clearAll}
      onCategoryItemClick={updateSelectedCategory}
      onDetailCheck={handleCheck}
      onDetailUncheck={handleUncheck}
      onResetClick={clearAll}
      onApplyClick={applyFilter}
    />
  );
}
