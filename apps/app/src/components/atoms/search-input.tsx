import { cn } from '@/lib/utils';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Input } from './input';
import { useTranslation } from 'react-i18next';

const SearchInput = ({ className }: { className?: string }) => {
  const { t } = useTranslation();

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className={cn('relative w-full my-2')}>
        <Input type="text" placeholder={t('Search')} className="pr-8 focus:outline-none focus:bg-white" />
        <MagnifyingGlassIcon className="absolute w-6 h-6 -translate-y-1/2 right-2 top-1/2 " />
      </div>
    </div>
  );
};

export default SearchInput;
