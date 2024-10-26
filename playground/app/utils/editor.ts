import {FileCode, FileJson, FileText, FileType, LucideIcon} from 'lucide-react';

interface LanguageInfo {
  name: string;
  icon: LucideIcon;
}

export function getLanguageInfo(fileName: string): LanguageInfo {
  const extension = fileName.split('.').pop()?.toLowerCase();

  const languageMap: Record<string, LanguageInfo> = {
    js: {name: 'javascript', icon: FileCode},
    jsx: {name: 'javascript', icon: FileCode},
    ts: {name: 'typescript', icon: FileCode},
    tsx: {name: 'typescript', icon: FileCode},
    html: {name: 'html', icon: FileCode},
    css: {name: 'css', icon: FileType},
    json: {name: 'json', icon: FileJson},
    md: {name: 'markdown', icon: FileText},
    py: {name: 'python', icon: FileCode},
    rb: {name: 'ruby', icon: FileCode},
    java: {name: 'java', icon: FileCode},
    cpp: {name: 'cpp', icon: FileCode},
    c: {name: 'c', icon: FileCode},
    cs: {name: 'csharp', icon: FileCode},
    go: {name: 'go', icon: FileCode},
    rs: {name: 'rust', icon: FileCode},
    php: {name: 'php', icon: FileCode},
    sql: {name: 'sql', icon: FileCode},
    yaml: {name: 'yaml', icon: FileText},
    yml: {name: 'yaml', icon: FileText},
    xml: {name: 'xml', icon: FileCode},
    sh: {name: 'shell', icon: FileCode},
    bash: {name: 'shell', icon: FileCode},
    txt: {name: 'plaintext', icon: FileText},
  };

  return languageMap[extension || ''] || {name: 'plaintext', icon: File};
}
