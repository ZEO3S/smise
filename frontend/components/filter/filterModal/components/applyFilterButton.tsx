import { Button, Text } from '@/components/common';

interface Props {
  onClick: () => void;
}

export function ApplyFilterButton({ onClick }: Props) {
  return (
    <Button className="bg-green-800 py-1 px-4 rounded" onClick={onClick}>
      <Text variant="middle-title" color="white" content="적용" />
    </Button>
  );
}
