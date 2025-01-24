import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const usePushRouteWithQueryParam = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const createQueryParam = (name: string, value: string) => {
    params.set(name, value);

    return params.toString();
  };

  const pushWithDisableScroll = (url: string) => router.push(url, { scroll: false });

  const pushRoute = (name: string, value: string) =>
    pushWithDisableScroll(`${pathname}?${createQueryParam(name, value)}`);

  const deleteQueryParam = (name: string) => {
    params.delete(name);

    if (!params.size) {
      pushWithDisableScroll(`${pathname}`);
    } else {
      const queryParams = params.toString();
      pushWithDisableScroll(`${pathname}?${queryParams}`);
    }
  };

  return { pushRoute, deleteQueryParam };
};
