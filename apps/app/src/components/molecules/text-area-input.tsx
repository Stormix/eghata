import { cn } from '@/lib/utils';

interface TextProps {
  title: string;
  placeholder: string;
  isOptional: boolean;
}

const TextAreaInput = ({ title, placeholder, isOptional }: TextProps) => {
  return (
    <div className={cn('flex flex-col gap-y-2.5')}>
      <div className="font-medium">
        <label>{title}</label>
        {!isOptional && <span className="text-red-500">*</span>}
      </div>{' '}
      <textarea
        placeholder={placeholder}
        className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-8 focus:outline-none focus:bg-white"
      ></textarea>
    </div>
  );
};

export default TextAreaInput;
