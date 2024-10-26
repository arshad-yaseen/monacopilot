import type {MetaFunction} from '@remix-run/node';
import {Editor} from '~/components/editor/editor';
import {FileTree} from '~/components/editor/file-tree';
import {Tabs} from '~/components/editor/tabs';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '~/components/ui/resizable';
import {useFileSystem} from '~/hooks/use-file-system';
import {cn} from '~/lib/utils';

export const meta: MetaFunction = () => {
  return [
    {title: 'New Remix App'},
    {name: 'description', content: 'Welcome to Remix!'},
  ];
};

export default function Index() {
  const {
    files,
    createFile,
    createFolder,
    deleteFile,
    deleteFolder,
    updateFileContent,
    openedFiles,
    activeFile,
    openFile,
    closeFile,
    setActiveFile,
  } = useFileSystem();

  return (
    <main className="h-screen w-full bg-background">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <div className="h-full border-r">
            <FileTree
              files={files}
              onCreateFile={createFile}
              onCreateFolder={createFolder}
              onDeleteFile={deleteFile}
              onDeleteFolder={deleteFolder}
              onOpenFile={openFile}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={80}>
          <div className="flex h-full flex-col">
            <Tabs
              openedFiles={openedFiles}
              activeFile={activeFile}
              onTabClick={setActiveFile}
              onTabClose={closeFile}
            />
            <div
              className={cn(
                'flex-1',
                !activeFile && 'grid place-items-center',
              )}>
              {activeFile ? (
                <Editor
                  key={activeFile.path}
                  value={activeFile.content}
                  path={activeFile.path}
                  onChange={value =>
                    updateFileContent(activeFile.path, value || '')
                  }
                />
              ) : (
                <p className="text-muted-foreground">
                  Select a file to start editing
                </p>
              )}
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
