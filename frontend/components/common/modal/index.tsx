'use client';

import Image from 'next/image';
import { PropsWithChildren, useRef } from 'react';
import { createPortal } from 'react-dom';

import CloseSVG from '@/assets/svgs/close.svg';

import { Button } from '@/components/common/button';
import { usePreventScroll } from '@/components/common/modal/hooks/usePreventScroll';
import { Text } from '@/components/common/text';

import { useClickOutsideHandler } from '@/hooks';

interface Props extends PropsWithChildren {
  title: string;
  openState: boolean;
  onClose: () => void;
}

export function Modal({ title, openState, children, onClose }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  usePreventScroll(openState);
  useClickOutsideHandler<HTMLDivElement>(ref, onClose);

  if (!openState) return null;

  return createPortal(
    <div className="flex justify-center items-center fixed top-0 left-0 w-screen h-screen bg-default-color bg-opacity-50 z-30">
      <div className="flex flex-col gap-6 w-[660px] p-6 rounded-lg bg-white" ref={ref}>
        <div className="flex justify-between">
          <Text variant="title" content={title} />
          <Button onClick={onClose}>
            <Image className="select-none" src={CloseSVG} alt="모달 닫기 버튼" />
          </Button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}
