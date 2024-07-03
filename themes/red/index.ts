import * as monaco from 'monaco-editor';

export default {
  base: 'vs-dark',
  inherit: false,
  colors: {
    'activityBar.background': '#580000',
    'badge.background': '#cc3333',
    'button.background': '#883333',
    'debugToolBar.background': '#660000',
    'dropdown.background': '#580000',
    'editor.background': '#390000',
    'editor.foreground': '#F8F8F8',
    'editor.hoverHighlightBackground': '#ff000044',
    'editor.lineHighlightBackground': '#ff000033',
    'editor.selectionBackground': '#750000',
    'editor.selectionHighlightBackground': '#f5500039',
    'editorCursor.foreground': '#970000',
    'editorGroup.border': '#ff666633',
    'editorGroupHeader.tabsBackground': '#330000',
    'editorHoverWidget.background': '#300000',
    'editorLineNumber.activeForeground': '#ffbbbb88',
    'editorLineNumber.foreground': '#ff777788',
    'editorLink.activeForeground': '#FFD0AA',
    'editorSuggestWidget.background': '#300000',
    'editorSuggestWidget.border': '#220000',
    'editorWhitespace.foreground': '#c10000',
    'editorWidget.background': '#300000',
    errorForeground: '#ffeaea',
    'extensionButton.prominentBackground': '#cc3333',
    'extensionButton.prominentHoverBackground': '#cc333388',
    focusBorder: '#ff6666aa',
    'input.background': '#580000',
    'inputOption.activeBorder': '#cc0000',
    'inputValidation.infoBackground': '#550000',
    'inputValidation.infoBorder': '#DB7E58',
    'list.activeSelectionBackground': '#880000',
    'list.dropBackground': '#662222',
    'list.highlightForeground': '#ff4444',
    'list.hoverBackground': '#800000',
    'list.inactiveSelectionBackground': '#770000',
    'minimap.selectionHighlight': '#750000',
    'peekView.border': '#ff000044',
    'peekViewEditor.background': '#300000',
    'peekViewResult.background': '#400000',
    'peekViewTitle.background': '#550000',
    'pickerGroup.border': '#ff000033',
    'pickerGroup.foreground': '#cc9999',
    'ports.iconRunningProcessForeground': '#DB7E58',
    'progressBar.background': '#cc3333',
    'quickInputList.focusBackground': '#660000',
    'selection.background': '#ff777788',
    'sideBar.background': '#330000',
    'statusBar.background': '#700000',
    'statusBar.noFolderBackground': '#700000',
    'statusBarItem.remoteBackground': '#cc3333',
    'tab.activeBackground': '#490000',
    'tab.inactiveBackground': '#300a0a',
    'tab.lastPinnedBorder': '#ff000044',
    'titleBar.activeBackground': '#770000',
    'titleBar.inactiveBackground': '#772222',
  },
  rules: [
    {
      token: 'meta.embedded',
      foreground: 'F8F8F8',
    },
    {
      token: 'source.groovy.embedded',
      foreground: 'F8F8F8',
    },
    {
      token: 'string meta.image.inline.markdown',
      foreground: 'F8F8F8',
    },
    {
      token: 'variable.legacy.builtin.python',
      foreground: 'F8F8F8',
    },
    {
      token: 'comment',
      foreground: 'e7c0c0ff',
    },
    {
      token: 'constant',
      foreground: '994646ff',
    },
    {
      token: 'keyword',
      foreground: 'f12727ff',
    },
    {
      token: 'entity',
      foreground: 'fec758ff',
    },
    {
      token: 'storage',
      foreground: 'ff6262ff',
    },
    {
      token: 'string',
      foreground: 'cd8d8dff',
    },
    {
      token: 'support',
      foreground: '9df39fff',
    },
    {
      token: 'variable',
      foreground: 'fb9a4bff',
    },
    {
      token: 'invalid',
      foreground: 'ffffffff',
    },
    {
      token: 'entity.other.inherited-class',
      foreground: 'aa5507ff',
    },
    {
      token: 'constant.character',
      foreground: 'ec0d1e',
    },
    {
      token: 'string constant',
      foreground: 'ffe862ff',
    },
    {
      token: 'constant.character.escape',
      foreground: 'ffe862ff',
    },
    {
      token: 'string.regexp',
      foreground: 'ffb454ff',
    },
    {
      token: 'string variable',
      foreground: 'edef7dff',
    },
    {
      token: 'support.function',
      foreground: 'ffb454ff',
    },
    {
      token: 'support.constant',
      foreground: 'eb939aff',
    },
    {
      token: 'support.variable',
      foreground: 'eb939aff',
    },
    {
      token: 'declaration.sgml.html declaration.doctype',
      foreground: '73817dff',
    },
    {
      token: 'declaration.sgml.html declaration.doctype entity',
      foreground: '73817dff',
    },
    {
      token: 'declaration.sgml.html declaration.doctype string',
      foreground: '73817dff',
    },
    {
      token: 'declaration.xml-processing',
      foreground: '73817dff',
    },
    {
      token: 'declaration.xml-processing entity',
      foreground: '73817dff',
    },
    {
      token: 'declaration.xml-processing string',
      foreground: '73817dff',
    },
    {
      token: 'declaration.tag',
      foreground: 'ec0d1eff',
    },
    {
      token: 'declaration.tag entity',
      foreground: 'ec0d1eff',
    },
    {
      token: 'meta.tag',
      foreground: 'ec0d1eff',
    },
    {
      token: 'meta.tag entity',
      foreground: 'ec0d1eff',
    },
    {
      token: 'meta.selector.css entity.name.tag',
      foreground: 'aa5507ff',
    },
    {
      token: 'meta.selector.css entity.other.attribute-name.id',
      foreground: 'fec758ff',
    },
    {
      token: 'meta.selector.css entity.other.attribute-name.class',
      foreground: '41a83eff',
    },
    {
      token: 'support.type.property-name.css',
      foreground: '96dd3bff',
    },
    {
      token: 'meta.property-group support.constant.property-value.css',
      foreground: 'ffe862ff',
    },
    {
      token: 'meta.property-value support.constant.property-value.css',
      foreground: 'ffe862ff',
    },
    {
      token: 'meta.property-value support.constant.named-color.css',
      foreground: 'ffe862ff',
    },
    {
      token: 'meta.property-value constant',
      foreground: 'ffe862ff',
    },
    {
      token: 'meta.preprocessor.at-rule keyword.control.at-rule',
      foreground: 'fd6209ff',
    },
    {
      token: 'meta.constructor.argument.css',
      foreground: 'ec9799ff',
    },
    {
      token: 'meta.diff',
      foreground: 'f8f8f8ff',
    },
    {
      token: 'meta.diff.header',
      foreground: 'f8f8f8ff',
    },
    {
      token: 'markup.deleted',
      foreground: 'ec9799ff',
    },
    {
      token: 'markup.changed',
      foreground: 'f8f8f8ff',
    },
    {
      token: 'markup.inserted',
      foreground: '41a83eff',
    },
    {
      token: 'markup.quote',
      foreground: 'f12727ff',
    },
    {
      token: 'markup.list',
      foreground: 'ff6262ff',
    },
    {
      token: 'markup.bold',
      foreground: 'fb9a4bff',
    },
    {
      token: 'markup.italic',
      foreground: 'fb9a4bff',
    },
    {
      token: 'markup.inline.raw',
      foreground: 'cd8d8dff',
    },
    {
      token: 'markup.heading',
      foreground: 'fec758ff',
    },
    {
      token: 'markup.heading.setext',
      foreground: 'fec758ff',
    },
    {
      token: 'punctuation.definition.heading',
      foreground: 'fec758ff',
    },
    {
      token: 'entity.name.section',
      foreground: 'fec758ff',
    },
    {
      token: 'punctuation.definition.template-expression.begin',
      foreground: 'ec0d1e',
    },
    {
      token: 'punctuation.definition.template-expression.end',
      foreground: 'ec0d1e',
    },
    {
      token: 'punctuation.section.embedded',
      foreground: 'ec0d1e',
    },
    {
      token: '.format.placeholder',
      foreground: 'ec0d1e',
    },
  ],
} as const satisfies monaco.editor.IStandaloneThemeData;
