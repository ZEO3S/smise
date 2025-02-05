import { Job } from '@/types/api/jobs';
import { Location } from '@/types/api/location';

import { Modal, Text } from '@/components/common';
import { useModal } from '@/components/common/modal/hooks';
import {
  ApplyFilterButton,
  Categories,
  Details,
  FilterModalOpenButton,
  ResetFilterButton,
} from '@/components/filter/filterModal/components';

export type Items = Job[] | Location[] | null;

interface Props {
  title: string;
  items: Items;
  noneSelectText: string;
  categories: string[];
  selectedCategory: string | null;
  selectedDetails: string[];
  checkedDetails: string[] | null;
  onCategory전체Click: () => void;
  onCategoryItemClick: (category: string) => void;
  onDetailCheck: (id: string) => void;
  onDetailUncheck: (id: string) => void;
  onResetClick: () => void;
  onApplyClick: () => void;
}

export default function FilterModal({
  title,
  items,
  noneSelectText,
  categories,
  selectedCategory,
  selectedDetails,
  checkedDetails,
  onCategory전체Click,
  onCategoryItemClick,
  onDetailCheck,
  onDetailUncheck,
  onResetClick,
  onApplyClick,
}: Props) {
  const { isOpen, openModal, closeModal } = useModal();

  const handleApplyButtonClick = () => {
    onApplyClick();
    closeModal();
  };

  return (
    <div className='py-2'>
      <div className='py-2'>
        <Text variant='semi-title' content={title} />
      </div>
      <FilterModalOpenButton items={items} openModal={openModal} />
      <Modal title={title} openState={isOpen} onClose={closeModal}>
        <div className='flex gap-2 h-[360px]'>
          <Categories items={categories} on전체Click={onCategory전체Click} onItemClick={onCategoryItemClick} />
          <Details
            category={selectedCategory}
            details={selectedDetails}
            checkedDetails={checkedDetails}
            noneSelectText={noneSelectText}
            onCheck={onDetailCheck}
            onUnCheck={onDetailUncheck}
          />
        </div>
        <div className='flex justify-between'>
          <ResetFilterButton onClick={onResetClick} />
          <ApplyFilterButton onClick={handleApplyButtonClick} />
        </div>
      </Modal>
    </div>
  );
}
