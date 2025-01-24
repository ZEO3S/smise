import Image from 'next/image';

import { CloseSVG } from '@/assets/svgs';

import { Button, Text } from '@/components/common';

interface Props {
  closeModal: () => void;
}

export function LocationFilterModalHeader({ closeModal }: Props) {
  return (
    <div className='flex justify-between'>
      <Text variant='title' content='지역' />
      <Button onClick={closeModal}>
        <Image className='select-none' src={CloseSVG} alt='모달 닫기 버튼' />
      </Button>
    </div>
  );
}
