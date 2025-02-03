import { useState } from 'react';

import { useJobs } from '@/components/filter/jobsFilter/hooks';
import { generateJobDetailId } from '@/components/filter/jobsFilter/utils/jobDetail';

export const useCheckedDetails = () => {
  const jobs = useJobs();
  const getDefaultCheckedDetails = () =>
    jobs ? jobs.flatMap((job) => job.details.map((detail) => generateJobDetailId(job.category, detail))) : null;
  const [checkedDetails, setCheckedDetails] = useState<Array<string> | null>(getDefaultCheckedDetails());

  const addCheckedDetail = (checkedDetail: string) => {
    setCheckedDetails((prev) => (prev ? [...prev, checkedDetail] : [checkedDetail]));
  };

  const deleteCheckedDetail = (checkedDetail: string) => {
    setCheckedDetails((prev) => {
      const newCheckedDetails = prev?.filter((key) => key !== checkedDetail);

      if (!prev || !newCheckedDetails || !newCheckedDetails.length) return null;

      return newCheckedDetails;
    });
  };

  const clearCheckedDetails = () => setCheckedDetails(null);

  const initializeCheckedDetails = () => setCheckedDetails(getDefaultCheckedDetails());

  return {
    checkedDetails,
    addCheckedDetail,
    deleteCheckedDetail,
    clearCheckedDetails,
    initializeCheckedDetails,
  };
};
