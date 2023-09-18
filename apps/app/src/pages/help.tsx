import { useWindowSize } from '@/hooks/useWindowSize';
import SearchInput from '../components/atoms/search-input';
import FilterButton from '../components/molecules/FilterButton';
import Card from '../components/molecules/card';
import { useTranslation } from 'react-i18next';
import { List, AutoSizer } from "react-virtualized";
import { useState } from 'react';


interface SizeProps {
  width: number;
  height: number;
}
function loadData() {
  // load your data here
  return [...Array(1000).keys()]
}

const Help = () => {
  const { t } = useTranslation();

  const rowHeight = 160;
  
  const [list, setList] = useState(loadData());

  function renderCard({ index , key, style } : any) {
    return <div key={index} style={style}><Card  className="my-4" /></div>;
  }

  return (
      <div className="flex flex-col justify-start w-full gap-4 pb-28">
        <h1 className="text-2xl font-medium text-center">{t('Requesting help')}</h1>
        <div className="sticky top-0 px-4 bg-white">
          <SearchInput />
          <div className="flex flex-row justify-start pb-2">
            <FilterButton />
          </div>
        </div>
          <div className="flex flex-col px-4 h-screen">
            <AutoSizer>
            {({ height, width } : SizeProps) => (
              <List
                width={width}
                height={height}
                rowHeight={rowHeight}
                rowRenderer={renderCard}
                rowCount={list.length}
                overscanRowCount={5} />
              )}
            </AutoSizer>
        </div>
      </div>
  );
};

export default Help;
