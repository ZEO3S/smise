import { Checkbox, Text } from '@/components/common';
import { generateCategoryId } from '@/components/filter/utils/filterModal';

interface Props {
  category: string | null;
  details: string[] | null;
  checkedDetails: string[] | null;
  noneSelectText: string;
  onCheck: (id: string) => void;
  onUnCheck: (id: string) => void;
}

export function Details({ category, details, checkedDetails, noneSelectText, onCheck, onUnCheck }: Props) {
  if (!category) {
    return (
      <div className="flex flex-col justify-center items-center flex-1">
        <Text variant="full-base" opacity={70} content={noneSelectText} />
      </div>
    );
  }

  return (
    <ul className="flex-1 overflow-y-scroll">
      {details?.map((detail) => {
        const id = generateCategoryId(category, detail);

        return (
          <li key={id}>
            <Checkbox
              value={detail}
              label={detail}
              defaultChecked={checkedDetails?.includes(id)}
              boxPosition="right"
              textVariant="full-base"
              onCheck={() => onCheck(id)}
              onUnCheck={() => onUnCheck(id)}
              padding
              hover
              rounded
            />
          </li>
        );
      })}
    </ul>
  );
}
