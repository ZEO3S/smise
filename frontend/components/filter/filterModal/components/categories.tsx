import Image from 'next/image';

import { ArrowSVG } from '@/assets/svgs';

import { Button, Text } from '@/components/common';

interface Props {
  items: Array<string>;
  on전체Click: () => void;
  onItemClick: (item: string) => void;
}

export function Categories({ items, on전체Click, onItemClick }: Props) {
  return (
    <ul className='overflow-y-scroll'>
      {['전체', ...items].map((item) => {
        return (
          <li key={item}>
            <Button
              className='flex justify-between w-60 p-4 cursor-pointer rounded hover:bg-default-color hover:bg-opacity-10'
              onClick={item === '전체' ? on전체Click : () => onItemClick(item)}
            >
              <Text variant='full-base' content={item} />
              {item !== '전체' && (
                <Image className='ml-1 -rotate-90 select-none' src={ArrowSVG} alt='상세 아이템 열기 버튼' />
              )}
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
