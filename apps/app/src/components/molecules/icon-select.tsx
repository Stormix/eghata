import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/select';
import { cn } from '@/lib/utils';

interface IconInputProps {
  icon: ({ className }: { className?: string }) => React.ReactNode;
  position?: 'left' | 'right'; // TODO: implment this
}

// TODO: refactor search input to use this
const IconSelect = ({ icon: Icon }: IconInputProps) => {
  return (
    <Select>
      <SelectTrigger className="relative w-full">
        <SelectValue asChild>
          <div className="flex gap-2 items-center">
            <Icon className={cn('')} />
            Status
            {/* TODO: display current value */}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default IconSelect;
