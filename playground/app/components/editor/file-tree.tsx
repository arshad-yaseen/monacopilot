'use client';

import {useEffect, useState} from 'react';

import {Button} from '~/components/ui/button';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '~/components/ui/context-menu';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import {Input} from '~/components/ui/input';
import {cn} from '~/lib/utils';
import {
  ChevronDown,
  ChevronRight,
  File,
  Folder,
  FolderPlus,
  Plus,
  Trash2,
} from 'lucide-react';

interface FileTreeProps {
  files: FileSystemNode[];
  onCreateFile: (path: string) => void;
  onCreateFolder: (path: string) => void;
  onDeleteFile: (path: string) => void;
  onDeleteFolder: (path: string) => void;
  onOpenFile: (path: string) => void;
}

interface FileSystemNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileSystemNode[];
}

const STORAGE_KEY = 'code-editor-expanded-folders';

export function FileTree({
  files,
  onCreateFile,
  onCreateFolder,
  onDeleteFile,
  onDeleteFolder,
  onOpenFile,
}: FileTreeProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(),
  );
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [createType, setCreateType] = useState<'file' | 'folder'>('file');
  const [createPath, setCreatePath] = useState('');
  const [newItemName, setNewItemName] = useState('');

  // Load expanded folders from localStorage
  useEffect(() => {
    const savedExpanded = localStorage.getItem(STORAGE_KEY);
    if (savedExpanded) {
      setExpandedFolders(new Set(JSON.parse(savedExpanded)));
    }
  }, []);

  // Save expanded folders to localStorage
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(Array.from(expandedFolders)),
    );
  }, [expandedFolders]);

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const handleCreate = () => {
    if (!newItemName.trim()) return;

    const fullPath = createPath ? `${createPath}/${newItemName}` : newItemName;
    if (createType === 'file') {
      onCreateFile(fullPath);
    } else {
      onCreateFolder(fullPath);
    }
    setIsCreateDialogOpen(false);
    setNewItemName('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newItemName.trim()) {
      handleCreate();
    }
  };

  const renderNode = (node: FileSystemNode) => {
    const isExpanded = expandedFolders.has(node.path);

    return (
      <div key={node.path}>
        <ContextMenu>
          <ContextMenuTrigger>
            <div
              className={cn(
                'flex items-center gap-2 rounded-sm px-2 py-1 hover:bg-muted/50',
                'cursor-pointer select-none transition-colors',
                node.type === 'file' && 'hover:text-primary',
              )}
              onClick={() => {
                if (node.type === 'folder') {
                  toggleFolder(node.path);
                } else {
                  onOpenFile(node.path);
                }
              }}>
              {node.type === 'folder' && (
                <span className="text-muted-foreground">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </span>
              )}
              {node.type === 'folder' ? (
                <Folder className="h-4 w-4 text-muted-foreground" />
              ) : (
                <File className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="text-sm">{node.name}</span>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            {node.type === 'folder' && (
              <>
                <ContextMenuItem
                  onClick={() => {
                    setCreateType('file');
                    setCreatePath(node.path);
                    setIsCreateDialogOpen(true);
                  }}>
                  <Plus className="mr-2 h-4 w-4" />
                  New File
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() => {
                    setCreateType('folder');
                    setCreatePath(node.path);
                    setIsCreateDialogOpen(true);
                  }}>
                  <FolderPlus className="mr-2 h-4 w-4" />
                  New Folder
                </ContextMenuItem>
              </>
            )}
            <ContextMenuItem
              className="text-destructive"
              onClick={() => {
                if (node.type === 'folder') {
                  onDeleteFolder(node.path);
                } else {
                  onDeleteFile(node.path);
                }
              }}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        {node.type === 'folder' && isExpanded && node.children && (
          <div className="ml-4 border-l">
            {node.children.map(child => renderNode(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="p-2">
        <div className="flex items-center justify-between p-2">
          <h2 className="text-sm font-semibold">Files</h2>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setCreateType('file');
                setCreatePath('');
                setIsCreateDialogOpen(true);
              }}>
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setCreateType('folder');
                setCreatePath('');
                setIsCreateDialogOpen(true);
              }}>
              <FolderPlus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-2">{files.map(node => renderNode(node))}</div>
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Create New {createType === 'file' ? 'File' : 'Folder'}
            </DialogTitle>
          </DialogHeader>
          <Input
            placeholder={`Enter ${createType} name`}
            value={newItemName}
            onChange={e => setNewItemName(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={!newItemName.trim()}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
