import SearchInput from '../components/atoms/search-input';
import FilterButton from '../components/molecules/FilterButton';
import Card from '../components/molecules/card';
import { useTranslation } from 'react-i18next';

const Help = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-start w-full  gap-4  ">
      <h1 className="text-2xl font-medium text-center">{t('Requesting help')}</h1>
      <div className="sticky top-0 px-4 bg-white ">
        <SearchInput />
        <div className="flex flex-row justify-start pb-2">
          <FilterButton />
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 pb-28">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
          <Card key={index} className="" />
        ))}
      </div>
    </div>
  );
};

export default Help;
