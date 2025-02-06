import { PropsWithChildren } from 'react';

export function Main({ children }: PropsWithChildren) {
  return <main className="flex flex-1">{children}</main>;
}
