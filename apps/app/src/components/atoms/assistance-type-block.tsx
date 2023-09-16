import { cn } from '@/lib/utils';

interface AssistanceTypeBlockProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  className?: string;
}

const AssistanceTypeBlock = ({ className, title, icon: Icon }: AssistanceTypeBlockProps) => {
  return (
    <div className={cn('m-0 px-2 py-1 rounded-md w-fit bg-zinc-100 flex flex-row gap-1 items-center')}>
      <Icon className={className} />
      <span className="text-xs">{title}</span>
    </div>
  );
};

export default AssistanceTypeBlock;
