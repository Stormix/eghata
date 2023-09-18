import SearchInput from '../components/atoms/search-input';
import FilterButton from '../components/molecules/FilterButton';
import Card from '../components/molecules/card';
import { useTranslation } from 'react-i18next';
import { List } from "react-virtualized";

const Help = () => {
  const { t } = useTranslation();

  const rowHeight = 128 + 16 + 16;
  const rowWidth = 800;
  const listHeight = 800;

  const list = [...Array(1000).keys()]

  function renderCard({ index , key, style } : any) {
    return <Card key={index} style={style} className="" />;
  }

  return (
    <div className="flex flex-col justify-start w-full gap-4 pb-28 ">
      <h1 className="text-2xl font-medium text-center">{t('Requesting help')}</h1>
      <div className="sticky top-0 px-4 bg-white">
        <SearchInput />
        <div className="flex flex-row justify-start pb-2">
          <FilterButton />
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4">
        <List
          width={rowWidth}
          height={listHeight}
          rowHeight={rowHeight}
          rowRenderer={renderCard}
          rowCount={list.length}
          overscanRowCount={5} />
      </div>
    </div>
  );
};

export default Help;
