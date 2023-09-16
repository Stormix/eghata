import { cn } from '@/lib/utils';

interface AssistanceTypeBlockProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  className?: string;
  selected?: boolean;
  onClick?: () => void;
}

const AssistanceTypeBlock = ({ className, title, icon: Icon, selected, onClick }: AssistanceTypeBlockProps) => {
  return (
    <div
      className={cn(
        'm-0 px-2 py-1 rounded-md w-fit bg-zinc-100 flex flex-row gap-1 items-center border border-transparent',
        {
          'border-gray-900': selected
        }
      )}
      onClick={onClick}
    >
      <Icon
        className={cn(className ?? 'text-red-600', {
          'text-gray-500': !selected
        })}
      />
      <span className="text-xs">{title}</span>
    </div>
  );
};

export default AssistanceTypeBlock;
