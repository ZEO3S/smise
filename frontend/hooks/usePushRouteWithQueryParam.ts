import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const usePushRouteWithQueryParam = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const pushWithDisableScroll = (url: string) => router.push(url, { scroll: false });

  const pushRoute = (name: string, value: string) => {
    params.set(name, value);

    pushWithDisableScroll(`${pathname}?${params.toString()}`);
  };

  const deleteQueryParam = (name: string) => {
    params.delete(name);

    if (!params.size) pushWithDisableScroll(`${pathname}`);
    else pushWithDisableScroll(`${pathname}?${params.toString()}`);
  };

  return { pushRoute, deleteQueryParam };
};
