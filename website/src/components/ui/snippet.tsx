import CopyButton from '@/components/copy-button';
import {Card} from '@/components/ui/card';
import {cn} from '@/utils/misc';

interface SnippetProps {
  value: string;
  className?: string;
}

const Snippet = ({value, className}: SnippetProps) => {
  return (
    <Card
      className={cn(
        'px-4 h-12 border rounded-lg bg-background flex items-center gap-2',
        className,
      )}>
      <span className="font-mono">$ {value}</span>
      <div className="flex-1" />
      <CopyButton value={value} />
    </Card>
  );
};

export default Snippet;
