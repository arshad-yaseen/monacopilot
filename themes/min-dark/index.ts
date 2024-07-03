import * as monaco from 'monaco-editor';

export default {
  base: 'vs-dark',
  inherit: false,
  colors: {
    'activityBar.background': '#1A1A1A',
    'activityBar.foreground': '#7D7D7D',
    'activityBarBadge.background': '#383838',
    'badge.background': '#383838',
    'badge.foreground': '#C1C1C1',
    'button.background': '#333333',
    'debugIcon.breakpointCurrentStackframeForeground': '#79b8ff',
    'debugIcon.breakpointDisabledForeground': '#848484',
    'debugIcon.breakpointForeground': '#FF7A84',
    'debugIcon.breakpointStackframeForeground': '#79b8ff',
    'debugIcon.breakpointUnverifiedForeground': '#848484',
    'debugIcon.continueForeground': '#FF7A84',
    'debugIcon.disconnectForeground': '#FF7A84',
    'debugIcon.pauseForeground': '#FF7A84',
    'debugIcon.restartForeground': '#79b8ff',
    'debugIcon.startForeground': '#79b8ff',
    'debugIcon.stepBackForeground': '#FF7A84',
    'debugIcon.stepIntoForeground': '#FF7A84',
    'debugIcon.stepOutForeground': '#FF7A84',
    'debugIcon.stepOverForeground': '#FF7A84',
    'debugIcon.stopForeground': '#79b8ff',
    'diffEditor.insertedTextBackground': '#3a632a4b',
    'diffEditor.removedTextBackground': '#88063852',
    'editor.background': '#1f1f1f',
    'editor.lineHighlightBorder': '#303030',
    'editorGroupHeader.tabsBackground': '#1A1A1A',
    'editorGroupHeader.tabsBorder': '#1A1A1A',
    'editorIndentGuide.activeBackground': '#383838',
    'editorIndentGuide.background': '#2A2A2A',
    'editorLineNumber.foreground': '#727272',
    'editorRuler.foreground': '#2A2A2A',
    'editorSuggestWidget.background': '#1A1A1A',
    focusBorder: '#444444',
    foreground: '#888888',
    'gitDecoration.ignoredResourceForeground': '#444444',
    'input.background': '#2A2A2A',
    'input.foreground': '#E0E0E0',
    'inputOption.activeBackground': '#3a3a3a',
    'list.activeSelectionBackground': '#212121',
    'list.activeSelectionForeground': '#F5F5F5',
    'list.focusBackground': '#292929',
    'list.highlightForeground': '#EAEAEA',
    'list.hoverBackground': '#262626',
    'list.hoverForeground': '#9E9E9E',
    'list.inactiveSelectionBackground': '#212121',
    'list.inactiveSelectionForeground': '#F5F5F5',
    'panelTitle.activeBorder': '#1f1f1f',
    'panelTitle.activeForeground': '#FAFAFA',
    'panelTitle.inactiveForeground': '#484848',
    'peekView.border': '#444444',
    'peekViewEditor.background': '#242424',
    'pickerGroup.border': '#363636',
    'pickerGroup.foreground': '#EAEAEA',
    'progressBar.background': '#FAFAFA',
    'scrollbar.shadow': '#1f1f1f',
    'sideBar.background': '#1A1A1A',
    'sideBarSectionHeader.background': '#202020',
    'statusBar.background': '#1A1A1A',
    'statusBar.debuggingBackground': '#1A1A1A',
    'statusBar.foreground': '#7E7E7E',
    'statusBar.noFolderBackground': '#1A1A1A',
    'statusBarItem.prominentBackground': '#fafafa1a',
    'statusBarItem.remoteBackground': '#1a1a1a00',
    'statusBarItem.remoteForeground': '#7E7E7E',
    'symbolIcon.classForeground': '#FF9800',
    'symbolIcon.constructorForeground': '#b392f0',
    'symbolIcon.enumeratorForeground': '#FF9800',
    'symbolIcon.enumeratorMemberForeground': '#79b8ff',
    'symbolIcon.eventForeground': '#FF9800',
    'symbolIcon.fieldForeground': '#79b8ff',
    'symbolIcon.functionForeground': '#b392f0',
    'symbolIcon.interfaceForeground': '#79b8ff',
    'symbolIcon.methodForeground': '#b392f0',
    'symbolIcon.variableForeground': '#79b8ff',
    'tab.activeBorder': '#1e1e1e',
    'tab.activeForeground': '#FAFAFA',
    'tab.border': '#1A1A1A',
    'tab.inactiveBackground': '#1A1A1A',
    'tab.inactiveForeground': '#727272',
    'terminal.ansiBrightBlack': '#5c5c5c',
    'textLink.activeForeground': '#fafafa',
    'textLink.foreground': '#CCCCCC',
    'titleBar.activeBackground': '#1A1A1A',
    'titleBar.border': '#00000000',
  },
  rules: [
    {
      token: 'support.function',
      foreground: 'b392f0',
    },
    {
      token: 'keyword.operator.accessor',
      foreground: 'b392f0',
    },
    {
      token: 'meta.group.braces.round.function.arguments',
      foreground: 'b392f0',
    },
    {
      token: 'meta.template.expression',
      foreground: 'b392f0',
    },
    {
      token: 'markup.fenced_code meta.embedded.block',
      foreground: 'b392f0',
    },
    {
      token: 'strong',
      foreground: 'FF7A84',
    },
    {
      token: 'markup.heading.markdown',
      foreground: 'FF7A84',
    },
    {
      token: 'markup.bold.markdown',
      foreground: 'FF7A84',
    },
    {
      token: 'meta.link.inline.markdown',
      foreground: '1976D2',
    },
    {
      token: 'string',
      foreground: '9db1c5',
    },
    {
      token: 'markup.fenced_code',
      foreground: '9db1c5',
    },
    {
      token: 'markup.inline',
      foreground: '9db1c5',
    },
    {
      token: 'comment',
      foreground: '6b737c',
    },
    {
      token: 'string.quoted.docstring.multi',
      foreground: '6b737c',
    },
    {
      token: 'constant.language',
      foreground: '79b8ff',
    },
    {
      token: 'variable.language.this',
      foreground: '79b8ff',
    },
    {
      token: 'variable.other.object',
      foreground: '79b8ff',
    },
    {
      token: 'variable.other.class',
      foreground: '79b8ff',
    },
    {
      token: 'variable.other.constant',
      foreground: '79b8ff',
    },
    {
      token: 'meta.property-name',
      foreground: '79b8ff',
    },
    {
      token: 'support',
      foreground: '79b8ff',
    },
    {
      token: 'string.other.link.title.markdown',
      foreground: '79b8ff',
    },
    {
      token: 'constant.numeric',
      foreground: 'f8f8f8',
    },
    {
      token: 'constant.other.placeholder',
      foreground: 'f8f8f8',
    },
    {
      token: 'constant.character.format.placeholder',
      foreground: 'f8f8f8',
    },
    {
      token: 'meta.property-value',
      foreground: 'f8f8f8',
    },
    {
      token: 'keyword.other.unit',
      foreground: 'f8f8f8',
    },
    {
      token: 'keyword.other.template',
      foreground: 'f8f8f8',
    },
    {
      token: 'entity.name.tag.yaml',
      foreground: 'f8f8f8',
    },
    {
      token: 'entity.other.attribute-name',
      foreground: 'f8f8f8',
    },
    {
      token: 'support.type.property-name.json',
      foreground: 'f8f8f8',
    },
    {
      token: 'keyword',
      foreground: 'f97583',
    },
    {
      token: 'storage.modifier',
      foreground: 'f97583',
    },
    {
      token: 'storage.type',
      foreground: 'f97583',
    },
    {
      token: 'storage.control.clojure',
      foreground: 'f97583',
    },
    {
      token: 'entity.name.function.clojure',
      foreground: 'f97583',
    },
    {
      token: 'support.function.node',
      foreground: 'f97583',
    },
    {
      token: 'punctuation.separator.key-value',
      foreground: 'f97583',
    },
    {
      token: 'punctuation.definition.template-expression',
      foreground: 'f97583',
    },
    {
      token: 'variable.parameter.function',
      foreground: 'FF9800',
    },
    {
      token: 'entity.name.type',
      foreground: 'b392f0',
    },
    {
      token: 'entity.other.inherited-class',
      foreground: 'b392f0',
    },
    {
      token: 'meta.function-call',
      foreground: 'b392f0',
    },
    {
      token: 'meta.instance.constructor',
      foreground: 'b392f0',
    },
    {
      token: 'entity.other.attribute-name',
      foreground: 'b392f0',
    },
    {
      token: 'entity.name.function',
      foreground: 'b392f0',
    },
    {
      token: 'constant.keyword.clojure',
      foreground: 'b392f0',
    },
    {
      token: 'entity.name.tag',
      foreground: 'ffab70',
    },
    {
      token: 'string.quoted',
      foreground: 'ffab70',
    },
    {
      token: 'string.regexp',
      foreground: 'ffab70',
    },
    {
      token: 'string.interpolated',
      foreground: 'ffab70',
    },
    {
      token: 'string.template',
      foreground: 'ffab70',
    },
    {
      token: 'string.unquoted.plain.out.yaml',
      foreground: 'ffab70',
    },
    {
      token: 'keyword.other.template',
      foreground: 'ffab70',
    },
    {
      token: 'token.info-token',
      foreground: '316bcd',
    },
    {
      token: 'token.warn-token',
      foreground: 'cd9731',
    },
    {
      token: 'token.error-token',
      foreground: 'cd3131',
    },
    {
      token: 'token.debug-token',
      foreground: '800080',
    },
    {
      token: 'punctuation.definition.arguments',
      foreground: 'bbbbbb',
    },
    {
      token: 'punctuation.definition.dict',
      foreground: 'bbbbbb',
    },
    {
      token: 'punctuation.separator',
      foreground: 'bbbbbb',
    },
    {
      token: 'meta.function-call.arguments',
      foreground: 'bbbbbb',
    },
    {
      token: 'markup.underline.link',
      foreground: 'ffab70',
    },
    {
      token: 'beginning.punctuation.definition.list.markdown',
      foreground: 'FF7A84',
    },
    {
      token: 'punctuation.definition.metadata.markdown',
      foreground: 'ffab70',
    },
    {
      token: 'punctuation.definition.string.begin.markdown',
      foreground: '79b8ff',
    },
    {
      token: 'punctuation.definition.string.end.markdown',
      foreground: '79b8ff',
    },
  ],
} as const satisfies monaco.editor.IStandaloneThemeData;
