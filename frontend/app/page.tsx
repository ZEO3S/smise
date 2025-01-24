'use client';

import Filter from '@/components/filter';
import Recruitment from '@/components/recruitment';
import SearchBar from '@/components/searchBar';
import SortTypeSelect from '@/components/sortTypeSelect';

export default function Home() {
  return (
    <div className='flex flex-1 gap-10 px-40 py-10'>
      <Filter />
      <div className='flex flex-col flex-1'>
        <div className='sticky top-16 pb-4 bg-white'>
          <SearchBar />
        </div>
        <div className='flex justify-end sticky top-32 mb-2 bg-white'>
          <SortTypeSelect />
        </div>
        <Recruitment />
      </div>
    </div>
  );
}
