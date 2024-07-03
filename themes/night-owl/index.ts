import * as monaco from 'monaco-editor';

export default {
  base: 'vs-dark',
  inherit: false,
  colors: {
    'activityBar.background': '#011627',
    'activityBar.border': '#011627',
    'activityBar.dropBackground': '#5f7e97',
    'activityBar.foreground': '#5f7e97',
    'activityBarBadge.background': '#44596b',
    'activityBarBadge.foreground': '#ffffff',
    'badge.background': '#5f7e97',
    'badge.foreground': '#ffffff',
    'breadcrumb.activeSelectionForeground': '#FFFFFF',
    'breadcrumb.focusForeground': '#ffffff',
    'breadcrumb.foreground': '#A599E9',
    'breadcrumbPicker.background': '#001122',
    'button.background': '#7e57c2cc',
    'button.foreground': '#ffffffcc',
    'button.hoverBackground': '#7e57c2',
    contrastBorder: '#122d42',
    'debugExceptionWidget.background': '#011627',
    'debugExceptionWidget.border': '#5f7e97',
    'debugToolBar.background': '#011627',
    'diffEditor.insertedTextBackground': '#99b76d23',
    'diffEditor.insertedTextBorder': '#c5e47833',
    'diffEditor.removedTextBackground': '#ef535033',
    'diffEditor.removedTextBorder': '#ef53504d',
    'dropdown.background': '#011627',
    'dropdown.border': '#5f7e97',
    'dropdown.foreground': '#ffffffcc',
    'editor.background': '#011627',
    'editor.findMatchBackground': '#5f7e9779',
    'editor.findMatchHighlightBackground': '#1085bb5d',
    'editor.findRangeHighlightBackground': '#null',
    'editor.foreground': '#d6deeb',
    'editor.hoverHighlightBackground': '#7e57c25a',
    'editor.inactiveSelectionBackground': '#7e57c25a',
    'editor.lineHighlightBackground': '#00000033',
    'editor.lineHighlightBorder': '#null',
    'editor.rangeHighlightBackground': '#7e57c25a',
    'editor.selectionBackground': '#1d3b53',
    'editor.selectionHighlightBackground': '#5f7e9779',
    'editor.wordHighlightBackground': '#f6bbe533',
    'editor.wordHighlightStrongBackground': '#e2a2f433',
    'editorBracketMatch.background': '#5f7e974d',
    'editorBracketMatch.border': '#null',
    'editorCodeLens.foreground': '#5e82ceb4',
    'editorCursor.foreground': '#80a4c2',
    'editorError.border': '#null',
    'editorError.foreground': '#EF5350',
    'editorGroup.border': '#011627',
    'editorGroup.dropBackground': '#7e57c273',
    'editorGroup.emptyBackground': '#011627',
    'editorGroupHeader.noTabsBackground': '#011627',
    'editorGroupHeader.tabsBackground': '#011627',
    'editorGroupHeader.tabsBorder': '#262A39',
    'editorGutter.addedBackground': '#9CCC65',
    'editorGutter.background': '#011627',
    'editorGutter.deletedBackground': '#EF5350',
    'editorGutter.modifiedBackground': '#e2b93d',
    'editorHoverWidget.background': '#011627',
    'editorHoverWidget.border': '#5f7e97',
    'editorIndentGuide.activeBackground': '#7E97AC',
    'editorIndentGuide.background': '#5e81ce52',
    'editorLineNumber.activeForeground': '#C5E4FD',
    'editorLineNumber.foreground': '#4b6479',
    'editorLink.activeForeground': '#null',
    'editorMarkerNavigation.background': '#0b2942',
    'editorMarkerNavigationError.background': '#EF5350',
    'editorMarkerNavigationWarning.background': '#FFCA28',
    'editorOverviewRuler.commonContentForeground': '#7e57c2',
    'editorOverviewRuler.currentContentForeground': '#7e57c2',
    'editorOverviewRuler.incomingContentForeground': '#7e57c2',
    'editorRuler.foreground': '#5e81ce52',
    'editorSuggestWidget.background': '#2C3043',
    'editorSuggestWidget.border': '#2B2F40',
    'editorSuggestWidget.foreground': '#d6deeb',
    'editorSuggestWidget.highlightForeground': '#ffffff',
    'editorSuggestWidget.selectedBackground': '#5f7e97',
    'editorWarning.border': '#null',
    'editorWarning.foreground': '#b39554',
    'editorWhitespace.foreground': '#null',
    'editorWidget.background': '#021320',
    'editorWidget.border': '#5f7e97',
    errorForeground: '#EF5350',
    'extensionButton.prominentBackground': '#7e57c2cc',
    'extensionButton.prominentForeground': '#ffffffcc',
    'extensionButton.prominentHoverBackground': '#7e57c2',
    focusBorder: '#122d42',
    foreground: '#d6deeb',
    'gitDecoration.conflictingResourceForeground': '#ffeb95cc',
    'gitDecoration.deletedResourceForeground': '#EF535090',
    'gitDecoration.ignoredResourceForeground': '#395a75',
    'gitDecoration.modifiedResourceForeground': '#a2bffc',
    'gitDecoration.untrackedResourceForeground': '#c5e478ff',
    'input.background': '#0b253a',
    'input.border': '#5f7e97',
    'input.foreground': '#ffffffcc',
    'input.placeholderForeground': '#5f7e97',
    'inputOption.activeBorder': '#ffffffcc',
    'inputValidation.errorBackground': '#AB0300F2',
    'inputValidation.errorBorder': '#EF5350',
    'inputValidation.infoBackground': '#00589EF2',
    'inputValidation.infoBorder': '#64B5F6',
    'inputValidation.warningBackground': '#675700F2',
    'inputValidation.warningBorder': '#FFCA28',
    'list.activeSelectionBackground': '#234d708c',
    'list.activeSelectionForeground': '#ffffff',
    'list.dropBackground': '#011627',
    'list.focusBackground': '#010d18',
    'list.focusForeground': '#ffffff',
    'list.highlightForeground': '#ffffff',
    'list.hoverBackground': '#011627',
    'list.hoverForeground': '#ffffff',
    'list.inactiveSelectionBackground': '#0e293f',
    'list.inactiveSelectionForeground': '#5f7e97',
    'list.invalidItemForeground': '#975f94',
    'merge.border': '#null',
    'merge.currentContentBackground': '#null',
    'merge.currentHeaderBackground': '#5f7e97',
    'merge.incomingContentBackground': '#null',
    'merge.incomingHeaderBackground': '#7e57c25a',
    'meta.objectliteral.js': '#82AAFF',
    'notificationCenter.border': '#262a39',
    'notificationLink.foreground': '#80CBC4',
    'notificationToast.border': '#262a39',
    'notifications.background': '#01111d',
    'notifications.border': '#262a39',
    'notifications.foreground': '#ffffffcc',
    'panel.background': '#011627',
    'panel.border': '#5f7e97',
    'panelTitle.activeBorder': '#5f7e97',
    'panelTitle.activeForeground': '#ffffffcc',
    'panelTitle.inactiveForeground': '#d6deeb80',
    'peekView.border': '#5f7e97',
    'peekViewEditor.background': '#011627',
    'peekViewEditor.matchHighlightBackground': '#7e57c25a',
    'peekViewResult.background': '#011627',
    'peekViewResult.fileForeground': '#5f7e97',
    'peekViewResult.lineForeground': '#5f7e97',
    'peekViewResult.matchHighlightBackground': '#ffffffcc',
    'peekViewResult.selectionBackground': '#2E3250',
    'peekViewResult.selectionForeground': '#5f7e97',
    'peekViewTitle.background': '#011627',
    'peekViewTitleDescription.foreground': '#697098',
    'peekViewTitleLabel.foreground': '#5f7e97',
    'pickerGroup.border': '#011627',
    'pickerGroup.foreground': '#d1aaff',
    'progress.background': '#7e57c2',
    'punctuation.definition.generic.begin.html': '#ef5350f2',
    'scrollbar.shadow': '#010b14',
    'scrollbarSlider.activeBackground': '#084d8180',
    'scrollbarSlider.background': '#084d8180',
    'scrollbarSlider.hoverBackground': '#084d8180',
    'selection.background': '#4373c2',
    'sideBar.background': '#011627',
    'sideBar.border': '#011627',
    'sideBar.foreground': '#89a4bb',
    'sideBarSectionHeader.background': '#011627',
    'sideBarSectionHeader.foreground': '#5f7e97',
    'sideBarTitle.foreground': '#5f7e97',
    'source.elm': '#5f7e97',
    'statusBar.background': '#011627',
    'statusBar.border': '#262A39',
    'statusBar.debuggingBackground': '#202431',
    'statusBar.debuggingBorder': '#1F2330',
    'statusBar.debuggingForeground': '#null',
    'statusBar.foreground': '#5f7e97',
    'statusBar.noFolderBackground': '#011627',
    'statusBar.noFolderBorder': '#25293A',
    'statusBar.noFolderForeground': '#null',
    'statusBarItem.activeBackground': '#202431',
    'statusBarItem.hoverBackground': '#202431',
    'statusBarItem.prominentBackground': '#202431',
    'statusBarItem.prominentHoverBackground': '#202431',
    'string.quoted.single.js': '#ffffff',
    'tab.activeBackground': '#0b2942',
    'tab.activeBorder': '#262A39',
    'tab.activeForeground': '#d2dee7',
    'tab.border': '#272B3B',
    'tab.inactiveBackground': '#01111d',
    'tab.inactiveForeground': '#5f7e97',
    'tab.unfocusedActiveBorder': '#262A39',
    'tab.unfocusedActiveForeground': '#5f7e97',
    'tab.unfocusedInactiveForeground': '#5f7e97',
    'terminal.ansiBlack': '#011627',
    'terminal.ansiBlue': '#82AAFF',
    'terminal.ansiBrightBlack': '#575656',
    'terminal.ansiBrightBlue': '#82AAFF',
    'terminal.ansiBrightCyan': '#7fdbca',
    'terminal.ansiBrightGreen': '#22da6e',
    'terminal.ansiBrightMagenta': '#C792EA',
    'terminal.ansiBrightRed': '#EF5350',
    'terminal.ansiBrightWhite': '#ffffff',
    'terminal.ansiBrightYellow': '#ffeb95',
    'terminal.ansiCyan': '#21c7a8',
    'terminal.ansiGreen': '#22da6e',
    'terminal.ansiMagenta': '#C792EA',
    'terminal.ansiRed': '#EF5350',
    'terminal.ansiWhite': '#ffffff',
    'terminal.ansiYellow': '#c5e478',
    'terminal.selectionBackground': '#1b90dd4d',
    'terminalCursor.background': '#234d70',
    'textCodeBlock.background': '#4f4f4f',
    'titleBar.activeBackground': '#011627',
    'titleBar.activeForeground': '#eeefff',
    'titleBar.inactiveBackground': '#010e1a',
    'titleBar.inactiveForeground': '#null',
    'walkThrough.embeddedEditorBackground': '#011627',
    'welcomePage.buttonBackground': '#011627',
    'welcomePage.buttonHoverBackground': '#011627',
    'widget.shadow': '#011627',
  },
  rules: [
    {
      token: 'markup.changed',
      foreground: 'a2bffc',
    },
    {
      token: 'meta.diff.header.git',
      foreground: 'a2bffc',
    },
    {
      token: 'meta.diff.header.from-file',
      foreground: 'a2bffc',
    },
    {
      token: 'meta.diff.header.to-file',
      foreground: 'a2bffc',
    },
    {
      token: 'markup.deleted.diff',
      foreground: 'EF535090',
    },
    {
      token: 'markup.inserted.diff',
      foreground: 'c5e478ff',
    },
    {
      token: 'comment',
      foreground: '637777',
    },
    {
      token: 'string',
      foreground: 'ecc48d',
    },
    {
      token: 'string.quoted',
      foreground: 'ecc48d',
    },
    {
      token: 'variable.other.readwrite.js',
      foreground: 'ecc48d',
    },
    {
      token: 'support.constant.math',
      foreground: 'c5e478',
    },
    {
      token: 'constant.numeric',
      foreground: 'F78C6C',
    },
    {
      token: 'constant.character.numeric',
      foreground: 'F78C6C',
    },
    {
      token: 'constant.language',
      foreground: '82AAFF',
    },
    {
      token: 'punctuation.definition.constant',
      foreground: '82AAFF',
    },
    {
      token: 'variable.other.constant',
      foreground: '82AAFF',
    },
    {
      token: 'constant.character',
      foreground: '82AAFF',
    },
    {
      token: 'constant.other',
      foreground: '82AAFF',
    },
    {
      token: 'constant.character.escape',
      foreground: 'F78C6C',
    },
    {
      token: 'string.regexp',
      foreground: '5ca7e4',
    },
    {
      token: 'string.regexp keyword.other',
      foreground: '5ca7e4',
    },
    {
      token: 'meta.function punctuation.separator.comma',
      foreground: '5f7e97',
    },
    {
      token: 'variable',
      foreground: 'c5e478',
    },
    {
      token: 'punctuation.accessor',
      foreground: 'c792ea',
    },
    {
      token: 'keyword',
      foreground: 'c792ea',
    },
    {
      token: 'storage',
      foreground: 'c792ea',
    },
    {
      token: 'meta.var.expr',
      foreground: 'c792ea',
    },
    {
      token: 'meta.class meta.method.declaration meta.var.expr storage.type.js',
      foreground: 'c792ea',
    },
    {
      token: 'storage.type.property.js',
      foreground: 'c792ea',
    },
    {
      token: 'storage.type.property.ts',
      foreground: 'c792ea',
    },
    {
      token: 'storage.type.property.tsx',
      foreground: 'c792ea',
    },
    {
      token: 'storage.type',
      foreground: 'c792ea',
    },
    {
      token: 'entity.name.class',
      foreground: 'ffcb8b',
    },
    {
      token: 'meta.class entity.name.type.class',
      foreground: 'ffcb8b',
    },
    {
      token: 'entity.other.inherited-class',
      foreground: 'c5e478',
    },
    {
      token: 'entity.name.function',
      foreground: 'c792ea',
    },
    {
      token: 'punctuation.definition.tag',
      foreground: '7fdbca',
    },
    {
      token: 'meta.tag',
      foreground: '7fdbca',
    },
    {
      token: 'entity.name.tag',
      foreground: 'caece6',
    },
    {
      token: 'meta.tag.other.html',
      foreground: 'caece6',
    },
    {
      token: 'meta.tag.other.js',
      foreground: 'caece6',
    },
    {
      token: 'meta.tag.other.tsx',
      foreground: 'caece6',
    },
    {
      token: 'entity.name.tag.tsx',
      foreground: 'caece6',
    },
    {
      token: 'entity.name.tag.js',
      foreground: 'caece6',
    },
    {
      token: 'entity.name.tag',
      foreground: 'caece6',
    },
    {
      token: 'meta.tag.js',
      foreground: 'caece6',
    },
    {
      token: 'meta.tag.tsx',
      foreground: 'caece6',
    },
    {
      token: 'meta.tag.html',
      foreground: 'caece6',
    },
    {
      token: 'entity.other.attribute-name',
      foreground: 'c5e478',
    },
    {
      token: 'entity.name.tag.custom',
      foreground: 'f78c6c',
    },
    {
      token: 'support.function',
      foreground: '82AAFF',
    },
    {
      token: 'support.constant',
      foreground: '82AAFF',
    },
    {
      token: 'support.constant.meta.property-value',
      foreground: '7fdbca',
    },
    {
      token: 'support.type',
      foreground: 'c5e478',
    },
    {
      token: 'support.class',
      foreground: 'c5e478',
    },
    {
      token: 'support.variable.dom',
      foreground: 'c5e478',
    },
    {
      token: 'invalid',
      foreground: 'ffffff',
    },
    {
      token: 'invalid.deprecated',
      foreground: 'ffffff',
    },
    {
      token: 'keyword.operator',
      foreground: '7fdbca',
    },
    {
      token: 'keyword.operator.relational',
      foreground: 'c792ea',
    },
    {
      token: 'keyword.operator.assignment',
      foreground: 'c792ea',
    },
    {
      token: 'keyword.operator.arithmetic',
      foreground: 'c792ea',
    },
    {
      token: 'keyword.operator.bitwise',
      foreground: 'c792ea',
    },
    {
      token: 'keyword.operator.increment',
      foreground: 'c792ea',
    },
    {
      token: 'keyword.operator.ternary',
      foreground: 'c792ea',
    },
    {
      token: 'comment.line.double-slash',
      foreground: '637777',
    },
    {
      token: 'object',
      foreground: 'cdebf7',
    },
    {
      token: 'constant.language.null',
      foreground: 'ff5874',
    },
    {
      token: 'meta.brace',
      foreground: 'd6deeb',
    },
    {
      token: 'meta.delimiter.period',
      foreground: 'c792ea',
    },
    {
      token: 'punctuation.definition.string',
      foreground: 'd9f5dd',
    },
    {
      token: 'punctuation.definition.string.begin.markdown',
      foreground: 'ff5874',
    },
    {
      token: 'constant.language.boolean',
      foreground: 'ff5874',
    },
    {
      token: 'object.comma',
      foreground: 'ffffff',
    },
    {
      token: 'variable.parameter.function',
      foreground: '7fdbca',
    },
    {
      token: 'support.type.vendor.property-name',
      foreground: '80CBC4',
    },
    {
      token: 'support.constant.vendor.property-value',
      foreground: '80CBC4',
    },
    {
      token: 'support.type.property-name',
      foreground: '80CBC4',
    },
    {
      token: 'meta.property-list entity.name.tag',
      foreground: '80CBC4',
    },
    {
      token: 'meta.property-list entity.name.tag.reference',
      foreground: '57eaf1',
    },
    {
      token: 'constant.other.color.rgb-value punctuation.definition.constant',
      foreground: 'F78C6C',
    },
    {
      token: 'constant.other.color',
      foreground: 'FFEB95',
    },
    {
      token: 'keyword.other.unit',
      foreground: 'FFEB95',
    },
    {
      token: 'meta.selector',
      foreground: 'c792ea',
    },
    {
      token: 'entity.other.attribute-name.id',
      foreground: 'FAD430',
    },
    {
      token: 'meta.property-name',
      foreground: '80CBC4',
    },
    {
      token: 'entity.name.tag.doctype',
      foreground: 'c792ea',
    },
    {
      token: 'meta.tag.sgml.doctype',
      foreground: 'c792ea',
    },
    {
      token: 'punctuation.definition.parameters',
      foreground: 'd9f5dd',
    },
    {
      token: 'keyword.control.operator',
      foreground: '7fdbca',
    },
    {
      token: 'keyword.operator.logical',
      foreground: 'c792ea',
    },
    {
      token: 'variable.instance',
      foreground: 'baebe2',
    },
    {
      token: 'variable.other.instance',
      foreground: 'baebe2',
    },
    {
      token: 'variable.readwrite.instance',
      foreground: 'baebe2',
    },
    {
      token: 'variable.other.readwrite.instance',
      foreground: 'baebe2',
    },
    {
      token: 'variable.other.property',
      foreground: 'baebe2',
    },
    {
      token: 'variable.other.object.property',
      foreground: 'faf39f',
    },
    {
      token: 'entity.name.function',
      foreground: '82AAFF',
    },
    {
      token: 'keyword.operator.comparison',
      foreground: 'c792ea',
    },
    {
      token: 'keyword.control.flow.js',
      foreground: 'c792ea',
    },
    {
      token: 'keyword.control.flow.ts',
      foreground: 'c792ea',
    },
    {
      token: 'keyword.control.flow.tsx',
      foreground: 'c792ea',
    },
    {
      token: 'keyword.control.ruby',
      foreground: 'c792ea',
    },
    {
      token: 'keyword.control.module.ruby',
      foreground: 'c792ea',
    },
    {
      token: 'keyword.control.class.ruby',
      foreground: 'c792ea',
    },
    {
      token: 'keyword.control.def.ruby',
      foreground: 'c792ea',
    },
    {
      token: 'keyword.control.loop.js',
      foreground: 'c792ea',
    },
    {
      token: 'keyword.control.loop.ts',
      foreground: 'c792ea',
    },
    {
      token: 'keyword.control.import.js',
      foreground: 'c792ea',
    },
    {
      token: 'keyword.control.import.ts',
      foreground: 'c792ea',
    },
    {
      token: 'keyword.control.import.tsx',
      foreground: 'c792ea',
    },
    {
      token: 'keyword.control.from.js',
      foreground: 'c792ea',
    },
    {
      token: 'keyword.control.from.ts',
      foreground: 'c792ea',
    },
    {
      token: 'keyword.control.from.tsx',
      foreground: 'c792ea',
    },
    {
      token: 'keyword.operator.instanceof.js',
      foreground: 'c792ea',
    },
    {
      token: 'keyword.operator.expression.instanceof.ts',
      foreground: 'c792ea',
    },
    {
      token: 'keyword.operator.expression.instanceof.tsx',
      foreground: 'c792ea',
    },
    {
      token: 'keyword.control.conditional.js',
      foreground: 'c792ea',
    },
    {
      token: 'keyword.control.conditional.ts',
      foreground: 'c792ea',
    },
    {
      token: 'keyword.control.switch.js',
      foreground: 'c792ea',
    },
    {
      token: 'keyword.control.switch.ts',
      foreground: 'c792ea',
    },
    {
      token: 'support.constant',
      foreground: '7fdbca',
    },
    {
      token: 'keyword.other.special-method',
      foreground: '7fdbca',
    },
    {
      token: 'keyword.other.new',
      foreground: '7fdbca',
    },
    {
      token: 'keyword.other.debugger',
      foreground: '7fdbca',
    },
    {
      token: 'keyword.control',
      foreground: '7fdbca',
    },
    {
      token: 'support.function',
      foreground: 'c5e478',
    },
    {
      token: 'invalid.broken',
      foreground: '020e14',
    },
    {
      token: 'invalid.unimplemented',
      foreground: 'ffffff',
    },
    {
      token: 'invalid.illegal',
      foreground: 'ffffff',
    },
    {
      token: 'variable.language',
      foreground: '7fdbca',
    },
    {
      token: 'support.variable.property',
      foreground: '7fdbca',
    },
    {
      token: 'variable.function',
      foreground: '82AAFF',
    },
    {
      token: 'variable.interpolation',
      foreground: 'ec5f67',
    },
    {
      token: 'meta.function-call',
      foreground: '82AAFF',
    },
    {
      token: 'punctuation.section.embedded',
      foreground: 'd3423e',
    },
    {
      token: 'punctuation.terminator.expression',
      foreground: 'd6deeb',
    },
    {
      token: 'punctuation.definition.arguments',
      foreground: 'd6deeb',
    },
    {
      token: 'punctuation.definition.array',
      foreground: 'd6deeb',
    },
    {
      token: 'punctuation.section.array',
      foreground: 'd6deeb',
    },
    {
      token: 'meta.array',
      foreground: 'd6deeb',
    },
    {
      token: 'punctuation.definition.list.begin',
      foreground: 'd9f5dd',
    },
    {
      token: 'punctuation.definition.list.end',
      foreground: 'd9f5dd',
    },
    {
      token: 'punctuation.separator.arguments',
      foreground: 'd9f5dd',
    },
    {
      token: 'punctuation.definition.list',
      foreground: 'd9f5dd',
    },
    {
      token: 'string.template meta.template.expression',
      foreground: 'd3423e',
    },
    {
      token: 'string.template punctuation.definition.string',
      foreground: 'd6deeb',
    },
    {
      token: 'italic',
      foreground: 'c792ea',
    },
    {
      token: 'bold',
      foreground: 'c5e478',
    },
    {
      token: 'quote',
      foreground: '697098',
    },
    {
      token: 'raw',
      foreground: '80CBC4',
    },
    {
      token: 'variable.assignment.coffee',
      foreground: '31e1eb',
    },
    {
      token: 'variable.parameter.function.coffee',
      foreground: 'd6deeb',
    },
    {
      token: 'variable.assignment.coffee',
      foreground: '7fdbca',
    },
    {
      token: 'variable.other.readwrite.cs',
      foreground: 'd6deeb',
    },
    {
      token: 'entity.name.type.class.cs',
      foreground: 'ffcb8b',
    },
    {
      token: 'storage.type.cs',
      foreground: 'ffcb8b',
    },
    {
      token: 'entity.name.type.namespace.cs',
      foreground: 'B2CCD6',
    },
    {
      token: 'string.unquoted.preprocessor.message.cs',
      foreground: 'd6deeb',
    },
    {
      token: 'punctuation.separator.hash.cs',
      foreground: 'ffcb8b',
    },
    {
      token: 'keyword.preprocessor.region.cs',
      foreground: 'ffcb8b',
    },
    {
      token: 'keyword.preprocessor.endregion.cs',
      foreground: 'ffcb8b',
    },
    {
      token: 'variable.other.object.cs',
      foreground: 'B2CCD6',
    },
    {
      token: 'entity.name.type.enum.cs',
      foreground: 'c5e478',
    },
    {
      token: 'string.interpolated.single.dart',
      foreground: 'FFCB8B',
    },
    {
      token: 'string.interpolated.double.dart',
      foreground: 'FFCB8B',
    },
    {
      token: 'support.class.dart',
      foreground: 'FFCB8B',
    },
    {
      token: 'entity.name.tag.css',
      foreground: 'ff6363',
    },
    {
      token: 'entity.name.tag.less',
      foreground: 'ff6363',
    },
    {
      token: 'entity.name.tag.custom.css',
      foreground: 'ff6363',
    },
    {
      token: 'support.constant.property-value.css',
      foreground: 'ff6363',
    },
    {
      token: 'entity.name.tag.wildcard.css',
      foreground: '7fdbca',
    },
    {
      token: 'entity.name.tag.wildcard.less',
      foreground: '7fdbca',
    },
    {
      token: 'entity.name.tag.wildcard.scss',
      foreground: '7fdbca',
    },
    {
      token: 'entity.name.tag.wildcard.sass',
      foreground: '7fdbca',
    },
    {
      token: 'keyword.other.unit.css',
      foreground: 'FFEB95',
    },
    {
      token:
        'meta.attribute-selector.css entity.other.attribute-name.attribute',
      foreground: 'F78C6C',
    },
    {
      token: 'variable.other.readwrite.js',
      foreground: 'F78C6C',
    },
    {
      token: 'source.elixir support.type.elixir',
      foreground: '82AAFF',
    },
    {
      token: 'source.elixir meta.module.elixir entity.name.class.elixir',
      foreground: '82AAFF',
    },
    {
      token: 'source.elixir entity.name.function',
      foreground: 'c5e478',
    },
    {
      token: 'source.elixir constant.other.symbol.elixir',
      foreground: '82AAFF',
    },
    {
      token: 'source.elixir constant.other.keywords.elixir',
      foreground: '82AAFF',
    },
    {
      token: 'source.elixir punctuation.definition.string',
      foreground: 'c5e478',
    },
    {
      token: 'source.elixir variable.other.readwrite.module.elixir',
      foreground: 'c5e478',
    },
    {
      token:
        'source.elixir variable.other.readwrite.module.elixir punctuation.definition.variable.elixir',
      foreground: 'c5e478',
    },
    {
      token: 'source.elixir .punctuation.binary.elixir',
      foreground: 'c792ea',
    },
    {
      token: 'constant.keyword.clojure',
      foreground: '7fdbca',
    },
    {
      token: 'source.go meta.function-call.go',
      foreground: 'DDDDDD',
    },
    {
      token: 'source.go keyword.package.go',
      foreground: 'c792ea',
    },
    {
      token: 'source.go keyword.import.go',
      foreground: 'c792ea',
    },
    {
      token: 'source.go keyword.function.go',
      foreground: 'c792ea',
    },
    {
      token: 'source.go keyword.type.go',
      foreground: 'c792ea',
    },
    {
      token: 'source.go keyword.struct.go',
      foreground: 'c792ea',
    },
    {
      token: 'source.go keyword.interface.go',
      foreground: 'c792ea',
    },
    {
      token: 'source.go keyword.const.go',
      foreground: 'c792ea',
    },
    {
      token: 'source.go keyword.var.go',
      foreground: 'c792ea',
    },
    {
      token: 'source.go keyword.map.go',
      foreground: 'c792ea',
    },
    {
      token: 'source.go keyword.channel.go',
      foreground: 'c792ea',
    },
    {
      token: 'source.go keyword.control.go',
      foreground: 'c792ea',
    },
    {
      token: 'source.go constant.language.go',
      foreground: 'ff5874',
    },
    {
      token: 'source.go constant.other.placeholder.go',
      foreground: 'ff5874',
    },
    {
      token: 'entity.name.function.preprocessor.cpp',
      foreground: '7fdbcaff',
    },
    {
      token: 'entity.scope.name.cpp',
      foreground: '7fdbcaff',
    },
    {
      token: 'meta.namespace-block.cpp',
      foreground: 'e0dec6',
    },
    {
      token: 'storage.type.language.primitive.cpp',
      foreground: 'ff5874',
    },
    {
      token: 'meta.preprocessor.macro.cpp',
      foreground: 'd6deeb',
    },
    {
      token: 'variable.parameter',
      foreground: 'ffcb8b',
    },
    {
      token: 'variable.other.readwrite.powershell',
      foreground: '82AAFF',
    },
    {
      token: 'support.function.powershell',
      foreground: '7fdbcaff',
    },
    {
      token: 'entity.other.attribute-name.id.html',
      foreground: 'c5e478',
    },
    {
      token: 'punctuation.definition.tag.html',
      foreground: '6ae9f0',
    },
    {
      token: 'meta.tag.sgml.doctype.html',
      foreground: 'c792ea',
    },
    {
      token: 'meta.class entity.name.type.class.js',
      foreground: 'ffcb8b',
    },
    {
      token: 'meta.method.declaration storage.type.js',
      foreground: '82AAFF',
    },
    {
      token: 'terminator.js',
      foreground: 'd6deeb',
    },
    {
      token: 'meta.js punctuation.definition.js',
      foreground: 'd6deeb',
    },
    {
      token: 'entity.name.type.instance.jsdoc',
      foreground: '5f7e97',
    },
    {
      token: 'entity.name.type.instance.phpdoc',
      foreground: '5f7e97',
    },
    {
      token: 'variable.other.jsdoc',
      foreground: '78ccf0',
    },
    {
      token: 'variable.other.phpdoc',
      foreground: '78ccf0',
    },
    {
      token: 'variable.other.meta.import.js',
      foreground: 'd6deeb',
    },
    {
      token: 'meta.import.js variable.other',
      foreground: 'd6deeb',
    },
    {
      token: 'variable.other.meta.export.js',
      foreground: 'd6deeb',
    },
    {
      token: 'meta.export.js variable.other',
      foreground: 'd6deeb',
    },
    {
      token: 'variable.parameter.function.js',
      foreground: '7986E7',
    },
    {
      token: 'variable.other.object.js',
      foreground: 'd6deeb',
    },
    {
      token: 'variable.other.object.jsx',
      foreground: 'd6deeb',
    },
    {
      token: 'variable.object.property.js',
      foreground: 'd6deeb',
    },
    {
      token: 'variable.object.property.jsx',
      foreground: 'd6deeb',
    },
    {
      token: 'variable.js',
      foreground: 'd6deeb',
    },
    {
      token: 'variable.other.js',
      foreground: 'd6deeb',
    },
    {
      token: 'entity.name.type.js',
      foreground: 'ffcb8b',
    },
    {
      token: 'entity.name.type.module.js',
      foreground: 'ffcb8b',
    },
    {
      token: 'support.class.js',
      foreground: 'd6deeb',
    },
    {
      token: 'support.type.property-name.json',
      foreground: '7fdbca',
    },
    {
      token: 'support.constant.json',
      foreground: 'c5e478',
    },
    {
      token: 'meta.structure.dictionary.value.json string.quoted.double',
      foreground: 'c789d6',
    },
    {
      token: 'string.quoted.double.json punctuation.definition.string.json',
      foreground: '80CBC4',
    },
    {
      token:
        'meta.structure.dictionary.json meta.structure.dictionary.value constant.language',
      foreground: 'ff5874',
    },
    {
      token: 'variable.other.object.js',
      foreground: '7fdbca',
    },
    {
      token: 'variable.other.ruby',
      foreground: 'd6deeb',
    },
    {
      token: 'entity.name.type.class.ruby',
      foreground: 'ecc48d',
    },
    {
      token: 'constant.language.symbol.hashkey.ruby',
      foreground: '7fdbca',
    },
    {
      token: 'constant.language.symbol.ruby',
      foreground: '7fdbca',
    },
    {
      token: 'entity.name.tag.less',
      foreground: '7fdbca',
    },
    {
      token: 'keyword.other.unit.css',
      foreground: 'FFEB95',
    },
    {
      token:
        'meta.attribute-selector.less entity.other.attribute-name.attribute',
      foreground: 'F78C6C',
    },
    {
      token: 'markup.heading.markdown',
      foreground: '82b1ff',
    },
    {
      token: 'markup.heading.setext.1.markdown',
      foreground: '82b1ff',
    },
    {
      token: 'markup.heading.setext.2.markdown',
      foreground: '82b1ff',
    },
    {
      token: 'markup.italic.markdown',
      foreground: 'c792ea',
    },
    {
      token: 'markup.bold.markdown',
      foreground: 'c5e478',
    },
    {
      token: 'markup.quote.markdown',
      foreground: '697098',
    },
    {
      token: 'markup.inline.raw.markdown',
      foreground: '80CBC4',
    },
    {
      token: 'markup.underline.link.markdown',
      foreground: 'ff869a',
    },
    {
      token: 'markup.underline.link.image.markdown',
      foreground: 'ff869a',
    },
    {
      token: 'string.other.link.title.markdown',
      foreground: 'd6deeb',
    },
    {
      token: 'string.other.link.description.markdown',
      foreground: 'd6deeb',
    },
    {
      token: 'punctuation.definition.string.markdown',
      foreground: '82b1ff',
    },
    {
      token: 'punctuation.definition.string.begin.markdown',
      foreground: '82b1ff',
    },
    {
      token: 'punctuation.definition.string.end.markdown',
      foreground: '82b1ff',
    },
    {
      token: 'meta.link.inline.markdown punctuation.definition.string',
      foreground: '82b1ff',
    },
    {
      token: 'punctuation.definition.metadata.markdown',
      foreground: '7fdbca',
    },
    {
      token: 'beginning.punctuation.definition.list.markdown',
      foreground: '82b1ff',
    },
    {
      token: 'markup.inline.raw.string.markdown',
      foreground: 'c5e478',
    },
    {
      token: 'variable.other.php',
      foreground: 'bec5d4',
    },
    {
      token: 'variable.other.property.php',
      foreground: 'bec5d4',
    },
    {
      token: 'support.class.php',
      foreground: 'ffcb8b',
    },
    {
      token: 'meta.function-call.php punctuation',
      foreground: 'd6deeb',
    },
    {
      token: 'variable.other.global.php',
      foreground: 'c5e478',
    },
    {
      token: 'variable.other.global.php punctuation.definition.variable',
      foreground: 'c5e478',
    },
    {
      token: 'constant.language.python',
      foreground: 'ff5874',
    },
    {
      token: 'variable.parameter.function.python',
      foreground: '82AAFF',
    },
    {
      token: 'meta.function-call.arguments.python',
      foreground: '82AAFF',
    },
    {
      token: 'meta.function-call.python',
      foreground: 'B2CCD6',
    },
    {
      token: 'meta.function-call.generic.python',
      foreground: 'B2CCD6',
    },
    {
      token: 'punctuation.python',
      foreground: 'd6deeb',
    },
    {
      token: 'entity.name.function.decorator.python',
      foreground: 'c5e478',
    },
    {
      token: 'source.python variable.language.special',
      foreground: '8EACE3',
    },
    {
      token: 'keyword.control',
      foreground: 'c792ea',
    },
    {
      token: 'variable.scss',
      foreground: 'c5e478',
    },
    {
      token: 'variable.sass',
      foreground: 'c5e478',
    },
    {
      token: 'variable.parameter.url.scss',
      foreground: 'c5e478',
    },
    {
      token: 'variable.parameter.url.sass',
      foreground: 'c5e478',
    },
    {
      token: 'source.css.scss meta.at-rule variable',
      foreground: '82AAFF',
    },
    {
      token: 'source.css.sass meta.at-rule variable',
      foreground: '82AAFF',
    },
    {
      token: 'source.css.scss meta.at-rule variable',
      foreground: 'bec5d4',
    },
    {
      token: 'source.css.sass meta.at-rule variable',
      foreground: 'bec5d4',
    },
    {
      token:
        'meta.attribute-selector.scss entity.other.attribute-name.attribute',
      foreground: 'F78C6C',
    },
    {
      token:
        'meta.attribute-selector.sass entity.other.attribute-name.attribute',
      foreground: 'F78C6C',
    },
    {
      token: 'entity.name.tag.scss',
      foreground: '7fdbca',
    },
    {
      token: 'entity.name.tag.sass',
      foreground: '7fdbca',
    },
    {
      token: 'keyword.other.unit.scss',
      foreground: 'FFEB95',
    },
    {
      token: 'keyword.other.unit.sass',
      foreground: 'FFEB95',
    },
    {
      token: 'variable.other.readwrite.alias.ts',
      foreground: 'd6deeb',
    },
    {
      token: 'variable.other.readwrite.alias.tsx',
      foreground: 'd6deeb',
    },
    {
      token: 'variable.other.readwrite.ts',
      foreground: 'd6deeb',
    },
    {
      token: 'variable.other.readwrite.tsx',
      foreground: 'd6deeb',
    },
    {
      token: 'variable.other.object.ts',
      foreground: 'd6deeb',
    },
    {
      token: 'variable.other.object.tsx',
      foreground: 'd6deeb',
    },
    {
      token: 'variable.object.property.ts',
      foreground: 'd6deeb',
    },
    {
      token: 'variable.object.property.tsx',
      foreground: 'd6deeb',
    },
    {
      token: 'variable.other.ts',
      foreground: 'd6deeb',
    },
    {
      token: 'variable.other.tsx',
      foreground: 'd6deeb',
    },
    {
      token: 'variable.tsx',
      foreground: 'd6deeb',
    },
    {
      token: 'variable.ts',
      foreground: 'd6deeb',
    },
    {
      token: 'entity.name.type.ts',
      foreground: 'ffcb8b',
    },
    {
      token: 'entity.name.type.tsx',
      foreground: 'ffcb8b',
    },
    {
      token: 'support.class.node.ts',
      foreground: '82AAFF',
    },
    {
      token: 'support.class.node.tsx',
      foreground: '82AAFF',
    },
    {
      token: 'meta.type.parameters.ts entity.name.type',
      foreground: '5f7e97',
    },
    {
      token: 'meta.type.parameters.tsx entity.name.type',
      foreground: '5f7e97',
    },
    {
      token: 'meta.import.ts punctuation.definition.block',
      foreground: 'd6deeb',
    },
    {
      token: 'meta.import.tsx punctuation.definition.block',
      foreground: 'd6deeb',
    },
    {
      token: 'meta.export.ts punctuation.definition.block',
      foreground: 'd6deeb',
    },
    {
      token: 'meta.export.tsx punctuation.definition.block',
      foreground: 'd6deeb',
    },
    {
      token: 'meta.decorator punctuation.decorator.ts',
      foreground: '82AAFF',
    },
    {
      token: 'meta.decorator punctuation.decorator.tsx',
      foreground: '82AAFF',
    },
    {
      token: 'meta.tag.js meta.jsx.children.tsx',
      foreground: '82AAFF',
    },
    {
      token: 'entity.name.tag.yaml',
      foreground: '7fdbca',
    },
    {
      token: 'variable.other.readwrite.js',
      foreground: 'd7dbe0',
    },
    {
      token: 'variable.parameter',
      foreground: 'd7dbe0',
    },
    {
      token: 'support.class.component.js',
      foreground: 'f78c6c',
    },
    {
      token: 'support.class.component.tsx',
      foreground: 'f78c6c',
    },
    {
      token: 'meta.jsx.children',
      foreground: 'd6deeb',
    },
    {
      token: 'meta.jsx.children.js',
      foreground: 'd6deeb',
    },
    {
      token: 'meta.jsx.children.tsx',
      foreground: 'd6deeb',
    },
    {
      token: 'meta.class entity.name.type.class.tsx',
      foreground: 'ffcb8b',
    },
    {
      token: 'entity.name.type.tsx',
      foreground: 'ffcb8b',
    },
    {
      token: 'entity.name.type.module.tsx',
      foreground: 'ffcb8b',
    },
    {
      token: 'meta.class.ts meta.var.expr.ts storage.type.ts',
      foreground: 'C792EA',
    },
    {
      token: 'meta.class.tsx meta.var.expr.tsx storage.type.tsx',
      foreground: 'C792EA',
    },
    {
      token: 'meta.method.declaration storage.type.ts',
      foreground: '82AAFF',
    },
    {
      token: 'meta.method.declaration storage.type.tsx',
      foreground: '82AAFF',
    },
  ],
} as const satisfies monaco.editor.IStandaloneThemeData;
