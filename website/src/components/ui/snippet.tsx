import CopyButton from '@/components/copy-button';
import {Card} from '@/components/ui/card';

interface SnippetProps {
  value: string;
}

const Snippet = ({value}: SnippetProps) => {
  return (
    <Card className="px-4 h-12 border rounded-lg bg-background flex items-center gap-2">
      <span className="font-mono">$ {value}</span>
      <CopyButton value={value} />
    </Card>
  );
};

export default Snippet;
