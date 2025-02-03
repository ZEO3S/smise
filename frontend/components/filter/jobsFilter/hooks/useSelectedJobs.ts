import { useState } from 'react';

import { Job } from '@/types/api/jobs';

import { useJobs } from '@/components/filter/jobsFilter/hooks';

export const useSelectedJobs = () => {
  const jobs = useJobs();
  const [selectedJobs, setSelectedJobs] = useState<Array<Job> | null>(null);

  const findJobIndex = (prev: Array<Job>, category: string) => prev.findIndex((job) => job.category === category);

  const addSelectedJobs = (selectedCategory: string | null, detail: string) => {
    if (!selectedCategory) return;

    setSelectedJobs((prev) => {
      if (!prev) return [{ category: selectedCategory, details: [detail] }];

      const targetIndex = findJobIndex(prev, selectedCategory);

      if (targetIndex === -1) return [...prev, { category: selectedCategory, details: [detail] }];

      return prev.map((job, index) => (index === targetIndex ? { ...job, details: [...job.details, detail] } : job));
    });
  };

  const deleteSelectedJobs = (selectedCategory: string | null, detail: string) => {
    if (!selectedCategory) return;

    setSelectedJobs((prev) => {
      if (!prev) return prev;

      const targetIndex = findJobIndex(prev, selectedCategory);
      if (targetIndex === -1) return prev;

      const newDetails = prev[targetIndex].details.filter((prevDetail) => prevDetail !== detail);
      if (!newDetails.length) return prev.filter((_, index) => index !== targetIndex);

      return prev.map((job, index) => (index === targetIndex ? { ...job, details: newDetails } : job));
    });
  };

  const clearSelectedJobs = () => setSelectedJobs(null);

  const initializeSelectedJobs = () => setSelectedJobs(jobs);

  return {
    selectedJobs,
    addSelectedJobs,
    deleteSelectedJobs,
    clearSelectedJobs,
    initializeSelectedJobs,
  };
};
