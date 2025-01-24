import { ComponentPropsWithRef } from 'react';

export function Button({ children, ...rest }: ComponentPropsWithRef<'button'>) {
  return <button {...rest}>{children}</button>;
}
