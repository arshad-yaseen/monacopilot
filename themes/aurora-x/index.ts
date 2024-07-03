import * as monaco from 'monaco-editor';

export default {
  base: 'vs-dark',
  inherit: false,
  colors: {
    'activityBar.background': '#07090F',
    'activityBar.foreground': '#86A5FF',
    'activityBar.inactiveForeground': '#576dafc5',
    'activityBarBadge.background': '#86A5FF',
    'activityBarBadge.foreground': '#07090F',
    'badge.background': '#86A5FF',
    'badge.foreground': '#07090F',
    'breadcrumb.activeSelectionForeground': '#86A5FF',
    'breadcrumb.focusForeground': '#576daf',
    'breadcrumb.foreground': '#576dafa6',
    'breadcrumbPicker.background': '#07090F',
    'button.background': '#86A5FF',
    'button.foreground': '#07090F',
    'button.hoverBackground': '#A8BEFF',
    descriptionForeground: '#576daf79',
    'diffEditor.diagonalFill': '#15182B',
    'diffEditor.insertedTextBackground': '#64d3892c',
    'diffEditor.removedTextBackground': '#dd50742c',
    'dropdown.background': '#15182B',
    'dropdown.foreground': '#c7d5ff99',
    'editor.background': '#07090F',
    'editor.findMatchBackground': '#576daf',
    'editor.findMatchHighlightBackground': '#262E47',
    'editor.inactiveSelectionBackground': '#262e47be',
    'editor.selectionBackground': '#262E47',
    'editor.selectionHighlightBackground': '#262E47',
    'editor.wordHighlightBackground': '#262E47',
    'editor.wordHighlightStrongBackground': '#262E47',
    'editorCodeLens.foreground': '#262E47',
    'editorCursor.background': '#01030b',
    'editorCursor.foreground': '#86A5FF',
    'editorGroup.background': '#07090F',
    'editorGroup.border': '#15182B',
    'editorGroup.dropBackground': '#0C0E19',
    'editorGroup.emptyBackground': '#07090F',
    'editorGroupHeader.tabsBackground': '#07090F',
    'editorLineNumber.activeForeground': '#576dafd8',
    'editorLineNumber.foreground': '#262e47bb',
    'editorWidget.background': '#15182B',
    'editorWidget.border': '#576daf',
    'extensionButton.prominentBackground': '#C7D5FF',
    'extensionButton.prominentForeground': '#07090F',
    focusBorder: '#262E47',
    foreground: '#576daf',
    'gitDecoration.addedResourceForeground': '#64d389fd',
    'gitDecoration.deletedResourceForeground': '#dd5074',
    'gitDecoration.ignoredResourceForeground': '#576daf90',
    'gitDecoration.modifiedResourceForeground': '#c778db',
    'gitDecoration.untrackedResourceForeground': '#576daf90',
    'icon.foreground': '#576daf',
    'input.background': '#15182B',
    'input.foreground': '#86A5FF',
    'inputOption.activeForeground': '#86A5FF',
    'inputValidation.errorBackground': '#dd5073',
    'inputValidation.errorBorder': '#dd5073',
    'inputValidation.errorForeground': '#07090F',
    'list.activeSelectionBackground': '#000000',
    'list.activeSelectionForeground': '#86A5FF',
    'list.dropBackground': '#000000',
    'list.errorForeground': '#dd5074',
    'list.focusBackground': '#01030b',
    'list.focusForeground': '#86A5FF',
    'list.highlightForeground': '#A8BEFF',
    'list.hoverBackground': '#000000',
    'list.hoverForeground': '#A8BEFF',
    'list.inactiveFocusBackground': '#01030b',
    'list.inactiveSelectionBackground': '#000000',
    'list.inactiveSelectionForeground': '#86A5FF',
    'list.warningForeground': '#e6db7f',
    'notificationCenterHeader.background': '#15182B',
    'notifications.background': '#15182B',
    'panel.border': '#15182B',
    'panelTitle.activeBorder': '#86A5FF',
    'panelTitle.activeForeground': '#C7D5FF',
    'panelTitle.inactiveForeground': '#576daf',
    'peekViewTitle.background': '#262E47',
    'quickInput.background': '#0C0E19',
    'scrollbar.shadow': '#01030b',
    'scrollbarSlider.activeBackground': '#576daf',
    'scrollbarSlider.background': '#262E47',
    'scrollbarSlider.hoverBackground': '#576daf',
    'selection.background': '#01030b',
    'sideBar.background': '#07090F',
    'sideBar.border': '#15182B',
    'sideBarSectionHeader.background': '#07090F',
    'sideBarSectionHeader.foreground': '#86A5FF',
    'statusBar.background': '#86A5FF',
    'statusBar.debuggingBackground': '#c778db',
    'statusBar.foreground': '#07090F',
    'tab.activeBackground': '#07090F',
    'tab.activeBorder': '#86A5FF',
    'tab.activeForeground': '#C7D5FF',
    'tab.border': '#07090F',
    'tab.inactiveBackground': '#07090F',
    'tab.inactiveForeground': '#576dafd8',
    'terminal.ansiBrightRed': '#dd5073',
    'terminal.ansiGreen': '#63eb90',
    'terminal.ansiRed': '#dd5073',
    'terminal.foreground': '#A8BEFF',
    'textLink.foreground': '#86A5FF',
    'titleBar.activeBackground': '#07090F',
    'titleBar.activeForeground': '#86A5FF',
    'titleBar.inactiveBackground': '#07090F',
    'tree.indentGuidesStroke': '#576daf',
    'widget.shadow': '#01030b',
  },
  rules: [
    {
      token: 'comment',
      foreground: '546E7A',
    },
    {
      token: 'punctuation.definition.comment',
      foreground: '546E7A',
    },
    {
      token: 'variable',
      foreground: 'EEFFFF',
    },
    {
      token: 'string constant.other.placeholder',
      foreground: 'EEFFFF',
    },
    {
      token: 'constant.other.color',
      foreground: 'ffffff',
    },
    {
      token: 'invalid',
      foreground: 'FF5370',
    },
    {
      token: 'invalid.illegal',
      foreground: 'FF5370',
    },
    {
      token: 'keyword',
      foreground: 'C792EA',
    },
    {
      token: 'storage.type',
      foreground: 'C792EA',
    },
    {
      token: 'storage.modifier',
      foreground: 'C792EA',
    },
    {
      token: 'keyword.control',
      foreground: '89DDFF',
    },
    {
      token: 'constant.other.color',
      foreground: '89DDFF',
    },
    {
      token: 'punctuation',
      foreground: '89DDFF',
    },
    {
      token: 'meta.tag',
      foreground: '89DDFF',
    },
    {
      token: 'punctuation.definition.tag',
      foreground: '89DDFF',
    },
    {
      token: 'punctuation.separator.inheritance.php',
      foreground: '89DDFF',
    },
    {
      token: 'punctuation.definition.tag.html',
      foreground: '89DDFF',
    },
    {
      token: 'punctuation.definition.tag.begin.html',
      foreground: '89DDFF',
    },
    {
      token: 'punctuation.definition.tag.end.html',
      foreground: '89DDFF',
    },
    {
      token: 'punctuation.section.embedded',
      foreground: '89DDFF',
    },
    {
      token: 'keyword.other.template',
      foreground: '89DDFF',
    },
    {
      token: 'keyword.other.substitution',
      foreground: '89DDFF',
    },
    {
      token: 'entity.name.tag',
      foreground: 'f07178',
    },
    {
      token: 'meta.tag.sgml',
      foreground: 'f07178',
    },
    {
      token: 'markup.deleted.git_gutter',
      foreground: 'f07178',
    },
    {
      token: 'entity.name.function',
      foreground: '82AAFF',
    },
    {
      token: 'meta.function-call',
      foreground: '82AAFF',
    },
    {
      token: 'variable.function',
      foreground: '82AAFF',
    },
    {
      token: 'support.function',
      foreground: '82AAFF',
    },
    {
      token: 'keyword.other.special-method',
      foreground: '82AAFF',
    },
    {
      token: 'meta.block variable.other',
      foreground: 'f07178',
    },
    {
      token: 'support.other.variable',
      foreground: 'f07178',
    },
    {
      token: 'string.other.link',
      foreground: 'f07178',
    },
    {
      token: 'constant.numeric',
      foreground: 'F78C6C',
    },
    {
      token: 'constant.language',
      foreground: 'F78C6C',
    },
    {
      token: 'support.constant',
      foreground: 'F78C6C',
    },
    {
      token: 'constant.character',
      foreground: 'F78C6C',
    },
    {
      token: 'constant.escape',
      foreground: 'F78C6C',
    },
    {
      token: 'variable.parameter',
      foreground: 'F78C6C',
    },
    {
      token: 'keyword.other.unit',
      foreground: 'F78C6C',
    },
    {
      token: 'keyword.other',
      foreground: 'F78C6C',
    },
    {
      token: 'string',
      foreground: 'C3E88D',
    },
    {
      token: 'constant.other.symbol',
      foreground: 'C3E88D',
    },
    {
      token: 'constant.other.key',
      foreground: 'C3E88D',
    },
    {
      token: 'entity.other.inherited-class',
      foreground: 'C3E88D',
    },
    {
      token: 'markup.heading',
      foreground: 'C3E88D',
    },
    {
      token: 'markup.inserted.git_gutter',
      foreground: 'C3E88D',
    },
    {
      token:
        'meta.group.braces.curly constant.other.object.key.js string.unquoted.label.js',
      foreground: 'C3E88D',
    },
    {
      token: 'entity.name',
      foreground: 'FFCB6B',
    },
    {
      token: 'support.type',
      foreground: 'FFCB6B',
    },
    {
      token: 'support.class',
      foreground: 'FFCB6B',
    },
    {
      token: 'support.orther.namespace.use.php',
      foreground: 'FFCB6B',
    },
    {
      token: 'meta.use.php',
      foreground: 'FFCB6B',
    },
    {
      token: 'support.other.namespace.php',
      foreground: 'FFCB6B',
    },
    {
      token: 'markup.changed.git_gutter',
      foreground: 'FFCB6B',
    },
    {
      token: 'support.type.sys-types',
      foreground: 'FFCB6B',
    },
    {
      token: 'support.type',
      foreground: 'B2CCD6',
    },
    {
      token: 'source.css support.type.property-name',
      foreground: 'B2CCD6',
    },
    {
      token: 'source.sass support.type.property-name',
      foreground: 'B2CCD6',
    },
    {
      token: 'source.scss support.type.property-name',
      foreground: 'B2CCD6',
    },
    {
      token: 'source.less support.type.property-name',
      foreground: 'B2CCD6',
    },
    {
      token: 'source.stylus support.type.property-name',
      foreground: 'B2CCD6',
    },
    {
      token: 'source.postcss support.type.property-name',
      foreground: 'B2CCD6',
    },
    {
      token: 'entity.name.module.js',
      foreground: 'FF5370',
    },
    {
      token: 'variable.import.parameter.js',
      foreground: 'FF5370',
    },
    {
      token: 'variable.other.class.js',
      foreground: 'FF5370',
    },
    {
      token: 'variable.language',
      foreground: 'FF5370',
    },
    {
      token: 'entity.name.method.js',
      foreground: '82AAFF',
    },
    {
      token: 'meta.class-method.js entity.name.function.js',
      foreground: '82AAFF',
    },
    {
      token: 'variable.function.constructor',
      foreground: '82AAFF',
    },
    {
      token: 'entity.other.attribute-name',
      foreground: 'C792EA',
    },
    {
      token: 'text.html.basic entity.other.attribute-name.html',
      foreground: 'FFCB6B',
    },
    {
      token: 'text.html.basic entity.other.attribute-name',
      foreground: 'FFCB6B',
    },
    {
      token: 'entity.other.attribute-name.class',
      foreground: 'FFCB6B',
    },
    {
      token: 'source.sass keyword.control',
      foreground: '82AAFF',
    },
    {
      token: 'markup.inserted',
      foreground: 'C3E88D',
    },
    {
      token: 'markup.deleted',
      foreground: 'FF5370',
    },
    {
      token: 'markup.changed',
      foreground: 'C792EA',
    },
    {
      token: 'string.regexp',
      foreground: '89DDFF',
    },
    {
      token: 'constant.character.escape',
      foreground: '89DDFF',
    },
    {
      token: 'tag.decorator.js entity.name.tag.js',
      foreground: '82AAFF',
    },
    {
      token: 'tag.decorator.js punctuation.definition.tag.js',
      foreground: '82AAFF',
    },
    {
      token: 'source.js constant.other.object.key.js string.unquoted.label.js',
      foreground: 'FF5370',
    },
    {
      token:
        'source.json meta.structure.dictionary.json support.type.property-name.json',
      foreground: 'C792EA',
    },
    {
      token:
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      foreground: 'FFCB6B',
    },
    {
      token:
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      foreground: 'F78C6C',
    },
    {
      token:
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      foreground: 'FF5370',
    },
    {
      token:
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      foreground: 'C17E70',
    },
    {
      token:
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      foreground: '82AAFF',
    },
    {
      token:
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      foreground: 'f07178',
    },
    {
      token:
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      foreground: 'C792EA',
    },
    {
      token:
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      foreground: 'C3E88D',
    },
    {
      token: 'text.html.markdown',
      foreground: 'EEFFFF',
    },
    {
      token: 'punctuation.definition.list_item.markdown',
      foreground: 'EEFFFF',
    },
    {
      token: 'text.html.markdown markup.inline.raw.markdown',
      foreground: 'C792EA',
    },
    {
      token:
        'text.html.markdown markup.inline.raw.markdown punctuation.definition.raw.markdown',
      foreground: '65737E',
    },
    {
      token: 'markdown.heading',
      foreground: 'C3E88D',
    },
    {
      token: 'markup.heading | markup.heading entity.name',
      foreground: 'C3E88D',
    },
    {
      token: 'markup.heading.markdown punctuation.definition.heading.markdown',
      foreground: 'C3E88D',
    },
    {
      token: 'markup.italic',
      foreground: 'f07178',
    },
    {
      token: 'markup.bold',
      foreground: 'f07178',
    },
    {
      token: 'markup.bold string',
      foreground: 'f07178',
    },
    {
      token: 'markup.bold markup.italic',
      foreground: 'f07178',
    },
    {
      token: 'markup.italic markup.bold',
      foreground: 'f07178',
    },
    {
      token: 'markup.quote markup.bold',
      foreground: 'f07178',
    },
    {
      token: 'markup.bold markup.italic string',
      foreground: 'f07178',
    },
    {
      token: 'markup.italic markup.bold string',
      foreground: 'f07178',
    },
    {
      token: 'markup.quote markup.bold string',
      foreground: 'f07178',
    },
    {
      token: 'markup.underline',
      foreground: 'F78C6C',
    },
    {
      token: 'markup.quote punctuation.definition.blockquote.markdown',
      foreground: '65737E',
    },
    {
      token: 'string.other.link.title.markdown',
      foreground: '82AAFF',
    },
    {
      token: 'string.other.link.description.title.markdown',
      foreground: 'C792EA',
    },
    {
      token: 'constant.other.reference.link.markdown',
      foreground: 'FFCB6B',
    },
    {
      token: 'markup.raw.block',
      foreground: 'C792EA',
    },
    {
      token: 'markup.raw.block.fenced.markdown',
      foreground: '00000050',
    },
    {
      token: 'punctuation.definition.fenced.markdown',
      foreground: '00000050',
    },
    {
      token: 'markup.raw.block.fenced.markdown',
      foreground: 'EEFFFF',
    },
    {
      token: 'variable.language.fenced.markdown',
      foreground: 'EEFFFF',
    },
    {
      token: 'punctuation.section.class.end',
      foreground: 'EEFFFF',
    },
    {
      token: 'variable.language.fenced.markdown',
      foreground: '65737E',
    },
    {
      token: 'meta.separator',
      foreground: '65737E',
    },
    {
      token: 'markup.table',
      foreground: 'EEFFFF',
    },
  ],
} as const satisfies monaco.editor.IStandaloneThemeData;
