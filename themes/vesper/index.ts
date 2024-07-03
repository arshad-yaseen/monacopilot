import * as monaco from 'monaco-editor';

export default {
  base: 'vs-dark',
  inherit: false,
  colors: {
    'activityBar.background': '#101010',
    'activityBar.foreground': '#A0A0A0',
    'activityBarBadge.background': '#FFC799',
    'activityBarBadge.foreground': '#000000',
    'badge.background': '#FFC799',
    'badge.foreground': '#000000',
    'button.background': '#FFC799',
    'button.foreground': '#000000',
    'button.hoverBackground': '#FFCFA8',
    'diffEditor.insertedLineBackground': '#99FFE415',
    'diffEditor.insertedTextBackground': '#99FFE415',
    'diffEditor.removedLineBackground': '#FF808015',
    'diffEditor.removedTextBackground': '#FF808015',
    'editor.background': '#101010',
    'editor.foreground': '#FFFFFF',
    'editor.selectionBackground': '#FFFFFF25',
    'editor.selectionHighlightBackground': '#FFFFFF25',
    'editorBracketHighlight.foreground1': '#A0A0A0',
    'editorBracketHighlight.foreground2': '#A0A0A0',
    'editorBracketHighlight.foreground3': '#A0A0A0',
    'editorBracketHighlight.foreground4': '#A0A0A0',
    'editorBracketHighlight.foreground5': '#A0A0A0',
    'editorBracketHighlight.foreground6': '#A0A0A0',
    'editorBracketHighlight.unexpectedBracket.foreground': '#FF8080',
    'editorError.foreground': '#FF8080',
    'editorGroupHeader.tabsBackground': '#101010',
    'editorGutter.addedBackground': '#99FFE4',
    'editorGutter.deletedBackground': '#FF8080',
    'editorGutter.modifiedBackground': '#FFC799',
    'editorHoverWidget.background': '#161616',
    'editorHoverWidget.border': '#282828',
    'editorInlayHint.background': '#1C1C1C',
    'editorInlayHint.foreground': '#A0A0A0',
    'editorLineNumber.foreground': '#505050',
    'editorOverviewRuler.border': '#101010',
    'editorWarning.foreground': '#FFC799',
    'editorWidget.background': '#101010',
    focusBorder: '#FFC799',
    'icon.foreground': '#A0A0A0',
    'input.background': '#1C1C1C',
    'list.activeSelectionBackground': '#232323',
    'list.activeSelectionForeground': '#FFC799',
    'list.errorForeground': '#FF8080',
    'list.highlightForeground': '#FFC799',
    'list.hoverBackground': '#282828',
    'list.inactiveSelectionBackground': '#232323',
    'scrollbarSlider.background': '#34343480',
    'scrollbarSlider.hoverBackground': '#343434',
    'selection.background': '#666666',
    'settings.modifiedItemIndicator': '#FFC799',
    'sideBar.background': '#101010',
    'sideBarSectionHeader.background': '#101010',
    'sideBarSectionHeader.foreground': '#A0A0A0',
    'sideBarTitle.foreground': '#A0A0A0',
    'statusBar.background': '#101010',
    'statusBar.debuggingBackground': '#FF7300',
    'statusBar.debuggingForeground': '#FFFFFF',
    'statusBar.foreground': '#A0A0A0',
    'statusBarItem.remoteBackground': '#FFC799',
    'statusBarItem.remoteForeground': '#000000',
    'tab.activeBackground': '#161616',
    'tab.border': '#101010',
    'tab.inactiveBackground': '#101010',
    'textLink.activeForeground': '#FFCFA8',
    'textLink.foreground': '#FFC799',
    'titleBar.activeBackground': '#101010',
    'titleBar.activeForeground': '#7E7E7E',
    'titleBar.inactiveBackground': '#101010',
    'titleBar.inactiveForeground': '#707070',
  },
  rules: [
    {
      token: 'comment',
      foreground: '8b8b8b94',
    },
    {
      token: 'punctuation.definition.comment',
      foreground: '8b8b8b94',
    },
    {
      token: 'variable',
      foreground: 'FFFFFF',
    },
    {
      token: 'string constant.other.placeholder',
      foreground: 'FFFFFF',
    },
    {
      token: 'entity.name.tag',
      foreground: 'FFFFFF',
    },
    {
      token: 'constant.other.color',
      foreground: 'FFFFFF',
    },
    {
      token: 'invalid',
      foreground: 'FF8080',
    },
    {
      token: 'invalid.illegal',
      foreground: 'FF8080',
    },
    {
      token: 'keyword',
      foreground: 'A0A0A0',
    },
    {
      token: 'storage.type',
      foreground: 'A0A0A0',
    },
    {
      token: 'storage.modifier',
      foreground: 'A0A0A0',
    },
    {
      token: 'keyword.control',
      foreground: 'A0A0A0',
    },
    {
      token: 'constant.other.color',
      foreground: 'A0A0A0',
    },
    {
      token: 'punctuation.definition.tag',
      foreground: 'A0A0A0',
    },
    {
      token: 'punctuation.separator.inheritance.php',
      foreground: 'A0A0A0',
    },
    {
      token: 'punctuation.definition.tag.html',
      foreground: 'A0A0A0',
    },
    {
      token: 'punctuation.definition.tag.begin.html',
      foreground: 'A0A0A0',
    },
    {
      token: 'punctuation.definition.tag.end.html',
      foreground: 'A0A0A0',
    },
    {
      token: 'punctuation.section.embedded',
      foreground: 'A0A0A0',
    },
    {
      token: 'keyword.other.template',
      foreground: 'A0A0A0',
    },
    {
      token: 'keyword.other.substitution',
      foreground: 'A0A0A0',
    },
    {
      token: 'entity.name.tag',
      foreground: 'FFC799',
    },
    {
      token: 'meta.tag.sgml',
      foreground: 'FFC799',
    },
    {
      token: 'markup.deleted.git_gutter',
      foreground: 'FFC799',
    },
    {
      token: 'entity.name.function',
      foreground: 'FFC799',
    },
    {
      token: 'variable.function',
      foreground: 'FFC799',
    },
    {
      token: 'support.function',
      foreground: 'FFC799',
    },
    {
      token: 'keyword.other.special-method',
      foreground: 'FFC799',
    },
    {
      token: 'meta.block variable.other',
      foreground: 'FFFFFF',
    },
    {
      token: 'support.other.variable',
      foreground: 'FFFFFF',
    },
    {
      token: 'string.other.link',
      foreground: 'FFFFFF',
    },
    {
      token: 'constant.numeric',
      foreground: 'FFC799',
    },
    {
      token: 'support.constant',
      foreground: 'FFC799',
    },
    {
      token: 'constant.character',
      foreground: 'FFC799',
    },
    {
      token: 'constant.escape',
      foreground: 'FFC799',
    },
    {
      token: 'keyword.other.unit',
      foreground: 'FFC799',
    },
    {
      token: 'keyword.other',
      foreground: 'FFC799',
    },
    {
      token: 'constant.language.boolean',
      foreground: 'FFC799',
    },
    {
      token: 'string',
      foreground: '99FFE4',
    },
    {
      token: 'constant.other.symbol',
      foreground: '99FFE4',
    },
    {
      token: 'constant.other.key',
      foreground: '99FFE4',
    },
    {
      token:
        'meta.group.braces.curly constant.other.object.key.js string.unquoted.label.js',
      foreground: '99FFE4',
    },
    {
      token: 'entity.name',
      foreground: 'FFC799',
    },
    {
      token: 'support.type',
      foreground: 'FFC799',
    },
    {
      token: 'support.class',
      foreground: 'FFC799',
    },
    {
      token: 'support.other.namespace.use.php',
      foreground: 'FFC799',
    },
    {
      token: 'meta.use.php',
      foreground: 'FFC799',
    },
    {
      token: 'support.other.namespace.php',
      foreground: 'FFC799',
    },
    {
      token: 'markup.changed.git_gutter',
      foreground: 'FFC799',
    },
    {
      token: 'support.type.sys-types',
      foreground: 'FFC799',
    },
    {
      token: 'source.css support.type.property-name',
      foreground: 'FFFFFF',
    },
    {
      token: 'source.sass support.type.property-name',
      foreground: 'FFFFFF',
    },
    {
      token: 'source.scss support.type.property-name',
      foreground: 'FFFFFF',
    },
    {
      token: 'source.less support.type.property-name',
      foreground: 'FFFFFF',
    },
    {
      token: 'source.stylus support.type.property-name',
      foreground: 'FFFFFF',
    },
    {
      token: 'source.postcss support.type.property-name',
      foreground: 'FFFFFF',
    },
    {
      token: 'source.postcss support.type.property-name',
      foreground: 'FFFFFF',
    },
    {
      token: 'support.type.vendored.property-name.css',
      foreground: 'FFFFFF',
    },
    {
      token: 'source.css.scss entity.name.tag',
      foreground: 'FFFFFF',
    },
    {
      token: 'variable.parameter.keyframe-list.css',
      foreground: 'FFFFFF',
    },
    {
      token: 'meta.property-name.css',
      foreground: 'FFFFFF',
    },
    {
      token: 'variable.parameter.url.scss',
      foreground: 'FFFFFF',
    },
    {
      token: 'meta.property-value.scss',
      foreground: 'FFFFFF',
    },
    {
      token: 'meta.property-value.css',
      foreground: 'FFFFFF',
    },
    {
      token: 'entity.name.module.js',
      foreground: 'FF8080',
    },
    {
      token: 'variable.import.parameter.js',
      foreground: 'FF8080',
    },
    {
      token: 'variable.other.class.js',
      foreground: 'FF8080',
    },
    {
      token: 'variable.language',
      foreground: 'A0A0A0',
    },
    {
      token: 'entity.name.method.js',
      foreground: 'FFFFFFFF',
    },
    {
      token: 'meta.class-method.js entity.name.function.js',
      foreground: 'FFFFFFFF',
    },
    {
      token: 'variable.function.constructor',
      foreground: 'FFFFFFFF',
    },
    {
      token: 'entity.other.attribute-name',
      foreground: 'A0A0A0',
    },
    {
      token: 'meta.property-list.scss',
      foreground: 'A0A0A0',
    },
    {
      token: 'meta.attribute-selector.scss',
      foreground: 'A0A0A0',
    },
    {
      token: 'meta.property-value.css',
      foreground: 'A0A0A0',
    },
    {
      token: 'entity.other.keyframe-offset.css',
      foreground: 'A0A0A0',
    },
    {
      token: 'meta.selector.css',
      foreground: 'A0A0A0',
    },
    {
      token: 'entity.name.tag.reference.scss',
      foreground: 'A0A0A0',
    },
    {
      token: 'entity.name.tag.nesting.css',
      foreground: 'A0A0A0',
    },
    {
      token: 'punctuation.separator.key-value.css',
      foreground: 'A0A0A0',
    },
    {
      token: 'text.html.basic entity.other.attribute-name.html',
      foreground: 'FFC799',
    },
    {
      token: 'text.html.basic entity.other.attribute-name',
      foreground: 'FFC799',
    },
    {
      token: 'entity.other.attribute-name.class',
      foreground: 'FFC799',
    },
    {
      token: 'entity.other.attribute-name.id',
      foreground: 'FFC799',
    },
    {
      token: 'meta.attribute-selector.scss',
      foreground: 'FFC799',
    },
    {
      token: 'variable.parameter.misc.css',
      foreground: 'FFC799',
    },
    {
      token: 'source.sass keyword.control',
      foreground: '99FFE4',
    },
    {
      token: 'meta.attribute-selector.scss',
      foreground: '99FFE4',
    },
    {
      token: 'markup.inserted',
      foreground: '99FFE4',
    },
    {
      token: 'markup.deleted',
      foreground: 'FF8080',
    },
    {
      token: 'markup.changed',
      foreground: 'A0A0A0',
    },
    {
      token: 'string.regexp',
      foreground: 'A0A0A0',
    },
    {
      token: 'constant.character.escape',
      foreground: 'A0A0A0',
    },
    {
      token: 'tag.decorator.js entity.name.tag.js',
      foreground: 'FFFFFFFF',
    },
    {
      token: 'tag.decorator.js punctuation.definition.tag.js',
      foreground: 'FFFFFFFF',
    },
    {
      token: 'source.js constant.other.object.key.js string.unquoted.label.js',
      foreground: 'FF8080',
    },
    {
      token:
        'source.json meta.structure.dictionary.json support.type.property-name.json',
      foreground: 'FFC799',
    },
    {
      token:
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      foreground: 'FFC799',
    },
    {
      token:
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      foreground: 'FFC799',
    },
    {
      token:
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      foreground: 'FFC799',
    },
    {
      token:
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      foreground: 'FFC799',
    },
    {
      token:
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      foreground: 'FFC799',
    },
    {
      token:
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      foreground: 'FFC799',
    },
    {
      token:
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      foreground: 'FFC799',
    },
    {
      token:
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      foreground: 'FFC799',
    },
    {
      token: 'text.html.markdown',
      foreground: 'FFFFFF',
    },
    {
      token: 'punctuation.definition.list_item.markdown',
      foreground: 'FFFFFF',
    },
    {
      token: 'text.html.markdown markup.inline.raw.markdown',
      foreground: 'A0A0A0',
    },
    {
      token:
        'text.html.markdown markup.inline.raw.markdown punctuation.definition.raw.markdown',
      foreground: 'FFFFFF',
    },
    {
      token: 'markdown.heading',
      foreground: 'FFC799',
    },
    {
      token: 'markup.heading | markup.heading entity.name',
      foreground: 'FFC799',
    },
    {
      token: 'markup.heading.markdown punctuation.definition.heading.markdown',
      foreground: 'FFC799',
    },
    {
      token: 'markup.heading',
      foreground: 'FFC799',
    },
    {
      token: 'markup.inserted.git_gutter',
      foreground: 'FFC799',
    },
    {
      token: 'markup.italic',
      foreground: 'FFFFFF',
    },
    {
      token: 'markup.bold',
      foreground: 'FFFFFF',
    },
    {
      token: 'markup.bold string',
      foreground: 'FFFFFF',
    },
    {
      token: 'markup.bold markup.italic',
      foreground: 'FFFFFF',
    },
    {
      token: 'markup.italic markup.bold',
      foreground: 'FFFFFF',
    },
    {
      token: 'markup.quote markup.bold',
      foreground: 'FFFFFF',
    },
    {
      token: 'markup.bold markup.italic string',
      foreground: 'FFFFFF',
    },
    {
      token: 'markup.italic markup.bold string',
      foreground: 'FFFFFF',
    },
    {
      token: 'markup.quote markup.bold string',
      foreground: 'FFFFFF',
    },
    {
      token: 'markup.underline',
      foreground: 'FFC799',
    },
    {
      token: 'markup.quote punctuation.definition.blockquote.markdown',
      foreground: 'FFFFFF',
    },
    {
      token: 'string.other.link.title.markdown',
      foreground: 'FFFFFFFF',
    },
    {
      token: 'string.other.link.description.title.markdown',
      foreground: 'A0A0A0',
    },
    {
      token: 'constant.other.reference.link.markdown',
      foreground: 'FFC799',
    },
    {
      token: 'markup.raw.block',
      foreground: 'A0A0A0',
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
      foreground: 'FFFFFF',
    },
    {
      token: 'variable.language.fenced.markdown',
      foreground: 'FFFFFF',
    },
    {
      token: 'punctuation.section.class.end',
      foreground: 'FFFFFF',
    },
    {
      token: 'variable.language.fenced.markdown',
      foreground: 'FFFFFF',
    },
    {
      token: 'meta.separator',
      foreground: '65737E',
    },
    {
      token: 'markup.table',
      foreground: 'FFFFFF',
    },
  ],
} as const satisfies monaco.editor.IStandaloneThemeData;
