import Image from 'next/image';

import ArrowSVG from '@/assets/svgs/arrow.svg';

import Button from '@/components/common/button';
import Text from '@/components/common/text';

import { useJobs } from '@/hooks/useJobs';

interface Props {
  openModal: () => void;
}

export function JobsModalOpenButton({ openModal }: Props) {
  const jobs = useJobs();
  const detailsLength = jobs
    ? jobs.reduce((acc, cur) => {
        return acc + cur.details.length;
      }, 0)
    : 0;

  return (
    <Button className='flex gap-1 w-full py-2 hover:bg-default-color hover:bg-opacity-10' onClick={openModal}>
      <Text content={jobs && Boolean(jobs.length) ? jobs[0].category : '전체'} />
      {jobs && Boolean(jobs.length) && (
        <>
          <Text content='·' />
          <Text content={jobs[0].details[0]} />
          {Boolean(detailsLength - 1) && <Text content={`외 ${detailsLength - 1}`} />}
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
