import * as monaco from 'monaco-editor';

export default {
  base: 'vs-dark',
  inherit: false,
  colors: {
    'activityBar.background': '#16161e',
    'activityBar.border': '#16161e',
    'activityBar.foreground': '#787c99',
    'activityBar.inactiveForeground': '#3b3e52',
    'activityBarBadge.background': '#3d59a1',
    'activityBarBadge.foreground': '#ffffff',
    'badge.background': '#7e83b230',
    'badge.foreground': '#acb0d0',
    'breadcrumb.activeSelectionForeground': '#a9b1d6',
    'breadcrumb.background': '#16161e',
    'breadcrumb.focusForeground': '#a9b1d6',
    'breadcrumb.foreground': '#515670',
    'breadcrumbPicker.background': '#16161e',
    'button.background': '#3d59a1dd',
    'button.foreground': '#ffffff',
    'button.hoverBackground': '#3d59a1AA',
    'button.secondaryBackground': '#3b3e52',
    'charts.blue': '#7aa2f7',
    'charts.foreground': '#9AA5CE',
    'charts.green': '#41a6b5',
    'charts.lines': '#16161e',
    'charts.orange': '#ff9e64',
    'charts.purple': '#9d7cd8',
    'charts.red': '#f7768e',
    'charts.yellow': '#e0af68',
    'debugConsole.errorForeground': '#bb616b',
    'debugConsole.infoForeground': '#787c99',
    'debugConsole.sourceForeground': '#787c99',
    'debugConsole.warningForeground': '#c49a5a',
    'debugConsoleInputIcon.foreground': '#73daca',
    'debugExceptionWidget.background': '#101014',
    'debugExceptionWidget.border': '#963c47',
    'debugIcon.breakpointDisabledForeground': '#414761',
    'debugIcon.breakpointForeground': '#db4b4b',
    'debugIcon.breakpointUnverifiedForeground': '#c24242',
    'debugTokenExpression.boolean': '#ff9e64',
    'debugTokenExpression.error': '#bb616b',
    'debugTokenExpression.name': '#7dcfff',
    'debugTokenExpression.number': '#ff9e64',
    'debugTokenExpression.string': '#9ece6a',
    'debugTokenExpression.value': '#9aa5ce',
    'debugToolBar.background': '#101014',
    'debugView.stateLabelBackground': '#14141b',
    'debugView.stateLabelForeground': '#787c99',
    'debugView.valueChangedHighlight': '#3d59a1aa',
    descriptionForeground: '#515670',
    'diffEditor.diagonalFill': '#292e42',
    'diffEditor.insertedLineBackground': '#41a6b520',
    'diffEditor.insertedTextBackground': '#41a6b520',
    'diffEditor.removedLineBackground': '#db4b4b22',
    'diffEditor.removedTextBackground': '#db4b4b22',
    'diffEditorGutter.insertedLineBackground': '#41a6b525',
    'diffEditorGutter.removedLineBackground': '#db4b4b22',
    'diffEditorOverview.insertedForeground': '#41a6b525',
    'diffEditorOverview.removedForeground': '#db4b4b22',
    'dropdown.background': '#14141b',
    'dropdown.foreground': '#787c99',
    'dropdown.listBackground': '#14141b',
    'editor.background': '#1a1b26',
    'editor.findMatchBackground': '#3d59a166',
    'editor.findMatchBorder': '#e0af68',
    'editor.findMatchHighlightBackground': '#3d59a166',
    'editor.findRangeHighlightBackground': '#515c7e33',
    'editor.focusedStackFrameHighlightBackground': '#73daca20',
    'editor.foldBackground': '#1111174a',
    'editor.foreground': '#a9b1d6',
    'editor.inactiveSelectionBackground': '#515c7e25',
    'editor.lineHighlightBackground': '#1e202e',
    'editor.rangeHighlightBackground': '#515c7e20',
    'editor.selectionBackground': '#515c7e4d',
    'editor.selectionHighlightBackground': '#515c7e44',
    'editor.stackFrameHighlightBackground': '#E2BD3A20',
    'editor.wordHighlightBackground': '#515c7e44',
    'editor.wordHighlightStrongBackground': '#515c7e55',
    'editorBracketHighlight.foreground1': '#698cd6',
    'editorBracketHighlight.foreground2': '#68b3de',
    'editorBracketHighlight.foreground3': '#9a7ecc',
    'editorBracketHighlight.foreground4': '#25aac2',
    'editorBracketHighlight.foreground5': '#80a856',
    'editorBracketHighlight.foreground6': '#c49a5a',
    'editorBracketHighlight.unexpectedBracket.foreground': '#db4b4b',
    'editorBracketMatch.background': '#16161e',
    'editorBracketMatch.border': '#42465d',
    'editorBracketPairGuide.activeBackground1': '#698cd6',
    'editorBracketPairGuide.activeBackground2': '#68b3de',
    'editorBracketPairGuide.activeBackground3': '#9a7ecc',
    'editorBracketPairGuide.activeBackground4': '#25aac2',
    'editorBracketPairGuide.activeBackground5': '#80a856',
    'editorBracketPairGuide.activeBackground6': '#c49a5a',
    'editorCodeLens.foreground': '#51597d',
    'editorCursor.foreground': '#c0caf5',
    'editorError.foreground': '#db4b4b',
    'editorGhostText.foreground': '#646e9c',
    'editorGroup.border': '#101014',
    'editorGroup.dropBackground': '#1e202e',
    'editorGroupHeader.border': '#101014',
    'editorGroupHeader.noTabsBackground': '#16161e',
    'editorGroupHeader.tabsBackground': '#16161e',
    'editorGroupHeader.tabsBorder': '#101014',
    'editorGutter.addedBackground': '#164846',
    'editorGutter.deletedBackground': '#823c41',
    'editorGutter.modifiedBackground': '#394b70',
    'editorHint.foreground': '#0da0ba',
    'editorHoverWidget.background': '#16161e',
    'editorHoverWidget.border': '#101014',
    'editorIndentGuide.activeBackground': '#363b54',
    'editorIndentGuide.background': '#1e202e',
    'editorInfo.foreground': '#0da0ba',
    'editorLightBulb.foreground': '#e0af68',
    'editorLightBulbAutoFix.foreground': '#e0af68',
    'editorLineNumber.activeForeground': '#737aa2',
    'editorLineNumber.foreground': '#363b54',
    'editorLink.activeForeground': '#acb0d0',
    'editorMarkerNavigation.background': '#16161e',
    'editorOverviewRuler.addedForeground': '#164846',
    'editorOverviewRuler.border': '#101014',
    'editorOverviewRuler.bracketMatchForeground': '#101014',
    'editorOverviewRuler.deletedForeground': '#703438',
    'editorOverviewRuler.errorForeground': '#db4b4b',
    'editorOverviewRuler.findMatchForeground': '#a9b1d644',
    'editorOverviewRuler.infoForeground': '#1abc9c',
    'editorOverviewRuler.modifiedForeground': '#394b70',
    'editorOverviewRuler.rangeHighlightForeground': '#a9b1d644',
    'editorOverviewRuler.selectionHighlightForeground': '#a9b1d622',
    'editorOverviewRuler.warningForeground': '#e0af68',
    'editorOverviewRuler.wordHighlightForeground': '#bb9af755',
    'editorOverviewRuler.wordHighlightStrongForeground': '#bb9af766',
    'editorPane.background': '#16161e',
    'editorRuler.foreground': '#101014',
    'editorSuggestWidget.background': '#16161e',
    'editorSuggestWidget.border': '#101014',
    'editorSuggestWidget.highlightForeground': '#6183bb',
    'editorSuggestWidget.selectedBackground': '#20222c',
    'editorWarning.foreground': '#e0af68',
    'editorWhitespace.foreground': '#363b54',
    'editorWidget.background': '#16161e',
    'editorWidget.foreground': '#787c99',
    'editorWidget.resizeBorder': '#545c7e33',
    errorForeground: '#515670',
    'extensionBadge.remoteBackground': '#3d59a1',
    'extensionBadge.remoteForeground': '#ffffff',
    'extensionButton.prominentBackground': '#3d59a1DD',
    'extensionButton.prominentForeground': '#ffffff',
    'extensionButton.prominentHoverBackground': '#3d59a1AA',
    focusBorder: '#545c7e33',
    foreground: '#787c99',
    'gitDecoration.addedResourceForeground': '#449dab',
    'gitDecoration.conflictingResourceForeground': '#e0af68cc',
    'gitDecoration.deletedResourceForeground': '#914c54',
    'gitDecoration.ignoredResourceForeground': '#515670',
    'gitDecoration.modifiedResourceForeground': '#6183bb',
    'gitDecoration.renamedResourceForeground': '#449dab',
    'gitDecoration.stageDeletedResourceForeground': '#914c54',
    'gitDecoration.stageModifiedResourceForeground': '#6183bb',
    'gitDecoration.untrackedResourceForeground': '#449dab',
    'gitlens.gutterBackgroundColor': '#16161e',
    'gitlens.gutterForegroundColor': '#787c99',
    'gitlens.gutterUncommittedForegroundColor': '#7aa2f7',
    'gitlens.trailingLineForegroundColor': '#646e9c',
    'icon.foreground': '#787c99',
    'input.background': '#14141b',
    'input.border': '#0f0f14',
    'input.foreground': '#a9b1d6',
    'input.placeholderForeground': '#787c998A',
    'inputOption.activeBackground': '#3d59a144',
    'inputOption.activeForeground': '#c0caf5',
    'inputValidation.errorBackground': '#85353e',
    'inputValidation.errorBorder': '#963c47',
    'inputValidation.errorForeground': '#bbc2e0',
    'inputValidation.infoBackground': '#3d59a15c',
    'inputValidation.infoBorder': '#3d59a1',
    'inputValidation.infoForeground': '#bbc2e0',
    'inputValidation.warningBackground': '#c2985b',
    'inputValidation.warningBorder': '#e0af68',
    'inputValidation.warningForeground': '#000000',
    'list.activeSelectionBackground': '#202330',
    'list.activeSelectionForeground': '#a9b1d6',
    'list.deemphasizedForeground': '#787c99',
    'list.dropBackground': '#1e202e',
    'list.errorForeground': '#bb616b',
    'list.focusBackground': '#1c1d29',
    'list.focusForeground': '#a9b1d6',
    'list.highlightForeground': '#668ac4',
    'list.hoverBackground': '#13131a',
    'list.hoverForeground': '#a9b1d6',
    'list.inactiveSelectionBackground': '#1c1d29',
    'list.inactiveSelectionForeground': '#a9b1d6',
    'list.invalidItemForeground': '#c97018',
    'list.warningForeground': '#c49a5a',
    'listFilterWidget.background': '#101014',
    'listFilterWidget.noMatchesOutline': '#a6333f',
    'listFilterWidget.outline': '#3d59a1',
    'menu.background': '#16161e',
    'menu.border': '#101014',
    'menu.foreground': '#787c99',
    'menu.selectionBackground': '#1e202e',
    'menu.selectionForeground': '#a9b1d6',
    'menu.separatorBackground': '#101014',
    'menubar.selectionBackground': '#1e202e',
    'menubar.selectionBorder': '#1b1e2e',
    'menubar.selectionForeground': '#a9b1d6',
    'merge.currentContentBackground': '#007a7544',
    'merge.currentHeaderBackground': '#41a6b525',
    'merge.incomingContentBackground': '#3d59a144',
    'merge.incomingHeaderBackground': '#3d59a1aa',
    'mergeEditor.change.background': '#41a6b525',
    'mergeEditor.change.word.background': '#41a6b540',
    'mergeEditor.conflict.handled.minimapOverViewRuler': '#449dab',
    'mergeEditor.conflict.handledFocused.border': '#41a6b565',
    'mergeEditor.conflict.handledUnfocused.border': '#41a6b525',
    'mergeEditor.conflict.unhandled.minimapOverViewRuler': '#e0af68',
    'mergeEditor.conflict.unhandledFocused.border': '#e0af68b0',
    'mergeEditor.conflict.unhandledUnfocused.border': '#e0af6888',
    'minimapGutter.addedBackground': '#1C5957',
    'minimapGutter.deletedBackground': '#944449',
    'minimapGutter.modifiedBackground': '#425882',
    'notebook.cellBorderColor': '#101014',
    'notebook.cellEditorBackground': '#16161e',
    'notebook.cellStatusBarItemHoverBackground': '#1c1d29',
    'notebook.editorBackground': '#1a1b26',
    'notebook.focusedCellBorder': '#29355a',
    'notificationCenterHeader.background': '#101014',
    'notificationLink.foreground': '#6183bb',
    'notifications.background': '#101014',
    'notificationsErrorIcon.foreground': '#bb616b',
    'notificationsInfoIcon.foreground': '#0da0ba',
    'notificationsWarningIcon.foreground': '#bba461',
    'panel.background': '#16161e',
    'panel.border': '#101014',
    'panelInput.border': '#16161e',
    'panelTitle.activeBorder': '#16161e',
    'panelTitle.activeForeground': '#787c99',
    'panelTitle.inactiveForeground': '#42465d',
    'peekView.border': '#101014',
    'peekViewEditor.background': '#16161e',
    'peekViewEditor.matchHighlightBackground': '#3d59a166',
    'peekViewResult.background': '#101014',
    'peekViewResult.fileForeground': '#787c99',
    'peekViewResult.lineForeground': '#a9b1d6',
    'peekViewResult.matchHighlightBackground': '#3d59a166',
    'peekViewResult.selectionBackground': '#3d59a133',
    'peekViewResult.selectionForeground': '#a9b1d6',
    'peekViewTitle.background': '#101014',
    'peekViewTitleDescription.foreground': '#787c99',
    'peekViewTitleLabel.foreground': '#a9b1d6',
    'pickerGroup.border': '#101014',
    'pickerGroup.foreground': '#a9b1d6',
    'progressBar.background': '#3d59a1',
    'sash.hoverBorder': '#29355a',
    'scrollbar.shadow': '#00000033',
    'scrollbarSlider.activeBackground': '#868bc422',
    'scrollbarSlider.background': '#868bc415',
    'scrollbarSlider.hoverBackground': '#868bc410',
    'selection.background': '#515c7e40',
    'settings.headerForeground': '#6183bb',
    'sideBar.background': '#16161e',
    'sideBar.border': '#101014',
    'sideBar.dropBackground': '#1e202e',
    'sideBar.foreground': '#787c99',
    'sideBarSectionHeader.background': '#16161e',
    'sideBarSectionHeader.border': '#101014',
    'sideBarSectionHeader.foreground': '#a9b1d6',
    'sideBarTitle.foreground': '#787c99',
    'statusBar.background': '#16161e',
    'statusBar.border': '#101014',
    'statusBar.debuggingBackground': '#16161e',
    'statusBar.debuggingForeground': '#787c99',
    'statusBar.foreground': '#787c99',
    'statusBar.noFolderBackground': '#16161e',
    'statusBarItem.activeBackground': '#101014',
    'statusBarItem.hoverBackground': '#20222c',
    'statusBarItem.prominentBackground': '#101014',
    'statusBarItem.prominentHoverBackground': '#20222c',
    'tab.activeBackground': '#16161e',
    'tab.activeBorder': '#3d59a1',
    'tab.activeForeground': '#a9b1d6',
    'tab.activeModifiedBorder': '#1a1b26',
    'tab.border': '#101014',
    'tab.hoverForeground': '#a9b1d6',
    'tab.inactiveBackground': '#16161e',
    'tab.inactiveForeground': '#787c99',
    'tab.inactiveModifiedBorder': '#1f202e',
    'tab.lastPinnedBorder': '#222333',
    'tab.unfocusedActiveBorder': '#1f202e',
    'tab.unfocusedActiveForeground': '#a9b1d6',
    'tab.unfocusedHoverForeground': '#a9b1d6',
    'tab.unfocusedInactiveForeground': '#787c99',
    'terminal.ansiBlack': '#363b54',
    'terminal.ansiBlue': '#7aa2f7',
    'terminal.ansiBrightBlack': '#363b54',
    'terminal.ansiBrightBlue': '#7aa2f7',
    'terminal.ansiBrightCyan': '#7dcfff',
    'terminal.ansiBrightGreen': '#41a6b5',
    'terminal.ansiBrightMagenta': '#bb9af7',
    'terminal.ansiBrightRed': '#f7768e',
    'terminal.ansiBrightWhite': '#acb0d0',
    'terminal.ansiBrightYellow': '#e0af68',
    'terminal.ansiCyan': '#7dcfff',
    'terminal.ansiGreen': '#73daca',
    'terminal.ansiMagenta': '#bb9af7',
    'terminal.ansiRed': '#f7768e',
    'terminal.ansiWhite': '#787c99',
    'terminal.ansiYellow': '#e0af68',
    'terminal.background': '#16161e',
    'terminal.foreground': '#787c99',
    'terminal.selectionBackground': '#515c7e4d',
    'textBlockQuote.background': '#16161e',
    'textCodeBlock.background': '#16161e',
    'textLink.activeForeground': '#7dcfff',
    'textLink.foreground': '#6183bb',
    'textPreformat.foreground': '#9699a8',
    'textSeparator.foreground': '#363b54',
    'titleBar.activeBackground': '#16161e',
    'titleBar.activeForeground': '#787c99',
    'titleBar.border': '#101014',
    'titleBar.inactiveBackground': '#16161e',
    'titleBar.inactiveForeground': '#787c99',
    'toolbar.activeBackground': '#202330',
    'toolbar.hoverBackground': '#202330',
    'tree.indentGuidesStroke': '#2b2b3b',
    'walkThrough.embeddedEditorBackground': '#16161e',
    'widget.shadow': '#ffffff00',
    'window.activeBorder': '#0d0f17',
    'window.inactiveBorder': '#0d0f17',
  },
  rules: [
    {
      token: 'comment',
      foreground: '51597d',
    },
    {
      token: 'comment.block.documentation',
      foreground: '51597d',
    },
    {
      token: 'punctuation.definition.comment',
      foreground: '51597d',
    },
    {
      token: 'comment.block.documentation punctuation',
      foreground: '51597d',
    },
    {
      token: 'keyword.operator.assignment.jsdoc',
      foreground: '5a638c',
    },
    {
      token: 'comment.block.documentation variable',
      foreground: '5a638c',
    },
    {
      token: 'comment.block.documentation storage',
      foreground: '5a638c',
    },
    {
      token: 'comment.block.documentation keyword',
      foreground: '5a638c',
    },
    {
      token: 'comment.block.documentation support',
      foreground: '5a638c',
    },
    {
      token: 'comment.block.documentation markup',
      foreground: '5a638c',
    },
    {
      token: 'comment.block.documentation markup.inline.raw.string.markdown',
      foreground: '5a638c',
    },
    {
      token: 'meta.other.type.phpdoc.php keyword.other.type.php',
      foreground: '5a638c',
    },
    {
      token: 'meta.other.type.phpdoc.php support.other.namespace.php',
      foreground: '5a638c',
    },
    {
      token: 'meta.other.type.phpdoc.php punctuation.separator.inheritance.php',
      foreground: '5a638c',
    },
    {
      token: 'meta.other.type.phpdoc.php support.class',
      foreground: '5a638c',
    },
    {
      token: 'keyword.other.phpdoc.php',
      foreground: '5a638c',
    },
    {
      token: 'log.date',
      foreground: '5a638c',
    },
    {
      token: 'meta.other.type.phpdoc.php support.class',
      foreground: '646e9c',
    },
    {
      token: 'comment.block.documentation storage.type',
      foreground: '646e9c',
    },
    {
      token: 'comment.block.documentation punctuation.definition.block.tag',
      foreground: '646e9c',
    },
    {
      token: 'comment.block.documentation entity.name.type.instance',
      foreground: '646e9c',
    },
    {
      token: 'variable.other.constant',
      foreground: 'ff9e64',
    },
    {
      token: 'punctuation.definition.constant',
      foreground: 'ff9e64',
    },
    {
      token: 'constant.language',
      foreground: 'ff9e64',
    },
    {
      token: 'constant.numeric',
      foreground: 'ff9e64',
    },
    {
      token: 'support.constant',
      foreground: 'ff9e64',
    },
    {
      token: 'constant.other.caps',
      foreground: 'ff9e64',
    },
    {
      token: 'string',
      foreground: '9ece6a',
    },
    {
      token: 'constant.other.symbol',
      foreground: '9ece6a',
    },
    {
      token: 'constant.other.key',
      foreground: '9ece6a',
    },
    {
      token: 'meta.attribute-selector',
      foreground: '9ece6a',
    },
    {
      token: 'string constant.character',
      foreground: '9ece6a',
    },
    {
      token: 'constant.other.color',
      foreground: '9aa5ce',
    },
    {
      token:
        'constant.other.color.rgb-value.hex punctuation.definition.constant',
      foreground: '9aa5ce',
    },
    {
      token: 'invalid',
      foreground: 'ff5370',
    },
    {
      token: 'invalid.illegal',
      foreground: 'ff5370',
    },
    {
      token: 'invalid.deprecated',
      foreground: 'bb9af7',
    },
    {
      token: 'storage.type',
      foreground: 'bb9af7',
    },
    {
      token: 'meta.var.expr storage.type',
      foreground: '9d7cd8',
    },
    {
      token: 'storage.modifier',
      foreground: '9d7cd8',
    },
    {
      token: 'punctuation.definition.template-expression',
      foreground: '7dcfff',
    },
    {
      token: 'punctuation.section.embedded',
      foreground: '7dcfff',
    },
    {
      token: 'meta.embedded.line.tag.smarty',
      foreground: '7dcfff',
    },
    {
      token: 'support.constant.handlebars',
      foreground: '7dcfff',
    },
    {
      token: 'punctuation.section.tag.twig',
      foreground: '7dcfff',
    },
    {
      token: 'keyword.control.smarty',
      foreground: '0db9d7',
    },
    {
      token: 'keyword.control.twig',
      foreground: '0db9d7',
    },
    {
      token: 'support.constant.handlebars keyword.control',
      foreground: '0db9d7',
    },
    {
      token: 'keyword.operator.comparison.twig',
      foreground: '0db9d7',
    },
    {
      token: 'keyword.blade',
      foreground: '0db9d7',
    },
    {
      token: 'entity.name.function.blade',
      foreground: '0db9d7',
    },
    {
      token: 'keyword.operator.spread',
      foreground: 'f7768e',
    },
    {
      token: 'keyword.operator.rest',
      foreground: 'f7768e',
    },
    {
      token: 'keyword.operator',
      foreground: '89ddff',
    },
    {
      token: 'keyword.control.as',
      foreground: '89ddff',
    },
    {
      token: 'keyword.other',
      foreground: '89ddff',
    },
    {
      token: 'keyword.operator.bitwise.shift',
      foreground: '89ddff',
    },
    {
      token: 'punctuation',
      foreground: '89ddff',
    },
    {
      token: 'expression.embbeded.vue punctuation.definition.tag',
      foreground: '89ddff',
    },
    {
      token: 'text.html.twig meta.tag.inline.any.html',
      foreground: '89ddff',
    },
    {
      token: 'meta.tag.template.value.twig meta.function.arguments.twig',
      foreground: '89ddff',
    },
    {
      token: 'meta.directive.vue punctuation.separator.key-value.html',
      foreground: '89ddff',
    },
    {
      token: 'punctuation.definition.constant.markdown',
      foreground: '89ddff',
    },
    {
      token: 'punctuation.definition.string',
      foreground: '89ddff',
    },
    {
      token: 'punctuation.support.type.property-name',
      foreground: '89ddff',
    },
    {
      token: 'text.html.vue-html meta.tag',
      foreground: '89ddff',
    },
    {
      token: 'meta.attribute.directive',
      foreground: '89ddff',
    },
    {
      token: 'punctuation.definition.keyword',
      foreground: '89ddff',
    },
    {
      token: 'punctuation.terminator.rule',
      foreground: '89ddff',
    },
    {
      token: 'punctuation.definition.entity',
      foreground: '89ddff',
    },
    {
      token: 'punctuation.separator.inheritance.php',
      foreground: '89ddff',
    },
    {
      token: 'keyword.other.template',
      foreground: '89ddff',
    },
    {
      token: 'keyword.other.substitution',
      foreground: '89ddff',
    },
    {
      token: 'entity.name.operator',
      foreground: '89ddff',
    },
    {
      token: 'meta.property-list punctuation.separator.key-value',
      foreground: '89ddff',
    },
    {
      token: 'meta.at-rule.mixin punctuation.separator.key-value',
      foreground: '89ddff',
    },
    {
      token: 'meta.at-rule.function variable.parameter.url',
      foreground: '89ddff',
    },
    {
      token: 'keyword.control.module.js',
      foreground: '7dcfff',
    },
    {
      token: 'keyword.control.import',
      foreground: '7dcfff',
    },
    {
      token: 'keyword.control.export',
      foreground: '7dcfff',
    },
    {
      token: 'keyword.control.from',
      foreground: '7dcfff',
    },
    {
      token: 'keyword.control.default',
      foreground: '7dcfff',
    },
    {
      token: 'meta.import keyword.other',
      foreground: '7dcfff',
    },
    {
      token: 'keyword',
      foreground: 'bb9af7',
    },
    {
      token: 'keyword.control',
      foreground: 'bb9af7',
    },
    {
      token: 'keyword.other.important',
      foreground: 'bb9af7',
    },
    {
      token: 'keyword.other.DML',
      foreground: '7dcfff',
    },
    {
      token: 'keyword.operator.logical',
      foreground: 'bb9af7',
    },
    {
      token: 'storage.type.function',
      foreground: 'bb9af7',
    },
    {
      token: 'keyword.operator.bitwise',
      foreground: 'bb9af7',
    },
    {
      token: 'keyword.operator.ternary',
      foreground: 'bb9af7',
    },
    {
      token: 'keyword.operator.comparison',
      foreground: 'bb9af7',
    },
    {
      token: 'keyword.operator.relational',
      foreground: 'bb9af7',
    },
    {
      token: 'keyword.operator.or.regexp',
      foreground: 'bb9af7',
    },
    {
      token: 'entity.name.tag',
      foreground: 'f7768e',
    },
    {
      token: 'entity.name.tag support.class.component',
      foreground: 'de5971',
    },
    {
      token: 'meta.tag.custom entity.name.tag',
      foreground: 'de5971',
    },
    {
      token: 'meta.tag.other.unrecognized.html.derivative entity.name.tag',
      foreground: 'de5971',
    },
    {
      token: 'meta.tag',
      foreground: 'de5971',
    },
    {
      token: 'punctuation.definition.tag',
      foreground: 'ba3c97',
    },
    {
      token: 'constant.other.php',
      foreground: 'e0af68',
    },
    {
      token: 'variable.other.global.safer',
      foreground: 'e0af68',
    },
    {
      token: 'variable.other.global.safer punctuation.definition.variable',
      foreground: 'e0af68',
    },
    {
      token: 'variable.other.global',
      foreground: 'e0af68',
    },
    {
      token: 'variable.other.global punctuation.definition.variable',
      foreground: 'e0af68',
    },
    {
      token: 'constant.other',
      foreground: 'e0af68',
    },
    {
      token: 'variable',
      foreground: 'c0caf5',
    },
    {
      token: 'support.variable',
      foreground: 'c0caf5',
    },
    {
      token: 'string constant.other.placeholder',
      foreground: 'c0caf5',
    },
    {
      token: 'variable.parameter.handlebars',
      foreground: 'c0caf5',
    },
    {
      token: 'variable.other.object',
      foreground: 'c0caf5',
    },
    {
      token: 'meta.fstring',
      foreground: 'c0caf5',
    },
    {
      token: 'meta.function-call meta.function-call.arguments',
      foreground: 'c0caf5',
    },
    {
      token: 'meta.array.literal variable',
      foreground: '7dcfff',
    },
    {
      token: 'meta.object-literal.key',
      foreground: '73daca',
    },
    {
      token: 'entity.name.type.hcl',
      foreground: '73daca',
    },
    {
      token: 'string.alias.graphql',
      foreground: '73daca',
    },
    {
      token: 'string.unquoted.graphql',
      foreground: '73daca',
    },
    {
      token: 'string.unquoted.alias.graphql',
      foreground: '73daca',
    },
    {
      token:
        'meta.group.braces.curly constant.other.object.key.js string.unquoted.label.js',
      foreground: '73daca',
    },
    {
      token: 'meta.field.declaration.ts variable.object.property',
      foreground: '73daca',
    },
    {
      token: 'meta.block entity.name.label',
      foreground: '73daca',
    },
    {
      token: 'variable.other.property',
      foreground: '7dcfff',
    },
    {
      token: 'support.variable.property',
      foreground: '7dcfff',
    },
    {
      token: 'support.variable.property.dom',
      foreground: '7dcfff',
    },
    {
      token: 'meta.function-call variable.other.object.property',
      foreground: '7dcfff',
    },
    {
      token: 'variable.other.object.property',
      foreground: 'c0caf5',
    },
    {
      token:
        'meta.objectliteral meta.object.member meta.objectliteral meta.object.member meta.objectliteral meta.object.member meta.object-literal.key',
      foreground: '41a6b5',
    },
    {
      token: 'source.cpp meta.block variable.other',
      foreground: 'f7768e',
    },
    {
      token: 'support.other.variable',
      foreground: 'f7768e',
    },
    {
      token: 'meta.class-method.js entity.name.function.js',
      foreground: '7aa2f7',
    },
    {
      token: 'entity.name.method.js',
      foreground: '7aa2f7',
    },
    {
      token: 'variable.function.constructor',
      foreground: '7aa2f7',
    },
    {
      token: 'keyword.other.special-method',
      foreground: '7aa2f7',
    },
    {
      token: 'storage.type.cs',
      foreground: '7aa2f7',
    },
    {
      token: 'entity.name.function',
      foreground: '7aa2f7',
    },
    {
      token: 'variable.other.enummember',
      foreground: '7aa2f7',
    },
    {
      token: 'meta.function-call',
      foreground: '7aa2f7',
    },
    {
      token: 'meta.function-call entity.name.function',
      foreground: '7aa2f7',
    },
    {
      token: 'variable.function',
      foreground: '7aa2f7',
    },
    {
      token: 'meta.definition.method entity.name.function',
      foreground: '7aa2f7',
    },
    {
      token: 'meta.object-literal entity.name.function',
      foreground: '7aa2f7',
    },
    {
      token: 'variable.parameter.function.language.special',
      foreground: 'e0af68',
    },
    {
      token: 'variable.parameter',
      foreground: 'e0af68',
    },
    {
      token: 'meta.function.parameters punctuation.definition.variable',
      foreground: 'e0af68',
    },
    {
      token: 'meta.function.parameter variable',
      foreground: 'e0af68',
    },
    {
      token: 'keyword.other.type.php',
      foreground: 'bb9af7',
    },
    {
      token: 'storage.type.php',
      foreground: 'bb9af7',
    },
    {
      token: 'constant.character',
      foreground: 'bb9af7',
    },
    {
      token: 'constant.escape',
      foreground: 'bb9af7',
    },
    {
      token: 'keyword.other.unit',
      foreground: 'bb9af7',
    },
    {
      token: 'meta.definition.variable variable.other.constant',
      foreground: 'bb9af7',
    },
    {
      token: 'meta.definition.variable variable.other.readwrite',
      foreground: 'bb9af7',
    },
    {
      token: 'variable.declaration.hcl variable.other.readwrite.hcl',
      foreground: 'bb9af7',
    },
    {
      token: 'meta.mapping.key.hcl variable.other.readwrite.hcl',
      foreground: 'bb9af7',
    },
    {
      token: 'variable.other.declaration',
      foreground: 'bb9af7',
    },
    {
      token: 'entity.other.inherited-class',
      foreground: 'bb9af7',
    },
    {
      token: 'support.class',
      foreground: '0db9d7',
    },
    {
      token: 'support.type',
      foreground: '0db9d7',
    },
    {
      token: 'variable.other.readwrite.alias',
      foreground: '0db9d7',
    },
    {
      token: 'support.orther.namespace.use.php',
      foreground: '0db9d7',
    },
    {
      token: 'meta.use.php',
      foreground: '0db9d7',
    },
    {
      token: 'support.other.namespace.php',
      foreground: '0db9d7',
    },
    {
      token: 'support.type.sys-types',
      foreground: '0db9d7',
    },
    {
      token: 'support.variable.dom',
      foreground: '0db9d7',
    },
    {
      token: 'support.constant.math',
      foreground: '0db9d7',
    },
    {
      token: 'support.type.object.module',
      foreground: '0db9d7',
    },
    {
      token: 'support.constant.json',
      foreground: '0db9d7',
    },
    {
      token: 'entity.name.namespace',
      foreground: '0db9d7',
    },
    {
      token: 'meta.import.qualifier',
      foreground: '0db9d7',
    },
    {
      token: 'variable.other.constant.object',
      foreground: '0db9d7',
    },
    {
      token: 'entity.name',
      foreground: 'c0caf5',
    },
    {
      token: 'support.function',
      foreground: '0db9d7',
    },
    {
      token: 'source.css support.type.property-name',
      foreground: '7aa2f7',
    },
    {
      token: 'source.sass support.type.property-name',
      foreground: '7aa2f7',
    },
    {
      token: 'source.scss support.type.property-name',
      foreground: '7aa2f7',
    },
    {
      token: 'source.less support.type.property-name',
      foreground: '7aa2f7',
    },
    {
      token: 'source.stylus support.type.property-name',
      foreground: '7aa2f7',
    },
    {
      token: 'source.postcss support.type.property-name',
      foreground: '7aa2f7',
    },
    {
      token: 'support.type.property-name.css',
      foreground: '7aa2f7',
    },
    {
      token: 'support.type.vendored.property-name',
      foreground: '7aa2f7',
    },
    {
      token: 'support.type.map.key',
      foreground: '7aa2f7',
    },
    {
      token: 'support.constant.font-name',
      foreground: '9ece6a',
    },
    {
      token: 'meta.definition.variable',
      foreground: '9ece6a',
    },
    {
      token: 'entity.other.attribute-name.class',
      foreground: '9ece6a',
    },
    {
      token: 'meta.at-rule.mixin.scss entity.name.function.scss',
      foreground: '9ece6a',
    },
    {
      token: 'entity.other.attribute-name.id',
      foreground: 'fc7b7b',
    },
    {
      token: 'entity.name.tag.css',
      foreground: '0db9d7',
    },
    {
      token:
        'entity.other.attribute-name.pseudo-class punctuation.definition.entity',
      foreground: 'e0af68',
    },
    {
      token:
        'entity.other.attribute-name.pseudo-element punctuation.definition.entity',
      foreground: 'e0af68',
    },
    {
      token: 'entity.other.attribute-name.class punctuation.definition.entity',
      foreground: 'e0af68',
    },
    {
      token: 'entity.name.tag.reference',
      foreground: 'e0af68',
    },
    {
      token: 'meta.property-list',
      foreground: '9abdf5',
    },
    {
      token: 'meta.property-list meta.at-rule.if',
      foreground: 'ff9e64',
    },
    {
      token: 'meta.at-rule.return variable.parameter.url',
      foreground: 'ff9e64',
    },
    {
      token: 'meta.property-list meta.at-rule.else',
      foreground: 'ff9e64',
    },
    {
      token:
        'entity.other.attribute-name.parent-selector-suffix punctuation.definition.entity.css',
      foreground: '73daca',
    },
    {
      token: 'meta.property-list meta.property-list',
      foreground: '9abdf5',
    },
    {
      token: 'meta.at-rule.mixin keyword.control.at-rule.mixin',
      foreground: 'bb9af7',
    },
    {
      token: 'meta.at-rule.include entity.name.function.scss',
      foreground: 'bb9af7',
    },
    {
      token: 'meta.at-rule.include keyword.control.at-rule.include',
      foreground: 'bb9af7',
    },
    {
      token: 'keyword.control.at-rule.include punctuation.definition.keyword',
      foreground: '9d7cd8',
    },
    {
      token: 'keyword.control.at-rule.mixin punctuation.definition.keyword',
      foreground: '9d7cd8',
    },
    {
      token: 'meta.at-rule.include keyword.control.at-rule.include',
      foreground: '9d7cd8',
    },
    {
      token: 'keyword.control.at-rule.extend punctuation.definition.keyword',
      foreground: '9d7cd8',
    },
    {
      token: 'meta.at-rule.extend keyword.control.at-rule.extend',
      foreground: '9d7cd8',
    },
    {
      token:
        'entity.other.attribute-name.placeholder.css punctuation.definition.entity.css',
      foreground: '9d7cd8',
    },
    {
      token: 'meta.at-rule.media keyword.control.at-rule.media',
      foreground: '9d7cd8',
    },
    {
      token: 'meta.at-rule.mixin keyword.control.at-rule.mixin',
      foreground: '9d7cd8',
    },
    {
      token: 'meta.at-rule.function keyword.control.at-rule.function',
      foreground: '9d7cd8',
    },
    {
      token: 'keyword.control punctuation.definition.keyword',
      foreground: '9d7cd8',
    },
    {
      token: 'meta.property-list meta.at-rule.include',
      foreground: 'c0caf5',
    },
    {
      token: 'support.constant.property-value',
      foreground: 'ff9e64',
    },
    {
      token: 'entity.name.module.js',
      foreground: 'c0caf5',
    },
    {
      token: 'variable.import.parameter.js',
      foreground: 'c0caf5',
    },
    {
      token: 'variable.other.class.js',
      foreground: 'c0caf5',
    },
    {
      token: 'variable.language',
      foreground: 'f7768e',
    },
    {
      token: 'variable.other punctuation.definition.variable',
      foreground: 'c0caf5',
    },
    {
      token: 'source.js constant.other.object.key.js string.unquoted.label.js',
      foreground: 'f7768e',
    },
    {
      token: 'variable.language.this punctuation.definition.variable',
      foreground: 'f7768e',
    },
    {
      token: 'keyword.other.this',
      foreground: 'f7768e',
    },
    {
      token: 'entity.other.attribute-name',
      foreground: 'bb9af7',
    },
    {
      token: 'text.html.basic entity.other.attribute-name.html',
      foreground: 'bb9af7',
    },
    {
      token: 'text.html.basic entity.other.attribute-name',
      foreground: 'bb9af7',
    },
    {
      token: 'text.html constant.character.entity',
      foreground: '0DB9D7',
    },
    {
      token: 'entity.other.attribute-name.id.html',
      foreground: 'bb9af7',
    },
    {
      token: 'meta.directive.vue entity.other.attribute-name.html',
      foreground: 'bb9af7',
    },
    {
      token: 'source.sass keyword.control',
      foreground: '7aa2f7',
    },
    {
      token: 'entity.other.attribute-name.pseudo-class',
      foreground: 'bb9af7',
    },
    {
      token: 'entity.other.attribute-name.pseudo-element',
      foreground: 'bb9af7',
    },
    {
      token: 'entity.other.attribute-name.placeholder',
      foreground: 'bb9af7',
    },
    {
      token: 'meta.property-list meta.property-value',
      foreground: 'bb9af7',
    },
    {
      token: 'markup.inserted',
      foreground: '449dab',
    },
    {
      token: 'markup.deleted',
      foreground: '914c54',
    },
    {
      token: 'markup.changed',
      foreground: '6183bb',
    },
    {
      token: 'string.regexp',
      foreground: 'b4f9f8',
    },
    {
      token: 'punctuation.definition.group',
      foreground: 'f7768e',
    },
    {
      token: 'constant.other.character-class.regexp',
      foreground: 'bb9af7',
    },
    {
      token: 'constant.other.character-class.set.regexp',
      foreground: 'e0af68',
    },
    {
      token: 'punctuation.definition.character-class.regexp',
      foreground: 'e0af68',
    },
    {
      token: 'keyword.operator.quantifier.regexp',
      foreground: '89ddff',
    },
    {
      token: 'constant.character.escape.backslash',
      foreground: 'c0caf5',
    },
    {
      token: 'constant.character.escape',
      foreground: '89ddff',
    },
    {
      token: 'tag.decorator.js entity.name.tag.js',
      foreground: '7aa2f7',
    },
    {
      token: 'tag.decorator.js punctuation.definition.tag.js',
      foreground: '7aa2f7',
    },
    {
      token: 'keyword.other.unit',
      foreground: 'f7768e',
    },
    {
      token:
        'source.json meta.structure.dictionary.json support.type.property-name.json',
      foreground: '7aa2f7',
    },
    {
      token:
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      foreground: '0db9d7',
    },
    {
      token:
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      foreground: '7dcfff',
    },
    {
      token:
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      foreground: 'bb9af7',
    },
    {
      token:
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      foreground: 'e0af68',
    },
    {
      token:
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      foreground: '0db9d7',
    },
    {
      token:
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      foreground: '73daca',
    },
    {
      token:
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      foreground: 'f7768e',
    },
    {
      token:
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      foreground: '9ece6a',
    },
    {
      token: 'punctuation.definition.list_item.markdown',
      foreground: '9abdf5',
    },
    {
      token: 'meta.block',
      foreground: '9abdf5',
    },
    {
      token: 'meta.brace',
      foreground: '9abdf5',
    },
    {
      token: 'punctuation.definition.block',
      foreground: '9abdf5',
    },
    {
      token: 'punctuation.definition.use',
      foreground: '9abdf5',
    },
    {
      token: 'punctuation.definition.class',
      foreground: '9abdf5',
    },
    {
      token: 'punctuation.definition.begin.bracket',
      foreground: '9abdf5',
    },
    {
      token: 'punctuation.definition.end.bracket',
      foreground: '9abdf5',
    },
    {
      token: 'punctuation.definition.switch-expression.begin.bracket',
      foreground: '9abdf5',
    },
    {
      token: 'punctuation.definition.switch-expression.end.bracket',
      foreground: '9abdf5',
    },
    {
      token: 'punctuation.definition.section.switch-block.begin.bracket',
      foreground: '9abdf5',
    },
    {
      token: 'punctuation.definition.section.switch-block.end.bracket',
      foreground: '9abdf5',
    },
    {
      token: 'punctuation.definition.group.shell',
      foreground: '9abdf5',
    },
    {
      token: 'punctuation.definition.parameters',
      foreground: '9abdf5',
    },
    {
      token: 'punctuation.definition.arguments',
      foreground: '9abdf5',
    },
    {
      token: 'punctuation.definition.dictionary',
      foreground: '9abdf5',
    },
    {
      token: 'punctuation.definition.array',
      foreground: '9abdf5',
    },
    {
      token: 'punctuation.section',
      foreground: '9abdf5',
    },
    {
      token: 'meta.embedded.block',
      foreground: 'c0caf5',
    },
    {
      token: 'meta.tag JSXNested',
      foreground: '9aa5ce',
    },
    {
      token: 'meta.jsx.children',
      foreground: '9aa5ce',
    },
    {
      token: 'text.html',
      foreground: '9aa5ce',
    },
    {
      token: 'text.log',
      foreground: '9aa5ce',
    },
    {
      token: 'text.html.markdown markup.inline.raw.markdown',
      foreground: 'bb9af7',
    },
    {
      token:
        'text.html.markdown markup.inline.raw.markdown punctuation.definition.raw.markdown',
      foreground: '4E5579',
    },
    {
      token: 'heading.1.markdown entity.name',
      foreground: '89ddff',
    },
    {
      token: 'heading.1.markdown punctuation.definition.heading.markdown',
      foreground: '89ddff',
    },
    {
      token: 'heading.2.markdown entity.name',
      foreground: '61bdf2',
    },
    {
      token: 'heading.2.markdown punctuation.definition.heading.markdown',
      foreground: '61bdf2',
    },
    {
      token: 'heading.3.markdown entity.name',
      foreground: '7aa2f7',
    },
    {
      token: 'heading.3.markdown punctuation.definition.heading.markdown',
      foreground: '7aa2f7',
    },
    {
      token: 'heading.4.markdown entity.name',
      foreground: '6d91de',
    },
    {
      token: 'heading.4.markdown punctuation.definition.heading.markdown',
      foreground: '6d91de',
    },
    {
      token: 'heading.5.markdown entity.name',
      foreground: '9aa5ce',
    },
    {
      token: 'heading.5.markdown punctuation.definition.heading.markdown',
      foreground: '9aa5ce',
    },
    {
      token: 'heading.6.markdown entity.name',
      foreground: '747ca1',
    },
    {
      token: 'heading.6.markdown punctuation.definition.heading.markdown',
      foreground: '747ca1',
    },
    {
      token: 'markup.italic',
      foreground: 'c0caf5',
    },
    {
      token: 'markup.italic punctuation',
      foreground: 'c0caf5',
    },
    {
      token: 'markup.bold',
      foreground: 'c0caf5',
    },
    {
      token: 'markup.bold punctuation',
      foreground: 'c0caf5',
    },
    {
      token: 'markup.bold markup.italic',
      foreground: 'c0caf5',
    },
    {
      token: 'markup.bold markup.italic punctuation',
      foreground: 'c0caf5',
    },
    {
      token: 'markup.quote punctuation.definition.blockquote.markdown',
      foreground: '4e5579',
    },
    {
      token: 'string.other.link',
      foreground: '73daca',
    },
    {
      token: 'markup.underline.link',
      foreground: '73daca',
    },
    {
      token: 'constant.other.reference.link.markdown',
      foreground: '73daca',
    },
    {
      token: 'string.other.link.description.title.markdown',
      foreground: '73daca',
    },
    {
      token: 'markup.fenced_code.block.markdown',
      foreground: '89ddff',
    },
    {
      token: 'markup.inline.raw.string.markdown',
      foreground: '89ddff',
    },
    {
      token: 'variable.language.fenced.markdown',
      foreground: '89ddff',
    },
    {
      token: 'meta.separator',
      foreground: '51597d',
    },
    {
      token: 'markup.table',
      foreground: 'c0cefc',
    },
    {
      token: 'token.info-token',
      foreground: '0db9d7',
    },
    {
      token: 'token.warn-token',
      foreground: 'ffdb69',
    },
    {
      token: 'token.error-token',
      foreground: 'db4b4b',
    },
    {
      token: 'token.debug-token',
      foreground: 'b267e6',
    },
    {
      token: 'entity.tag.apacheconf',
      foreground: 'f7768e',
    },
    {
      token: 'meta.preprocessor',
      foreground: '73daca',
    },
    {
      token: 'source.env',
      foreground: '7aa2f7',
    },
  ],
} as const satisfies monaco.editor.IStandaloneThemeData;
