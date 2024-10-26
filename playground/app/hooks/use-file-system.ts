'use client';

import {useEffect, useState} from 'react';

interface FileSystemNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileSystemNode[];
}

interface OpenedFile {
  path: string;
  content: string;
}

interface FileSystemState {
  files: FileSystemNode[];
  openedFiles: OpenedFile[];
  activeFilePath: string | null;
}

const STORAGE_KEY = 'code-editor-state';

export function useFileSystem() {
  const [files, setFiles] = useState<FileSystemNode[]>([]);
  const [openedFiles, setOpenedFiles] = useState<OpenedFile[]>([]);
  const [activeFile, setActiveFile] = useState<OpenedFile | null>(null);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      const {files, openedFiles, activeFilePath} = JSON.parse(
        savedState,
      ) as FileSystemState;
      setFiles(files);
      setOpenedFiles(openedFiles);
      setActiveFile(
        openedFiles.find(file => file.path === activeFilePath) || null,
      );
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const state: FileSystemState = {
      files,
      openedFiles,
      activeFilePath: activeFile?.path || null,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [files, openedFiles, activeFile]);

  const findParentFolder = (path: string): FileSystemNode[] => {
    const parts = path.split('/').filter(Boolean);
    let current = files;

    for (const part of parts.slice(0, -1)) {
      const folder = current.find(
        node => node.name === part && node.type === 'folder',
      );
      if (!folder) return current;
      current = folder.children || [];
    }

    return current;
  };

  const createFile = (path: string) => {
    const parts = path.split('/').filter(Boolean);
    const fileName = parts[parts.length - 1];
    const parentFolder = findParentFolder(path);

    const newFile: FileSystemNode = {
      name: fileName,
      path,
      type: 'file',
    };

    if (parts.length === 1) {
      setFiles(
        [...files, newFile].sort((a, b) =>
          a.type === b.type
            ? a.name.localeCompare(b.name)
            : a.type === 'folder'
              ? -1
              : 1,
        ),
      );
    } else {
      const newFiles = [...files];
      let current = newFiles;

      for (const part of parts.slice(0, -1)) {
        const folder = current.find(node => node.name === part);
        if (folder) {
          folder.children = folder.children || [];
          current = folder.children;
        }
      }

      current.push(newFile);
      current.sort((a, b) =>
        a.type === b.type
          ? a.name.localeCompare(b.name)
          : a.type === 'folder'
            ? -1
            : 1,
      );
      setFiles(newFiles);
    }

    const newOpenedFile = {path, content: ''};
    setOpenedFiles([...openedFiles, newOpenedFile]);
    setActiveFile(newOpenedFile);
  };

  const createFolder = (path: string) => {
    const parts = path.split('/').filter(Boolean);
    const folderName = parts[parts.length - 1];
    const parentFolder = findParentFolder(path);

    const newFolder: FileSystemNode = {
      name: folderName,
      path,
      type: 'folder',
      children: [],
    };

    if (parts.length === 1) {
      setFiles(
        [...files, newFolder].sort((a, b) =>
          a.type === b.type
            ? a.name.localeCompare(b.name)
            : a.type === 'folder'
              ? -1
              : 1,
        ),
      );
    } else {
      const newFiles = [...files];
      let current = newFiles;

      for (const part of parts.slice(0, -1)) {
        const folder = current.find(node => node.name === part);
        if (folder) {
          folder.children = folder.children || [];
          current = folder.children;
        }
      }

      current.push(newFolder);
      current.sort((a, b) =>
        a.type === b.type
          ? a.name.localeCompare(b.name)
          : a.type === 'folder'
            ? -1
            : 1,
      );
      setFiles(newFiles);
    }
  };

  const deleteFile = (path: string) => {
    const parts = path.split('/').filter(Boolean);
    const parentFolder = findParentFolder(path);
    const fileName = parts[parts.length - 1];

    if (parts.length === 1) {
      setFiles(files.filter(node => node.name !== fileName));
    } else {
      const newFiles = [...files];
      let current = newFiles;

      for (const part of parts.slice(0, -1)) {
        const folder = current.find(node => node.name === part);
        if (folder && folder.children) {
          current = folder.children;
        }
      }

      const index = current.findIndex(node => node.name === fileName);
      if (index !== -1) {
        current.splice(index, 1);
      }

      setFiles(newFiles);
    }

    setOpenedFiles(openedFiles.filter(file => file.path !== path));
    if (activeFile?.path === path) {
      setActiveFile(openedFiles[0] || null);
    }
  };

  const deleteFolder = (path: string) => {
    const parts = path.split('/').filter(Boolean);
    const parentFolder = findParentFolder(path);
    const folderName = parts[parts.length - 1];

    if (parts.length === 1) {
      setFiles(files.filter(node => node.name !== folderName));
    } else {
      const newFiles = [...files];
      let current = newFiles;

      for (const part of parts.slice(0, -1)) {
        const folder = current.find(node => node.name === part);
        if (folder && folder.children) {
          current = folder.children;
        }
      }

      const index = current.findIndex(node => node.name === folderName);
      if (index !== -1) {
        current.splice(index, 1);
      }

      setFiles(newFiles);
    }

    setOpenedFiles(openedFiles.filter(file => !file.path.startsWith(path)));
    if (activeFile?.path.startsWith(path)) {
      setActiveFile(openedFiles[0] || null);
    }
  };

  const updateFileContent = (path: string, content: string) => {
    setOpenedFiles(
      openedFiles.map(file => (file.path === path ? {...file, content} : file)),
    );
    if (activeFile?.path === path) {
      setActiveFile({path, content});
    }
  };

  const openFile = (path: string) => {
    const existingFile = openedFiles.find(file => file.path === path);
    if (existingFile) {
      setActiveFile(existingFile);
    } else {
      const newFile = {path, content: ''};
      setOpenedFiles([...openedFiles, newFile]);
      setActiveFile(newFile);
    }
  };

  const closeFile = (path: string) => {
    setOpenedFiles(openedFiles.filter(file => file.path !== path));
    if (activeFile?.path === path) {
      const remainingFiles = openedFiles.filter(file => file.path !== path);
      setActiveFile(remainingFiles[0] || null);
    }
  };

  return {
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
  };
}
