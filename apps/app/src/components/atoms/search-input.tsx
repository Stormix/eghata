import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Input } from './input';

const SearchInput = () => {
  return (
    <div className="relative w-full my-2">
      <Input type="text" placeholder="Search" className="pr-8 focus:outline-none focus:bg-white" />
      <MagnifyingGlassIcon className="absolute w-6 h-6 -translate-y-1/2 right-2 top-1/2 " />
    </div>
  );
};

export default SearchInput;
