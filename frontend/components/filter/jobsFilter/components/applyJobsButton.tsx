import { Job } from '@/types/api/jobs';

import { PARAMS } from '@/constants/api';

import { Button, Text } from '@/components/common';

import { usePushRouteWithQueryParam } from '@/hooks';

interface Props {
  selectedJobs: Array<Job> | null;
  clearSelectedCategory: () => void;
  closeModal: () => void;
}

export function ApplyJobsButton({ selectedJobs, clearSelectedCategory, closeModal }: Props) {
  const { pushRoute, deleteQueryParam } = usePushRouteWithQueryParam();

  const applyJob = () => {
    if (!selectedJobs?.length) {
      deleteQueryParam(PARAMS.JOBS);
      closeModal();

      return;
    }

    const formatSelectedJobs = (jobs: Array<Job>) =>
      jobs
        .map(({ category, details }) => `${category},${details.map((detail) => detail.split('-').pop()).join(',')}`)
        .join('&');

    pushRoute(PARAMS.JOBS, formatSelectedJobs(selectedJobs));
    clearSelectedCategory();
    closeModal();
  };

  return (
    <Button className='bg-green-800 py-1 px-4 rounded' onClick={applyJob}>
      <Text variant='middle-title' color='white' content='적용' />
    </Button>
  );
}
