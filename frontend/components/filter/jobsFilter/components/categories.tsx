import Image from 'next/image';

import { ArrowSVG } from '@/assets/svgs';

import { Job } from '@/types/api/jobs';

import { Button, Text } from '@/components/common';

interface Props {
  allJobs: Array<Job>;
  updateSelectedCategory: (category: string) => void;
  clearAll: () => void;
}

export function Categories({ allJobs, updateSelectedCategory, clearAll }: Props) {
  return (
    <ul className='overflow-y-scroll'>
      {[{ category: '전체' }, ...allJobs].map(({ category }) => (
        <li key={category}>
          <Button
            className='flex justify-between w-60 p-4 cursor-pointer rounded hover:bg-default-color hover:bg-opacity-10'
            onClick={category === '전체' ? clearAll : () => updateSelectedCategory(category)}
          >
            <Text variant='full-base' content={category} />
            {category !== '전체' && (
              <Image className='ml-1 -rotate-90 select-none' src={ArrowSVG} alt='상세 직무 열기 버튼' />
            )}
          </Button>
        </li>
      ))}
    </ul>
  );
}
