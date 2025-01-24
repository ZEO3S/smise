import { Button, Text } from '@/components/common';

interface Props {
  clearSelectedCategory: () => void;
  clearSelectedJobs: () => void;
  clearCheckedDetails: () => void;
}

export function ResetJobsButton({ clearSelectedCategory, clearSelectedJobs, clearCheckedDetails }: Props) {
  const resetJob = () => {
    clearSelectedCategory();
    clearSelectedJobs();
    clearCheckedDetails();
  };

  return (
    <Button
      className='py-1 px-4 rounded border border-default-color border-opacity-30 hover:bg-default-color hover:bg-opacity-10'
      onClick={resetJob}
    >
      <Text variant='middle-title' opacity={70} content='초기화' />
    </Button>
  );
}
