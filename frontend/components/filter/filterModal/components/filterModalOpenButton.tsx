import Image from 'next/image';

import { ArrowSVG } from '@/assets/svgs';

import { Job } from '@/types/api/jobs';
import { Location } from '@/types/api/location';

import { Button, Text } from '@/components/common';
import { Items } from '@/components/filter/filterModal';

interface Props {
  items: Items;
  openModal: () => void;
}

const getFirstItem = (items: Items) => items?.[0];

const getItemText = (item: Job | Location) => {
  if ('category' in item) return item.category;

  return item.district;
};

const getDetailText = (item: Job | Location) => {
  if ('details' in item) return item.details[0];

  return item.cities[0];
};

const getRemainingCount = (item: Job | Location) => {
  if ('details' in item) return item.details.length - 1;

  return item.cities.length - 1;
};

export function FilterModalOpenButton({ items, openModal }: Props) {
  const firstItem = getFirstItem(items);
  const remainingCount = firstItem ? getRemainingCount(firstItem) : 0;

  return (
    <Button className='flex gap-1 w-full py-2 hover:bg-default-color hover:bg-opacity-10' onClick={openModal}>
      <Text content={firstItem ? getItemText(firstItem) : '전체'} />
      {firstItem && (
        <>
          <Text content='·' />
          <Text content={getDetailText(firstItem)} />
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
