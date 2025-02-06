import { Button, Text } from '@/components/common';

interface Props {
  onClick: () => void;
}

export function ResetFilterButton({ onClick }: Props) {
  return (
    <Button
      className="py-1 px-4 rounded border border-default-color border-opacity-30 hover:bg-default-color hover:bg-opacity-10"
      onClick={onClick}
    >
      <Text variant="middle-title" opacity={70} content="초기화" />
    </Button>
  );
}
