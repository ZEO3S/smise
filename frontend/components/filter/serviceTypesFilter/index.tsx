import { PARAMS, SERVICE_TYPES } from '@/constants/api';

import { Radio, Text } from '@/components/common';

import { usePushRouteWithQueryParam } from '@/hooks/usePushRouteWithQueryParam';

export default function ServiceTypesFilter() {
  const { pushRoute } = usePushRouteWithQueryParam();

  return (
    <div className='pb-2'>
      <div className='pb-2'>
        <Text variant='semi-title' content='복무형태' />
      </div>
      <Radio>
        <ul>
          {SERVICE_TYPES.map((serviceType) => {
            return (
              <li key={serviceType}>
                <Radio.Option
                  value={serviceType}
                  label={serviceType}
                  onChecked={() => pushRoute(PARAMS.SERVICE_TYPE, serviceType)}
                />
              </li>
            );
          })}
        </ul>
      </Radio>
    </div>
  );
}
