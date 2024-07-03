import * as monaco from 'monaco-editor';

export default {
  base: 'vs-dark',
  inherit: false,
  colors: {
    'activityBar.background': '#222222',
    'activityBarBadge.background': '#1D978D',
    'button.background': '#0077B5',
    'button.foreground': '#FFFFFF',
    'button.hoverBackground': '#005076',
    'debugExceptionWidget.background': '#141414',
    'debugExceptionWidget.border': '#FFFFFF',
    'debugToolBar.background': '#141414',
    'editor.background': '#222222',
    'editor.foreground': '#E6E6E6',
    'editor.inactiveSelectionBackground': '#3a3d41',
    'editor.lineHighlightBackground': '#141414',
    'editor.lineHighlightBorder': '#141414',
    'editor.selectionHighlightBackground': '#add6ff26',
    'editorIndentGuide.activeBackground': '#707070',
    'editorIndentGuide.background': '#404040',
    'editorLink.activeForeground': '#0077B5',
    'editorSuggestWidget.selectedBackground': '#0077B5',
    'extensionButton.prominentBackground': '#0077B5',
    'extensionButton.prominentForeground': '#FFFFFF',
    'extensionButton.prominentHoverBackground': '#005076',
    focusBorder: '#0077B5',
    'gitDecoration.addedResourceForeground': '#ECB22E',
    'gitDecoration.conflictingResourceForeground': '#FFFFFF',
    'gitDecoration.deletedResourceForeground': '#FFFFFF',
    'gitDecoration.ignoredResourceForeground': '#877583',
    'gitDecoration.modifiedResourceForeground': '#ECB22E',
    'gitDecoration.untrackedResourceForeground': '#ECB22E',
    'input.placeholderForeground': '#7A7A7A',
    'list.activeSelectionBackground': '#222222',
    'list.dropBackground': '#383b3d',
    'list.focusBackground': '#0077B5',
    'list.hoverBackground': '#222222',
    'menu.background': '#252526',
    'menu.foreground': '#E6E6E6',
    'notificationLink.foreground': '#0077B5',
    'settings.numberInputBackground': '#292929',
    'settings.textInputBackground': '#292929',
    'sideBarSectionHeader.background': '#222222',
    'sideBarTitle.foreground': '#E6E6E6',
    'statusBar.background': '#222222',
    'statusBar.debuggingBackground': '#1D978D',
    'statusBar.noFolderBackground': '#141414',
    'textLink.activeForeground': '#0077B5',
    'textLink.foreground': '#0077B5',
    'titleBar.activeBackground': '#222222',
    'titleBar.activeForeground': '#E6E6E6',
    'titleBar.inactiveBackground': '#222222',
    'titleBar.inactiveForeground': '#7A7A7A',
  },
  rules: [
    {
      token: 'meta.embedded',
      foreground: 'D4D4D4',
    },
    {
      token: 'source.groovy.embedded',
      foreground: 'D4D4D4',
    },
    {
      token: 'header',
      foreground: '000080',
    },
    {
      token: 'comment',
      foreground: '6A9955',
    },
    {
      token: 'constant.language',
      foreground: '569cd6',
    },
    {
      token: 'constant.numeric',
      foreground: 'b5cea8',
    },
    {
      token: 'constant.regexp',
      foreground: '646695',
    },
    {
      token: 'entity.name.tag',
      foreground: '569cd6',
    },
    {
      token: 'entity.name.tag.css',
      foreground: 'd7ba7d',
    },
    {
      token: 'entity.other.attribute-name',
      foreground: '9cdcfe',
    },
    {
      token: 'entity.other.attribute-name.class.css',
      foreground: 'd7ba7d',
    },
    {
      token: 'entity.other.attribute-name.class.mixin.css',
      foreground: 'd7ba7d',
    },
    {
      token: 'entity.other.attribute-name.id.css',
      foreground: 'd7ba7d',
    },
    {
      token: 'entity.other.attribute-name.parent-selector.css',
      foreground: 'd7ba7d',
    },
    {
      token: 'entity.other.attribute-name.pseudo-class.css',
      foreground: 'd7ba7d',
    },
    {
      token: 'entity.other.attribute-name.pseudo-element.css',
      foreground: 'd7ba7d',
    },
    {
      token: 'source.css.less entity.other.attribute-name.id',
      foreground: 'd7ba7d',
    },
    {
      token: 'entity.other.attribute-name.attribute.scss',
      foreground: 'd7ba7d',
    },
    {
      token: 'entity.other.attribute-name.scss',
      foreground: 'd7ba7d',
    },
    {
      token: 'invalid',
      foreground: 'f44747',
    },
    {
      token: 'markup.bold',
      foreground: '569cd6',
    },
    {
      token: 'markup.heading',
      foreground: '569cd6',
    },
    {
      token: 'markup.inserted',
      foreground: 'b5cea8',
    },
    {
      token: 'markup.deleted',
      foreground: 'ce9178',
    },
    {
      token: 'markup.changed',
      foreground: '569cd6',
    },
    {
      token: 'punctuation.definition.quote.begin.markdown',
      foreground: '6A9955',
    },
    {
      token: 'punctuation.definition.list.begin.markdown',
      foreground: '6796e6',
    },
    {
      token: 'markup.inline.raw',
      foreground: 'ce9178',
    },
    {
      token: 'punctuation.definition.tag',
      foreground: '808080',
    },
    {
      token: 'meta.preprocessor',
      foreground: '569cd6',
    },
    {
      token: 'meta.preprocessor.string',
      foreground: 'ce9178',
    },
    {
      token: 'meta.preprocessor.numeric',
      foreground: 'b5cea8',
    },
    {
      token: 'meta.structure.dictionary.key.python',
      foreground: '9cdcfe',
    },
    {
      token: 'meta.diff.header',
      foreground: '569cd6',
    },
    {
      token: 'storage',
      foreground: '569cd6',
    },
    {
      token: 'storage.type',
      foreground: '569cd6',
    },
    {
      token: 'storage.modifier',
      foreground: '569cd6',
    },
    {
      token: 'string',
      foreground: 'ce9178',
    },
    {
      token: 'string.tag',
      foreground: 'ce9178',
    },
    {
      token: 'string.value',
      foreground: 'ce9178',
    },
    {
      token: 'string.regexp',
      foreground: 'd16969',
    },
    {
      token: 'punctuation.definition.template-expression.begin',
      foreground: '569cd6',
    },
    {
      token: 'punctuation.definition.template-expression.end',
      foreground: '569cd6',
    },
    {
      token: 'punctuation.section.embedded',
      foreground: '569cd6',
    },
    {
      token: 'meta.template.expression',
      foreground: 'd4d4d4',
    },
    {
      token: 'support.type.vendored.property-name',
      foreground: '9cdcfe',
    },
    {
      token: 'support.type.property-name',
      foreground: '9cdcfe',
    },
    {
      token: 'variable.css',
      foreground: '9cdcfe',
    },
    {
      token: 'variable.scss',
      foreground: '9cdcfe',
    },
    {
      token: 'variable.other.less',
      foreground: '9cdcfe',
    },
    {
      token: 'source.coffee.embedded',
      foreground: '9cdcfe',
    },
    {
      token: 'keyword',
      foreground: '569cd6',
    },
    {
      token: 'keyword.control',
      foreground: '569cd6',
    },
    {
      token: 'keyword.operator',
      foreground: 'd4d4d4',
    },
    {
      token: 'keyword.operator.new',
      foreground: '569cd6',
    },
    {
      token: 'keyword.operator.expression',
      foreground: '569cd6',
    },
    {
      token: 'keyword.operator.cast',
      foreground: '569cd6',
    },
    {
      token: 'keyword.operator.sizeof',
      foreground: '569cd6',
    },
    {
      token: 'keyword.operator.instanceof',
      foreground: '569cd6',
    },
    {
      token: 'keyword.operator.logical.python',
      foreground: '569cd6',
    },
    {
      token: 'keyword.other.unit',
      foreground: 'b5cea8',
    },
    {
      token: 'punctuation.section.embedded.begin.php',
      foreground: '569cd6',
    },
    {
      token: 'punctuation.section.embedded.end.php',
      foreground: '569cd6',
    },
    {
      token: 'support.function.git-rebase',
      foreground: '9cdcfe',
    },
    {
      token: 'constant.sha.git-rebase',
      foreground: 'b5cea8',
    },
    {
      token: 'storage.modifier.import.java',
      foreground: 'd4d4d4',
    },
    {
      token: 'variable.language.wildcard.java',
      foreground: 'd4d4d4',
    },
    {
      token: 'storage.modifier.package.java',
      foreground: 'd4d4d4',
    },
    {
      token: 'variable.language',
      foreground: '569cd6',
    },
    {
      token: 'entity.name.function',
      foreground: 'DCDCAA',
    },
    {
      token: 'support.function',
      foreground: 'DCDCAA',
    },
    {
      token: 'support.constant.handlebars',
      foreground: 'DCDCAA',
    },
    {
      token: 'meta.return-type',
      foreground: '4EC9B0',
    },
    {
      token: 'support.class',
      foreground: '4EC9B0',
    },
    {
      token: 'support.type',
      foreground: '4EC9B0',
    },
    {
      token: 'entity.name.type',
      foreground: '4EC9B0',
    },
    {
      token: 'entity.name.class',
      foreground: '4EC9B0',
    },
    {
      token: 'storage.type.numeric.go',
      foreground: '4EC9B0',
    },
    {
      token: 'storage.type.byte.go',
      foreground: '4EC9B0',
    },
    {
      token: 'storage.type.boolean.go',
      foreground: '4EC9B0',
    },
    {
      token: 'storage.type.string.go',
      foreground: '4EC9B0',
    },
    {
      token: 'storage.type.uintptr.go',
      foreground: '4EC9B0',
    },
    {
      token: 'storage.type.error.go',
      foreground: '4EC9B0',
    },
    {
      token: 'storage.type.rune.go',
      foreground: '4EC9B0',
    },
    {
      token: 'storage.type.cs',
      foreground: '4EC9B0',
    },
    {
      token: 'storage.type.generic.cs',
      foreground: '4EC9B0',
    },
    {
      token: 'storage.type.modifier.cs',
      foreground: '4EC9B0',
    },
    {
      token: 'storage.type.variable.cs',
      foreground: '4EC9B0',
    },
    {
      token: 'storage.type.annotation.java',
      foreground: '4EC9B0',
    },
    {
      token: 'storage.type.generic.java',
      foreground: '4EC9B0',
    },
    {
      token: 'storage.type.java',
      foreground: '4EC9B0',
    },
    {
      token: 'storage.type.object.array.java',
      foreground: '4EC9B0',
    },
    {
      token: 'storage.type.primitive.array.java',
      foreground: '4EC9B0',
    },
    {
      token: 'storage.type.primitive.java',
      foreground: '4EC9B0',
    },
    {
      token: 'storage.type.token.java',
      foreground: '4EC9B0',
    },
    {
      token: 'storage.type.groovy',
      foreground: '4EC9B0',
    },
    {
      token: 'storage.type.annotation.groovy',
      foreground: '4EC9B0',
    },
    {
      token: 'storage.type.parameters.groovy',
      foreground: '4EC9B0',
    },
    {
      token: 'storage.type.generic.groovy',
      foreground: '4EC9B0',
    },
    {
      token: 'storage.type.object.array.groovy',
      foreground: '4EC9B0',
    },
    {
      token: 'storage.type.primitive.array.groovy',
      foreground: '4EC9B0',
    },
    {
      token: 'storage.type.primitive.groovy',
      foreground: '4EC9B0',
    },
    {
      token: 'meta.type.cast.expr',
      foreground: '4EC9B0',
    },
    {
      token: 'meta.type.new.expr',
      foreground: '4EC9B0',
    },
    {
      token: 'support.constant.math',
      foreground: '4EC9B0',
    },
    {
      token: 'support.constant.dom',
      foreground: '4EC9B0',
    },
    {
      token: 'support.constant.json',
      foreground: '4EC9B0',
    },
    {
      token: 'entity.other.inherited-class',
      foreground: '4EC9B0',
    },
    {
      token: 'keyword.control',
      foreground: 'C586C0',
    },
    {
      token: 'variable',
      foreground: '9CDCFE',
    },
    {
      token: 'meta.definition.variable.name',
      foreground: '9CDCFE',
    },
    {
      token: 'support.variable',
      foreground: '9CDCFE',
    },
    {
      token: 'entity.name.variable',
      foreground: '9CDCFE',
    },
    {
      token: 'meta.object-literal.key',
      foreground: '9CDCFE',
    },
    {
      token: 'support.constant.property-value',
      foreground: 'CE9178',
    },
    {
      token: 'support.constant.font-name',
      foreground: 'CE9178',
    },
    {
      token: 'support.constant.media-type',
      foreground: 'CE9178',
    },
    {
      token: 'support.constant.media',
      foreground: 'CE9178',
    },
    {
      token: 'constant.other.color.rgb-value',
      foreground: 'CE9178',
    },
    {
      token: 'constant.other.rgb-value',
      foreground: 'CE9178',
    },
    {
      token: 'support.constant.color',
      foreground: 'CE9178',
    },
    {
      token: 'punctuation.definition.group.regexp',
      foreground: 'CE9178',
    },
    {
      token: 'punctuation.definition.group.assertion.regexp',
      foreground: 'CE9178',
    },
    {
      token: 'punctuation.definition.character-class.regexp',
      foreground: 'CE9178',
    },
    {
      token: 'punctuation.character.set.begin.regexp',
      foreground: 'CE9178',
    },
    {
      token: 'punctuation.character.set.end.regexp',
      foreground: 'CE9178',
    },
    {
      token: 'keyword.operator.negation.regexp',
      foreground: 'CE9178',
    },
    {
      token: 'support.other.parenthesis.regexp',
      foreground: 'CE9178',
    },
    {
      token: 'constant.character.character-class.regexp',
      foreground: 'd16969',
    },
    {
      token: 'constant.other.character-class.set.regexp',
      foreground: 'd16969',
    },
    {
      token: 'constant.other.character-class.regexp',
      foreground: 'd16969',
    },
    {
      token: 'constant.character.set.regexp',
      foreground: 'd16969',
    },
    {
      token: 'keyword.operator.or.regexp',
      foreground: 'DCDCAA',
    },
    {
      token: 'keyword.control.anchor.regexp',
      foreground: 'DCDCAA',
    },
    {
      token: 'keyword.operator.quantifier.regexp',
      foreground: 'd7ba7d',
    },
    {
      token: 'constant.character',
      foreground: '569cd6',
    },
    {
      token: 'constant.character.escape',
      foreground: 'd7ba7d',
    },
    {
      token: 'token.info-token',
      foreground: '6796e6',
    },
    {
      token: 'token.warn-token',
      foreground: 'cd9731',
    },
    {
      token: 'token.error-token',
      foreground: 'f44747',
    },
    {
      token: 'token.debug-token',
      foreground: 'b267e6',
    },
  ],
} as const satisfies monaco.editor.IStandaloneThemeData;
