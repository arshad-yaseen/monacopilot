import * as monaco from 'monaco-editor';

export default {
  base: 'vs-dark',
  inherit: false,
  colors: {
    'activityBar.activeBackground': '#BD93F910',
    'activityBar.activeBorder': '#FF79C680',
    'activityBar.background': '#343746',
    'activityBar.foreground': '#f6f6f4',
    'activityBar.inactiveForeground': '#7b7f8b',
    'activityBarBadge.background': '#f286c4',
    'activityBarBadge.foreground': '#f6f6f4',
    'badge.background': '#44475A',
    'badge.foreground': '#f6f6f4',
    'breadcrumb.activeSelectionForeground': '#f6f6f4',
    'breadcrumb.background': '#282A36',
    'breadcrumb.focusForeground': '#f6f6f4',
    'breadcrumb.foreground': '#7b7f8b',
    'breadcrumbPicker.background': '#191A21',
    'button.background': '#44475A',
    'button.foreground': '#f6f6f4',
    'button.secondaryBackground': '#282A36',
    'button.secondaryForeground': '#f6f6f4',
    'button.secondaryHoverBackground': '#343746',
    'debugToolBar.background': '#262626',
    'diffEditor.insertedTextBackground': '#50FA7B20',
    'diffEditor.removedTextBackground': '#FF555550',
    'dropdown.background': '#343746',
    'dropdown.border': '#191A21',
    'dropdown.foreground': '#f6f6f4',
    'editor.background': '#282A36',
    'editor.findMatchBackground': '#FFB86C80',
    'editor.findMatchHighlightBackground': '#FFFFFF40',
    'editor.findRangeHighlightBackground': '#44475A75',
    'editor.foldBackground': '#21222C80',
    'editor.foreground': '#f6f6f4',
    'editor.hoverHighlightBackground': '#8BE9FD50',
    'editor.lineHighlightBorder': '#44475A',
    'editor.rangeHighlightBackground': '#BD93F915',
    'editor.selectionBackground': '#44475A',
    'editor.selectionHighlightBackground': '#424450',
    'editor.snippetFinalTabstopHighlightBackground': '#282A36',
    'editor.snippetFinalTabstopHighlightBorder': '#62e884',
    'editor.snippetTabstopHighlightBackground': '#282A36',
    'editor.snippetTabstopHighlightBorder': '#7b7f8b',
    'editor.wordHighlightBackground': '#8BE9FD50',
    'editor.wordHighlightStrongBackground': '#50FA7B50',
    'editorBracketHighlight.foreground1': '#f6f6f4',
    'editorBracketHighlight.foreground2': '#f286c4',
    'editorBracketHighlight.foreground3': '#97e1f1',
    'editorBracketHighlight.foreground4': '#62e884',
    'editorBracketHighlight.foreground5': '#bf9eee',
    'editorBracketHighlight.foreground6': '#FFB86C',
    'editorBracketHighlight.unexpectedBracket.foreground': '#ee6666',
    'editorCodeLens.foreground': '#7b7f8b',
    'editorError.foreground': '#ee6666',
    'editorGroup.border': '#bf9eee',
    'editorGroup.dropBackground': '#44475A70',
    'editorGroupHeader.tabsBackground': '#191A21',
    'editorGutter.addedBackground': '#50FA7B80',
    'editorGutter.deletedBackground': '#FF555580',
    'editorGutter.modifiedBackground': '#8BE9FD80',
    'editorHoverWidget.background': '#282A36',
    'editorHoverWidget.border': '#7b7f8b',
    'editorIndentGuide.activeBackground': '#FFFFFF45',
    'editorIndentGuide.background': '#FFFFFF1A',
    'editorLineNumber.foreground': '#7b7f8b',
    'editorLink.activeForeground': '#97e1f1',
    'editorMarkerNavigation.background': '#262626',
    'editorOverviewRuler.addedForeground': '#50FA7B80',
    'editorOverviewRuler.border': '#191A21',
    'editorOverviewRuler.currentContentForeground': '#62e884',
    'editorOverviewRuler.deletedForeground': '#FF555580',
    'editorOverviewRuler.errorForeground': '#FF555580',
    'editorOverviewRuler.incomingContentForeground': '#bf9eee',
    'editorOverviewRuler.infoForeground': '#8BE9FD80',
    'editorOverviewRuler.modifiedForeground': '#8BE9FD80',
    'editorOverviewRuler.selectionHighlightForeground': '#FFB86C',
    'editorOverviewRuler.warningForeground': '#FFB86C80',
    'editorOverviewRuler.wordHighlightForeground': '#97e1f1',
    'editorOverviewRuler.wordHighlightStrongForeground': '#62e884',
    'editorRuler.foreground': '#FFFFFF1A',
    'editorSuggestWidget.background': '#262626',
    'editorSuggestWidget.foreground': '#f6f6f4',
    'editorSuggestWidget.selectedBackground': '#44475A',
    'editorWarning.foreground': '#97e1f1',
    'editorWhitespace.foreground': '#FFFFFF1A',
    'editorWidget.background': '#262626',
    errorForeground: '#ee6666',
    'extensionButton.prominentBackground': '#50FA7B90',
    'extensionButton.prominentForeground': '#f6f6f4',
    'extensionButton.prominentHoverBackground': '#50FA7B60',
    focusBorder: '#7b7f8b',
    foreground: '#f6f6f4',
    'gitDecoration.conflictingResourceForeground': '#FFB86C',
    'gitDecoration.deletedResourceForeground': '#ee6666',
    'gitDecoration.ignoredResourceForeground': '#7b7f8b',
    'gitDecoration.modifiedResourceForeground': '#97e1f1',
    'gitDecoration.untrackedResourceForeground': '#62e884',
    'inlineChat.regionHighlight': '#343746',
    'input.background': '#282A36',
    'input.border': '#191A21',
    'input.foreground': '#f6f6f4',
    'input.placeholderForeground': '#7b7f8b',
    'inputOption.activeBorder': '#bf9eee',
    'inputValidation.errorBorder': '#ee6666',
    'inputValidation.infoBorder': '#f286c4',
    'inputValidation.warningBorder': '#FFB86C',
    'list.activeSelectionBackground': '#44475A',
    'list.activeSelectionForeground': '#f6f6f4',
    'list.dropBackground': '#44475A',
    'list.errorForeground': '#ee6666',
    'list.focusBackground': '#44475A75',
    'list.highlightForeground': '#97e1f1',
    'list.hoverBackground': '#44475A75',
    'list.inactiveSelectionBackground': '#44475A75',
    'list.warningForeground': '#FFB86C',
    'listFilterWidget.background': '#343746',
    'listFilterWidget.noMatchesOutline': '#ee6666',
    'listFilterWidget.outline': '#424450',
    'merge.currentHeaderBackground': '#50FA7B90',
    'merge.incomingHeaderBackground': '#BD93F990',
    'panel.background': '#282A36',
    'panel.border': '#bf9eee',
    'panelTitle.activeBorder': '#f286c4',
    'panelTitle.activeForeground': '#f6f6f4',
    'panelTitle.inactiveForeground': '#7b7f8b',
    'peekView.border': '#44475A',
    'peekViewEditor.background': '#282A36',
    'peekViewEditor.matchHighlightBackground': '#F1FA8C80',
    'peekViewResult.background': '#262626',
    'peekViewResult.fileForeground': '#f6f6f4',
    'peekViewResult.lineForeground': '#f6f6f4',
    'peekViewResult.matchHighlightBackground': '#F1FA8C80',
    'peekViewResult.selectionBackground': '#44475A',
    'peekViewResult.selectionForeground': '#f6f6f4',
    'peekViewTitle.background': '#191A21',
    'peekViewTitleDescription.foreground': '#7b7f8b',
    'peekViewTitleLabel.foreground': '#f6f6f4',
    'pickerGroup.border': '#bf9eee',
    'pickerGroup.foreground': '#97e1f1',
    'progressBar.background': '#f286c4',
    'selection.background': '#bf9eee',
    'settings.checkboxBackground': '#262626',
    'settings.checkboxBorder': '#191A21',
    'settings.checkboxForeground': '#f6f6f4',
    'settings.dropdownBackground': '#262626',
    'settings.dropdownBorder': '#191A21',
    'settings.dropdownForeground': '#f6f6f4',
    'settings.headerForeground': '#f6f6f4',
    'settings.modifiedItemIndicator': '#FFB86C',
    'settings.numberInputBackground': '#262626',
    'settings.numberInputBorder': '#191A21',
    'settings.numberInputForeground': '#f6f6f4',
    'settings.textInputBackground': '#262626',
    'settings.textInputBorder': '#191A21',
    'settings.textInputForeground': '#f6f6f4',
    'sideBar.background': '#262626',
    'sideBarSectionHeader.background': '#282A36',
    'sideBarSectionHeader.border': '#191A21',
    'sideBarTitle.foreground': '#f6f6f4',
    'statusBar.background': '#191A21',
    'statusBar.debuggingBackground': '#ee6666',
    'statusBar.debuggingForeground': '#191A21',
    'statusBar.foreground': '#f6f6f4',
    'statusBar.noFolderBackground': '#191A21',
    'statusBar.noFolderForeground': '#f6f6f4',
    'statusBarItem.prominentBackground': '#ee6666',
    'statusBarItem.prominentHoverBackground': '#FFB86C',
    'statusBarItem.remoteBackground': '#bf9eee',
    'statusBarItem.remoteForeground': '#282A36',
    'tab.activeBackground': '#282A36',
    'tab.activeBorderTop': '#FF79C680',
    'tab.activeForeground': '#f6f6f4',
    'tab.border': '#191A21',
    'tab.inactiveBackground': '#262626',
    'tab.inactiveForeground': '#7b7f8b',
    'terminal.ansiBlack': '#262626',
    'terminal.ansiBlue': '#bf9eee',
    'terminal.ansiBrightBlack': '#7b7f8b',
    'terminal.ansiBrightBlue': '#d6b4f7',
    'terminal.ansiBrightCyan': '#adf6f6',
    'terminal.ansiBrightGreen': '#78f09a',
    'terminal.ansiBrightMagenta': '#f49dda',
    'terminal.ansiBrightRed': '#f07c7c',
    'terminal.ansiBrightWhite': '#ffffff',
    'terminal.ansiBrightYellow': '#f6f6ae',
    'terminal.ansiCyan': '#97e1f1',
    'terminal.ansiGreen': '#62e884',
    'terminal.ansiMagenta': '#f286c4',
    'terminal.ansiRed': '#ee6666',
    'terminal.ansiWhite': '#f6f6f4',
    'terminal.ansiYellow': '#e7ee98',
    'terminal.background': '#282A36',
    'terminal.foreground': '#f6f6f4',
    'titleBar.activeBackground': '#262626',
    'titleBar.activeForeground': '#f6f6f4',
    'titleBar.inactiveBackground': '#191A21',
    'titleBar.inactiveForeground': '#7b7f8b',
    'walkThrough.embeddedEditorBackground': '#262626',
  },
  rules: [
    {
      token: 'header',
      foreground: 'bf9eee',
    },
    {
      token: 'meta.diff',
      foreground: '7b7f8b',
    },
    {
      token: 'meta.diff.header',
      foreground: '7b7f8b',
    },
    {
      token: 'markup.inserted',
      foreground: '62e884',
    },
    {
      token: 'markup.deleted',
      foreground: 'ee6666',
    },
    {
      token: 'markup.changed',
      foreground: 'FFB86C',
    },
    {
      token: 'invalid',
      foreground: 'ee6666',
    },
    {
      token: 'invalid.deprecated',
      foreground: 'f6f6f4',
    },
    {
      token: 'entity.name.filename',
      foreground: 'e7ee98',
    },
    {
      token: 'markup.error',
      foreground: 'ee6666',
    },
    {
      token: 'markup.bold',
      foreground: 'FFB86C',
    },
    {
      token: 'markup.heading',
      foreground: 'bf9eee',
    },
    {
      token: 'markup.italic',
      foreground: 'e7ee98',
    },
    {
      token: 'beginning.punctuation.definition.list.markdown',
      foreground: '97e1f1',
    },
    {
      token: 'beginning.punctuation.definition.quote.markdown',
      foreground: '97e1f1',
    },
    {
      token: 'punctuation.definition.link.restructuredtext',
      foreground: '97e1f1',
    },
    {
      token: 'markup.inline.raw',
      foreground: '62e884',
    },
    {
      token: 'markup.raw.restructuredtext',
      foreground: '62e884',
    },
    {
      token: 'markup.underline.link',
      foreground: '97e1f1',
    },
    {
      token: 'markup.underline.link.image',
      foreground: '97e1f1',
    },
    {
      token: 'meta.link.reference.def.restructuredtext',
      foreground: 'f286c4',
    },
    {
      token: 'punctuation.definition.directive.restructuredtext',
      foreground: 'f286c4',
    },
    {
      token: 'string.other.link.description',
      foreground: 'f286c4',
    },
    {
      token: 'string.other.link.title',
      foreground: 'f286c4',
    },
    {
      token: 'entity.name.directive.restructuredtext',
      foreground: 'e7ee98',
    },
    {
      token: 'markup.quote',
      foreground: 'e7ee98',
    },
    {
      token: 'meta.separator.markdown',
      foreground: '7b7f8b',
    },
    {
      token: 'fenced_code.block.language',
      foreground: '62e884',
    },
    {
      token: 'markup.raw.inner.restructuredtext',
      foreground: '62e884',
    },
    {
      token:
        'markup.fenced_code.block.markdown punctuation.definition.markdown',
      foreground: '62e884',
    },
    {
      token: 'punctuation.definition.constant.restructuredtext',
      foreground: 'bf9eee',
    },
    {
      token: 'markup.heading.markdown punctuation.definition.string.begin',
      foreground: 'bf9eee',
    },
    {
      token: 'markup.heading.markdown punctuation.definition.string.end',
      foreground: 'bf9eee',
    },
    {
      token: 'meta.paragraph.markdown punctuation.definition.string.begin',
      foreground: 'f6f6f4',
    },
    {
      token: 'meta.paragraph.markdown punctuation.definition.string.end',
      foreground: 'f6f6f4',
    },
    {
      token:
        'markup.quote.markdown meta.paragraph.markdown punctuation.definition.string.begin',
      foreground: 'e7ee98',
    },
    {
      token:
        'markup.quote.markdown meta.paragraph.markdown punctuation.definition.string.end',
      foreground: 'e7ee98',
    },
    {
      token: 'entity.name.type.class',
      foreground: '97e1f1',
    },
    {
      token: 'entity.name.class',
      foreground: '97e1f1',
    },
    {
      token: 'keyword.expressions-and-types.swift',
      foreground: 'bf9eee',
    },
    {
      token: 'keyword.other.this',
      foreground: 'bf9eee',
    },
    {
      token: 'variable.language',
      foreground: 'bf9eee',
    },
    {
      token: 'variable.language punctuation.definition.variable.php',
      foreground: 'bf9eee',
    },
    {
      token: 'variable.other.readwrite.instance.ruby',
      foreground: 'bf9eee',
    },
    {
      token: 'variable.parameter.function.language.special',
      foreground: 'bf9eee',
    },
    {
      token: 'entity.other.inherited-class',
      foreground: '97e1f1',
    },
    {
      token: 'comment',
      foreground: '7b7f8b',
    },
    {
      token: 'punctuation.definition.comment',
      foreground: '7b7f8b',
    },
    {
      token: 'unused.comment',
      foreground: '7b7f8b',
    },
    {
      token: 'wildcard.comment',
      foreground: '7b7f8b',
    },
    {
      token: 'comment keyword.codetag.notation',
      foreground: 'f286c4',
    },
    {
      token: 'comment.block.documentation keyword',
      foreground: 'f286c4',
    },
    {
      token: 'comment.block.documentation storage.type.class',
      foreground: 'f286c4',
    },
    {
      token: 'comment.block.documentation entity.name.type',
      foreground: '97e1f1',
    },
    {
      token:
        'comment.block.documentation entity.name.type punctuation.definition.bracket',
      foreground: '97e1f1',
    },
    {
      token: 'comment.block.documentation variable',
      foreground: 'FFB86C',
    },
    {
      token: 'constant',
      foreground: 'bf9eee',
    },
    {
      token: 'variable.other.constant',
      foreground: 'bf9eee',
    },
    {
      token: 'constant.character.escape',
      foreground: 'f286c4',
    },
    {
      token: 'constant.character.string.escape',
      foreground: 'f286c4',
    },
    {
      token: 'constant.regexp',
      foreground: 'f286c4',
    },
    {
      token: 'entity.name.tag',
      foreground: 'f286c4',
    },
    {
      token: 'entity.other.attribute-name.parent-selector',
      foreground: 'f286c4',
    },
    {
      token: 'entity.other.attribute-name',
      foreground: '62e884',
    },
    {
      token: 'entity.name.function',
      foreground: '62e884',
    },
    {
      token: 'meta.function-call.object',
      foreground: '62e884',
    },
    {
      token: 'meta.function-call.php',
      foreground: '62e884',
    },
    {
      token: 'meta.function-call.static',
      foreground: '62e884',
    },
    {
      token: 'meta.method-call.java meta.method',
      foreground: '62e884',
    },
    {
      token: 'meta.method.groovy',
      foreground: '62e884',
    },
    {
      token: 'support.function.any-method.lua',
      foreground: '62e884',
    },
    {
      token: 'keyword.operator.function.infix',
      foreground: '62e884',
    },
    {
      token: 'entity.name.variable.parameter',
      foreground: 'FFB86C',
    },
    {
      token: 'meta.at-rule.function variable',
      foreground: 'FFB86C',
    },
    {
      token: 'meta.at-rule.mixin variable',
      foreground: 'FFB86C',
    },
    {
      token: 'meta.function.arguments variable.other.php',
      foreground: 'FFB86C',
    },
    {
      token:
        'meta.selectionset.graphql meta.arguments.graphql variable.arguments.graphql',
      foreground: 'FFB86C',
    },
    {
      token: 'variable.parameter',
      foreground: 'FFB86C',
    },
    {
      token: 'meta.decorator variable.other.readwrite',
      foreground: '62e884',
    },
    {
      token: 'meta.decorator variable.other.property',
      foreground: '62e884',
    },
    {
      token: 'meta.decorator variable.other.object',
      foreground: '62e884',
    },
    {
      token: 'keyword',
      foreground: 'f286c4',
    },
    {
      token: 'punctuation.definition.keyword',
      foreground: 'f286c4',
    },
    {
      token: 'meta.selector',
      foreground: 'f286c4',
    },
    {
      token: 'support',
      foreground: '97e1f1',
    },
    {
      token: 'support.function.magic',
      foreground: 'bf9eee',
    },
    {
      token: 'support.variable',
      foreground: 'bf9eee',
    },
    {
      token: 'variable.other.predefined',
      foreground: 'bf9eee',
    },
    {
      token:
        'constant.other.symbol.hashkey punctuation.definition.constant.ruby',
      foreground: 'f286c4',
    },
    {
      token: 'entity.other.attribute-name.placeholder punctuation',
      foreground: 'f286c4',
    },
    {
      token: 'entity.other.attribute-name.pseudo-class punctuation',
      foreground: 'f286c4',
    },
    {
      token: 'entity.other.attribute-name.pseudo-element punctuation',
      foreground: 'f286c4',
    },
    {
      token: 'meta.group.double.toml',
      foreground: 'f286c4',
    },
    {
      token: 'meta.group.toml',
      foreground: 'f286c4',
    },
    {
      token: 'meta.object-binding-pattern-variable punctuation.destructuring',
      foreground: 'f286c4',
    },
    {
      token: 'punctuation.colon.graphql',
      foreground: 'f286c4',
    },
    {
      token: 'punctuation.definition.block.scalar.folded.yaml',
      foreground: 'f286c4',
    },
    {
      token: 'punctuation.definition.block.scalar.literal.yaml',
      foreground: 'f286c4',
    },
    {
      token: 'punctuation.definition.block.sequence.item.yaml',
      foreground: 'f286c4',
    },
    {
      token: 'punctuation.definition.entity.other.inherited-class',
      foreground: 'f286c4',
    },
    {
      token: 'punctuation.function.swift',
      foreground: 'f286c4',
    },
    {
      token: 'punctuation.separator.dictionary.key-value',
      foreground: 'f286c4',
    },
    {
      token: 'punctuation.separator.hash',
      foreground: 'f286c4',
    },
    {
      token: 'punctuation.separator.inheritance',
      foreground: 'f286c4',
    },
    {
      token: 'punctuation.separator.key-value',
      foreground: 'f286c4',
    },
    {
      token: 'punctuation.separator.key-value.mapping.yaml',
      foreground: 'f286c4',
    },
    {
      token: 'punctuation.separator.namespace',
      foreground: 'f286c4',
    },
    {
      token: 'punctuation.separator.pointer-access',
      foreground: 'f286c4',
    },
    {
      token: 'punctuation.separator.slice',
      foreground: 'f286c4',
    },
    {
      token: 'string.unquoted.heredoc punctuation.definition.string',
      foreground: 'f286c4',
    },
    {
      token: 'support.other.chomping-indicator.yaml',
      foreground: 'f286c4',
    },
    {
      token: 'punctuation.separator.annotation',
      foreground: 'f286c4',
    },
    {
      token: 'keyword.operator.other.powershell',
      foreground: 'f6f6f4',
    },
    {
      token: 'keyword.other.statement-separator.powershell',
      foreground: 'f6f6f4',
    },
    {
      token: 'meta.brace.round',
      foreground: 'f6f6f4',
    },
    {
      token: 'meta.function-call punctuation',
      foreground: 'f6f6f4',
    },
    {
      token: 'punctuation.definition.arguments.begin',
      foreground: 'f6f6f4',
    },
    {
      token: 'punctuation.definition.arguments.end',
      foreground: 'f6f6f4',
    },
    {
      token: 'punctuation.definition.entity.begin',
      foreground: 'f6f6f4',
    },
    {
      token: 'punctuation.definition.entity.end',
      foreground: 'f6f6f4',
    },
    {
      token: 'punctuation.definition.tag.cs',
      foreground: 'f6f6f4',
    },
    {
      token: 'punctuation.definition.type.begin',
      foreground: 'f6f6f4',
    },
    {
      token: 'punctuation.definition.type.end',
      foreground: 'f6f6f4',
    },
    {
      token: 'punctuation.section.scope.begin',
      foreground: 'f6f6f4',
    },
    {
      token: 'punctuation.section.scope.end',
      foreground: 'f6f6f4',
    },
    {
      token: 'punctuation.terminator.expression.php',
      foreground: 'f6f6f4',
    },
    {
      token: 'storage.type.generic.java',
      foreground: 'f6f6f4',
    },
    {
      token: 'string.template meta.brace',
      foreground: 'f6f6f4',
    },
    {
      token: 'string.template punctuation.accessor',
      foreground: 'f6f6f4',
    },
    {
      token:
        'meta.string-contents.quoted.double punctuation.definition.variable',
      foreground: 'f286c4',
    },
    {
      token: 'punctuation.definition.interpolation.begin',
      foreground: 'f286c4',
    },
    {
      token: 'punctuation.definition.interpolation.end',
      foreground: 'f286c4',
    },
    {
      token: 'punctuation.definition.template-expression.begin',
      foreground: 'f286c4',
    },
    {
      token: 'punctuation.definition.template-expression.end',
      foreground: 'f286c4',
    },
    {
      token: 'punctuation.section.embedded.begin',
      foreground: 'f286c4',
    },
    {
      token: 'punctuation.section.embedded.coffee',
      foreground: 'f286c4',
    },
    {
      token: 'punctuation.section.embedded.end',
      foreground: 'f286c4',
    },
    {
      token: 'punctuation.section.embedded.end source.php',
      foreground: 'f286c4',
    },
    {
      token: 'punctuation.section.embedded.end source.ruby',
      foreground: 'f286c4',
    },
    {
      token: 'punctuation.definition.variable.makefile',
      foreground: 'f286c4',
    },
    {
      token: 'entity.name.function.target.makefile',
      foreground: '97e1f1',
    },
    {
      token: 'entity.name.section.toml',
      foreground: '97e1f1',
    },
    {
      token: 'entity.name.tag.yaml',
      foreground: '97e1f1',
    },
    {
      token: 'variable.other.key.toml',
      foreground: '97e1f1',
    },
    {
      token: 'constant.other.date',
      foreground: 'FFB86C',
    },
    {
      token: 'constant.other.timestamp',
      foreground: 'FFB86C',
    },
    {
      token: 'variable.other.alias.yaml',
      foreground: '62e884',
    },
    {
      token: 'storage',
      foreground: 'f286c4',
    },
    {
      token: 'meta.implementation storage.type.objc',
      foreground: 'f286c4',
    },
    {
      token: 'meta.interface-or-protocol storage.type.objc',
      foreground: 'f286c4',
    },
    {
      token: 'source.groovy storage.type.def',
      foreground: 'f286c4',
    },
    {
      token: 'entity.name.type',
      foreground: '97e1f1',
    },
    {
      token: 'keyword.primitive-datatypes.swift',
      foreground: '97e1f1',
    },
    {
      token: 'keyword.type.cs',
      foreground: '97e1f1',
    },
    {
      token: 'meta.protocol-list.objc',
      foreground: '97e1f1',
    },
    {
      token: 'meta.return-type.objc',
      foreground: '97e1f1',
    },
    {
      token: 'source.go storage.type',
      foreground: '97e1f1',
    },
    {
      token: 'source.groovy storage.type',
      foreground: '97e1f1',
    },
    {
      token: 'source.java storage.type',
      foreground: '97e1f1',
    },
    {
      token: 'source.powershell entity.other.attribute-name',
      foreground: '97e1f1',
    },
    {
      token: 'storage.class.std.rust',
      foreground: '97e1f1',
    },
    {
      token: 'storage.type.attribute.swift',
      foreground: '97e1f1',
    },
    {
      token: 'storage.type.c',
      foreground: '97e1f1',
    },
    {
      token: 'storage.type.core.rust',
      foreground: '97e1f1',
    },
    {
      token: 'storage.type.cs',
      foreground: '97e1f1',
    },
    {
      token: 'storage.type.groovy',
      foreground: '97e1f1',
    },
    {
      token: 'storage.type.objc',
      foreground: '97e1f1',
    },
    {
      token: 'storage.type.php',
      foreground: '97e1f1',
    },
    {
      token: 'storage.type.haskell',
      foreground: '97e1f1',
    },
    {
      token: 'storage.type.ocaml',
      foreground: '97e1f1',
    },
    {
      token: 'entity.name.type.type-parameter',
      foreground: 'FFB86C',
    },
    {
      token: 'meta.indexer.mappedtype.declaration entity.name.type',
      foreground: 'FFB86C',
    },
    {
      token: 'meta.type.parameters entity.name.type',
      foreground: 'FFB86C',
    },
    {
      token: 'storage.modifier',
      foreground: 'f286c4',
    },
    {
      token: 'string.regexp',
      foreground: 'e7ee98',
    },
    {
      token: 'constant.other.character-class.set.regexp',
      foreground: 'e7ee98',
    },
    {
      token: 'constant.character.escape.backslash.regexp',
      foreground: 'e7ee98',
    },
    {
      token: 'punctuation.definition.group.capture.regexp',
      foreground: 'f286c4',
    },
    {
      token: 'string.regexp punctuation.definition.string.begin',
      foreground: 'ee6666',
    },
    {
      token: 'string.regexp punctuation.definition.string.end',
      foreground: 'ee6666',
    },
    {
      token: 'punctuation.definition.character-class.regexp',
      foreground: '97e1f1',
    },
    {
      token: 'punctuation.definition.group.regexp',
      foreground: 'FFB86C',
    },
    {
      token: 'punctuation.definition.group.assertion.regexp',
      foreground: 'ee6666',
    },
    {
      token: 'keyword.operator.negation.regexp',
      foreground: 'ee6666',
    },
    {
      token: 'meta.assertion.look-ahead.regexp',
      foreground: '62e884',
    },
    {
      token: 'string',
      foreground: 'e7ee98',
    },
    {
      token: 'punctuation.definition.string.begin',
      foreground: 'dee492',
    },
    {
      token: 'punctuation.definition.string.end',
      foreground: 'dee492',
    },
    {
      token: 'punctuation.support.type.property-name.begin',
      foreground: '97e2f2',
    },
    {
      token: 'punctuation.support.type.property-name.end',
      foreground: '97e2f2',
    },
    {
      token: 'string.quoted.docstring.multi',
      foreground: '7b7f8b',
    },
    {
      token:
        'string.quoted.docstring.multi.python punctuation.definition.string.begin',
      foreground: '7b7f8b',
    },
    {
      token:
        'string.quoted.docstring.multi.python punctuation.definition.string.end',
      foreground: '7b7f8b',
    },
    {
      token: 'string.quoted.docstring.multi.python constant.character.escape',
      foreground: '7b7f8b',
    },
    {
      token: 'variable',
      foreground: 'f6f6f4',
    },
    {
      token: 'constant.other.key.perl',
      foreground: 'f6f6f4',
    },
    {
      token: 'support.variable.property',
      foreground: 'f6f6f4',
    },
    {
      token: 'variable.other.constant.js',
      foreground: 'f6f6f4',
    },
    {
      token: 'variable.other.constant.ts',
      foreground: 'f6f6f4',
    },
    {
      token: 'variable.other.constant.tsx',
      foreground: 'f6f6f4',
    },
    {
      token: 'meta.import variable.other.readwrite',
      foreground: 'FFB86C',
    },
    {
      token: 'meta.variable.assignment.destructured.object.coffee variable',
      foreground: 'FFB86C',
    },
    {
      token: 'meta.import variable.other.readwrite.alias',
      foreground: 'f6f6f4',
    },
    {
      token: 'meta.export variable.other.readwrite.alias',
      foreground: 'f6f6f4',
    },
    {
      token:
        'meta.variable.assignment.destructured.object.coffee variable variable',
      foreground: 'f6f6f4',
    },
    {
      token: 'meta.selectionset.graphql variable',
      foreground: 'e7ee98',
    },
    {
      token: 'meta.selectionset.graphql meta.arguments variable',
      foreground: 'f6f6f4',
    },
    {
      token: 'entity.name.fragment.graphql',
      foreground: '97e1f1',
    },
    {
      token: 'variable.fragment.graphql',
      foreground: '97e1f1',
    },
    {
      token: 'constant.other.symbol.hashkey.ruby',
      foreground: 'f6f6f4',
    },
    {
      token: 'keyword.operator.dereference.java',
      foreground: 'f6f6f4',
    },
    {
      token: 'keyword.operator.navigation.groovy',
      foreground: 'f6f6f4',
    },
    {
      token: 'meta.scope.for-loop.shell punctuation.definition.string.begin',
      foreground: 'f6f6f4',
    },
    {
      token: 'meta.scope.for-loop.shell punctuation.definition.string.end',
      foreground: 'f6f6f4',
    },
    {
      token: 'meta.scope.for-loop.shell string',
      foreground: 'f6f6f4',
    },
    {
      token: 'storage.modifier.import',
      foreground: 'f6f6f4',
    },
    {
      token: 'punctuation.section.embedded.begin.tsx',
      foreground: 'f6f6f4',
    },
    {
      token: 'punctuation.section.embedded.end.tsx',
      foreground: 'f6f6f4',
    },
    {
      token: 'punctuation.section.embedded.begin.jsx',
      foreground: 'f6f6f4',
    },
    {
      token: 'punctuation.section.embedded.end.jsx',
      foreground: 'f6f6f4',
    },
    {
      token: 'punctuation.separator.list.comma.css',
      foreground: 'f6f6f4',
    },
    {
      token: 'constant.language.empty-list.haskell',
      foreground: 'f6f6f4',
    },
    {
      token: 'source.shell variable.other',
      foreground: 'bf9eee',
    },
    {
      token: 'support.constant',
      foreground: 'bf9eee',
    },
    {
      token: 'meta.scope.prerequisites.makefile',
      foreground: 'e7ee98',
    },
    {
      token: 'meta.attribute-selector.scss',
      foreground: 'e7ee98',
    },
    {
      token:
        'punctuation.definition.attribute-selector.end.bracket.square.scss',
      foreground: 'f6f6f4',
    },
    {
      token:
        'punctuation.definition.attribute-selector.begin.bracket.square.scss',
      foreground: 'f6f6f4',
    },
    {
      token: 'meta.preprocessor.haskell',
      foreground: '7b7f8b',
    },
    {
      token: 'log.error',
      foreground: 'ee6666',
    },
    {
      token: 'log.warning',
      foreground: 'e7ee98',
    },
  ],
} as const satisfies monaco.editor.IStandaloneThemeData;
