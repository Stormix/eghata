import { useTranslation } from 'react-i18next';
import SearchInput from '../components/atoms/search-input';
import Card from '../components/molecules/card';
import Carousel from '../components/molecules/carousel';
import CarpoolingCard from '../components/molecules/carpooling-card';

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col w-full gap-4 px-4 pb-28">
      <SearchInput className="sticky -top-1 z-10 bg-white" />

      <Carousel items={[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => Card)} title={t('Requesting help')} />
      <Carousel items={[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => Card)} title={t('Offering help')} />
      <Carousel items={[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => CarpoolingCard)} title={t('Available rides')} />
    </div>
  );
};

export default Home;
