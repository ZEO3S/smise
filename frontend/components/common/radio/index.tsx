'use client';

import { ComponentPropsWithoutRef } from 'react';

import { RadioContextProvider } from './context';
import { Option } from './option';

export function Radio({ children }: ComponentPropsWithoutRef<'input'>) {
  return (
    <fieldset>
      <RadioContextProvider>
        <legend className='w-full'>{children}</legend>
      </RadioContextProvider>
    </fieldset>
  );
}

Radio.Option = Option;
