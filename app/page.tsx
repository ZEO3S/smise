"use client";

import { useState } from "react";

import SearchBar from "@/components/searchBar";
import SortTypeSelect from "@/components/sortTypeSelect";
import RecruitmentList from "@/components/recruitmentList";

import { DefaultRequestRecruitmentParams } from "@/types/api/recruitment";
import Filter from "@/components/filter";

const DEFAULT_PARAMS: DefaultRequestRecruitmentParams = {
  SERVICE_TYPES: null,
  SERVICE_STATUS: null,
  JOBS: null,
  DETAILED_JOBS: null,
  LOCATIONS: null,
  EXPERIENCE_LEVEL: null,
  EDUCATION_LEVEL: null,
  SORT: "최신순",
  LIMIT: null,
  CURSOR: null,
  KEYWORD: null,
};

export default function Home() {
  const [serviceTypes, setServiceTypes] = useState(
    DEFAULT_PARAMS.SERVICE_TYPES
  );
  const [keyword, setKeyword] = useState(DEFAULT_PARAMS.KEYWORD);
  const [sort, setSort] = useState(DEFAULT_PARAMS.SORT);

  return (
    <div className='flex gap-6 flex-1'>
      <div className='w-80'>
        <Filter setServiceTypes={setServiceTypes} />
      </div>
      <div className='flex-1'>
        <div className='flex mb-6'>
          <SearchBar setKeyword={setKeyword} />
        </div>
        <div className='flex justify-end mb-2'>
          <SortTypeSelect setSort={setSort} />
        </div>
        <RecruitmentList
          serviceTypes={serviceTypes}
          serviceStatus={null}
          jobs={null}
          detailedJobs={null}
          locations={null}
          experienceLevel={null}
          educationLevel={null}
          sort={sort}
          limit={null}
          cursor={null}
          keyword={keyword}
        />
      </div>
    </div>
  );
}
