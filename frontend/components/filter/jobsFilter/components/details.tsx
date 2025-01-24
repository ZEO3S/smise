import { generateJobDetailId } from '@/utils/job';

import { Job } from '@/types/api/jobs';

import { Checkbox, Text } from '@/components/common';

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
  const addDetail = (job: string, checkedJob: string) => {
    addCheckedDetail(checkedJob);
    addSelectedJobs(selectedCategory, job);
  };

  const deleteJob = (selectedCategory: string, job: string) => {
    const targetCheckedJob = generateJobDetailId(selectedCategory, job);
    deleteCheckedDetail(targetCheckedJob);

    deleteSelectedJobs(selectedCategory, job);
  };

  return (
    <>
      {selectedCategory ? (
        <ul className='flex-1 overflow-y-scroll'>
          {allJobs
            ?.find((job) => job.category === selectedCategory)
            ?.details.map((job) => {
              const id = generateJobDetailId(selectedCategory, job);

              return (
                <li key={id}>
                  <Checkbox
                    value={job}
                    label={job}
                    defaultChecked={checkedDetails?.includes(id)}
                    boxPosition='right'
                    textVariant='full-base'
                    onCheck={() => addDetail(job, id)}
                    onUnCheck={() => deleteJob(selectedCategory, job)}
                    padding
                    hover
                    rounded
                  />
                </li>
              );
            })}
        </ul>
      ) : (
        <div className='flex flex-col justify-center items-center flex-1'>
          <Text variant='full-base' opacity={70} content='원하는 직무를 선택하고 적용을 눌러 확인하세요' />
        </div>
      )}
    </>
  );
}
