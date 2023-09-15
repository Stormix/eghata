import SearchInput from '../components/atoms/search-input';
import FilterButton from '../components/molecules/FilterButton';
import Card from '../components/molecules/card';

const Help = () => {
  return (
    <div className="flex flex-col w-full h-full gap-4 justify-start  px-4">
      <h1 className="font-medium text-2xl text-center">Requesting help</h1>

      <SearchInput />
      <div className="flex flex-row justify-start">
        <FilterButton />
      </div>

      <div className="flex flex-col gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
          <Card key={index} className="" />
        ))}
      </div>
    </div>
  );
};

export default Help;
