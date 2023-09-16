import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/select';
import { cn } from '@/lib/utils';
import { Option } from '@/types/form';

interface IconSelectProps {
  icon: ({ className }: { className?: string }) => React.ReactNode;
  position?: 'left' | 'right'; // TODO: implment this
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
}

const IconSelect = ({ icon: Icon, value, options, onChange, placeholder }: IconSelectProps) => {
  const selected = (options ?? []).find((option) => option.value === value);
  return (
    <Select onValueChange={(value) => onChange(value as string)} value={value}>
      <SelectTrigger className="relative w-full">
        <SelectValue asChild>
          <div className="flex gap-2 items-center">
            <Icon className={cn('text-gray-200')} />
            {value ? selected?.label : placeholder ?? 'Select an option...'}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem value={option.value} key={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default IconSelect;
