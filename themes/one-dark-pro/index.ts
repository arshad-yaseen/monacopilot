import * as monaco from 'monaco-editor';

export default {
  base: 'vs-dark',
  inherit: false,
  colors: {
    'activityBar.background': '#282c34',
    'activityBar.foreground': '#d7dae0',
    'activityBarBadge.background': '#4d78cc',
    'activityBarBadge.foreground': '#f8fafd',
    'badge.background': '#282c34',
    'button.background': '#404754',
    'button.secondaryBackground': '#30333d',
    'button.secondaryForeground': '#c0bdbd',
    'checkbox.border': '#404754',
    'debugToolBar.background': '#21252b',
    descriptionForeground: '#abb2bf',
    'diffEditor.insertedTextBackground': '#00809b33',
    'dropdown.background': '#21252b',
    'dropdown.border': '#21252b',
    'editor.background': '#282c34',
    'editor.findMatchBackground': '#d19a6644',
    'editor.findMatchBorder': '#ffffff5a',
    'editor.findMatchHighlightBackground': '#ffffff22',
    'editor.foreground': '#abb2bf',
    'editor.lineHighlightBackground': '#2c313c',
    'editor.selectionBackground': '#67769660',
    'editor.selectionHighlightBackground': '#ffffff10',
    'editor.selectionHighlightBorder': '#dddddd',
    'editor.wordHighlightBackground': '#d2e0ff2f',
    'editor.wordHighlightBorder': '#7f848e',
    'editor.wordHighlightStrongBackground': '#abb2bf26',
    'editor.wordHighlightStrongBorder': '#7f848e',
    'editorBracketHighlight.foreground1': '#d19a66',
    'editorBracketHighlight.foreground2': '#c678dd',
    'editorBracketHighlight.foreground3': '#56b6c2',
    'editorBracketMatch.background': '#515a6b',
    'editorBracketMatch.border': '#515a6b',
    'editorCursor.background': '#ffffffc9',
    'editorCursor.foreground': '#528bff',
    'editorError.foreground': '#c24038',
    'editorGroup.background': '#181a1f',
    'editorGroup.border': '#181a1f',
    'editorGroupHeader.tabsBackground': '#21252b',
    'editorGutter.addedBackground': '#109868',
    'editorGutter.deletedBackground': '#9A353D',
    'editorGutter.modifiedBackground': '#948B60',
    'editorHoverWidget.background': '#21252b',
    'editorHoverWidget.border': '#181a1f',
    'editorHoverWidget.highlightForeground': '#61afef',
    'editorIndentGuide.activeBackground': '#c8c8c859',
    'editorIndentGuide.background': '#3b4048',
    'editorInlayHint.background': '#2c313c',
    'editorInlayHint.foreground': '#abb2bf',
    'editorLineNumber.activeForeground': '#abb2bf',
    'editorLineNumber.foreground': '#495162',
    'editorMarkerNavigation.background': '#21252b',
    'editorOverviewRuler.addedBackground': '#109868',
    'editorOverviewRuler.deletedBackground': '#9A353D',
    'editorOverviewRuler.modifiedBackground': '#948B60',
    'editorRuler.foreground': '#abb2bf26',
    'editorSuggestWidget.background': '#21252b',
    'editorSuggestWidget.border': '#181a1f',
    'editorSuggestWidget.selectedBackground': '#2c313a',
    'editorWarning.foreground': '#d19a66',
    'editorWhitespace.foreground': '#ffffff1d',
    'editorWidget.background': '#21252b',
    focusBorder: '#3e4452',
    'gitDecoration.ignoredResourceForeground': '#636b78',
    'input.background': '#1d1f23',
    'input.foreground': '#abb2bf',
    'list.activeSelectionBackground': '#2c313a',
    'list.activeSelectionForeground': '#d7dae0',
    'list.focusBackground': '#323842',
    'list.focusForeground': '#f0f0f0',
    'list.highlightForeground': '#ecebeb',
    'list.hoverBackground': '#2c313a',
    'list.hoverForeground': '#abb2bf',
    'list.inactiveSelectionBackground': '#323842',
    'list.inactiveSelectionForeground': '#d7dae0',
    'list.warningForeground': '#d19a66',
    'menu.foreground': '#abb2bf',
    'menu.separatorBackground': '#343a45',
    'minimapGutter.addedBackground': '#109868',
    'minimapGutter.deletedBackground': '#9A353D',
    'minimapGutter.modifiedBackground': '#948B60',
    'panel.border': '#3e4452',
    'panelSectionHeader.background': '#21252b',
    'peekViewEditor.background': '#1b1d23',
    'peekViewEditor.matchHighlightBackground': '#29244b',
    'peekViewResult.background': '#22262b',
    'scrollbar.shadow': '#23252c',
    'scrollbarSlider.activeBackground': '#747d9180',
    'scrollbarSlider.background': '#4e566660',
    'scrollbarSlider.hoverBackground': '#5a637580',
    'settings.focusedRowBackground': '#282c34',
    'settings.headerForeground': '#ffffff',
    'sideBar.background': '#21252b',
    'sideBar.foreground': '#abb2bf',
    'sideBarSectionHeader.background': '#282c34',
    'sideBarSectionHeader.foreground': '#abb2bf',
    'statusBar.background': '#21252b',
    'statusBar.debuggingBackground': '#cc6633',
    'statusBar.debuggingBorder': '#ff000000',
    'statusBar.debuggingForeground': '#ffffff',
    'statusBar.foreground': '#9da5b4',
    'statusBar.noFolderBackground': '#21252b',
    'statusBarItem.remoteBackground': '#4d78cc',
    'statusBarItem.remoteForeground': '#f8fafd',
    'tab.activeBackground': '#282c34',
    'tab.activeBorder': '#b4b4b4',
    'tab.activeForeground': '#dcdcdc',
    'tab.border': '#181a1f',
    'tab.hoverBackground': '#323842',
    'tab.inactiveBackground': '#21252b',
    'tab.unfocusedHoverBackground': '#323842',
    'terminal.ansiBlack': '#3f4451',
    'terminal.ansiBlue': '#4aa5f0',
    'terminal.ansiBrightBlack': '#4f5666',
    'terminal.ansiBrightBlue': '#4dc4ff',
    'terminal.ansiBrightCyan': '#4cd1e0',
    'terminal.ansiBrightGreen': '#a5e075',
    'terminal.ansiBrightMagenta': '#de73ff',
    'terminal.ansiBrightRed': '#ff616e',
    'terminal.ansiBrightWhite': '#e6e6e6',
    'terminal.ansiBrightYellow': '#f0a45d',
    'terminal.ansiCyan': '#42b3c2',
    'terminal.ansiGreen': '#8cc265',
    'terminal.ansiMagenta': '#c162de',
    'terminal.ansiRed': '#e05561',
    'terminal.ansiWhite': '#d7dae0',
    'terminal.ansiYellow': '#d18f52',
    'terminal.background': '#282c34',
    'terminal.border': '#3e4452',
    'terminal.foreground': '#abb2bf',
    'terminal.selectionBackground': '#abb2bf30',
    'textBlockQuote.background': '#2e3440',
    'textBlockQuote.border': '#4b5362',
    'textLink.foreground': '#61afef',
    'textPreformat.foreground': '#d19a66',
    'titleBar.activeBackground': '#282c34',
    'titleBar.activeForeground': '#9da5b4',
    'titleBar.inactiveBackground': '#282c34',
    'titleBar.inactiveForeground': '#6b717d',
    'tree.indentGuidesStroke': '#ffffff1d',
    'walkThrough.embeddedEditorBackground': '#2e3440',
    'welcomePage.buttonHoverBackground': '#404754',
  },
  rules: [
    {
      token: 'meta.embedded',
      foreground: 'abb2bf',
    },
    {
      token:
        'punctuation.definition.delayed.unison,punctuation.definition.list.begin.unison,punctuation.definition.list.end.unison,punctuation.definition.ability.begin.unison,punctuation.definition.ability.end.unison,punctuation.operator.assignment.as.unison,punctuation.separator.pipe.unison,punctuation.separator.delimiter.unison,punctuation.definition.hash.unison',
      foreground: 'e06c75',
    },
    {
      token: 'variable.other.generic-type.haskell',
      foreground: 'c678dd',
    },
    {
      token: 'storage.type.haskell',
      foreground: 'd19a66',
    },
    {
      token: 'support.variable.magic.python',
      foreground: 'e06c75',
    },
    {
      token:
        'punctuation.separator.period.python,punctuation.separator.element.python,punctuation.parenthesis.begin.python,punctuation.parenthesis.end.python',
      foreground: 'abb2bf',
    },
    {
      token: 'variable.parameter.function.language.special.self.python',
      foreground: 'e5c07b',
    },
    {
      token: 'variable.parameter.function.language.special.cls.python',
      foreground: 'e5c07b',
    },
    {
      token: 'storage.modifier.lifetime.rust',
      foreground: 'abb2bf',
    },
    {
      token: 'support.function.std.rust',
      foreground: '61afef',
    },
    {
      token: 'entity.name.lifetime.rust',
      foreground: 'e5c07b',
    },
    {
      token: 'variable.language.rust',
      foreground: 'e06c75',
    },
    {
      token: 'support.constant.edge',
      foreground: 'c678dd',
    },
    {
      token: 'constant.other.character-class.regexp',
      foreground: 'e06c75',
    },
    {
      token: 'keyword.operator.word',
      foreground: 'c678dd',
    },
    {
      token: 'keyword.operator.quantifier.regexp',
      foreground: 'd19a66',
    },
    {
      token: 'variable.parameter.function',
      foreground: 'abb2bf',
    },
    {
      token: 'comment markup.link',
      foreground: '5c6370',
    },
    {
      token: 'markup.changed.diff',
      foreground: 'e5c07b',
    },
    {
      token:
        'meta.diff.header.from-file,meta.diff.header.to-file,punctuation.definition.from-file.diff,punctuation.definition.to-file.diff',
      foreground: '61afef',
    },
    {
      token: 'markup.inserted.diff',
      foreground: '98c379',
    },
    {
      token: 'markup.deleted.diff',
      foreground: 'e06c75',
    },
    {
      token: 'meta.function.c,meta.function.cpp',
      foreground: 'e06c75',
    },
    {
      token:
        'punctuation.section.block.begin.bracket.curly.cpp,punctuation.section.block.end.bracket.curly.cpp,punctuation.terminator.statement.c,punctuation.section.block.begin.bracket.curly.c,punctuation.section.block.end.bracket.curly.c,punctuation.section.parens.begin.bracket.round.c,punctuation.section.parens.end.bracket.round.c,punctuation.section.parameters.begin.bracket.round.c,punctuation.section.parameters.end.bracket.round.c',
      foreground: 'abb2bf',
    },
    {
      token: 'punctuation.separator.key-value',
      foreground: 'abb2bf',
    },
    {
      token: 'keyword.operator.expression.import',
      foreground: '61afef',
    },
    {
      token: 'support.constant.math',
      foreground: 'e5c07b',
    },
    {
      token: 'support.constant.property.math',
      foreground: 'd19a66',
    },
    {
      token: 'variable.other.constant',
      foreground: 'e5c07b',
    },
    {
      token: 'storage.type.annotation.java',
      foreground: 'e5c07b',
    },
    {
      token: 'storage.type.object.array.java',
      foreground: 'e5c07b',
    },
    {
      token: 'source.java',
      foreground: 'e06c75',
    },
    {
      token:
        'punctuation.section.block.begin.java,punctuation.section.block.end.java,punctuation.definition.method-parameters.begin.java,punctuation.definition.method-parameters.end.java,meta.method.identifier.java,punctuation.section.method.begin.java,punctuation.section.method.end.java,punctuation.terminator.java,punctuation.section.class.begin.java,punctuation.section.class.end.java,punctuation.section.inner-class.begin.java,punctuation.section.inner-class.end.java,meta.method-call.java,punctuation.section.class.begin.bracket.curly.java,punctuation.section.class.end.bracket.curly.java,punctuation.section.method.begin.bracket.curly.java,punctuation.section.method.end.bracket.curly.java,punctuation.separator.period.java,punctuation.bracket.angle.java,punctuation.definition.annotation.java,meta.method.body.java',
      foreground: 'abb2bf',
    },
    {
      token: 'meta.method.java',
      foreground: '61afef',
    },
    {
      token:
        'storage.modifier.import.java,storage.type.java,storage.type.generic.java',
      foreground: 'e5c07b',
    },
    {
      token: 'keyword.operator.instanceof.java',
      foreground: 'c678dd',
    },
    {
      token: 'meta.definition.variable.name.java',
      foreground: 'e06c75',
    },
    {
      token: 'keyword.operator.logical',
      foreground: '56b6c2',
    },
    {
      token: 'keyword.operator.bitwise',
      foreground: '56b6c2',
    },
    {
      token: 'keyword.operator.channel',
      foreground: '56b6c2',
    },
    {
      token:
        'support.constant.property-value.scss,support.constant.property-value.css',
      foreground: 'd19a66',
    },
    {
      token: 'keyword.operator.css,keyword.operator.scss,keyword.operator.less',
      foreground: '56b6c2',
    },
    {
      token:
        'support.constant.color.w3c-standard-color-name.css,support.constant.color.w3c-standard-color-name.scss',
      foreground: 'd19a66',
    },
    {
      token: 'punctuation.separator.list.comma.css',
      foreground: 'abb2bf',
    },
    {
      token: 'support.constant.color.w3c-standard-color-name.css',
      foreground: 'd19a66',
    },
    {
      token: 'support.type.vendored.property-name.css',
      foreground: '56b6c2',
    },
    {
      token:
        'support.module.node,support.type.object.module,support.module.node',
      foreground: 'e5c07b',
    },
    {
      token: 'entity.name.type.module',
      foreground: 'e5c07b',
    },
    {
      token:
        'variable.other.readwrite,meta.object-literal.key,support.variable.property,support.variable.object.process,support.variable.object.node',
      foreground: 'e06c75',
    },
    {
      token: 'support.constant.json',
      foreground: 'd19a66',
    },
    {
      token: 'keyword.operator.expression.instanceof',
      foreground: 'c678dd',
    },
    {
      token: 'keyword.operator.new',
      foreground: 'c678dd',
    },
    {
      token: 'keyword.operator.ternary',
      foreground: 'c678dd',
    },
    {
      token: 'keyword.operator.optional',
      foreground: 'c678dd',
    },
    {
      token: 'keyword.operator.expression.keyof',
      foreground: 'c678dd',
    },
    {
      token: 'support.type.object.console',
      foreground: 'e06c75',
    },
    {
      token: 'support.variable.property.process',
      foreground: 'd19a66',
    },
    {
      token: 'entity.name.function,support.function.console',
      foreground: '61afef',
    },
    {
      token: 'keyword.operator.misc.rust',
      foreground: 'abb2bf',
    },
    {
      token: 'keyword.operator.sigil.rust',
      foreground: 'c678dd',
    },
    {
      token: 'keyword.operator.delete',
      foreground: 'c678dd',
    },
    {
      token: 'support.type.object.dom',
      foreground: '56b6c2',
    },
    {
      token: 'support.variable.dom,support.variable.property.dom',
      foreground: 'e06c75',
    },
    {
      token:
        'keyword.operator.arithmetic,keyword.operator.comparison,keyword.operator.decrement,keyword.operator.increment,keyword.operator.relational',
      foreground: '56b6c2',
    },
    {
      token:
        'keyword.operator.assignment.c,keyword.operator.comparison.c,keyword.operator.c,keyword.operator.increment.c,keyword.operator.decrement.c,keyword.operator.bitwise.shift.c,keyword.operator.assignment.cpp,keyword.operator.comparison.cpp,keyword.operator.cpp,keyword.operator.increment.cpp,keyword.operator.decrement.cpp,keyword.operator.bitwise.shift.cpp',
      foreground: 'c678dd',
    },
    {
      token: 'punctuation.separator.delimiter',
      foreground: 'abb2bf',
    },
    {
      token: 'punctuation.separator.c,punctuation.separator.cpp',
      foreground: 'c678dd',
    },
    {
      token: 'support.type.posix-reserved.c,support.type.posix-reserved.cpp',
      foreground: '56b6c2',
    },
    {
      token: 'keyword.operator.sizeof.c,keyword.operator.sizeof.cpp',
      foreground: 'c678dd',
    },
    {
      token: 'variable.parameter.function.language.python',
      foreground: 'd19a66',
    },
    {
      token: 'support.type.python',
      foreground: '56b6c2',
    },
    {
      token: 'keyword.operator.logical.python',
      foreground: 'c678dd',
    },
    {
      token: 'variable.parameter.function.python',
      foreground: 'd19a66',
    },
    {
      token:
        'punctuation.definition.arguments.begin.python,punctuation.definition.arguments.end.python,punctuation.separator.arguments.python,punctuation.definition.list.begin.python,punctuation.definition.list.end.python',
      foreground: 'abb2bf',
    },
    {
      token: 'meta.function-call.generic.python',
      foreground: '61afef',
    },
    {
      token: 'constant.character.format.placeholder.other.python',
      foreground: 'd19a66',
    },
    {
      token: 'keyword.operator',
      foreground: 'abb2bf',
    },
    {
      token: 'keyword.operator.assignment.compound',
      foreground: 'c678dd',
    },
    {
      token:
        'keyword.operator.assignment.compound.js,keyword.operator.assignment.compound.ts',
      foreground: '56b6c2',
    },
    {
      token: 'keyword',
      foreground: 'c678dd',
    },
    {
      token: 'entity.name.namespace',
      foreground: 'e5c07b',
    },
    {
      token: 'variable',
      foreground: 'e06c75',
    },
    {
      token: 'variable.c',
      foreground: 'abb2bf',
    },
    {
      token: 'variable.language',
      foreground: 'e5c07b',
    },
    {
      token: 'token.variable.parameter.java',
      foreground: 'abb2bf',
    },
    {
      token: 'import.storage.java',
      foreground: 'e5c07b',
    },
    {
      token: 'token.package.keyword',
      foreground: 'c678dd',
    },
    {
      token: 'token.package',
      foreground: 'abb2bf',
    },
    {
      token: 'entity.name.function',
      foreground: '61afef',
    },
    {
      token: 'meta.require',
      foreground: '61afef',
    },
    {
      token: 'support.function.any-method',
      foreground: '61afef',
    },
    {
      token: 'variable.function',
      foreground: '61afef',
    },
    {
      token: 'entity.name.type.namespace',
      foreground: 'e5c07b',
    },
    {
      token: 'support.class, entity.name.type.class',
      foreground: 'e5c07b',
    },
    {
      token: 'entity.name.class.identifier.namespace.type',
      foreground: 'e5c07b',
    },
    {
      token: 'entity.name.class',
      foreground: 'e5c07b',
    },
    {
      token: 'variable.other.class.js',
      foreground: 'e5c07b',
    },
    {
      token: 'variable.other.class.ts',
      foreground: 'e5c07b',
    },
    {
      token: 'variable.other.class.php',
      foreground: 'e06c75',
    },
    {
      token: 'entity.name.type',
      foreground: 'e5c07b',
    },
    {
      token: 'keyword.control',
      foreground: 'c678dd',
    },
    {
      token: 'control.elements, keyword.operator.less',
      foreground: 'd19a66',
    },
    {
      token: 'keyword.other.special-method',
      foreground: '61afef',
    },
    {
      token: 'storage',
      foreground: 'c678dd',
    },
    {
      token: 'token.storage',
      foreground: 'c678dd',
    },
    {
      token:
        'keyword.operator.expression.delete,keyword.operator.expression.in,keyword.operator.expression.of,keyword.operator.expression.instanceof,keyword.operator.new,keyword.operator.expression.typeof,keyword.operator.expression.void',
      foreground: 'c678dd',
    },
    {
      token: 'token.storage.type.java',
      foreground: 'e5c07b',
    },
    {
      token: 'support.function',
      foreground: '56b6c2',
    },
    {
      token: 'support.type.property-name',
      foreground: 'abb2bf',
    },
    {
      token:
        'support.type.property-name.toml, support.type.property-name.table.toml, support.type.property-name.array.toml',
      foreground: 'e06c75',
    },
    {
      token: 'support.constant.property-value',
      foreground: 'abb2bf',
    },
    {
      token: 'support.constant.font-name',
      foreground: 'd19a66',
    },
    {
      token: 'meta.tag',
      foreground: 'abb2bf',
    },
    {
      token: 'string',
      foreground: '98c379',
    },
    {
      token: 'constant.other.symbol',
      foreground: '56b6c2',
    },
    {
      token: 'constant.numeric',
      foreground: 'd19a66',
    },
    {
      token: 'constant',
      foreground: 'd19a66',
    },
    {
      token: 'punctuation.definition.constant',
      foreground: 'd19a66',
    },
    {
      token: 'entity.name.tag',
      foreground: 'e06c75',
    },
    {
      token: 'entity.other.attribute-name',
      foreground: 'd19a66',
    },
    {
      token: 'entity.other.attribute-name.id',
      foreground: '61afef',
    },
    {
      token: 'entity.other.attribute-name.class.css',
      foreground: 'd19a66',
    },
    {
      token: 'meta.selector',
      foreground: 'c678dd',
    },
    {
      token: 'markup.heading',
      foreground: 'e06c75',
    },
    {
      token:
        'markup.heading punctuation.definition.heading, entity.name.section',
      foreground: '61afef',
    },
    {
      token: 'keyword.other.unit',
      foreground: 'e06c75',
    },
    {
      token: 'markup.bold,todo.bold',
      foreground: 'd19a66',
    },
    {
      token: 'punctuation.definition.bold',
      foreground: 'e5c07b',
    },
    {
      token: 'markup.italic, punctuation.definition.italic,todo.emphasis',
      foreground: 'c678dd',
    },
    {
      token: 'emphasis md',
      foreground: 'c678dd',
    },
    {
      token: 'entity.name.section.markdown',
      foreground: 'e06c75',
    },
    {
      token: 'punctuation.definition.heading.markdown',
      foreground: 'e06c75',
    },
    {
      token: 'punctuation.definition.list.begin.markdown',
      foreground: 'e5c07b',
    },
    {
      token: 'markup.heading.setext',
      foreground: 'abb2bf',
    },
    {
      token: 'punctuation.definition.bold.markdown',
      foreground: 'd19a66',
    },
    {
      token: 'markup.inline.raw.markdown',
      foreground: '98c379',
    },
    {
      token: 'markup.inline.raw.string.markdown',
      foreground: '98c379',
    },
    {
      token: 'punctuation.definition.raw.markdown',
      foreground: 'e5c07b',
    },
    {
      token: 'punctuation.definition.list.markdown',
      foreground: 'e5c07b',
    },
    {
      token: 'punctuation.definition.string.begin.markdown',
      foreground: 'e06c75',
    },
    {
      token: 'punctuation.definition.string.end.markdown',
      foreground: 'e06c75',
    },
    {
      token: 'punctuation.definition.metadata.markdown',
      foreground: 'e06c75',
    },
    {
      token: 'beginning.punctuation.definition.list.markdown',
      foreground: 'e06c75',
    },
    {
      token: 'punctuation.definition.metadata.markdown',
      foreground: 'e06c75',
    },
    {
      token:
        'markup.underline.link.markdown,markup.underline.link.image.markdown',
      foreground: 'c678dd',
    },
    {
      token:
        'string.other.link.title.markdown,string.other.link.description.markdown',
      foreground: '61afef',
    },
    {
      token: 'markup.raw.monospace.asciidoc',
      foreground: '98c379',
    },
    {
      token: 'punctuation.definition.asciidoc',
      foreground: 'e5c07b',
    },
    {
      token: 'markup.list.asciidoc',
      foreground: 'e5c07b',
    },
    {
      token: 'markup.link.asciidoc,markup.other.url.asciidoc',
      foreground: 'c678dd',
    },
    {
      token: 'string.unquoted.asciidoc,markup.other.url.asciidoc',
      foreground: '61afef',
    },
    {
      token: 'string.regexp',
      foreground: '56b6c2',
    },
    {
      token: 'punctuation.section.embedded, variable.interpolation',
      foreground: 'e06c75',
    },
    {
      token:
        'punctuation.section.embedded.begin,punctuation.section.embedded.end',
      foreground: 'c678dd',
    },
    {
      token: 'invalid.illegal',
      foreground: 'ffffff',
    },
    {
      token: 'invalid.illegal.bad-ampersand.html',
      foreground: 'abb2bf',
    },
    {
      token: 'invalid.illegal.unrecognized-tag.html',
      foreground: 'e06c75',
    },
    {
      token: 'invalid.broken',
      foreground: 'ffffff',
    },
    {
      token: 'invalid.deprecated',
      foreground: 'ffffff',
    },
    {
      token: 'invalid.deprecated.entity.other.attribute-name.html',
      foreground: 'd19a66',
    },
    {
      token: 'invalid.unimplemented',
      foreground: 'ffffff',
    },
    {
      token: 'source.json meta.structure.dictionary.json > string.quoted.json',
      foreground: 'e06c75',
    },
    {
      token:
        'source.json meta.structure.dictionary.json > string.quoted.json > punctuation.string',
      foreground: 'e06c75',
    },
    {
      token:
        'source.json meta.structure.dictionary.json > value.json > string.quoted.json,source.json meta.structure.array.json > value.json > string.quoted.json,source.json meta.structure.dictionary.json > value.json > string.quoted.json > punctuation,source.json meta.structure.array.json > value.json > string.quoted.json > punctuation',
      foreground: '98c379',
    },
    {
      token:
        'source.json meta.structure.dictionary.json > constant.language.json,source.json meta.structure.array.json > constant.language.json',
      foreground: '56b6c2',
    },
    {
      token: 'support.type.property-name.json',
      foreground: 'e06c75',
    },
    {
      token: 'support.type.property-name.json punctuation',
      foreground: 'e06c75',
    },
    {
      token:
        'text.html.laravel-blade source.php.embedded.line.html entity.name.tag.laravel-blade',
      foreground: 'c678dd',
    },
    {
      token:
        'text.html.laravel-blade source.php.embedded.line.html support.constant.laravel-blade',
      foreground: 'c678dd',
    },
    {
      token:
        'support.other.namespace.use.php,support.other.namespace.use-as.php,entity.other.alias.php,meta.interface.php',
      foreground: 'e5c07b',
    },
    {
      token: 'keyword.operator.error-control.php',
      foreground: 'c678dd',
    },
    {
      token: 'keyword.operator.type.php',
      foreground: 'c678dd',
    },
    {
      token: 'punctuation.section.array.begin.php',
      foreground: 'abb2bf',
    },
    {
      token: 'punctuation.section.array.end.php',
      foreground: 'abb2bf',
    },
    {
      token: 'invalid.illegal.non-null-typehinted.php',
      foreground: 'f44747',
    },
    {
      token:
        'storage.type.php,meta.other.type.phpdoc.php,keyword.other.type.php,keyword.other.array.phpdoc.php',
      foreground: 'e5c07b',
    },
    {
      token:
        'meta.function-call.php,meta.function-call.object.php,meta.function-call.static.php',
      foreground: '61afef',
    },
    {
      token:
        'punctuation.definition.parameters.begin.bracket.round.php,punctuation.definition.parameters.end.bracket.round.php,punctuation.separator.delimiter.php,punctuation.section.scope.begin.php,punctuation.section.scope.end.php,punctuation.terminator.expression.php,punctuation.definition.arguments.begin.bracket.round.php,punctuation.definition.arguments.end.bracket.round.php,punctuation.definition.storage-type.begin.bracket.round.php,punctuation.definition.storage-type.end.bracket.round.php,punctuation.definition.array.begin.bracket.round.php,punctuation.definition.array.end.bracket.round.php,punctuation.definition.begin.bracket.round.php,punctuation.definition.end.bracket.round.php,punctuation.definition.begin.bracket.curly.php,punctuation.definition.end.bracket.curly.php,punctuation.definition.section.switch-block.end.bracket.curly.php,punctuation.definition.section.switch-block.start.bracket.curly.php,punctuation.definition.section.switch-block.begin.bracket.curly.php,punctuation.definition.section.switch-block.end.bracket.curly.php',
      foreground: 'abb2bf',
    },
    {
      token: 'support.constant.core.rust',
      foreground: 'd19a66',
    },
    {
      token:
        'support.constant.ext.php,support.constant.std.php,support.constant.core.php,support.constant.parser-token.php',
      foreground: 'd19a66',
    },
    {
      token: 'entity.name.goto-label.php,support.other.php',
      foreground: '61afef',
    },
    {
      token:
        'keyword.operator.logical.php,keyword.operator.bitwise.php,keyword.operator.arithmetic.php',
      foreground: '56b6c2',
    },
    {
      token: 'keyword.operator.regexp.php',
      foreground: 'c678dd',
    },
    {
      token: 'keyword.operator.comparison.php',
      foreground: '56b6c2',
    },
    {
      token: 'keyword.operator.heredoc.php,keyword.operator.nowdoc.php',
      foreground: 'c678dd',
    },
    {
      token: 'meta.function.decorator.python',
      foreground: '61afef',
    },
    {
      token:
        'support.token.decorator.python,meta.function.decorator.identifier.python',
      foreground: '56b6c2',
    },
    {
      token: 'function.parameter',
      foreground: 'abb2bf',
    },
    {
      token: 'function.brace',
      foreground: 'abb2bf',
    },
    {
      token: 'function.parameter.ruby, function.parameter.cs',
      foreground: 'abb2bf',
    },
    {
      token: 'constant.language.symbol.ruby',
      foreground: '56b6c2',
    },
    {
      token: 'constant.language.symbol.hashkey.ruby',
      foreground: '56b6c2',
    },
    {
      token: 'rgb-value',
      foreground: '56b6c2',
    },
    {
      token: 'inline-color-decoration rgb-value',
      foreground: 'd19a66',
    },
    {
      token: 'less rgb-value',
      foreground: 'd19a66',
    },
    {
      token: 'selector.sass',
      foreground: 'e06c75',
    },
    {
      token:
        'support.type.primitive.ts,support.type.builtin.ts,support.type.primitive.tsx,support.type.builtin.tsx',
      foreground: 'e5c07b',
    },
    {
      token: 'block.scope.end,block.scope.begin',
      foreground: 'abb2bf',
    },
    {
      token: 'storage.type.cs',
      foreground: 'e5c07b',
    },
    {
      token: 'entity.name.variable.local.cs',
      foreground: 'e06c75',
    },
    {
      token: 'token.info-token',
      foreground: '61afef',
    },
    {
      token: 'token.warn-token',
      foreground: 'd19a66',
    },
    {
      token: 'token.error-token',
      foreground: 'f44747',
    },
    {
      token: 'token.debug-token',
      foreground: 'c678dd',
    },
    {
      token: 'punctuation.definition.template-expression.begin',
      foreground: 'c678dd',
    },
    {
      token: 'punctuation.definition.template-expression.end',
      foreground: 'c678dd',
    },
    {
      token: 'punctuation.section.embedded',
      foreground: 'c678dd',
    },
    {
      token: 'meta.template.expression',
      foreground: 'abb2bf',
    },
    {
      token: 'keyword.operator.module',
      foreground: 'c678dd',
    },
    {
      token: 'support.type.type.flowtype',
      foreground: '61afef',
    },
    {
      token: 'support.type.primitive',
      foreground: 'e5c07b',
    },
    {
      token: 'meta.property.object',
      foreground: 'e06c75',
    },
    {
      token: 'variable.parameter.function.js',
      foreground: 'e06c75',
    },
    {
      token: 'keyword.other.template.begin',
      foreground: '98c379',
    },
    {
      token: 'keyword.other.template.end',
      foreground: '98c379',
    },
    {
      token: 'keyword.other.substitution.begin',
      foreground: '98c379',
    },
    {
      token: 'keyword.other.substitution.end',
      foreground: '98c379',
    },
    {
      token: 'keyword.operator.assignment',
      foreground: '56b6c2',
    },
    {
      token: 'keyword.operator.assignment.go',
      foreground: 'e5c07b',
    },
    {
      token: 'keyword.operator.arithmetic.go',
      foreground: 'c678dd',
    },
    {
      token: 'keyword.operator.address.go',
      foreground: 'c678dd',
    },
    {
      token: 'entity.name.package.go',
      foreground: 'e5c07b',
    },
    {
      token: 'support.type.prelude.elm',
      foreground: '56b6c2',
    },
    {
      token: 'support.constant.elm',
      foreground: 'd19a66',
    },
    {
      token: 'punctuation.quasi.element',
      foreground: 'c678dd',
    },
    {
      token: 'constant.character.entity',
      foreground: 'e06c75',
    },
    {
      token: 'entity.other.attribute-name.pseudo-element',
      foreground: '56b6c2',
    },
    {
      token: 'entity.other.attribute-name.pseudo-class',
      foreground: '56b6c2',
    },
    {
      token: 'entity.global.clojure',
      foreground: 'e5c07b',
    },
    {
      token: 'meta.symbol.clojure',
      foreground: 'e06c75',
    },
    {
      token: 'constant.keyword.clojure',
      foreground: '56b6c2',
    },
    {
      token: 'meta.arguments.coffee',
      foreground: 'e06c75',
    },
    {
      token: 'variable.parameter.function.coffee',
      foreground: 'e06c75',
    },
    {
      token: 'source.ini',
      foreground: '98c379',
    },
    {
      token: 'meta.scope.prerequisites.makefile',
      foreground: 'e06c75',
    },
    {
      token: 'source.makefile',
      foreground: 'e5c07b',
    },
    {
      token: 'storage.modifier.import.groovy',
      foreground: 'e5c07b',
    },
    {
      token: 'meta.method.groovy',
      foreground: '61afef',
    },
    {
      token: 'meta.definition.variable.name.groovy',
      foreground: 'e06c75',
    },
    {
      token: 'meta.definition.class.inherited.classes.groovy',
      foreground: '98c379',
    },
    {
      token: 'support.variable.semantic.hlsl',
      foreground: 'e5c07b',
    },
    {
      token: 'support.type.texture.hlsl',
      foreground: 'c678dd',
    },
    {
      token: 'support.type.sampler.hlsl',
      foreground: 'c678dd',
    },
    {
      token: 'support.type.object.hlsl',
      foreground: 'c678dd',
    },
    {
      token: 'support.type.object.rw.hlsl',
      foreground: 'c678dd',
    },
    {
      token: 'support.type.fx.hlsl',
      foreground: 'c678dd',
    },
    {
      token: 'support.type.object.hlsl',
      foreground: 'c678dd',
    },
    {
      token: 'text.variable',
      foreground: 'e06c75',
    },
    {
      token: 'text.bracketed',
      foreground: 'e06c75',
    },
    {
      token: 'support.type.swift',
      foreground: 'e5c07b',
    },
    {
      token: 'support.type.vb.asp',
      foreground: 'e5c07b',
    },
    {
      token: 'entity.name.function.xi',
      foreground: 'e5c07b',
    },
    {
      token: 'entity.name.class.xi',
      foreground: '56b6c2',
    },
    {
      token: 'constant.character.character-class.regexp.xi',
      foreground: 'e06c75',
    },
    {
      token: 'constant.regexp.xi',
      foreground: 'c678dd',
    },
    {
      token: 'keyword.control.xi',
      foreground: '56b6c2',
    },
    {
      token: 'invalid.xi',
      foreground: 'abb2bf',
    },
    {
      token: 'beginning.punctuation.definition.quote.markdown.xi',
      foreground: '98c379',
    },
    {
      token: 'beginning.punctuation.definition.list.markdown.xi',
      foreground: '7f848e',
    },
    {
      token: 'constant.character.xi',
      foreground: '61afef',
    },
    {
      token: 'accent.xi',
      foreground: '61afef',
    },
    {
      token: 'wikiword.xi',
      foreground: 'd19a66',
    },
    {
      token: 'constant.other.color.rgb-value.xi',
      foreground: 'ffffff',
    },
    {
      token: 'punctuation.definition.tag.xi',
      foreground: '5c6370',
    },
    {
      token: 'entity.name.label.cs',
      foreground: 'e5c07b',
    },
    {
      token: 'entity.name.scope-resolution.function.call',
      foreground: 'e5c07b',
    },
    {
      token: 'entity.name.scope-resolution.function.definition',
      foreground: 'e5c07b',
    },
    {
      token: 'entity.name.label.cs',
      foreground: 'e06c75',
    },
    {
      token: 'markup.heading.setext.1.markdown',
      foreground: 'e06c75',
    },
    {
      token: 'markup.heading.setext.2.markdown',
      foreground: 'e06c75',
    },
    {
      token: ' meta.brace.square',
      foreground: 'abb2bf',
    },
    {
      token: 'comment, punctuation.definition.comment',
      foreground: '7f848e',
    },
    {
      token: 'markup.quote.markdown',
      foreground: '5c6370',
    },
    {
      token: 'punctuation.definition.block.sequence.item.yaml',
      foreground: 'abb2bf',
    },
    {
      token: 'constant.language.symbol.elixir',
      foreground: '56b6c2',
    },
    {
      token: 'constant.language.symbol.double-quoted.elixir',
      foreground: '56b6c2',
    },
    {
      token: 'entity.name.variable.parameter.cs',
      foreground: 'e5c07b',
    },
    {
      token: 'entity.name.variable.field.cs',
      foreground: 'e06c75',
    },
    {
      token: 'markup.deleted',
      foreground: 'e06c75',
    },
    {
      token: 'markup.inserted',
      foreground: '98c379',
    },
    {
      token: 'punctuation.section.embedded.begin.php',
      foreground: 'BE5046',
    },
    {
      token: 'punctuation.section.embedded.end.php',
      foreground: 'BE5046',
    },
    {
      token: 'support.other.namespace.php',
      foreground: 'abb2bf',
    },
    {
      token: 'variable.parameter.function.latex',
      foreground: 'e06c75',
    },
    {
      token: 'variable.other.object',
      foreground: 'e5c07b',
    },
    {
      token: 'variable.other.constant.property',
      foreground: 'e06c75',
    },
    {
      token: 'entity.other.inherited-class',
      foreground: 'e5c07b',
    },
    {
      token: 'variable.other.readwrite.c',
      foreground: 'e06c75',
    },
    {
      token:
        'entity.name.variable.parameter.php,punctuation.separator.colon.php,constant.other.php',
      foreground: 'abb2bf',
    },
    {
      token: 'constant.numeric.decimal.asm.x86_64',
      foreground: 'c678dd',
    },
    {
      token: 'support.other.parenthesis.regexp',
      foreground: 'd19a66',
    },
    {
      token: 'constant.character.escape',
      foreground: '56b6c2',
    },
    {
      token: 'string.regexp',
      foreground: 'e06c75',
    },
    {
      token: 'log.info',
      foreground: '98c379',
    },
    {
      token: 'log.warning',
      foreground: 'e5c07b',
    },
    {
      token: 'log.error',
      foreground: 'e06c75',
    },
    {
      token: 'keyword.operator.expression.is',
      foreground: 'c678dd',
    },
    {
      token: 'entity.name.label',
      foreground: 'e06c75',
    },
  ],
} as const satisfies monaco.editor.IStandaloneThemeData;
