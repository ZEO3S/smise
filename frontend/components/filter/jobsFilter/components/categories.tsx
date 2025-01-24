import Image from 'next/image';

import ArrowSVG from '@/assets/svgs/arrow.svg';

import { Job } from '@/types/api/jobs';

import Button from '@/components/common/button';
import Text from '@/components/common/text';

interface Props {
  allJobs: Array<Job>;
  updateSelectedCategory: (category: string) => void;
  clearSelectedCategory: () => void;
}

export function Categories({ allJobs, updateSelectedCategory, clearSelectedCategory }: Props) {
  return (
    <>
      <ul className='overflow-y-scroll'>
        <li key='전체'>
          <Button
            className='flex justify-between w-60 p-4 cursor-pointer rounded hover:bg-default-color hover:bg-opacity-10'
            onClick={clearSelectedCategory}
          >
            <Text variant='full-base' content='전체' />
          </Button>
        </li>
        {allJobs?.map(({ category }) => {
          return (
            <li key={category}>
              <Button
                className='flex justify-between w-60 p-4 cursor-pointer rounded hover:bg-default-color hover:bg-opacity-10'
                onClick={() => updateSelectedCategory(category)}
              >
                <Text variant='full-base' content={category} />
                <Image className='ml-1 -rotate-90 select-none' src={ArrowSVG} alt='상세 직무 열기 버튼' />
              </Button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
