import * as monaco from 'monaco-editor';

export default {
  base: 'vs-dark',
  inherit: false,
  colors: {
    'activityBar.activeBackground': '#343841',
    'activityBar.background': '#17191e',
    'activityBar.border': '#343841',
    'activityBar.foreground': '#eef0f9',
    'activityBar.inactiveForeground': '#858b98',
    'activityBarBadge.background': '#4bf3c8',
    'activityBarBadge.foreground': '#000000',
    'badge.background': '#bfc1c9',
    'badge.foreground': '#17191e',
    'breadcrumb.activeSelectionForeground': '#eef0f9',
    'breadcrumb.background': '#17191e',
    'breadcrumb.focusForeground': '#eef0f9',
    'breadcrumb.foreground': '#858b98',
    'button.background': '#4bf3c8',
    'button.foreground': '#17191e',
    'button.hoverBackground': '#31c19c',
    'button.secondaryBackground': '#545864',
    'button.secondaryForeground': '#eef0f9',
    'button.secondaryHoverBackground': '#858b98',
    'checkbox.background': '#23262d',
    'checkbox.border': '#00000000',
    'checkbox.foreground': '#eef0f9',
    'debugExceptionWidget.background': '#23262d',
    'debugExceptionWidget.border': '#8996d5',
    'debugToolBar.background': '#000000',
    'debugToolBar.border': '#ffffff00',
    'diffEditor.border': '#ffffff00',
    'diffEditor.insertedTextBackground': '#4bf3c824',
    'diffEditor.removedTextBackground': '#dc365724',
    'dropdown.background': '#23262d',
    'dropdown.border': '#00000000',
    'dropdown.foreground': '#eef0f9',
    'editor.background': '#17191e',
    'editor.findMatchBackground': '#515c6a',
    'editor.findMatchBorder': '#74879f',
    'editor.findMatchHighlightBackground': '#ea5c0055',
    'editor.findMatchHighlightBorder': '#ffffff00',
    'editor.findRangeHighlightBackground': '#23262d',
    'editor.findRangeHighlightBorder': '#b2434300',
    'editor.foldBackground': '#ad5dca26',
    'editor.foreground': '#eef0f9',
    'editor.hoverHighlightBackground': '#5495d740',
    'editor.inactiveSelectionBackground': '#2a2d34',
    'editor.lineHighlightBackground': '#23262d',
    'editor.lineHighlightBorder': '#ffffff00',
    'editor.rangeHighlightBackground': '#ffffff0b',
    'editor.rangeHighlightBorder': '#ffffff00',
    'editor.selectionBackground': '#ad5dca44',
    'editor.selectionHighlightBackground': '#add6ff34',
    'editor.selectionHighlightBorder': '#495f77',
    'editor.wordHighlightBackground': '#494949b8',
    'editor.wordHighlightStrongBackground': '#004972b8',
    'editorBracketMatch.background': '#545864',
    'editorBracketMatch.border': '#ffffff00',
    'editorCodeLens.foreground': '#bfc1c9',
    'editorCursor.background': '#000000',
    'editorCursor.foreground': '#aeafad',
    'editorError.background': '#ffffff00',
    'editorError.border': '#ffffff00',
    'editorError.foreground': '#f4587e',
    'editorGroup.border': '#343841',
    'editorGroup.emptyBackground': '#17191e',
    'editorGroupHeader.border': '#ffffff00',
    'editorGroupHeader.tabsBackground': '#23262d',
    'editorGroupHeader.tabsBorder': '#ffffff00',
    'editorGutter.addedBackground': '#4bf3c8',
    'editorGutter.background': '#17191e',
    'editorGutter.commentRangeForeground': '#545864',
    'editorGutter.deletedBackground': '#f06788',
    'editorGutter.foldingControlForeground': '#545864',
    'editorGutter.modifiedBackground': '#54b9ff',
    'editorHoverWidget.background': '#252526',
    'editorHoverWidget.border': '#454545',
    'editorHoverWidget.foreground': '#cccccc',
    'editorIndentGuide.activeBackground': '#858b98',
    'editorIndentGuide.background': '#343841',
    'editorInfo.background': '#4490bf00',
    'editorInfo.border': '#4490bf00',
    'editorInfo.foreground': '#54b9ff',
    'editorLineNumber.activeForeground': '#858b98',
    'editorLineNumber.foreground': '#545864',
    'editorLink.activeForeground': '#54b9ff',
    'editorMarkerNavigation.background': '#23262d',
    'editorMarkerNavigationError.background': '#dc3657',
    'editorMarkerNavigationInfo.background': '#54b9ff',
    'editorMarkerNavigationWarning.background': '#ffd493',
    'editorOverviewRuler.background': '#ffffff00',
    'editorOverviewRuler.border': '#ffffff00',
    'editorRuler.foreground': '#545864',
    'editorSuggestWidget.background': '#252526',
    'editorSuggestWidget.border': '#454545',
    'editorSuggestWidget.foreground': '#d4d4d4',
    'editorSuggestWidget.highlightForeground': '#0097fb',
    'editorSuggestWidget.selectedBackground': '#062f4a',
    'editorWarning.background': '#a9904000',
    'editorWarning.border': '#ffffff00',
    'editorWarning.foreground': '#fbc23b',
    'editorWhitespace.foreground': '#cc75f450',
    'editorWidget.background': '#343841',
    'editorWidget.foreground': '#ffffff',
    'editorWidget.resizeBorder': '#cc75f4',
    focusBorder: '#00daef',
    foreground: '#cccccc',
    'gitDecoration.addedResourceForeground': '#4bf3c8',
    'gitDecoration.conflictingResourceForeground': '#00daef',
    'gitDecoration.deletedResourceForeground': '#f4587e',
    'gitDecoration.ignoredResourceForeground': '#858b98',
    'gitDecoration.modifiedResourceForeground': '#ffd493',
    'gitDecoration.stageDeletedResourceForeground': '#c74e39',
    'gitDecoration.stageModifiedResourceForeground': '#ffd493',
    'gitDecoration.submoduleResourceForeground': '#54b9ff',
    'gitDecoration.untrackedResourceForeground': '#4bf3c8',
    'icon.foreground': '#cccccc',
    'input.background': '#23262d',
    'input.border': '#bfc1c9',
    'input.foreground': '#eef0f9',
    'input.placeholderForeground': '#858b98',
    'inputOption.activeBackground': '#54b9ff',
    'inputOption.activeBorder': '#007acc00',
    'inputOption.activeForeground': '#17191e',
    'list.activeSelectionBackground': '#2d4860',
    'list.activeSelectionForeground': '#ffffff',
    'list.dropBackground': '#17191e',
    'list.focusBackground': '#54b9ff',
    'list.focusForeground': '#ffffff',
    'list.highlightForeground': '#ffffff',
    'list.hoverBackground': '#343841',
    'list.hoverForeground': '#eef0f9',
    'list.inactiveSelectionBackground': '#17191e',
    'list.inactiveSelectionForeground': '#eef0f9',
    'listFilterWidget.background': '#2d4860',
    'listFilterWidget.noMatchesOutline': '#dc3657',
    'listFilterWidget.outline': '#54b9ff',
    'menu.background': '#252526',
    'menu.border': '#00000085',
    'menu.foreground': '#cccccc',
    'menu.selectionBackground': '#094771',
    'menu.selectionBorder': '#00000000',
    'menu.selectionForeground': '#4bf3c8',
    'menu.separatorBackground': '#bbbbbb',
    'menubar.selectionBackground': '#ffffff1a',
    'menubar.selectionForeground': '#cccccc',
    'merge.commonContentBackground': '#282828',
    'merge.commonHeaderBackground': '#383838',
    'merge.currentContentBackground': '#27403b',
    'merge.currentHeaderBackground': '#367366',
    'merge.incomingContentBackground': '#28384b',
    'merge.incomingHeaderBackground': '#395f8f',
    'minimap.background': '#17191e',
    'minimap.errorHighlight': '#dc3657',
    'minimap.findMatchHighlight': '#515c6a',
    'minimap.selectionHighlight': '#3757b942',
    'minimap.warningHighlight': '#fbc23b',
    'minimapGutter.addedBackground': '#4bf3c8',
    'minimapGutter.deletedBackground': '#f06788',
    'minimapGutter.modifiedBackground': '#54b9ff',
    'notificationCenter.border': '#ffffff00',
    'notificationCenterHeader.background': '#343841',
    'notificationCenterHeader.foreground': '#17191e',
    'notificationToast.border': '#ffffff00',
    'notifications.background': '#343841',
    'notifications.border': '#bfc1c9',
    'notifications.foreground': '#ffffff',
    'notificationsErrorIcon.foreground': '#f4587e',
    'notificationsInfoIcon.foreground': '#54b9ff',
    'notificationsWarningIcon.foreground': '#ff8551',
    'panel.background': '#23262d',
    'panel.border': '#17191e',
    'panelSection.border': '#17191e',
    'panelTitle.activeBorder': '#e7e7e7',
    'panelTitle.activeForeground': '#eef0f9',
    'panelTitle.inactiveForeground': '#bfc1c9',
    'peekView.border': '#007acc',
    'peekViewEditor.background': '#001f33',
    'peekViewEditor.matchHighlightBackground': '#ff8f0099',
    'peekViewEditor.matchHighlightBorder': '#ee931e',
    'peekViewEditorGutter.background': '#001f33',
    'peekViewResult.background': '#252526',
    'peekViewResult.fileForeground': '#ffffff',
    'peekViewResult.lineForeground': '#bbbbbb',
    'peekViewResult.matchHighlightBackground': '#ff0000',
    'peekViewResult.selectionBackground': '#3399ff33',
    'peekViewResult.selectionForeground': '#ffffff',
    'peekViewTitle.background': '#1e1e1e',
    'peekViewTitleDescription.foreground': '#ccccccb3',
    'peekViewTitleLabel.foreground': '#ffffff',
    'pickerGroup.border': '#ffffff00',
    'pickerGroup.foreground': '#eef0f9',
    'progressBar.background': '#4bf3c8',
    'scrollbar.shadow': '#000000',
    'scrollbarSlider.activeBackground': '#54b9ff66',
    'scrollbarSlider.background': '#54586466',
    'scrollbarSlider.hoverBackground': '#545864B3',
    'selection.background': '#00daef56',
    'settings.focusedRowBackground': '#ffffff07',
    'settings.headerForeground': '#cccccc',
    'sideBar.background': '#23262d',
    'sideBar.border': '#17191e',
    'sideBar.dropBackground': '#17191e',
    'sideBar.foreground': '#bfc1c9',
    'sideBarSectionHeader.background': '#343841',
    'sideBarSectionHeader.border': '#17191e',
    'sideBarSectionHeader.foreground': '#eef0f9',
    'sideBarTitle.foreground': '#eef0f9',
    'statusBar.background': '#17548b',
    'statusBar.debuggingBackground': '#cc75f4',
    'statusBar.debuggingForeground': '#eef0f9',
    'statusBar.foreground': '#eef0f9',
    'statusBar.noFolderBackground': '#6c3c7d',
    'statusBar.noFolderForeground': '#eef0f9',
    'statusBarItem.activeBackground': '#ffffff25',
    'statusBarItem.hoverBackground': '#ffffff1f',
    'statusBarItem.remoteBackground': '#297763',
    'statusBarItem.remoteForeground': '#eef0f9',
    'tab.activeBackground': '#17191e',
    'tab.activeBorder': '#ffffff00',
    'tab.activeBorderTop': '#eef0f9',
    'tab.activeForeground': '#eef0f9',
    'tab.border': '#17191e',
    'tab.hoverBackground': '#343841',
    'tab.hoverForeground': '#eef0f9',
    'tab.inactiveBackground': '#23262d',
    'tab.inactiveForeground': '#858b98',
    'terminal.ansiBlack': '#17191e',
    'terminal.ansiBlue': '#2b7eca',
    'terminal.ansiBrightBlack': '#545864',
    'terminal.ansiBrightBlue': '#54b9ff',
    'terminal.ansiBrightCyan': '#00daef',
    'terminal.ansiBrightGreen': '#4bf3c8',
    'terminal.ansiBrightMagenta': '#cc75f4',
    'terminal.ansiBrightRed': '#f4587e',
    'terminal.ansiBrightWhite': '#fafafa',
    'terminal.ansiBrightYellow': '#ffd493',
    'terminal.ansiCyan': '#24c0cf',
    'terminal.ansiGreen': '#23d18b',
    'terminal.ansiMagenta': '#ad5dca',
    'terminal.ansiRed': '#dc3657',
    'terminal.ansiWhite': '#eef0f9',
    'terminal.ansiYellow': '#ffc368',
    'terminal.border': '#80808059',
    'terminal.foreground': '#cccccc',
    'terminal.selectionBackground': '#ffffff40',
    'terminalCursor.background': '#0087ff',
    'terminalCursor.foreground': '#ffffff',
    'textLink.foreground': '#54b9ff',
    'titleBar.activeBackground': '#17191e',
    'titleBar.activeForeground': '#cccccc',
    'titleBar.border': '#00000000',
    'titleBar.inactiveBackground': '#3c3c3c99',
    'titleBar.inactiveForeground': '#cccccc99',
    'tree.indentGuidesStroke': '#545864',
    'walkThrough.embeddedEditorBackground': '#00000050',
    'widget.shadow': '#ffffff00',
  },
  rules: [
    {
      token:
        'punctuation.definition.delayed.unison,punctuation.definition.list.begin.unison,punctuation.definition.list.end.unison,punctuation.definition.ability.begin.unison,punctuation.definition.ability.end.unison,punctuation.operator.assignment.as.unison,punctuation.separator.pipe.unison,punctuation.separator.delimiter.unison,punctuation.definition.hash.unison',
      foreground: '4bf3c8',
    },
    {
      token: 'variable.other.generic-type.haskell',
      foreground: '54b9ff',
    },
    {
      token: 'storage.type.haskell',
      foreground: 'ffd493',
    },
    {
      token: 'support.variable.magic.python',
      foreground: '4bf3c8',
    },
    {
      token:
        'punctuation.separator.period.python,punctuation.separator.element.python,punctuation.parenthesis.begin.python,punctuation.parenthesis.end.python',
      foreground: 'eef0f9',
    },
    {
      token: 'variable.parameter.function.language.special.self.python',
      foreground: 'acafff',
    },
    {
      token: 'storage.modifier.lifetime.rust',
      foreground: 'eef0f9',
    },
    {
      token: 'support.function.std.rust',
      foreground: '00daef',
    },
    {
      token: 'entity.name.lifetime.rust',
      foreground: 'acafff',
    },
    {
      token: 'variable.language.rust',
      foreground: '4bf3c8',
    },
    {
      token: 'support.constant.edge',
      foreground: '54b9ff',
    },
    {
      token: 'constant.other.character-class.regexp',
      foreground: '4bf3c8',
    },
    {
      token: 'keyword.operator.quantifier.regexp',
      foreground: 'ffd493',
    },
    {
      token:
        'punctuation.definition.string.begin,punctuation.definition.string.end',
      foreground: 'ffd493',
    },
    {
      token: 'variable.parameter.function',
      foreground: 'eef0f9',
    },
    {
      token: 'comment markup.link',
      foreground: '545864',
    },
    {
      token: 'markup.changed.diff',
      foreground: 'acafff',
    },
    {
      token:
        'meta.diff.header.from-file,meta.diff.header.to-file,punctuation.definition.from-file.diff,punctuation.definition.to-file.diff',
      foreground: '00daef',
    },
    {
      token: 'markup.inserted.diff',
      foreground: 'ffd493',
    },
    {
      token: 'markup.deleted.diff',
      foreground: '4bf3c8',
    },
    {
      token: 'meta.function.c,meta.function.cpp',
      foreground: '4bf3c8',
    },
    {
      token:
        'punctuation.section.block.begin.bracket.curly.cpp,punctuation.section.block.end.bracket.curly.cpp,punctuation.terminator.statement.c,punctuation.section.block.begin.bracket.curly.c,punctuation.section.block.end.bracket.curly.c,punctuation.section.parens.begin.bracket.round.c,punctuation.section.parens.end.bracket.round.c,punctuation.section.parameters.begin.bracket.round.c,punctuation.section.parameters.end.bracket.round.c',
      foreground: 'eef0f9',
    },
    {
      token: 'punctuation.separator.key-value',
      foreground: 'eef0f9',
    },
    {
      token: 'keyword.operator.expression.import',
      foreground: '00daef',
    },
    {
      token: 'support.constant.math',
      foreground: 'acafff',
    },
    {
      token: 'support.constant.property.math',
      foreground: 'ffd493',
    },
    {
      token: 'variable.other.constant',
      foreground: 'acafff',
    },
    {
      token: 'storage.type.annotation.java',
      foreground: 'acafff',
    },
    {
      token: 'storage.type.object.array.java',
      foreground: 'acafff',
    },
    {
      token: 'source.java',
      foreground: '4bf3c8',
    },
    {
      token:
        'punctuation.section.block.begin.java,punctuation.section.block.end.java,punctuation.definition.method-parameters.begin.java,punctuation.definition.method-parameters.end.java,meta.method.identifier.java,punctuation.section.method.begin.java,punctuation.section.method.end.java,punctuation.terminator.java,punctuation.section.class.begin.java,punctuation.section.class.end.java,punctuation.section.inner-class.begin.java,punctuation.section.inner-class.end.java,meta.method-call.java,punctuation.section.class.begin.bracket.curly.java,punctuation.section.class.end.bracket.curly.java,punctuation.section.method.begin.bracket.curly.java,punctuation.section.method.end.bracket.curly.java,punctuation.separator.period.java,punctuation.bracket.angle.java,punctuation.definition.annotation.java,meta.method.body.java',
      foreground: 'eef0f9',
    },
    {
      token: 'meta.method.java',
      foreground: '00daef',
    },
    {
      token:
        'storage.modifier.import.java,storage.type.java,storage.type.generic.java',
      foreground: 'acafff',
    },
    {
      token: 'keyword.operator.instanceof.java',
      foreground: '54b9ff',
    },
    {
      token: 'meta.definition.variable.name.java',
      foreground: '4bf3c8',
    },
    {
      token: 'keyword.operator.logical',
      foreground: 'eef0f9',
    },
    {
      token: 'keyword.operator.bitwise',
      foreground: 'eef0f9',
    },
    {
      token: 'keyword.operator.channel',
      foreground: 'eef0f9',
    },
    {
      token:
        'support.constant.property-value.scss,support.constant.property-value.css',
      foreground: 'ffd493',
    },
    {
      token: 'keyword.operator.css,keyword.operator.scss,keyword.operator.less',
      foreground: 'eef0f9',
    },
    {
      token:
        'support.constant.color.w3c-standard-color-name.css,support.constant.color.w3c-standard-color-name.scss',
      foreground: 'ffd493',
    },
    {
      token: 'punctuation.separator.list.comma.css',
      foreground: 'eef0f9',
    },
    {
      token: 'support.constant.color.w3c-standard-color-name.css',
      foreground: 'ffd493',
    },
    {
      token: 'support.type.vendored.property-name.css',
      foreground: 'eef0f9',
    },
    {
      token:
        'support.module.node,support.type.object.module,support.module.node',
      foreground: 'acafff',
    },
    {
      token: 'entity.name.type.module',
      foreground: 'ffd493',
    },
    {
      token:
        'variable.other.readwrite,meta.object-literal.key,support.variable.property,support.variable.object.process,support.variable.object.node',
      foreground: '4bf3c8',
    },
    {
      token: 'support.constant.json',
      foreground: 'ffd493',
    },
    {
      token: 'keyword.operator.expression.instanceof',
      foreground: '54b9ff',
    },
    {
      token: 'keyword.operator.new',
      foreground: '54b9ff',
    },
    {
      token: 'keyword.operator.ternary',
      foreground: '54b9ff',
    },
    {
      token: 'keyword.operator.optional',
      foreground: '54b9ff',
    },
    {
      token: 'keyword.operator.expression.keyof',
      foreground: '54b9ff',
    },
    {
      token: 'support.type.object.console',
      foreground: '4bf3c8',
    },
    {
      token: 'support.variable.property.process',
      foreground: 'ffd493',
    },
    {
      token: 'entity.name.function,support.function.console',
      foreground: '00daef',
    },
    {
      token: 'keyword.operator.misc.rust',
      foreground: 'eef0f9',
    },
    {
      token: 'keyword.operator.sigil.rust',
      foreground: '54b9ff',
    },
    {
      token: 'keyword.operator.delete',
      foreground: '54b9ff',
    },
    {
      token: 'support.type.object.dom',
      foreground: 'eef0f9',
    },
    {
      token: 'support.variable.dom,support.variable.property.dom',
      foreground: '4bf3c8',
    },
    {
      token:
        'keyword.operator.arithmetic,keyword.operator.comparison,keyword.operator.decrement,keyword.operator.increment,keyword.operator.relational',
      foreground: 'eef0f9',
    },
    {
      token:
        'keyword.operator.assignment.c,keyword.operator.comparison.c,keyword.operator.c,keyword.operator.increment.c,keyword.operator.decrement.c,keyword.operator.bitwise.shift.c,keyword.operator.assignment.cpp,keyword.operator.comparison.cpp,keyword.operator.cpp,keyword.operator.increment.cpp,keyword.operator.decrement.cpp,keyword.operator.bitwise.shift.cpp',
      foreground: '54b9ff',
    },
    {
      token: 'punctuation.separator.delimiter',
      foreground: 'eef0f9',
    },
    {
      token: 'punctuation.separator.c,punctuation.separator.cpp',
      foreground: '54b9ff',
    },
    {
      token: 'support.type.posix-reserved.c,support.type.posix-reserved.cpp',
      foreground: 'eef0f9',
    },
    {
      token: 'keyword.operator.sizeof.c,keyword.operator.sizeof.cpp',
      foreground: '54b9ff',
    },
    {
      token: 'variable.parameter.function.language.python',
      foreground: 'ffd493',
    },
    {
      token: 'support.type.python',
      foreground: 'eef0f9',
    },
    {
      token: 'keyword.operator.logical.python',
      foreground: '54b9ff',
    },
    {
      token: 'variable.parameter.function.python',
      foreground: 'ffd493',
    },
    {
      token:
        'punctuation.definition.arguments.begin.python,punctuation.definition.arguments.end.python,punctuation.separator.arguments.python,punctuation.definition.list.begin.python,punctuation.definition.list.end.python',
      foreground: 'eef0f9',
    },
    {
      token: 'meta.function-call.generic.python',
      foreground: '00daef',
    },
    {
      token: 'constant.character.format.placeholder.other.python',
      foreground: 'ffd493',
    },
    {
      token: 'keyword.operator',
      foreground: 'eef0f9',
    },
    {
      token: 'keyword.operator.assignment.compound',
      foreground: '54b9ff',
    },
    {
      token:
        'keyword.operator.assignment.compound.js,keyword.operator.assignment.compound.ts',
      foreground: 'eef0f9',
    },
    {
      token: 'keyword',
      foreground: '54b9ff',
    },
    {
      token: 'entity.name.namespace',
      foreground: 'acafff',
    },
    {
      token: 'variable',
      foreground: '4bf3c8',
    },
    {
      token: 'variable.c',
      foreground: 'eef0f9',
    },
    {
      token: 'variable.language',
      foreground: 'acafff',
    },
    {
      token: 'token.variable.parameter.java',
      foreground: 'eef0f9',
    },
    {
      token: 'import.storage.java',
      foreground: 'acafff',
    },
    {
      token: 'token.package.keyword',
      foreground: '54b9ff',
    },
    {
      token: 'token.package',
      foreground: 'eef0f9',
    },
    {
      token: 'entity.name.function',
      foreground: '00daef',
    },
    {
      token: 'meta.require',
      foreground: '00daef',
    },
    {
      token: 'support.function.any-method',
      foreground: '00daef',
    },
    {
      token: 'variable.function',
      foreground: '00daef',
    },
    {
      token: 'entity.name.type.namespace',
      foreground: 'acafff',
    },
    {
      token: 'support.class, entity.name.type.class',
      foreground: 'acafff',
    },
    {
      token: 'entity.name.class.identifier.namespace.type',
      foreground: 'acafff',
    },
    {
      token: 'entity.name.class',
      foreground: 'acafff',
    },
    {
      token: 'variable.other.class.js',
      foreground: 'acafff',
    },
    {
      token: 'variable.other.class.ts',
      foreground: 'acafff',
    },
    {
      token: 'variable.other.class.php',
      foreground: '4bf3c8',
    },
    {
      token: 'entity.name.type',
      foreground: 'acafff',
    },
    {
      token: 'keyword.control',
      foreground: '54b9ff',
    },
    {
      token: 'control.elements, keyword.operator.less',
      foreground: 'ffd493',
    },
    {
      token: 'keyword.other.special-method',
      foreground: '00daef',
    },
    {
      token: 'storage',
      foreground: '54b9ff',
    },
    {
      token: 'token.storage',
      foreground: '54b9ff',
    },
    {
      token:
        'keyword.operator.expression.delete,keyword.operator.expression.in,keyword.operator.expression.of,keyword.operator.expression.instanceof,keyword.operator.new,keyword.operator.expression.typeof,keyword.operator.expression.void',
      foreground: '54b9ff',
    },
    {
      token: 'token.storage.type.java',
      foreground: 'acafff',
    },
    {
      token: 'support.function',
      foreground: 'eef0f9',
    },
    {
      token: 'support.type.property-name',
      foreground: 'eef0f9',
    },
    {
      token: 'support.constant.property-value',
      foreground: 'eef0f9',
    },
    {
      token: 'support.constant.font-name',
      foreground: 'ffd493',
    },
    {
      token: 'meta.tag',
      foreground: 'eef0f9',
    },
    {
      token: 'string',
      foreground: 'ffd493',
    },
    {
      token: 'entity.other.inherited-class',
      foreground: 'acafff',
    },
    {
      token: 'constant.other.symbol',
      foreground: 'eef0f9',
    },
    {
      token: 'constant.numeric',
      foreground: 'ffd493',
    },
    {
      token: 'constant',
      foreground: 'ffd493',
    },
    {
      token: 'punctuation.definition.constant',
      foreground: 'ffd493',
    },
    {
      token: 'entity.name.tag',
      foreground: '54b9ff',
    },
    {
      token: 'entity.other.attribute-name',
      foreground: '4bf3c8',
    },
    {
      token: 'entity.other.attribute-name.html',
      foreground: 'acafff',
    },
    {
      token: 'source.astro.meta.attribute.client:idle.html',
      foreground: 'ffd493',
    },
    {
      token:
        'string.quoted.double.html,string.quoted.single.html,string.template.html,punctuation.definition.string.begin.html,punctuation.definition.string.end.html',
      foreground: '4bf3c8',
    },
    {
      token: 'entity.other.attribute-name.id',
      foreground: '00daef',
    },
    {
      token: 'entity.other.attribute-name.class.css',
      foreground: '4bf3c8',
    },
    {
      token: 'meta.selector',
      foreground: '54b9ff',
    },
    {
      token: 'markup.heading',
      foreground: '4bf3c8',
    },
    {
      token:
        'markup.heading punctuation.definition.heading, entity.name.section',
      foreground: '00daef',
    },
    {
      token: 'keyword.other.unit',
      foreground: '4bf3c8',
    },
    {
      token: 'markup.bold,todo.bold',
      foreground: 'ffd493',
    },
    {
      token: 'punctuation.definition.bold',
      foreground: 'acafff',
    },
    {
      token: 'markup.italic, punctuation.definition.italic,todo.emphasis',
      foreground: '54b9ff',
    },
    {
      token: 'emphasis md',
      foreground: '54b9ff',
    },
    {
      token: 'entity.name.section.markdown',
      foreground: '4bf3c8',
    },
    {
      token: 'punctuation.definition.heading.markdown',
      foreground: '4bf3c8',
    },
    {
      token: 'punctuation.definition.list.begin.markdown',
      foreground: '4bf3c8',
    },
    {
      token: 'markup.heading.setext',
      foreground: 'eef0f9',
    },
    {
      token: 'punctuation.definition.bold.markdown',
      foreground: 'ffd493',
    },
    {
      token: 'markup.inline.raw.markdown',
      foreground: 'ffd493',
    },
    {
      token: 'markup.inline.raw.string.markdown',
      foreground: 'ffd493',
    },
    {
      token: 'punctuation.definition.list.markdown',
      foreground: '4bf3c8',
    },
    {
      token: 'punctuation.definition.string.begin.markdown',
      foreground: '4bf3c8',
    },
    {
      token: 'punctuation.definition.string.end.markdown',
      foreground: '4bf3c8',
    },
    {
      token: 'punctuation.definition.metadata.markdown',
      foreground: '4bf3c8',
    },
    {
      token: 'beginning.punctuation.definition.list.markdown',
      foreground: '4bf3c8',
    },
    {
      token: 'punctuation.definition.metadata.markdown',
      foreground: '4bf3c8',
    },
    {
      token:
        'markup.underline.link.markdown,markup.underline.link.image.markdown',
      foreground: '54b9ff',
    },
    {
      token:
        'string.other.link.title.markdown,string.other.link.description.markdown',
      foreground: '00daef',
    },
    {
      token: 'string.regexp',
      foreground: 'eef0f9',
    },
    {
      token: 'constant.character.escape',
      foreground: 'eef0f9',
    },
    {
      token: 'punctuation.section.embedded, variable.interpolation',
      foreground: '4bf3c8',
    },
    {
      token:
        'punctuation.section.embedded.begin,punctuation.section.embedded.end',
      foreground: '54b9ff',
    },
    {
      token: 'invalid.illegal',
      foreground: 'ffffff',
    },
    {
      token: 'invalid.illegal.bad-ampersand.html',
      foreground: 'eef0f9',
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
      token: 'invalid.unimplemented',
      foreground: 'ffffff',
    },
    {
      token: 'source.json meta.structure.dictionary.json > string.quoted.json',
      foreground: 'cc75f4',
    },
    {
      token:
        'source.json meta.structure.dictionary.json > string.quoted.json > punctuation.string',
      foreground: '4bf3c8',
    },
    {
      token:
        'source.json meta.structure.dictionary.json > value.json > string.quoted.json,source.json meta.structure.array.json > value.json > string.quoted.json,source.json meta.structure.dictionary.json > value.json > string.quoted.json > punctuation,source.json meta.structure.array.json > value.json > string.quoted.json > punctuation',
      foreground: 'ffd493',
    },
    {
      token:
        'source.json meta.structure.dictionary.json > constant.language.json,source.json meta.structure.array.json > constant.language.json',
      foreground: 'eef0f9',
    },
    {
      token: 'support.type.property-name.json',
      foreground: '4bf3c8',
    },
    {
      token: 'support.type.property-name.json punctuation',
      foreground: '4bf3c8',
    },
    {
      token:
        'text.html.laravel-blade source.php.embedded.line.html entity.name.tag.laravel-blade',
      foreground: '54b9ff',
    },
    {
      token:
        'text.html.laravel-blade source.php.embedded.line.html support.constant.laravel-blade',
      foreground: '54b9ff',
    },
    {
      token:
        'support.other.namespace.use.php,support.other.namespace.use-as.php,support.other.namespace.php,entity.other.alias.php,meta.interface.php',
      foreground: 'acafff',
    },
    {
      token: 'keyword.operator.error-control.php',
      foreground: '54b9ff',
    },
    {
      token: 'keyword.operator.type.php',
      foreground: '54b9ff',
    },
    {
      token: 'punctuation.section.array.begin.php',
      foreground: 'eef0f9',
    },
    {
      token: 'punctuation.section.array.end.php',
      foreground: 'eef0f9',
    },
    {
      token: 'invalid.illegal.non-null-typehinted.php',
      foreground: 'f44747',
    },
    {
      token:
        'storage.type.php,meta.other.type.phpdoc.php,keyword.other.type.php,keyword.other.array.phpdoc.php',
      foreground: 'acafff',
    },
    {
      token:
        'meta.function-call.php,meta.function-call.object.php,meta.function-call.static.php',
      foreground: '00daef',
    },
    {
      token:
        'punctuation.definition.parameters.begin.bracket.round.php,punctuation.definition.parameters.end.bracket.round.php,punctuation.separator.delimiter.php,punctuation.section.scope.begin.php,punctuation.section.scope.end.php,punctuation.terminator.expression.php,punctuation.definition.arguments.begin.bracket.round.php,punctuation.definition.arguments.end.bracket.round.php,punctuation.definition.storage-type.begin.bracket.round.php,punctuation.definition.storage-type.end.bracket.round.php,punctuation.definition.array.begin.bracket.round.php,punctuation.definition.array.end.bracket.round.php,punctuation.definition.begin.bracket.round.php,punctuation.definition.end.bracket.round.php,punctuation.definition.begin.bracket.curly.php,punctuation.definition.end.bracket.curly.php,punctuation.definition.section.switch-block.end.bracket.curly.php,punctuation.definition.section.switch-block.start.bracket.curly.php,punctuation.definition.section.switch-block.begin.bracket.curly.php,punctuation.definition.section.switch-block.end.bracket.curly.php',
      foreground: 'eef0f9',
    },
    {
      token: 'support.constant.core.rust',
      foreground: 'ffd493',
    },
    {
      token:
        'support.constant.ext.php,support.constant.std.php,support.constant.core.php,support.constant.parser-token.php',
      foreground: 'ffd493',
    },
    {
      token: 'entity.name.goto-label.php,support.other.php',
      foreground: '00daef',
    },
    {
      token:
        'keyword.operator.logical.php,keyword.operator.bitwise.php,keyword.operator.arithmetic.php',
      foreground: 'eef0f9',
    },
    {
      token: 'keyword.operator.regexp.php',
      foreground: '54b9ff',
    },
    {
      token: 'keyword.operator.comparison.php',
      foreground: 'eef0f9',
    },
    {
      token: 'keyword.operator.heredoc.php,keyword.operator.nowdoc.php',
      foreground: '54b9ff',
    },
    {
      token: 'meta.function.decorator.python',
      foreground: '00daef',
    },
    {
      token:
        'support.token.decorator.python,meta.function.decorator.identifier.python',
      foreground: 'eef0f9',
    },
    {
      token: 'function.parameter',
      foreground: 'eef0f9',
    },
    {
      token: 'function.brace',
      foreground: 'eef0f9',
    },
    {
      token: 'function.parameter.ruby, function.parameter.cs',
      foreground: 'eef0f9',
    },
    {
      token: 'constant.language.symbol.ruby',
      foreground: 'eef0f9',
    },
    {
      token: 'rgb-value',
      foreground: 'eef0f9',
    },
    {
      token: 'inline-color-decoration rgb-value',
      foreground: 'ffd493',
    },
    {
      token: 'less rgb-value',
      foreground: 'ffd493',
    },
    {
      token: 'selector.sass',
      foreground: '4bf3c8',
    },
    {
      token:
        'support.type.primitive.ts,support.type.builtin.ts,support.type.primitive.tsx,support.type.builtin.tsx',
      foreground: 'acafff',
    },
    {
      token: 'block.scope.end,block.scope.begin',
      foreground: 'eef0f9',
    },
    {
      token: 'storage.type.cs',
      foreground: 'acafff',
    },
    {
      token: 'entity.name.variable.local.cs',
      foreground: '4bf3c8',
    },
    {
      token: 'token.info-token',
      foreground: '00daef',
    },
    {
      token: 'token.warn-token',
      foreground: 'ffd493',
    },
    {
      token: 'token.error-token',
      foreground: 'f44747',
    },
    {
      token: 'token.debug-token',
      foreground: '54b9ff',
    },
    {
      token: 'punctuation.definition.template-expression.begin',
      foreground: '54b9ff',
    },
    {
      token: 'punctuation.definition.template-expression.end',
      foreground: '54b9ff',
    },
    {
      token: 'punctuation.section.embedded',
      foreground: '54b9ff',
    },
    {
      token: 'meta.template.expression',
      foreground: 'eef0f9',
    },
    {
      token: 'keyword.operator.module',
      foreground: '54b9ff',
    },
    {
      token: 'support.type.type.flowtype',
      foreground: '00daef',
    },
    {
      token: 'support.type.primitive',
      foreground: 'acafff',
    },
    {
      token: 'meta.property.object',
      foreground: '4bf3c8',
    },
    {
      token: 'variable.parameter.function.js',
      foreground: '4bf3c8',
    },
    {
      token: 'keyword.other.template.begin',
      foreground: 'ffd493',
    },
    {
      token: 'keyword.other.template.end',
      foreground: 'ffd493',
    },
    {
      token: 'keyword.other.substitution.begin',
      foreground: 'ffd493',
    },
    {
      token: 'keyword.other.substitution.end',
      foreground: 'ffd493',
    },
    {
      token: 'keyword.operator.assignment',
      foreground: 'eef0f9',
    },
    {
      token: 'keyword.operator.assignment.go',
      foreground: 'acafff',
    },
    {
      token: 'keyword.operator.arithmetic.go',
      foreground: '54b9ff',
    },
    {
      token: 'keyword.operator.address.go',
      foreground: '54b9ff',
    },
    {
      token: 'entity.name.package.go',
      foreground: 'acafff',
    },
    {
      token: 'support.type.prelude.elm',
      foreground: 'eef0f9',
    },
    {
      token: 'support.constant.elm',
      foreground: 'ffd493',
    },
    {
      token: 'punctuation.quasi.element',
      foreground: '54b9ff',
    },
    {
      token: 'constant.character.entity',
      foreground: '4bf3c8',
    },
    {
      token: 'entity.other.attribute-name.pseudo-element',
      foreground: 'eef0f9',
    },
    {
      token: 'entity.other.attribute-name.pseudo-class',
      foreground: 'eef0f9',
    },
    {
      token: 'entity.global.clojure',
      foreground: 'acafff',
    },
    {
      token: 'meta.symbol.clojure',
      foreground: '4bf3c8',
    },
    {
      token: 'constant.keyword.clojure',
      foreground: 'eef0f9',
    },
    {
      token: 'meta.arguments.coffee',
      foreground: '4bf3c8',
    },
    {
      token: 'variable.parameter.function.coffee',
      foreground: '4bf3c8',
    },
    {
      token: 'source.ini',
      foreground: 'ffd493',
    },
    {
      token: 'meta.scope.prerequisites.makefile',
      foreground: '4bf3c8',
    },
    {
      token: 'source.makefile',
      foreground: 'acafff',
    },
    {
      token: 'storage.modifier.import.groovy',
      foreground: 'acafff',
    },
    {
      token: 'meta.method.groovy',
      foreground: '00daef',
    },
    {
      token: 'meta.definition.variable.name.groovy',
      foreground: '4bf3c8',
    },
    {
      token: 'meta.definition.class.inherited.classes.groovy',
      foreground: 'ffd493',
    },
    {
      token: 'support.variable.semantic.hlsl',
      foreground: 'acafff',
    },
    {
      token: 'support.type.texture.hlsl',
      foreground: '54b9ff',
    },
    {
      token: 'support.type.sampler.hlsl',
      foreground: '54b9ff',
    },
    {
      token: 'support.type.object.hlsl',
      foreground: '54b9ff',
    },
    {
      token: 'support.type.object.rw.hlsl',
      foreground: '54b9ff',
    },
    {
      token: 'support.type.fx.hlsl',
      foreground: '54b9ff',
    },
    {
      token: 'support.type.object.hlsl',
      foreground: '54b9ff',
    },
    {
      token: 'text.variable',
      foreground: '4bf3c8',
    },
    {
      token: 'text.bracketed',
      foreground: '4bf3c8',
    },
    {
      token: 'support.type.swift',
      foreground: 'acafff',
    },
    {
      token: 'support.type.vb.asp',
      foreground: 'acafff',
    },
    {
      token: 'entity.name.function.xi',
      foreground: 'acafff',
    },
    {
      token: 'entity.name.class.xi',
      foreground: 'eef0f9',
    },
    {
      token: 'constant.character.character-class.regexp.xi',
      foreground: '4bf3c8',
    },
    {
      token: 'constant.regexp.xi',
      foreground: '54b9ff',
    },
    {
      token: 'keyword.control.xi',
      foreground: 'eef0f9',
    },
    {
      token: 'invalid.xi',
      foreground: 'eef0f9',
    },
    {
      token: 'beginning.punctuation.definition.quote.markdown.xi',
      foreground: 'ffd493',
    },
    {
      token: 'beginning.punctuation.definition.list.markdown.xi',
      foreground: 'eef0f98f',
    },
    {
      token: 'constant.character.xi',
      foreground: '00daef',
    },
    {
      token: 'accent.xi',
      foreground: '00daef',
    },
    {
      token: 'wikiword.xi',
      foreground: 'ffd493',
    },
    {
      token: 'constant.other.color.rgb-value.xi',
      foreground: 'ffffff',
    },
    {
      token: 'punctuation.definition.tag.xi',
      foreground: '545864',
    },
    {
      token: 'entity.name.label.cs',
      foreground: 'acafff',
    },
    {
      token: 'entity.name.scope-resolution.function.call',
      foreground: 'acafff',
    },
    {
      token: 'entity.name.scope-resolution.function.definition',
      foreground: 'acafff',
    },
    {
      token: 'entity.name.label.cs',
      foreground: '4bf3c8',
    },
    {
      token: 'markup.heading.setext.1.markdown',
      foreground: '4bf3c8',
    },
    {
      token: 'markup.heading.setext.2.markdown',
      foreground: '4bf3c8',
    },
    {
      token: ' meta.brace.square',
      foreground: 'eef0f9',
    },
    {
      token: 'comment, punctuation.definition.comment',
      foreground: 'eef0f98f',
    },
    {
      token: 'markup.quote.markdown',
      foreground: 'eef0f98f',
    },
    {
      token: 'punctuation.definition.block.sequence.item.yaml',
      foreground: 'eef0f9',
    },
    {
      token: 'constant.language.symbol.elixir',
      foreground: 'eef0f9',
    },
  ],
} as const satisfies monaco.editor.IStandaloneThemeData;
