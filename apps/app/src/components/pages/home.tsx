import SearchInput from '../atoms/search-input';
import Card from '../molecules/card';
import Carousel from '../molecules/carousel';
import CarpoolingCard from '../molecules/carpooling-card';

const Home = () => {
  return (
    <div className="flex flex-col w-full h-full gap-4">
      <SearchInput />

      <Carousel items={[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => Card)} title="Requesting help" />
      <Carousel items={[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => Card)} title="Offering help" />
      <Carousel items={[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => CarpoolingCard)} title="Available rides" />
    </div>
  );
};

export default Home;
