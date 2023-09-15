import { cn } from '@/lib/utils';
import { Input, InputProps } from '../atoms/input';

interface IconInputProps extends InputProps {
  icon: ({ className }: { className?: string }) => React.ReactNode;
  position?: 'left' | 'right';
}
// TODO: refactor search input to use this
const IconInput = ({ icon: Icon, position = 'right', ...props }: IconInputProps) => {
  return (
    <div className="relative w-full my-2">
      <Input
        type="text"
        placeholder="Search"
        className={cn('focus:outline-none focus:bg-white', {
          'pl-10': position === 'left',
          'pr-10': position === 'right'
        })}
        {...props}
      />
      <Icon
        className={cn('absolute w-6 h-6 -translate-y-1/2 top-1/2', {
          'left-2': position === 'left',
          'right-2': position === 'right'
        })}
      />
    </div>
  );
};

export default IconInput;
