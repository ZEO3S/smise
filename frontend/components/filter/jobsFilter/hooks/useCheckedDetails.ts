import { useState } from 'react';

import { useJobs } from '@/hooks/useJobs';

export const useCheckedDetails = () => {
  const jobs = useJobs();
  const defaultCheckedDetails = jobs
    ? jobs.flatMap((job) => job.details.map((detail) => `${job.category}-${detail}`))
    : null;
  const [checkedDetails, setCheckedDetails] = useState<Array<string> | null>(defaultCheckedDetails);
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

  const clearCheckedDetails = () => {
    setCheckedDetails(null);
  };

  const initializeCheckedDetails = () => {
    setCheckedDetails(defaultCheckedDetails);
  };

  return {
    checkedDetails,
    addCheckedDetail,
    deleteCheckedDetail,
    clearCheckedDetails,
    initializeCheckedDetails,
  };
};
