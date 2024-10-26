'use client';

import {Button} from '~/components/ui/button';
import {ScrollArea, ScrollBar} from '~/components/ui/scroll-area';
import {Separator} from '~/components/ui/separator';
import {cn} from '~/lib/utils';
import {X} from 'lucide-react';

interface TabsProps {
  openedFiles: Array<{path: string; content: string}>;
  activeFile: {path: string; content: string} | null;
  onTabClick: (file: {path: string; content: string}) => void;
  onTabClose: (path: string) => void;
}

export function Tabs({
  openedFiles,
  activeFile,
  onTabClick,
  onTabClose,
}: TabsProps) {
  if (openedFiles.length === 0) return null;

  return (
    <div className="border-b">
      <ScrollArea className="max-w-[100vw]">
        <div className="flex h-11 items-center">
          {openedFiles.map(file => {
            const isActive = activeFile?.path === file.path;
            const fileName = file.path.split('/').pop() || file.path;

            return (
              <div
                key={file.path}
                className={cn(
                  'group flex h-full items-center gap-2 border-r px-4 text-sm transition-colors',
                  isActive ? 'bg-muted' : 'hover:bg-muted/50',
                )}>
                <button
                  className={cn(
                    'text-muted-foreground transition-colors',
                    isActive ? 'text-foreground' : 'hover:text-foreground',
                  )}
                  onClick={() => onTabClick(file)}>
                  {fileName}
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'h-4 w-4 opacity-0 transition-opacity hover:bg-transparent group-hover:opacity-100',
                    isActive && 'opacity-100',
                  )}
                  onClick={e => {
                    e.stopPropagation();
                    onTabClose(file.path);
                  }}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
      <Separator />
    </div>
  );
}
