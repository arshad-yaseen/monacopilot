import * as monaco from 'monaco-editor';

export default {
  base: 'vs-dark',
  inherit: false,
  colors: {
    'activityBar.background': '#171520',
    'activityBar.dropBackground': '#34294f66',
    'activityBar.foreground': '#ffffffCC',
    'activityBarBadge.background': '#f97e72',
    'activityBarBadge.foreground': '#2a2139',
    'badge.background': '#2a2139',
    'badge.foreground': '#ffffff',
    'breadcrumbPicker.background': '#232530',
    'button.background': '#614D85',
    'debugToolBar.background': '#463465',
    'diffEditor.insertedTextBackground': '#0beb9935',
    'diffEditor.removedTextBackground': '#fe445035',
    'dropdown.background': '#232530',
    'dropdown.listBackground': '#2a2139',
    'editor.background': '#262335',
    'editor.findMatchBackground': '#D18616bb',
    'editor.findMatchHighlightBackground': '#D1861655',
    'editor.findRangeHighlightBackground': '#34294f1a',
    'editor.hoverHighlightBackground': '#463564',
    'editor.lineHighlightBorder': '#7059AB66',
    'editor.rangeHighlightBackground': '#49549539',
    'editor.selectionBackground': '#ffffff20',
    'editor.selectionHighlightBackground': '#ffffff20',
    'editor.wordHighlightBackground': '#34294f88',
    'editor.wordHighlightStrongBackground': '#34294f88',
    'editorBracketMatch.background': '#34294f66',
    'editorBracketMatch.border': '#495495',
    'editorCodeLens.foreground': '#ffffff7c',
    'editorCursor.background': '#241b2f',
    'editorCursor.foreground': '#f97e72',
    'editorError.foreground': '#fe4450',
    'editorGroup.border': '#495495',
    'editorGroup.dropBackground': '#4954954a',
    'editorGroupHeader.tabsBackground': '#241b2f',
    'editorGutter.addedBackground': '#206d4bd6',
    'editorGutter.deletedBackground': '#fa2e46a4',
    'editorGutter.modifiedBackground': '#b893ce8f',
    'editorIndentGuide.activeBackground': '#A148AB80',
    'editorIndentGuide.background': '#444251',
    'editorLineNumber.activeForeground': '#ffffffcc',
    'editorLineNumber.foreground': '#ffffff73',
    'editorOverviewRuler.addedForeground': '#09f7a099',
    'editorOverviewRuler.border': '#34294fb3',
    'editorOverviewRuler.deletedForeground': '#fe445099',
    'editorOverviewRuler.errorForeground': '#fe4450dd',
    'editorOverviewRuler.findMatchForeground': '#D1861699',
    'editorOverviewRuler.modifiedForeground': '#b893ce99',
    'editorOverviewRuler.warningForeground': '#72f1b8cc',
    'editorRuler.foreground': '#A148AB80',
    'editorSuggestWidget.highlightForeground': '#f97e72',
    'editorSuggestWidget.selectedBackground': '#ffffff36',
    'editorWarning.foreground': '#72f1b8cc',
    'editorWidget.background': '#171520DC',
    'editorWidget.border': '#ffffff22',
    'editorWidget.resizeBorder': '#ffffff44',
    errorForeground: '#fe4450',
    'extensionButton.prominentBackground': '#f97e72',
    'extensionButton.prominentHoverBackground': '#ff7edb',
    focusBorder: '#1f212b',
    foreground: '#ffffff',
    'gitDecoration.addedResourceForeground': '#72f1b8cc',
    'gitDecoration.deletedResourceForeground': '#fe4450',
    'gitDecoration.ignoredResourceForeground': '#ffffff59',
    'gitDecoration.modifiedResourceForeground': '#b893ceee',
    'gitDecoration.untrackedResourceForeground': '#72f1b8',
    'input.background': '#2a2139',
    'inputOption.activeBorder': '#ff7edb99',
    'inputValidation.errorBackground': '#fe445080',
    'inputValidation.errorBorder': '#fe445000',
    'list.activeSelectionBackground': '#ffffff20',
    'list.activeSelectionForeground': '#ffffff',
    'list.dropBackground': '#34294f66',
    'list.errorForeground': '#fe4450E6',
    'list.focusBackground': '#ffffff20',
    'list.focusForeground': '#ffffff',
    'list.highlightForeground': '#f97e72',
    'list.hoverBackground': '#37294d99',
    'list.hoverForeground': '#ffffff',
    'list.inactiveFocusBackground': '#2a213999',
    'list.inactiveSelectionBackground': '#ffffff20',
    'list.inactiveSelectionForeground': '#ffffff',
    'list.warningForeground': '#72f1b8bb',
    'menu.background': '#463465',
    'minimapGutter.addedBackground': '#09f7a099',
    'minimapGutter.deletedBackground': '#fe4450',
    'minimapGutter.modifiedBackground': '#b893ce',
    'panelTitle.activeBorder': '#f97e72',
    'peekView.border': '#495495',
    'peekViewEditor.background': '#232530',
    'peekViewEditor.matchHighlightBackground': '#D18616bb',
    'peekViewResult.background': '#232530',
    'peekViewResult.matchHighlightBackground': '#D1861655',
    'peekViewResult.selectionBackground': '#2a213980',
    'peekViewTitle.background': '#232530',
    'pickerGroup.foreground': '#f97e72ea',
    'progressBar.background': '#f97e72',
    'scrollbar.shadow': '#2a2139',
    'scrollbarSlider.activeBackground': '#9d8bca20',
    'scrollbarSlider.background': '#9d8bca30',
    'scrollbarSlider.hoverBackground': '#9d8bca50',
    'selection.background': '#ffffff20',
    'sideBar.background': '#241b2f',
    'sideBar.dropBackground': '#34294f4c',
    'sideBar.foreground': '#ffffff99',
    'sideBarSectionHeader.background': '#241b2f',
    'sideBarSectionHeader.foreground': '#ffffffca',
    'statusBar.background': '#241b2f',
    'statusBar.debuggingBackground': '#f97e72',
    'statusBar.debuggingForeground': '#08080f',
    'statusBar.foreground': '#ffffff80',
    'statusBar.noFolderBackground': '#241b2f',
    'statusBarItem.prominentBackground': '#2a2139',
    'statusBarItem.prominentHoverBackground': '#34294f',
    'tab.activeBorder': '#880088',
    'tab.border': '#241b2f00',
    'tab.inactiveBackground': '#262335',
    'terminal.ansiBlue': '#03edf9',
    'terminal.ansiBrightBlue': '#03edf9',
    'terminal.ansiBrightCyan': '#03edf9',
    'terminal.ansiBrightGreen': '#72f1b8',
    'terminal.ansiBrightMagenta': '#ff7edb',
    'terminal.ansiBrightRed': '#fe4450',
    'terminal.ansiBrightYellow': '#fede5d',
    'terminal.ansiCyan': '#03edf9',
    'terminal.ansiGreen': '#72f1b8',
    'terminal.ansiMagenta': '#ff7edb',
    'terminal.ansiRed': '#fe4450',
    'terminal.ansiYellow': '#f3e70f',
    'terminal.foreground': '#ffffff',
    'terminal.selectionBackground': '#ffffff20',
    'terminalCursor.background': '#ffffff',
    'terminalCursor.foreground': '#03edf9',
    'textLink.activeForeground': '#ff7edb',
    'textLink.foreground': '#f97e72',
    'titleBar.activeBackground': '#241b2f',
    'titleBar.inactiveBackground': '#241b2f',
    'walkThrough.embeddedEditorBackground': '#232530',
    'widget.shadow': '#2a2139',
  },
  rules: [
    {
      token: 'comment',
      foreground: '848bbd',
    },
    {
      token: 'string.quoted.docstring.multi.python',
      foreground: '848bbd',
    },
    {
      token:
        'string.quoted.docstring.multi.python punctuation.definition.string.begin.python',
      foreground: '848bbd',
    },
    {
      token:
        'string.quoted.docstring.multi.python punctuation.definition.string.end.python',
      foreground: '848bbd',
    },
    {
      token: 'string.quoted',
      foreground: 'ff8b39',
    },
    {
      token: 'string.template',
      foreground: 'ff8b39',
    },
    {
      token: 'punctuation.definition.string',
      foreground: 'ff8b39',
    },
    {
      token: 'string.template meta.embedded.line',
      foreground: 'b6b1b1',
    },
    {
      token: 'variable',
      foreground: 'ff7edb',
    },
    {
      token: 'entity.name.variable',
      foreground: 'ff7edb',
    },
    {
      token: 'variable.language',
      foreground: 'fe4450',
    },
    {
      token: 'storage.type',
      foreground: 'fede5d',
    },
    {
      token: 'storage.modifier',
      foreground: 'fede5d',
    },
    {
      token: 'constant',
      foreground: 'f97e72',
    },
    {
      token: 'string.regexp',
      foreground: 'f97e72',
    },
    {
      token: 'constant.numeric',
      foreground: 'f97e72',
    },
    {
      token: 'constant.language',
      foreground: 'f97e72',
    },
    {
      token: 'constant.character.escape',
      foreground: '36f9f6',
    },
    {
      token: 'entity.name',
      foreground: 'fe4450',
    },
    {
      token: 'entity.name.tag',
      foreground: '72f1b8',
    },
    {
      token: 'punctuation.definition.tag',
      foreground: '36f9f6',
    },
    {
      token: 'entity.other.attribute-name',
      foreground: 'fede5d',
    },
    {
      token: 'entity.other.attribute-name.html',
      foreground: 'fede5d',
    },
    {
      token: 'entity.name.type',
      foreground: 'fe4450',
    },
    {
      token: 'meta.attribute.class.html',
      foreground: 'fe4450',
    },
    {
      token: 'entity.other.inherited-class',
      foreground: 'DD5500',
    },
    {
      token: 'entity.name.function',
      foreground: '36f9f6',
    },
    {
      token: 'variable.function',
      foreground: '36f9f6',
    },
    {
      token: 'keyword.control.export.js',
      foreground: '72f1b8',
    },
    {
      token: 'keyword.control.import.js',
      foreground: '72f1b8',
    },
    {
      token: 'constant.numeric.decimal.js',
      foreground: '2EE2FA',
    },
    {
      token: 'keyword',
      foreground: 'fede5d',
    },
    {
      token: 'keyword.control',
      foreground: 'fede5d',
    },
    {
      token: 'keyword.operator',
      foreground: 'fede5d',
    },
    {
      token: 'keyword.operator.new',
      foreground: 'fede5d',
    },
    {
      token: 'keyword.operator.expression',
      foreground: 'fede5d',
    },
    {
      token: 'keyword.operator.logical',
      foreground: 'fede5d',
    },
    {
      token: 'keyword.other.unit',
      foreground: 'f97e72',
    },
    {
      token: 'support',
      foreground: 'fe4450',
    },
    {
      token: 'support.function',
      foreground: '36f9f6',
    },
    {
      token: 'support.variable',
      foreground: 'ff7edb',
    },
    {
      token: 'meta.object-literal.key',
      foreground: 'ff7edb',
    },
    {
      token: 'support.type.property-name',
      foreground: 'ff7edb',
    },
    {
      token: 'punctuation.separator.key-value',
      foreground: 'b6b1b1',
    },
    {
      token: 'punctuation.section.embedded',
      foreground: 'fede5d',
    },
    {
      token: 'punctuation.definition.template-expression.begin',
      foreground: '72f1b8',
    },
    {
      token: 'punctuation.definition.template-expression.end',
      foreground: '72f1b8',
    },
    {
      token: 'support.type.property-name.css',
      foreground: '72f1b8',
    },
    {
      token: 'support.type.property-name.json',
      foreground: '72f1b8',
    },
    {
      token: 'switch-block.expr.js',
      foreground: '72f1b8',
    },
    {
      token: 'variable.other.constant.property.js, variable.other.property.js',
      foreground: '2ee2fa',
    },
    {
      token: 'constant.other.color',
      foreground: 'f97e72',
    },
    {
      token: 'support.constant.font-name',
      foreground: 'f97e72',
    },
    {
      token: 'entity.other.attribute-name.id',
      foreground: '36f9f6',
    },
    {
      token: 'entity.other.attribute-name.pseudo-element',
      foreground: 'DD5500',
    },
    {
      token: 'entity.other.attribute-name.pseudo-class',
      foreground: 'DD5500',
    },
    {
      token: 'support.function.misc.css',
      foreground: 'fe4450',
    },
    {
      token: 'markup.heading',
      foreground: 'ff7edb',
    },
    {
      token: 'entity.name.section',
      foreground: 'ff7edb',
    },
    {
      token: 'text.html',
      foreground: 'ffffffee',
    },
    {
      token: 'keyword.operator.assignment',
      foreground: 'ffffffee',
    },
    {
      token: 'markup.quote',
      foreground: 'b6b1b1cc',
    },
    {
      token: 'beginning.punctuation.definition.list',
      foreground: 'ff7edb',
    },
    {
      token: 'markup.underline.link',
      foreground: 'DD5500',
    },
    {
      token: 'string.other.link.description',
      foreground: 'f97e72',
    },
    {
      token: 'meta.function-call.generic.python',
      foreground: '36f9f6',
    },
    {
      token: 'variable.parameter.function-call.python',
      foreground: '72f1b8',
    },
    {
      token: 'storage.type.cs',
      foreground: 'fe4450',
    },
    {
      token: 'entity.name.variable.local.cs',
      foreground: 'ff7edb',
    },
    {
      token: 'entity.name.variable.field.cs',
      foreground: 'ff7edb',
    },
    {
      token: 'entity.name.variable.property.cs',
      foreground: 'ff7edb',
    },
    {
      token: 'constant.other.placeholder.c',
      foreground: '72f1b8',
    },
    {
      token: 'keyword.control.directive.include.c',
      foreground: '72f1b8',
    },
    {
      token: 'keyword.control.directive.define.c',
      foreground: '72f1b8',
    },
    {
      token: 'storage.modifier.c',
      foreground: 'fe4450',
    },
    {
      token: 'source.cpp keyword.operator',
      foreground: 'fede5d',
    },
    {
      token: 'constant.other.placeholder.cpp',
      foreground: '72f1b8',
    },
    {
      token: 'keyword.control.directive.include.cpp',
      foreground: '72f1b8',
    },
    {
      token: 'keyword.control.directive.define.cpp',
      foreground: '72f1b8',
    },
    {
      token: 'storage.modifier.specifier.const.cpp',
      foreground: 'fe4450',
    },
    {
      token: 'source.elixir support.type.elixir',
      foreground: '36f9f6',
    },
    {
      token: 'source.elixir meta.module.elixir entity.name.class.elixir',
      foreground: '36f9f6',
    },
    {
      token: 'source.elixir entity.name.function',
      foreground: '72f1b8',
    },
    {
      token: 'source.elixir constant.other.symbol.elixir',
      foreground: '36f9f6',
    },
    {
      token: 'source.elixir constant.other.keywords.elixir',
      foreground: '36f9f6',
    },
    {
      token: 'source.elixir punctuation.definition.string',
      foreground: '72f1b8',
    },
    {
      token: 'source.elixir variable.other.readwrite.module.elixir',
      foreground: '72f1b8',
    },
    {
      token:
        'source.elixir variable.other.readwrite.module.elixir punctuation.definition.variable.elixir',
      foreground: '72f1b8',
    },
    {
      token: 'source.elixir .punctuation.binary.elixir',
      foreground: 'ff7edb',
    },
    {
      token: 'entity.global.clojure',
      foreground: '36f9f6',
    },
    {
      token: 'storage.control.clojure',
      foreground: '36f9f6',
    },
    {
      token: 'meta.metadata.simple.clojure',
      foreground: 'fe4450',
    },
    {
      token: 'meta.metadata.map.clojure',
      foreground: 'fe4450',
    },
    {
      token: 'meta.symbol.clojure',
      foreground: 'ff7edbff',
    },
    {
      token: 'source.go',
      foreground: 'ff7edbff',
    },
    {
      token: 'source.go meta.function-call.go',
      foreground: '36f9f6',
    },
    {
      token: 'source.go keyword.package.go',
      foreground: 'fede5d',
    },
    {
      token: 'source.go keyword.import.go',
      foreground: 'fede5d',
    },
    {
      token: 'source.go keyword.function.go',
      foreground: 'fede5d',
    },
    {
      token: 'source.go keyword.type.go',
      foreground: 'fede5d',
    },
    {
      token: 'source.go keyword.const.go',
      foreground: 'fede5d',
    },
    {
      token: 'source.go keyword.var.go',
      foreground: 'fede5d',
    },
    {
      token: 'source.go keyword.map.go',
      foreground: 'fede5d',
    },
    {
      token: 'source.go keyword.channel.go',
      foreground: 'fede5d',
    },
    {
      token: 'source.go keyword.control.go',
      foreground: 'fede5d',
    },
    {
      token: 'source.go storage.type',
      foreground: '72f1b8',
    },
    {
      token: 'source.go keyword.struct.go',
      foreground: '72f1b8',
    },
    {
      token: 'source.go keyword.interface.go',
      foreground: '72f1b8',
    },
    {
      token: 'source.go constant.language.go',
      foreground: '2EE2FA',
    },
    {
      token: 'source.go constant.other.placeholder.go',
      foreground: '2EE2FA',
    },
    {
      token: 'source.go variable',
      foreground: '2EE2FA',
    },
    {
      token: 'markup.underline.link.markdown',
      foreground: '72f1b8',
    },
    {
      token: 'markup.inline.raw.string.markdown',
      foreground: '72f1b8',
    },
    {
      token: 'string.other.link.title.markdown',
      foreground: 'fede5d',
    },
    {
      token: 'markup.heading.markdown',
      foreground: 'ff7edb',
    },
    {
      token: 'entity.name.section.markdown',
      foreground: 'ff7edb',
    },
    {
      token: 'markup.italic.markdown',
      foreground: '2EE2FA',
    },
    {
      token: 'markup.bold.markdown',
      foreground: '2EE2FA',
    },
    {
      token: 'punctuation.definition.quote.begin.markdown',
      foreground: '72f1b8',
    },
    {
      token: 'markup.quote.markdown',
      foreground: '72f1b8',
    },
    {
      token: 'source.dart',
      foreground: 'ff7edbff',
    },
    {
      token: 'source.python',
      foreground: 'ff7edbff',
    },
    {
      token: 'source.scala',
      foreground: 'ff7edbff',
    },
    {
      token: 'string.interpolated.single.dart',
      foreground: 'f97e72',
    },
    {
      token: 'variable.parameter.dart',
      foreground: '72f1b8',
    },
    {
      token: 'constant.numeric.dart',
      foreground: '2EE2FA',
    },
    {
      token: 'variable.parameter.scala',
      foreground: '2EE2FA',
    },
    {
      token: 'meta.template.expression.scala',
      foreground: '72f1b8',
    },
  ],
} as const satisfies monaco.editor.IStandaloneThemeData;
