import * as monaco from 'monaco-editor';

export default {
  base: 'vs',
  inherit: false,
  colors: {
    'activityBar.background': '#E7E8E6',
    'activityBar.foreground': '#2DAE58',
    'activityBar.inactiveForeground': '#68696888',
    'activityBarBadge.background': '#09A1ED',
    'badge.background': '#09A1ED',
    'badge.foreground': '#ffffff',
    'button.background': '#2DAE58',
    'debugExceptionWidget.background': '#FFAEAC33',
    'debugExceptionWidget.border': '#FF5C57',
    'debugToolBar.border': '#E9EAEB',
    'diffEditor.insertedTextBackground': '#2DAE5824',
    'diffEditor.removedTextBackground': '#FFAEAC44',
    'dropdown.border': '#E9EAEB',
    'editor.background': '#FAFBFC',
    'editor.findMatchBackground': '#00E6E06A',
    'editor.findMatchHighlightBackground': '#00E6E02A',
    'editor.findRangeHighlightBackground': '#F5B90011',
    'editor.focusedStackFrameHighlightBackground': '#2DAE5822',
    'editor.foreground': '#565869',
    'editor.hoverHighlightBackground': '#00E6E018',
    'editor.rangeHighlightBackground': '#F5B90033',
    'editor.selectionBackground': '#2DAE5822',
    'editor.snippetTabstopHighlightBackground': '#ADB1C23A',
    'editor.stackFrameHighlightBackground': '#F5B90033',
    'editor.wordHighlightBackground': '#ADB1C23A',
    'editorError.foreground': '#FF5C56',
    'editorGroup.emptyBackground': '#F3F4F5',
    'editorGutter.addedBackground': '#2DAE58',
    'editorGutter.deletedBackground': '#FF5C57',
    'editorGutter.modifiedBackground': '#00A39FAA',
    'editorInlayHint.background': '#E9EAEB',
    'editorInlayHint.foreground': '#565869',
    'editorLineNumber.activeForeground': '#35CF68',
    'editorLineNumber.foreground': '#9194A2aa',
    'editorLink.activeForeground': '#35CF68',
    'editorOverviewRuler.addedForeground': '#2DAE58',
    'editorOverviewRuler.deletedForeground': '#FF5C57',
    'editorOverviewRuler.errorForeground': '#FF5C56',
    'editorOverviewRuler.findMatchForeground': '#13BBB7AA',
    'editorOverviewRuler.modifiedForeground': '#00A39FAA',
    'editorOverviewRuler.warningForeground': '#CF9C00',
    'editorOverviewRuler.wordHighlightForeground': '#ADB1C288',
    'editorOverviewRuler.wordHighlightStrongForeground': '#35CF68',
    'editorWarning.foreground': '#CF9C00',
    'editorWhitespace.foreground': '#ADB1C255',
    'extensionButton.prominentBackground': '#2DAE58',
    'extensionButton.prominentHoverBackground': '#238744',
    focusBorder: '#09A1ED',
    foreground: '#686968',
    'gitDecoration.modifiedResourceForeground': '#00A39F',
    'gitDecoration.untrackedResourceForeground': '#2DAE58',
    'input.border': '#E9EAEB',
    'list.activeSelectionBackground': '#09A1ED',
    'list.activeSelectionForeground': '#ffffff',
    'list.errorForeground': '#FF5C56',
    'list.focusBackground': '#BCE7FC99',
    'list.focusForeground': '#11658F',
    'list.hoverBackground': '#E9EAEB',
    'list.inactiveSelectionBackground': '#89B5CB33',
    'list.warningForeground': '#B38700',
    'menu.background': '#FAFBFC',
    'menu.selectionBackground': '#E9EAEB',
    'menu.selectionForeground': '#686968',
    'menubar.selectionBackground': '#E9EAEB',
    'menubar.selectionForeground': '#686968',
    'merge.currentContentBackground': '#35CF6833',
    'merge.currentHeaderBackground': '#35CF6866',
    'merge.incomingContentBackground': '#14B1FF33',
    'merge.incomingHeaderBackground': '#14B1FF77',
    'peekView.border': '#09A1ED',
    'peekViewEditor.background': '#14B1FF08',
    'peekViewEditor.matchHighlightBackground': '#F5B90088',
    'peekViewEditor.matchHighlightBorder': '#F5B900',
    'peekViewEditorStickyScroll.background': '#EDF4FB',
    'peekViewResult.matchHighlightBackground': '#F5B90088',
    'peekViewResult.selectionBackground': '#09A1ED',
    'peekViewResult.selectionForeground': '#FFFFFF',
    'peekViewTitle.background': '#09A1ED11',
    'selection.background': '#2DAE5844',
    'settings.modifiedItemIndicator': '#13BBB7',
    'sideBar.background': '#F3F4F5',
    'sideBar.border': '#DEDFE0',
    'sideBarSectionHeader.background': '#E9EAEB',
    'sideBarSectionHeader.border': '#DEDFE0',
    'statusBar.background': '#2DAE58',
    'statusBar.debuggingBackground': '#13BBB7',
    'statusBar.debuggingBorder': '#00A39F',
    'statusBar.noFolderBackground': '#565869',
    'statusBarItem.remoteBackground': '#238744',
    'tab.activeBorderTop': '#2DAE58',
    'terminal.ansiBlack': '#565869',
    'terminal.ansiBlue': '#09A1ED',
    'terminal.ansiBrightBlack': '#75798F',
    'terminal.ansiBrightBlue': '#14B1FF',
    'terminal.ansiBrightCyan': '#13BBB7',
    'terminal.ansiBrightGreen': '#35CF68',
    'terminal.ansiBrightMagenta': '#FF94D2',
    'terminal.ansiBrightRed': '#FFAEAC',
    'terminal.ansiBrightWhite': '#FFFFFF',
    'terminal.ansiBrightYellow': '#F5B900',
    'terminal.ansiCyan': '#13BBB7',
    'terminal.ansiGreen': '#2DAE58',
    'terminal.ansiMagenta': '#F767BB',
    'terminal.ansiRed': '#FF5C57',
    'terminal.ansiWhite': '#FAFBF9',
    'terminal.ansiYellow': '#CF9C00',
    'titleBar.activeBackground': '#F3F4F5',
  },
  rules: [
    {
      token: 'invalid.illegal',
      foreground: 'FF5C56',
    },
    {
      token: 'meta.object-literal.key',
      foreground: '11658F',
    },
    {
      token: 'meta.object-literal.key constant.character.escape',
      foreground: '11658F',
    },
    {
      token: 'meta.object-literal string',
      foreground: '11658F',
    },
    {
      token: 'meta.object-literal string constant.character.escape',
      foreground: '11658F',
    },
    {
      token: 'support.type.property-name',
      foreground: '11658F',
    },
    {
      token: 'support.type.property-name constant.character.escape',
      foreground: '11658F',
    },
    {
      token: 'keyword',
      foreground: 'F767BB',
    },
    {
      token: 'storage',
      foreground: 'F767BB',
    },
    {
      token: 'meta.class storage.type',
      foreground: 'F767BB',
    },
    {
      token: 'keyword.operator.expression.import',
      foreground: 'F767BB',
    },
    {
      token: 'keyword.operator.new',
      foreground: 'F767BB',
    },
    {
      token: 'keyword.operator.expression.delete',
      foreground: 'F767BB',
    },
    {
      token: 'support.type',
      foreground: '2DAE58',
    },
    {
      token: 'meta.type.annotation entity.name.type',
      foreground: '2DAE58',
    },
    {
      token: 'new.expr meta.type.parameters entity.name.type',
      foreground: '2DAE58',
    },
    {
      token: 'storage.type.primitive',
      foreground: '2DAE58',
    },
    {
      token: 'storage.type.built-in.primitive',
      foreground: '2DAE58',
    },
    {
      token: 'meta.function.parameter storage.type',
      foreground: '2DAE58',
    },
    {
      token: 'storage.type.annotation',
      foreground: 'C25193',
    },
    {
      token: 'keyword.other.unit',
      foreground: 'FF5C57CC',
    },
    {
      token: 'constant.language',
      foreground: '2DAE58',
    },
    {
      token: 'support.constant',
      foreground: '2DAE58',
    },
    {
      token: 'variable.language',
      foreground: '2DAE58',
    },
    {
      token: 'variable',
      foreground: '565869',
    },
    {
      token: 'support.variable',
      foreground: '565869',
    },
    {
      token: 'variable.language.this',
      foreground: '13BBB7',
    },
    {
      token: 'entity.name.function',
      foreground: '09A1ED',
    },
    {
      token: 'support.function',
      foreground: '09A1ED',
    },
    {
      token: 'entity.name.function.decorator',
      foreground: '11658F',
    },
    {
      token: 'meta.class entity.name.type',
      foreground: '13BBB7',
    },
    {
      token: 'new.expr entity.name.type',
      foreground: '13BBB7',
    },
    {
      token: 'entity.other.inherited-class',
      foreground: '13BBB7',
    },
    {
      token: 'support.class',
      foreground: '13BBB7',
    },
    {
      token: 'keyword.preprocessor.pragma',
      foreground: '11658F',
    },
    {
      token: 'keyword.control.directive.include',
      foreground: '11658F',
    },
    {
      token: 'keyword.other.preprocessor',
      foreground: '11658F',
    },
    {
      token: 'entity.name.exception',
      foreground: 'FF5C56',
    },
    {
      token: 'constant.numeric',
      foreground: 'FF5C57',
    },
    {
      token: 'constant',
      foreground: '2DAE58',
    },
    {
      token: 'constant.character',
      foreground: '2DAE58',
    },
    {
      token: 'string',
      foreground: 'CF9C00',
    },
    {
      token: 'string',
      foreground: 'CF9C00',
    },
    {
      token: 'constant.character.escape',
      foreground: 'F5B900',
    },
    {
      token: 'string.regexp',
      foreground: '13BBB7',
    },
    {
      token: 'string.regexp constant.character.escape',
      foreground: '13BBB7',
    },
    {
      token: 'keyword.operator.quantifier.regexp',
      foreground: '00A39F',
    },
    {
      token: 'keyword.operator.negation.regexp',
      foreground: '00A39F',
    },
    {
      token: 'keyword.operator.or.regexp',
      foreground: '00A39F',
    },
    {
      token: 'string.regexp punctuation',
      foreground: '00A39F',
    },
    {
      token: 'string.regexp keyword',
      foreground: '00A39F',
    },
    {
      token: 'string.regexp keyword.control',
      foreground: '00A39F',
    },
    {
      token: 'string.regexp constant',
      foreground: '00A39F',
    },
    {
      token: 'variable.other.regexp',
      foreground: '00A39F',
    },
    {
      token: 'string.regexp keyword.other',
      foreground: '00A39F88',
    },
    {
      token: 'constant.other.symbol',
      foreground: 'CF9C00',
    },
    {
      token: 'comment',
      foreground: 'ADB1C2',
    },
    {
      token: 'punctuation.definition.comment',
      foreground: 'ADB1C2',
    },
    {
      token: 'comment.block.preprocessor',
      foreground: '9194A2',
    },
    {
      token: 'comment.block.documentation entity.name.type',
      foreground: '2DAE58',
    },
    {
      token: 'comment.block.documentation storage',
      foreground: '9194A2',
    },
    {
      token: 'comment.block.documentation keyword.other',
      foreground: '9194A2',
    },
    {
      token: 'meta.class comment.block.documentation storage.type',
      foreground: '9194A2',
    },
    {
      token: 'comment.block.documentation variable',
      foreground: 'C25193',
    },
    {
      token: 'punctuation',
      foreground: 'ADB1C2',
    },
    {
      token: 'keyword.operator',
      foreground: 'ADB1C2',
    },
    {
      token: 'keyword.other.arrow',
      foreground: 'ADB1C2',
    },
    {
      token: 'keyword.control.@',
      foreground: 'ADB1C2',
    },
    {
      token: 'meta.tag.metadata.doctype.html entity.name.tag',
      foreground: '9194A2',
    },
    {
      token: 'meta.tag.metadata.doctype.html entity.other.attribute-name.html',
      foreground: '9194A2',
    },
    {
      token: 'meta.tag.sgml.doctype',
      foreground: '9194A2',
    },
    {
      token: 'meta.tag.sgml.doctype string',
      foreground: '9194A2',
    },
    {
      token: 'meta.tag.sgml.doctype entity.name.tag',
      foreground: '9194A2',
    },
    {
      token: 'meta.tag.sgml punctuation.definition.tag.html',
      foreground: '9194A2',
    },
    {
      token: 'meta.tag',
      foreground: 'ADB1C2',
    },
    {
      token: 'punctuation.definition.tag.html',
      foreground: 'ADB1C2',
    },
    {
      token: 'punctuation.definition.tag.begin.html',
      foreground: 'ADB1C2',
    },
    {
      token: 'punctuation.definition.tag.end.html',
      foreground: 'ADB1C2',
    },
    {
      token: 'entity.name.tag',
      foreground: '13BBB7',
    },
    {
      token: 'meta.tag entity.other.attribute-name',
      foreground: 'FF8380',
    },
    {
      token: 'entity.other.attribute-name.html',
      foreground: 'FF8380',
    },
    {
      token: 'constant.character.entity',
      foreground: 'CF9C00',
    },
    {
      token: 'punctuation.definition.entity',
      foreground: 'CF9C00',
    },
    {
      token: 'source.css',
      foreground: 'ADB1C2',
    },
    {
      token: 'meta.selector',
      foreground: 'F767BB',
    },
    {
      token: 'meta.selector entity',
      foreground: 'F767BB',
    },
    {
      token: 'meta.selector entity punctuation',
      foreground: 'F767BB',
    },
    {
      token: 'source.css entity.name.tag',
      foreground: 'F767BB',
    },
    {
      token: 'keyword.control.at-rule',
      foreground: 'C25193',
    },
    {
      token: 'keyword.control.at-rule punctuation.definition.keyword',
      foreground: 'C25193',
    },
    {
      token: 'source.css variable',
      foreground: '11658F',
    },
    {
      token: 'source.css meta.property-name',
      foreground: '565869',
    },
    {
      token: 'source.css support.type.property-name',
      foreground: '565869',
    },
    {
      token: 'source.css support.type.vendored.property-name',
      foreground: '565869AA',
    },
    {
      token: 'meta.property-value',
      foreground: '13BBB7',
    },
    {
      token: 'support.constant.property-value',
      foreground: '13BBB7',
    },
    {
      token: 'source.css support.constant',
      foreground: '2DAE58',
    },
    {
      token: 'punctuation.definition.entity.css',
      foreground: 'FF82CBBB',
    },
    {
      token: 'keyword.operator.combinator.css',
      foreground: 'FF82CBBB',
    },
    {
      token: 'source.css support.function',
      foreground: '09A1ED',
    },
    {
      token: 'keyword.other.important',
      foreground: '238744',
    },
    {
      token: 'source.css.scss',
      foreground: 'F767BB',
    },
    {
      token: 'source.css.scss entity.other.attribute-name.class.css',
      foreground: 'F767BB',
    },
    {
      token: 'source.css.scss entity.other.attribute-name.id.css',
      foreground: 'F767BB',
    },
    {
      token: 'entity.name.tag.reference.scss',
      foreground: 'C25193',
    },
    {
      token: 'source.css.scss meta.at-rule keyword',
      foreground: 'C25193',
    },
    {
      token: 'source.css.scss meta.at-rule keyword punctuation',
      foreground: 'C25193',
    },
    {
      token: 'source.css.scss meta.at-rule operator.logical',
      foreground: 'C25193',
    },
    {
      token: 'keyword.control.content.scss',
      foreground: 'C25193',
    },
    {
      token: 'keyword.control.return.scss',
      foreground: 'C25193',
    },
    {
      token: 'keyword.control.return.scss punctuation.definition.keyword',
      foreground: 'C25193',
    },
    {
      token: 'meta.at-rule.mixin.scss',
      foreground: 'ADB1C2',
    },
    {
      token: 'meta.at-rule.include.scss',
      foreground: 'ADB1C2',
    },
    {
      token: 'source.css.scss meta.at-rule.if',
      foreground: 'ADB1C2',
    },
    {
      token: 'source.css.scss meta.at-rule.else',
      foreground: 'ADB1C2',
    },
    {
      token: 'source.css.scss meta.at-rule.each',
      foreground: 'ADB1C2',
    },
    {
      token: 'source.css.scss meta.at-rule variable.parameter',
      foreground: 'ADB1C2',
    },
    {
      token: 'source.css.less entity.other.attribute-name.class.css',
      foreground: 'F767BB',
    },
    {
      token: 'source.stylus meta.brace.curly.css',
      foreground: 'ADB1C2',
    },
    {
      token: 'source.stylus entity.other.attribute-name.class',
      foreground: 'F767BB',
    },
    {
      token: 'source.stylus entity.other.attribute-name.id',
      foreground: 'F767BB',
    },
    {
      token: 'source.stylus entity.name.tag',
      foreground: 'F767BB',
    },
    {
      token: 'source.stylus support.type.property-name',
      foreground: '565869',
    },
    {
      token: 'source.stylus variable',
      foreground: '11658F',
    },
    {
      token: 'markup.changed',
      foreground: '888888',
    },
    {
      token: 'markup.deleted',
      foreground: '888888',
    },
    {
      token: 'markup.error',
      foreground: 'FF5C56',
    },
    {
      token: 'markup.inserted',
      foreground: '888888',
    },
    {
      token: 'meta.link',
      foreground: 'CF9C00',
    },
    {
      token: 'string.other.link.title.markdown',
      foreground: '09A1ED',
    },
    {
      token: 'markup.output',
      foreground: '999999',
    },
    {
      token: 'markup.raw',
      foreground: '999999',
    },
    {
      token: 'markup.prompt',
      foreground: '999999',
    },
    {
      token: 'markup.heading',
      foreground: '2DAE58',
    },
    {
      token: 'markup.traceback',
      foreground: 'FF5C56',
    },
    {
      token: 'markup.quote',
      foreground: '777985',
    },
    {
      token: 'markup.bold',
      foreground: '13BBB7',
    },
    {
      token: 'markup.italic',
      foreground: '13BBB7',
    },
    {
      token: 'markup.inline.raw',
      foreground: 'F767BB',
    },
    {
      token: 'meta.brace.round',
      foreground: 'ADB1C2',
    },
    {
      token: 'meta.brace.square',
      foreground: 'ADB1C2',
    },
    {
      token: 'storage.type.function.arrow',
      foreground: 'ADB1C2',
    },
    {
      token: 'constant.language.import-export-all',
      foreground: 'C25193',
    },
    {
      token: 'meta.import keyword.control.default',
      foreground: 'C25193',
    },
    {
      token: 'support.function.js',
      foreground: '11658F',
    },
    {
      token: 'string.regexp.js',
      foreground: '13BBB7',
    },
    {
      token: 'variable.language.super',
      foreground: 'F767BB',
    },
    {
      token: 'support.type.object.module.js',
      foreground: 'F767BB',
    },
    {
      token: 'meta.jsx.children',
      foreground: '686968',
    },
    {
      token: 'entity.name.tag.yaml',
      foreground: '11658F',
    },
    {
      token: 'variable.other.alias.yaml',
      foreground: '2DAE58',
    },
    {
      token: 'punctuation.section.embedded.begin.php',
      foreground: '75798F',
    },
    {
      token: 'punctuation.section.embedded.end.php',
      foreground: '75798F',
    },
    {
      token: 'meta.use.php entity.other.alias.php',
      foreground: '13BBB7',
    },
    {
      token: 'source.php support.function.construct',
      foreground: '11658F',
    },
    {
      token: 'source.php support.function.var',
      foreground: '11658F',
    },
    {
      token: 'storage.modifier.extends.php',
      foreground: 'F767BB',
    },
    {
      token: 'source.php keyword.other',
      foreground: 'F767BB',
    },
    {
      token: 'storage.modifier.php',
      foreground: 'F767BB',
    },
    {
      token: 'meta.class.body.php storage.type.php',
      foreground: 'F767BB',
    },
    {
      token: 'storage.type.php',
      foreground: '2DAE58',
    },
    {
      token: 'meta.class.body.php meta.function-call.php storage.type.php',
      foreground: '2DAE58',
    },
    {
      token: 'meta.class.body.php meta.function.php storage.type.php',
      foreground: '2DAE58',
    },
    {
      token: 'source.php keyword.other.DML',
      foreground: 'D94E4A',
    },
    {
      token: 'source.sql.embedded.php keyword.operator',
      foreground: '2DAE58',
    },
    {
      token: 'source.ini keyword',
      foreground: '11658F',
    },
    {
      token: 'source.toml keyword',
      foreground: '11658F',
    },
    {
      token: 'source.env variable',
      foreground: '11658F',
    },
    {
      token: 'source.ini entity.name.section',
      foreground: 'F767BB',
    },
    {
      token: 'source.toml entity.other.attribute-name',
      foreground: 'F767BB',
    },
    {
      token: 'source.go storage.type',
      foreground: '2DAE58',
    },
    {
      token: 'keyword.import.go',
      foreground: 'FF5C56',
    },
    {
      token: 'keyword.package.go',
      foreground: 'FF5C56',
    },
    {
      token: 'source.reason variable.language string',
      foreground: '565869',
    },
    {
      token: 'source.reason support.type',
      foreground: '2DAE58',
    },
    {
      token: 'source.reason constant.language',
      foreground: '2DAE58',
    },
    {
      token: 'source.reason constant.language constant.numeric',
      foreground: '2DAE58',
    },
    {
      token: 'source.reason support.type string.regexp',
      foreground: '2DAE58',
    },
    {
      token: 'source.reason keyword.operator keyword.control',
      foreground: 'ADB1C2',
    },
    {
      token: 'source.reason keyword.control.less',
      foreground: 'ADB1C2',
    },
    {
      token: 'source.reason keyword.control.flow',
      foreground: 'ADB1C2',
    },
    {
      token: 'source.reason string.regexp',
      foreground: 'CF9C00',
    },
    {
      token: 'source.reason support.property-value',
      foreground: '11658F',
    },
    {
      token: 'source.rust support.function.core.rust',
      foreground: '11658F',
    },
    {
      token: 'source.rust storage.type.core.rust',
      foreground: '2DAE58',
    },
    {
      token: 'source.rust storage.class.std',
      foreground: '2DAE58',
    },
    {
      token: 'source.rust entity.name.type.rust',
      foreground: '13BBB7',
    },
    {
      token: 'storage.type.function.coffee',
      foreground: 'ADB1C2',
    },
    {
      token: 'keyword.type.cs',
      foreground: '2DAE58',
    },
    {
      token: 'storage.type.cs',
      foreground: '2DAE58',
    },
    {
      token: 'entity.name.type.namespace.cs',
      foreground: '13BBB7',
    },
    {
      token: 'meta.diff.header',
      foreground: '11658F',
    },
    {
      token: 'markup.inserted.diff',
      foreground: '2DAE58',
    },
    {
      token: 'markup.deleted.diff',
      foreground: 'FF5C56',
    },
    {
      token: 'meta.diff.range',
      foreground: '09A1ED',
    },
    {
      token: 'meta.diff.index',
      foreground: '09A1ED',
    },
    {
      token: 'meta.separator',
      foreground: '09A1ED',
    },
    {
      token: 'source.makefile variable',
      foreground: '11658F',
    },
    {
      token: 'keyword.control.protocol-specification.objc',
      foreground: 'F767BB',
    },
    {
      token: 'meta.parens storage.type.objc',
      foreground: '2DAE58',
    },
    {
      token: 'meta.return-type.objc support.class',
      foreground: '2DAE58',
    },
    {
      token: 'meta.return-type.objc storage.type.objc',
      foreground: '2DAE58',
    },
    {
      token: 'source.sql keyword',
      foreground: '11658F',
    },
    {
      token: 'keyword.other.special-method.dockerfile',
      foreground: '09A1ED',
    },
    {
      token: 'constant.other.symbol.elixir',
      foreground: '11658F',
    },
    {
      token: 'storage.type.elm',
      foreground: '13BBB7',
    },
    {
      token: 'support.module.elm',
      foreground: '13BBB7',
    },
    {
      token: 'source.elm keyword.other',
      foreground: 'ADB1C2',
    },
    {
      token: 'source.erlang entity.name.type.class',
      foreground: '13BBB7',
    },
    {
      token: 'variable.other.field.erlang',
      foreground: '11658F',
    },
    {
      token: 'source.erlang constant.other.symbol',
      foreground: '2DAE58',
    },
    {
      token: 'storage.type.haskell',
      foreground: '2DAE58',
    },
    {
      token: 'meta.declaration.class.haskell storage.type.haskell',
      foreground: '13BBB7',
    },
    {
      token: 'meta.declaration.instance.haskell storage.type.haskell',
      foreground: '13BBB7',
    },
    {
      token: 'meta.preprocessor.haskell',
      foreground: '75798F',
    },
    {
      token: 'source.haskell keyword.control',
      foreground: 'F767BB',
    },
    {
      token: 'tag.end.latte',
      foreground: 'ADB1C2',
    },
    {
      token: 'tag.begin.latte',
      foreground: 'ADB1C2',
    },
    {
      token: 'source.po keyword.control',
      foreground: '11658F',
    },
    {
      token: 'source.po storage.type',
      foreground: '9194A2',
    },
    {
      token: 'constant.language.po',
      foreground: '13BBB7',
    },
    {
      token: 'meta.header.po string',
      foreground: 'FF8380',
    },
    {
      token: 'source.po meta.header.po',
      foreground: 'ADB1C2',
    },
    {
      token: 'source.ocaml punctuation.definition.tag emphasis',
      foreground: 'F767BB',
    },
    {
      token: 'source.ocaml entity.name.class constant.numeric',
      foreground: 'F767BB',
    },
    {
      token: 'source.ocaml support.type',
      foreground: 'F767BB',
    },
    {
      token: 'source.ocaml constant.numeric entity.other.attribute-name',
      foreground: '13BBB7',
    },
    {
      token: 'source.ocaml comment meta.separator',
      foreground: 'ADB1C2',
    },
    {
      token: 'source.ocaml support.type strong',
      foreground: 'ADB1C2',
    },
    {
      token: 'source.ocaml keyword.control strong',
      foreground: 'ADB1C2',
    },
    {
      token: 'source.ocaml support.constant.property-value',
      foreground: '11658F',
    },
    {
      token: 'source.scala entity.name.class',
      foreground: '13BBB7',
    },
    {
      token: 'storage.type.scala',
      foreground: '2DAE58',
    },
    {
      token: 'variable.parameter.scala',
      foreground: '11658F',
    },
    {
      token: 'meta.bracket.scala',
      foreground: 'ADB1C2',
    },
    {
      token: 'meta.colon.scala',
      foreground: 'ADB1C2',
    },
    {
      token: 'meta.metadata.simple.clojure',
      foreground: 'ADB1C2',
    },
    {
      token: 'meta.metadata.simple.clojure meta.symbol',
      foreground: '13BBB7',
    },
    {
      token: 'source.r keyword.other',
      foreground: 'ADB1C2',
    },
    {
      token: 'source.svelte meta.block.ts entity.name.label',
      foreground: '11658F',
    },
    {
      token: 'keyword.operator.word.applescript',
      foreground: 'F767BB',
    },
    {
      token: 'meta.function-call.livescript',
      foreground: '09A1ED',
    },
    {
      token: 'variable.language.self.lua',
      foreground: '13BBB7',
    },
    {
      token: 'entity.name.type.class.swift',
      foreground: '13BBB7',
    },
    {
      token: 'meta.inheritance-clause.swift',
      foreground: '13BBB7',
    },
    {
      token: 'meta.import.swift entity.name.type',
      foreground: '13BBB7',
    },
    {
      token: 'source.swift punctuation.section.embedded',
      foreground: 'B38700',
    },
    {
      token: 'variable.parameter.function.swift entity.name.function.swift',
      foreground: '565869',
    },
    {
      token: 'meta.function-call.twig',
      foreground: '565869',
    },
    {
      token: 'string.unquoted.tag-string.django',
      foreground: '565869',
    },
    {
      token: 'entity.tag.tagbraces.django',
      foreground: 'ADB1C2',
    },
    {
      token: 'entity.tag.filter-pipe.django',
      foreground: 'ADB1C2',
    },
    {
      token: 'meta.section.attributes.haml constant.language',
      foreground: 'FF8380',
    },
    {
      token: 'meta.section.attributes.plain.haml constant.other.symbol',
      foreground: 'FF8380',
    },
    {
      token: 'meta.prolog.haml',
      foreground: '9194A2',
    },
    {
      token: 'support.constant.handlebars',
      foreground: 'ADB1C2',
    },
    {
      token: 'text.log log.constant',
      foreground: 'C25193',
    },
    {
      token: 'source.c string constant.other.placeholder',
      foreground: 'B38700',
    },
    {
      token: 'source.cpp string constant.other.placeholder',
      foreground: 'B38700',
    },
    {
      token: 'constant.other.key.groovy',
      foreground: '11658F',
    },
    {
      token: 'storage.type.groovy',
      foreground: '13BBB7',
    },
    {
      token: 'meta.definition.variable.groovy storage.type.groovy',
      foreground: '2DAE58',
    },
    {
      token: 'storage.modifier.import.groovy',
      foreground: 'CF9C00',
    },
    {
      token: 'entity.other.attribute-name.class.pug',
      foreground: '13BBB7',
    },
    {
      token: 'entity.other.attribute-name.id.pug',
      foreground: '13BBB7',
    },
    {
      token: 'constant.name.attribute.tag.pug',
      foreground: 'ADB1C2',
    },
    {
      token: 'entity.name.tag.style.html',
      foreground: '13BBB7',
    },
    {
      token: 'entity.name.type.wasm',
      foreground: '2DAE58',
    },
  ],
} as const satisfies monaco.editor.IStandaloneThemeData;
