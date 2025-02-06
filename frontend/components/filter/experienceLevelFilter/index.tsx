import { useState } from 'react';

import { PARAMS } from '@/constants/api';
import { EXPERIENCE_LEVEL_RANGE, generateExperienceLevelText } from '@/constants/components';

import { Slider, Text } from '@/components/common';

import { usePushRouteWithQueryParam } from '@/hooks';

export default function ExperienceLevelFilter() {
  const [value, setValue] = useState({
    start: EXPERIENCE_LEVEL_RANGE.MIN,
    end: EXPERIENCE_LEVEL_RANGE.MAX,
  });
  const { pushRoute } = usePushRouteWithQueryParam();
  const isRenderMinText = value.start !== EXPERIENCE_LEVEL_RANGE.MAX;
  const isRenderTildeText = value.start !== value.end;
  const isRenderMaxText =
    value.end !== EXPERIENCE_LEVEL_RANGE.MIN &&
    !(value.end !== EXPERIENCE_LEVEL_RANGE.MAX && value.end === value.start);
  const isRenderOverText = value.end === EXPERIENCE_LEVEL_RANGE.MAX;

  const updateExperienceLevel = () => {
    pushRoute(
      PARAMS.EXPERIENCE_LEVEL,
      `${generateExperienceLevelText(value.start)},${generateExperienceLevelText(value.end)}`,
    );
  };

  return (
    <div className="flex flex-col py-2">
      <div className="py-2">
        <Text variant="semi-title" content="경력" />
      </div>
      <div className="flex gap-1">
        {isRenderMinText && <Text content={generateExperienceLevelText(value.start)} />}
        {isRenderTildeText && <Text content="~" />}
        {isRenderMaxText && <Text content={generateExperienceLevelText(value.end)} />}
        {isRenderOverText && <Text content="이상" />}
      </div>
      <Slider
        value={value}
        min={EXPERIENCE_LEVEL_RANGE.MIN}
        max={EXPERIENCE_LEVEL_RANGE.MAX}
        step={1}
        onMouseUp={updateExperienceLevel}
        onStartChange={(start) => setValue((prev) => ({ ...prev, start }))}
        onEndChange={(end) => setValue((prev) => ({ ...prev, end }))}
      />
    </div>
  );
}
