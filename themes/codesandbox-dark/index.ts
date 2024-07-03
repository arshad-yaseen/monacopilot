import * as monaco from 'monaco-editor';

export default {
  base: 'vs-dark',
  inherit: false,
  rules: [
    {
      token: 'string',
      foreground: 'BFD084',
    },
    {
      token: 'punctuation.definition.string',
      foreground: 'BFD084',
    },
    {
      token: 'constant.character.escape',
      foreground: 'BFD084',
    },
    {
      token: 'text.html constant.character.entity.named',
      foreground: 'BFD084',
    },
    {
      token: 'text.html.derivative',
      foreground: 'E5E5E5',
    },
    {
      token: 'punctuation.definition.entity.html',
      foreground: 'BFD084',
    },
    {
      token: 'template.expression.begin',
      foreground: '7AD9FB',
    },
    {
      token: 'template.expression.end',
      foreground: '7AD9FB',
    },
    {
      token: 'punctuation.definition.template-expression.begin',
      foreground: '7AD9FB',
    },
    {
      token: 'punctuation.definition.template-expression.end',
      foreground: '7AD9FB',
    },
    {
      token: 'constant',
      foreground: '7AD9FB',
    },
    {
      token: 'keyword',
      foreground: 'A390FF',
    },
    {
      token: 'modifier',
      foreground: 'A390FF',
    },
    {
      token: 'storage',
      foreground: 'A390FF',
    },
    {
      token: 'punctuation.definition.block',
      foreground: '86897A',
    },
    {
      token: 'punctuation.definition.parameters',
      foreground: '86897A',
    },
    {
      token: 'meta.brace.round',
      foreground: '86897A',
    },
    {
      token: 'meta.jsx.children',
      foreground: 'E5E5E5',
    },
    {
      token: 'punctuation.accessor',
      foreground: '86897A',
    },
    {
      token: 'variable.other',
      foreground: 'FFFFFF',
    },
    {
      token: 'variable.parameter',
      foreground: 'FFFFFF',
    },
    {
      token: 'meta.embedded',
      foreground: 'E5E5E5',
    },
    {
      token: 'source.groovy.embedded',
      foreground: 'E5E5E5',
    },
    {
      token: 'meta.template.expression',
      foreground: 'E5E5E5',
    },
    {
      token: 'comment',
      foreground: '6F6F6F',
    },
    {
      token: 'docblock',
      foreground: '6F6F6F',
    },
    {
      token: 'meta.function-call',
      foreground: 'CDF861',
    },
    {
      token: 'meta.class entity.name.type.class',
      foreground: 'FFFFFF',
      fontStyle: 'underline',
    },
    {
      token: 'meta.class entity.name.type.module',
      foreground: 'CABEFF',
    },
    {
      token: 'meta.class meta.type.annotation',
      foreground: 'A390FF',
    },
    {
      token: 'meta.class support.type.primitive',
      foreground: 'A390FF',
    },
    {
      token: 'meta.interface support.type.primitive',
      foreground: 'A390FF',
    },
    {
      token: 'meta.type.annotation support.type.primitive',
      foreground: 'A390FF',
    },
    {
      token: 'meta.type.annotation entity.name.type',
      foreground: 'CABEFF',
    },
    {
      token: 'variable.object.property',
      foreground: 'FFFFFF',
    },
    {
      token: 'entity.name.function',
      foreground: 'CDF861',
    },
    {
      token: 'meta.definition.variable',
      foreground: 'FFFFFF',
    },
    {
      token: 'modifier',
      foreground: 'A390FF',
    },
    {
      token: 'variable.language.this',
      foreground: 'A390FF',
    },
    {
      token: 'support.type.object',
      foreground: 'A390FF',
    },
    {
      token: 'support.module',
      foreground: '7AD9FB',
      fontStyle: 'italic',
    },
    {
      token: 'support.node',
      foreground: '7AD9FB',
      fontStyle: 'italic',
    },
    {
      token: 'support.type.ts',
      foreground: '7AD9FB',
    },
    {
      token: 'entity.other.inherited-class',
      foreground: '7AD9FB',
    },
    {
      token: 'meta.interface entity.name.type.interface',
      foreground: '7AD9FB',
    },
    {
      token: 'keyword.operator',
      foreground: 'B3E8B4',
    },
    {
      token: 'storage.type.function.arrow',
      foreground: 'B3E8B4',
    },
    {
      token: 'variable.css',
      foreground: '7AD9FB',
    },
    {
      token: 'source.css',
      foreground: 'CDF861',
    },
    {
      token: 'entity.other.attribute-name',
      foreground: 'CDF861',
    },
    {
      token: 'entity.name.tag.css',
      foreground: 'CDF861',
    },
    {
      token: 'entity.other.attribute-name.id',
      foreground: 'CDF861',
    },
    {
      token: 'entity.other.attribute-name.class',
      foreground: 'CDF861',
    },
    {
      token: 'source.css meta.selector.css',
      foreground: 'CDF861',
    },
    {
      token: 'support.type.property-name.css',
      foreground: 'FFFFFF',
    },
    {
      token: 'support.function.css',
      foreground: 'A390FF',
    },
    {
      token: 'support.constant.css',
      foreground: 'A390FF',
    },
    {
      token: 'keyword.css',
      foreground: 'A390FF',
    },
    {
      token: 'constant.numeric.css',
      foreground: 'A390FF',
    },
    {
      token: 'constant.other.color.css',
      foreground: 'A390FF',
    },
    {
      token: 'punctuation.section',
      foreground: '86897A',
    },
    {
      token: 'punctuation.separator',
      foreground: '86897A',
    },
    {
      token: 'punctuation.definition.entity.css',
      foreground: '86897A',
    },
    {
      token: 'punctuation.terminator.rule.css',
      foreground: 'E5E5E5',
    },
    {
      token: 'source.css keyword.other.unit',
      foreground: 'CABEFF',
    },
    {
      token: 'string.css',
      foreground: 'CABEFF',
    },
    {
      token: 'punctuation.definition.string.css',
      foreground: 'CABEFF',
    },
    {
      token: 'support.type.property-name',
      foreground: 'FFFFFF',
    },
    {
      token: 'string.html',
      foreground: 'CDF861',
    },
    {
      token: 'punctuation.definition.tag',
      foreground: '86897A',
    },
    {
      token: 'entity.other.attribute-name',
      foreground: 'CABEFF',
    },
    {
      token: 'entity.name.tag',
      foreground: 'A390FF',
    },
    {
      token: 'entity.name.tag.wildcard',
      foreground: 'CDF861',
    },
    {
      token: 'markup.markdown',
      foreground: 'FFFFFF',
    },
    {
      token: 'markup.heading.markdown',
      foreground: 'B3E8B4',
    },
    {
      token: 'punctuation.definition.bold.markdown',
      foreground: 'B3E8B4',
    },
    {
      token: 'meta.paragraph.markdown punctuation.definition.link.description',
      foreground: 'B3E8B4',
    },
    {
      token: 'punctuation.definition.raw.markdown',
      foreground: 'B3E8B4',
    },
    {
      token: 'meta.paragraph.markdown',
      foreground: 'E5E5E5',
    },
    {
      token: 'text.html.markdown meta.attribute',
      foreground: 'CABEFF',
    },
    {
      token: 'entity.name.section',
      foreground: 'FFFFFF',
    },
    {
      token: 'string.other',
      foreground: 'FFFFFF',
    },
    {
      token: 'string.other.link',
      foreground: 'FFFFFF',
    },
    {
      token: 'punctuation.definition.markdown',
      foreground: 'B3E8B4',
    },
    {
      token: 'punctuation.definition.string',
      foreground: 'B3E8B4',
    },
    {
      token: 'punctuation.definition.string.begin.shell',
      foreground: 'B3E8B4',
    },
    {
      token: 'markup.underline.link',
      foreground: 'BFD084',
    },
    {
      token: 'markup.inline.raw',
      foreground: '86897A',
    },
    {
      token: 'text.html.vue variable.other.readwrite',
      foreground: 'A390FF',
    },
    {
      token: 'text.html.vue meta.object-literal.key',
      foreground: 'FFFFFF',
    },
    {
      token: 'text.html.vue entity.name.tag.css',
      foreground: 'A390FF',
    },
    {
      token: 'text.html.vue entity.other.attribute-name',
      foreground: 'FFFFFF',
    },
    {
      token: 'text.html.vue constant.numeric.css',
      foreground: '7AD9FB',
    },
    {
      token: 'text.html.vue keyword.other.unit',
      foreground: 'A390FF',
    },
    {
      token: 'text.html.vue support.constant.property-value',
      foreground: 'A390FF',
    },
    {
      token: 'text.html.vue support.constant.color',
      foreground: 'A390FF',
    },
    {
      token: 'function.defaultLibrary',
    },
    {
      token: 'class.defaultLibrary',
    },
  ],
  colors: {
    background: '151515',
    foreground: 'E5E5E5',
    focusBorder: 'AD9CFF',
    'selection.background': '6F6F6F',
    'scrollbar.shadow': '0000007E',
    'input.background': '0F0E0E',
    'input.foreground': '999999',
    'button.background': 'EDFFA5',
    'button.foreground': '151515',
    'button.hoverBackground': 'DCFF50',
    'textLink.foreground': 'E5E5E5',
    'button.secondaryForeground': 'C5C5C5',
    'button.secondaryBacground': '2A2A2A',
    'button.secondaryHoverBackground': '373737',
    'activityBar.foreground': 'DEDEDE',
    'activityBar.background': '000000',
    'activityBar.inactiveForeground': '999999',
    'activityBarBadge.foreground': '000000',
    'activityBarBadge.background': 'EDFFA5',
    'activityBar.border': '000000',
    'actibityBar.activeBackground': '151515',
    'sideBar.background': '000000',
    'sideBar.foreground': '999999',
    'sideBarSectionHeader.background': '151515',
    'sideBarSectionHeader.border': '00000000',
    'sideBarSectionHeader.foreground': 'E5E5E5',
    'sideBarTitle.foreground': 'E5E5E5',
    'sideBar.border': '00000000',
    'list.dropBackground': '151515',
    'list.focusForeground': '808080',
    'list.focusBackground': 'E5E5E51A',
    'list.highlightForeground': 'E5E5E5',
    'statusBar.background': '000000',
    'statusBar.foreground': '808080',
    'statusBar.border': '00000000',
    'statusBar.debuggingBackground': '563300',
    'statusBar.debuggingForeground': '999999',
    'statusBar.noFolderBackground': '5D3FE0',
    'statusBar.noFolderForeground': 'E5E5E5',
    'statusBarItem.remoteBackground': 'CEF144',
    'statusBarItem.remoteForeground': '151515',
    'tab.activeBackground': '151515',
    'tab.activeForeground': 'E5E5E5',
    'tab.inactiveBackground': '000000',
    'tab.inactiveForeground': '999999',
    'tab.hoverBackground': 'E5E5E51A',
    'tab.border': '151515',
    'titleBar.activeBackground': '000000',
    'titleBar.activeForeground': '808080',
    'titleBar.border': '00000000',
    'titleBar.inactiveBackground': '000000',
    'menu.foreground': 'E5E5E5',
    'menu.background': '373737',
    'menubar.selectionForeground': 'C5C5C5',
    'menubar.selectionBackground': 'E5E5E51A',
    'menu.selectionForeground': 'E5E5E5',
    'menu.selectionBackground': 'E5E5E51A',
    'menu.selectionBorder': '00000000',
    'menu.border': '00000000',
    'editor.background': '151515',
    'editorLineNumber.foreground': '858585',
    'editorLineNumber.activeForeground': 'C6C6C6',
    'breadcrumb.background': '151515',
    'breadcrumb.foreground': '999999',
    'breadcrumb.focusForeground': 'E5E5E5',
    'editorGroupHeader.border': '00000000',
    'editorGroupHeader.tabsBackground': '000000',
    'scrollbarSlider.background': '79797966',
    'scrollbarSlider.hoverBackground': '646464B3',
    'scrollbarSlider.activeBackground': 'BFBFBF66',
    'widget.shadow': '0000005C',
    'editorWidget.foreground': 'CCCCCC',
    'editorWidget.background': '252526',
    'pickerGroup.border': '3F3F46',
    'pickerGroup.foreground': '3794FF',
    'editorWidget.resizeBorder': '5F5F5F',
    'debugToolBar.background': '333333',
    'debugToolBar.border': '474747',
    errorForeground: 'F48771',
    warningForeground: 'F7CC66',
    'editorError.foreground': 'F48771',
    'list.errorForeground': 'F48771',
    'list.warningForeground': 'F7CC66',
    'editorWarning.foreground': 'F7CC66',
    'gitDecoration.deletedResourceForeground': 'C54444',
    'gitDecoration.untrackedResourceForeground': '9FE7A0',
    'gitDecoration.conflictingResourceForeground': 'ED6C6C',
    'gitDecoration.ignoredResourceForeground': '585858',
    'gitDecoration.modifiedResourceForeground': 'DD763C',
  },
} as const satisfies monaco.editor.IStandaloneThemeData;
