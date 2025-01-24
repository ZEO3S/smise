import Image from 'next/image';

import CloseSVG from '@/assets/svgs/close.svg';

import { Button, Modal, Text } from '@/components/common';
import {
  ApplyJobsButton,
  Categories,
  Details,
  JobsModalOpenButton,
  ResetJobsButton,
} from '@/components/filter/jobsFilter/components';
import {
  useAllJobs,
  useCheckedDetails,
  useSelectedCategory,
  useSelectedJobs,
} from '@/components/filter/jobsFilter/hooks';

import { useModal } from '@/hooks/useModal';

export default function JobsFilter() {
  const { allJobs } = useAllJobs();
  const { selectedJobs, addSelectedJobs, deleteSelectedJobs, clearSelectedJobs, initializeSelectedJobs } =
    useSelectedJobs();
  const { selectedCategory, clearSelectedCategory, updateSelectedCategory } = useSelectedCategory();
  const { checkedDetails, addCheckedDetail, deleteCheckedDetail, clearCheckedDetails, initializeCheckedDetails } =
    useCheckedDetails();

  const { isOpen, openModal, closeModal } = useModal();

  const onModalClose = () => {
    clearSelectedCategory();
    initializeSelectedJobs();
    initializeCheckedDetails();
    closeModal();
  };

  return (
    <div className='py-2'>
      <div className='py-2'>
        <Text variant='semi-title' content='직무' />
      </div>
      <JobsModalOpenButton openModal={openModal} />
      <Modal openState={isOpen} onClose={onModalClose}>
        <div className='flex flex-col gap-6 w-[660px] p-6 rounded-lg bg-white'>
          <div className='flex justify-between'>
            <Text variant='title' content='직무' />
            <Button onClick={closeModal}>
              <Image className='select-none' src={CloseSVG} alt='모달 닫기 버튼' />
            </Button>
          </div>
          <div className='flex gap-2 h-[360px]'>
            <Categories
              allJobs={allJobs}
              clearSelectedCategory={clearSelectedCategory}
              updateSelectedCategory={updateSelectedCategory}
            />
            <Details
              allJobs={allJobs}
              selectedCategory={selectedCategory}
              checkedDetails={checkedDetails}
              addSelectedJobs={addSelectedJobs}
              deleteSelectedJobs={deleteSelectedJobs}
              addCheckedDetail={addCheckedDetail}
              deleteCheckedDetail={deleteCheckedDetail}
            />
          </div>
          <div className='flex justify-between'>
            <ResetJobsButton
              clearSelectedCategory={clearSelectedCategory}
              clearSelectedJobs={clearSelectedJobs}
              clearCheckedDetails={clearCheckedDetails}
            />
            <ApplyJobsButton
              selectedJobs={selectedJobs}
              clearSelectedCategory={clearSelectedCategory}
              closeModal={closeModal}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
