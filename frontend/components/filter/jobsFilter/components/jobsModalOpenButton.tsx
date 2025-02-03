import Image from 'next/image';

import { ArrowSVG } from '@/assets/svgs';

import { Button, Text } from '@/components/common';
import { useJobs } from '@/components/filter/jobsFilter/hooks/useJobs';

interface Props {
  openModal: () => void;
}

export function JobsModalOpenButton({ openModal }: Props) {
  const jobs = useJobs();
  const detailsLength = jobs?.flatMap((job) => job.details).length ?? 0;
  const hasJobs = jobs && jobs?.length > 0;
  const remainingCount = detailsLength - 1;

  return (
    <Button className='flex gap-1 w-full py-2 hover:bg-default-color hover:bg-opacity-10' onClick={openModal}>
      <Text content={hasJobs ? jobs[0].category : '전체'} />
      {hasJobs && (
        <>
          <Text content='·' />
          <Text content={jobs[0].details[0]} />
          {remainingCount > 0 && <Text content={`외 ${remainingCount}`} />}
        </>
      )}
      <Image
        className='ml-1 -rotate-90 select-none border border-default-color rounded'
        src={ArrowSVG}
        alt='모달 열기 버튼'
      />
    </Button>
  );
}
