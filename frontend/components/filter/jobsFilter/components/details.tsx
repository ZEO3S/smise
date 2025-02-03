import { Job } from '@/types/api/jobs';

import { Checkbox, Text } from '@/components/common';
import { generateJobDetailId } from '@/components/filter/jobsFilter/utils/jobDetail';

interface Props {
  allJobs: Array<Job> | null;
  selectedCategory: string | null;
  checkedDetails: Array<string> | null;
  addSelectedJobs: (selectedCategory: string | null, detail: string) => void;
  deleteSelectedJobs: (selectedCategory: string | null, detail: string) => void;
  addCheckedDetail: (checkedDetail: string) => void;
  deleteCheckedDetail: (checkedDetail: string) => void;
}

export function Details({
  allJobs,
  selectedCategory,
  checkedDetails,
  addSelectedJobs,
  deleteSelectedJobs,
  addCheckedDetail,
  deleteCheckedDetail,
}: Props) {
  const selectedJob = allJobs?.find((job) => job.category === selectedCategory);

  const handleCheck = (detail: string) => {
    if (!selectedCategory) return;

    const detailId = generateJobDetailId(selectedCategory, detail);
    addCheckedDetail(detailId);
    addSelectedJobs(selectedCategory, detail);
  };

  const handleUncheck = (detail: string) => {
    if (!selectedCategory) return;

    const detailId = generateJobDetailId(selectedCategory, detail);
    deleteCheckedDetail(detailId);
    deleteSelectedJobs(selectedCategory, detail);
  };

  if (!selectedCategory) {
    return (
      <div className='flex flex-col justify-center items-center flex-1'>
        <Text variant='full-base' opacity={70} content='원하는 직무를 선택하고 적용을 눌러 확인하세요' />
      </div>
    );
  }

  return (
    <ul className='flex-1 overflow-y-scroll'>
      {selectedJob?.details.map((detail) => {
        const detailId = generateJobDetailId(selectedCategory, detail);

        return (
          <li key={detailId}>
            <Checkbox
              value={detail}
              label={detail}
              defaultChecked={checkedDetails?.includes(detailId)}
              boxPosition='right'
              textVariant='full-base'
              onCheck={() => handleCheck(detail)}
              onUnCheck={() => handleUncheck(detail)}
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
