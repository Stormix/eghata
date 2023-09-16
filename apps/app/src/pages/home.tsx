import SearchInput from '../components/atoms/search-input';
import Card from '../components/molecules/card';
import Carousel from '../components/molecules/carousel';
import CarpoolingCard from '../components/molecules/carpooling-card';

const Home = () => {
  return (
    <div className="flex flex-col w-full gap-4 px-4">
      <SearchInput className="sticky top-0 bg-white" />

      <Carousel items={[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => Card)} title="Requesting help" />
      <Carousel items={[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => Card)} title="Offering help" />
      <Carousel items={[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => CarpoolingCard)} title="Available rides" />
    </div>
  );
};

export default Home;
