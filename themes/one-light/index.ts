import * as monaco from 'monaco-editor';

export default {
  base: 'vs',
  inherit: false,
  colors: {
    'activityBar.background': '#FAFAFA',
    'activityBar.foreground': '#121417',
    'activityBarBadge.background': '#526FFF',
    'activityBarBadge.foreground': '#FFFFFF',
    'badge.background': '#526FFF',
    'badge.foreground': '#FFFFFF',
    'button.background': '#5871EF',
    'button.foreground': '#FFFFFF',
    'button.hoverBackground': '#6B83ED',
    'diffEditor.insertedTextBackground': '#00809B33',
    'dropdown.background': '#FFFFFF',
    'dropdown.border': '#DBDBDC',
    'editor.background': '#FAFAFA',
    'editor.findMatchHighlightBackground': '#526FFF33',
    'editor.foreground': '#383A42',
    'editor.lineHighlightBackground': '#383A420C',
    'editor.selectionBackground': '#E5E5E6',
    'editorCursor.foreground': '#526FFF',
    'editorGroup.background': '#EAEAEB',
    'editorGroup.border': '#DBDBDC',
    'editorGroupHeader.tabsBackground': '#EAEAEB',
    'editorHoverWidget.background': '#EAEAEB',
    'editorHoverWidget.border': '#DBDBDC',
    'editorIndentGuide.activeBackground': '#626772',
    'editorIndentGuide.background': '#383A4233',
    'editorInlayHint.background': '#F5F5F5',
    'editorInlayHint.foreground': '#AFB2BB',
    'editorLineNumber.activeForeground': '#383A42',
    'editorLineNumber.foreground': '#9D9D9F',
    'editorRuler.foreground': '#383A4233',
    'editorSuggestWidget.background': '#EAEAEB',
    'editorSuggestWidget.border': '#DBDBDC',
    'editorSuggestWidget.selectedBackground': '#FFFFFF',
    'editorWhitespace.foreground': '#383A4233',
    'editorWidget.background': '#EAEAEB',
    'editorWidget.border': '#E5E5E6',
    'extensionButton.prominentBackground': '#3BBA54',
    'extensionButton.prominentHoverBackground': '#4CC263',
    focusBorder: '#526FFF',
    'input.background': '#FFFFFF',
    'input.border': '#DBDBDC',
    'list.activeSelectionBackground': '#DBDBDC',
    'list.activeSelectionForeground': '#232324',
    'list.focusBackground': '#DBDBDC',
    'list.highlightForeground': '#121417',
    'list.hoverBackground': '#DBDBDC66',
    'list.inactiveSelectionBackground': '#DBDBDC',
    'list.inactiveSelectionForeground': '#232324',
    'notebook.cellEditorBackground': '#F5F5F5',
    'notification.background': '#333333',
    'peekView.border': '#526FFF',
    'peekViewEditor.background': '#FFFFFF',
    'peekViewResult.background': '#EAEAEB',
    'peekViewResult.selectionBackground': '#DBDBDC',
    'peekViewTitle.background': '#FFFFFF',
    'pickerGroup.border': '#526FFF',
    'scrollbarSlider.activeBackground': '#747D9180',
    'scrollbarSlider.background': '#4E566680',
    'scrollbarSlider.hoverBackground': '#5A637580',
    'sideBar.background': '#EAEAEB',
    'sideBarSectionHeader.background': '#FAFAFA',
    'statusBar.background': '#EAEAEB',
    'statusBar.debuggingForeground': '#FFFFFF',
    'statusBar.foreground': '#424243',
    'statusBar.noFolderBackground': '#EAEAEB',
    'statusBarItem.hoverBackground': '#DBDBDC',
    'tab.activeBackground': '#FAFAFA',
    'tab.activeForeground': '#121417',
    'tab.border': '#DBDBDC',
    'tab.inactiveBackground': '#EAEAEB',
    'titleBar.activeBackground': '#EAEAEB',
    'titleBar.activeForeground': '#424243',
    'titleBar.inactiveBackground': '#EAEAEB',
    'titleBar.inactiveForeground': '#424243',
  },
  rules: [
    {
      token: 'comment',
      foreground: 'A0A1A7',
    },
    {
      token: 'comment markup.link',
      foreground: 'A0A1A7',
    },
    {
      token: 'entity.name.type',
      foreground: 'C18401',
    },
    {
      token: 'entity.other.inherited-class',
      foreground: 'C18401',
    },
    {
      token: 'keyword',
      foreground: 'A626A4',
    },
    {
      token: 'keyword.control',
      foreground: 'A626A4',
    },
    {
      token: 'keyword.operator',
      foreground: '383A42',
    },
    {
      token: 'keyword.other.special-method',
      foreground: '4078F2',
    },
    {
      token: 'keyword.other.unit',
      foreground: '986801',
    },
    {
      token: 'storage',
      foreground: 'A626A4',
    },
    {
      token: 'storage.type.annotation',
      foreground: 'A626A4',
    },
    {
      token: 'storage.type.primitive',
      foreground: 'A626A4',
    },
    {
      token: 'storage.modifier.package',
      foreground: '383A42',
    },
    {
      token: 'storage.modifier.import',
      foreground: '383A42',
    },
    {
      token: 'constant',
      foreground: '986801',
    },
    {
      token: 'constant.variable',
      foreground: '986801',
    },
    {
      token: 'constant.character.escape',
      foreground: '0184BC',
    },
    {
      token: 'constant.numeric',
      foreground: '986801',
    },
    {
      token: 'constant.other.color',
      foreground: '0184BC',
    },
    {
      token: 'constant.other.symbol',
      foreground: '0184BC',
    },
    {
      token: 'variable',
      foreground: 'E45649',
    },
    {
      token: 'variable.interpolation',
      foreground: 'CA1243',
    },
    {
      token: 'variable.parameter',
      foreground: '383A42',
    },
    {
      token: 'string',
      foreground: '50A14F',
    },
    {
      token: 'string > source',
      foreground: '383A42',
    },
    {
      token: 'string embedded',
      foreground: '383A42',
    },
    {
      token: 'string.regexp',
      foreground: '0184BC',
    },
    {
      token: 'string.regexp source.ruby.embedded',
      foreground: 'C18401',
    },
    {
      token: 'string.other.link',
      foreground: 'E45649',
    },
    {
      token: 'punctuation.definition.comment',
      foreground: 'A0A1A7',
    },
    {
      token: 'punctuation.definition.method-parameters',
      foreground: '383A42',
    },
    {
      token: 'punctuation.definition.function-parameters',
      foreground: '383A42',
    },
    {
      token: 'punctuation.definition.parameters',
      foreground: '383A42',
    },
    {
      token: 'punctuation.definition.separator',
      foreground: '383A42',
    },
    {
      token: 'punctuation.definition.seperator',
      foreground: '383A42',
    },
    {
      token: 'punctuation.definition.array',
      foreground: '383A42',
    },
    {
      token: 'punctuation.definition.heading',
      foreground: '4078F2',
    },
    {
      token: 'punctuation.definition.identity',
      foreground: '4078F2',
    },
    {
      token: 'punctuation.definition.bold',
      foreground: 'C18401',
    },
    {
      token: 'punctuation.definition.italic',
      foreground: 'A626A4',
    },
    {
      token: 'punctuation.section.embedded',
      foreground: 'CA1243',
    },
    {
      token: 'punctuation.section.method',
      foreground: '383A42',
    },
    {
      token: 'punctuation.section.class',
      foreground: '383A42',
    },
    {
      token: 'punctuation.section.inner-class',
      foreground: '383A42',
    },
    {
      token: 'support.class',
      foreground: 'C18401',
    },
    {
      token: 'support.type',
      foreground: '0184BC',
    },
    {
      token: 'support.function',
      foreground: '0184BC',
    },
    {
      token: 'support.function.any-method',
      foreground: '4078F2',
    },
    {
      token: 'entity.name.function',
      foreground: '4078F2',
    },
    {
      token: 'entity.name.class',
      foreground: 'C18401',
    },
    {
      token: 'entity.name.type.class',
      foreground: 'C18401',
    },
    {
      token: 'entity.name.section',
      foreground: '4078F2',
    },
    {
      token: 'entity.name.tag',
      foreground: 'E45649',
    },
    {
      token: 'entity.other.attribute-name',
      foreground: '986801',
    },
    {
      token: 'entity.other.attribute-name.id',
      foreground: '4078F2',
    },
    {
      token: 'meta.class',
      foreground: 'C18401',
    },
    {
      token: 'meta.class.body',
      foreground: '383A42',
    },
    {
      token: 'meta.method-call',
      foreground: '383A42',
    },
    {
      token: 'meta.method',
      foreground: '383A42',
    },
    {
      token: 'meta.definition.variable',
      foreground: 'E45649',
    },
    {
      token: 'meta.link',
      foreground: '986801',
    },
    {
      token: 'meta.require',
      foreground: '4078F2',
    },
    {
      token: 'meta.selector',
      foreground: 'A626A4',
    },
    {
      token: 'meta.separator',
      foreground: '383A42',
    },
    {
      token: 'meta.tag',
      foreground: '383A42',
    },
    {
      token: 'none',
      foreground: '383A42',
    },
    {
      token: 'invalid.deprecated',
      foreground: '000000',
    },
    {
      token: 'invalid.illegal',
      foreground: '00000001',
    },
    {
      token: 'markup.bold',
      foreground: '986801',
    },
    {
      token: 'markup.changed',
      foreground: 'A626A4',
    },
    {
      token: 'markup.deleted',
      foreground: 'E45649',
    },
    {
      token: 'markup.italic',
      foreground: 'A626A4',
    },
    {
      token: 'markup.heading',
      foreground: 'E45649',
    },
    {
      token: 'markup.heading punctuation.definition.heading',
      foreground: '4078F2',
    },
    {
      token: 'markup.link',
      foreground: '0184BC',
    },
    {
      token: 'markup.inserted',
      foreground: '50A14F',
    },
    {
      token: 'markup.quote',
      foreground: '986801',
    },
    {
      token: 'markup.raw',
      foreground: '50A14F',
    },
    {
      token: 'source.c keyword.operator',
      foreground: 'A626A4',
    },
    {
      token: 'source.cpp keyword.operator',
      foreground: 'A626A4',
    },
    {
      token: 'source.cs keyword.operator',
      foreground: 'A626A4',
    },
    {
      token: 'source.css property-name',
      foreground: '696C77',
    },
    {
      token: 'source.css property-value',
      foreground: '696C77',
    },
    {
      token: 'source.css property-name.support',
      foreground: '383A42',
    },
    {
      token: 'source.css property-value.support',
      foreground: '383A42',
    },
    {
      token: 'source.elixir source.embedded.source',
      foreground: '383A42',
    },
    {
      token: 'source.elixir constant.language',
      foreground: '4078F2',
    },
    {
      token: 'source.elixir constant.numeric',
      foreground: '4078F2',
    },
    {
      token: 'source.elixir constant.definition',
      foreground: '4078F2',
    },
    {
      token: 'source.elixir variable.definition',
      foreground: 'A626A4',
    },
    {
      token: 'source.elixir variable.anonymous',
      foreground: 'A626A4',
    },
    {
      token: 'source.elixir parameter.variable.function',
      foreground: '986801',
    },
    {
      token: 'source.elixir quoted',
      foreground: '50A14F',
    },
    {
      token: 'source.elixir keyword.special-method',
      foreground: 'E45649',
    },
    {
      token: 'source.elixir embedded.section',
      foreground: 'E45649',
    },
    {
      token: 'source.elixir embedded.source.empty',
      foreground: 'E45649',
    },
    {
      token: 'source.elixir readwrite.module punctuation',
      foreground: 'E45649',
    },
    {
      token: 'source.elixir regexp.section',
      foreground: 'CA1243',
    },
    {
      token: 'source.elixir regexp.string',
      foreground: 'CA1243',
    },
    {
      token: 'source.elixir separator',
      foreground: '986801',
    },
    {
      token: 'source.elixir keyword.operator',
      foreground: '986801',
    },
    {
      token: 'source.elixir variable.constant',
      foreground: 'C18401',
    },
    {
      token: 'source.elixir array',
      foreground: '696C77',
    },
    {
      token: 'source.elixir scope',
      foreground: '696C77',
    },
    {
      token: 'source.elixir section',
      foreground: '696C77',
    },
    {
      token: 'source.gfm link entity',
      foreground: '4078F2',
    },
    {
      token: 'source.go storage.type.string',
      foreground: 'A626A4',
    },
    {
      token: 'source.ini keyword.other.definition.ini',
      foreground: 'E45649',
    },
    {
      token: 'source.java storage.modifier.import',
      foreground: 'C18401',
    },
    {
      token: 'source.java storage.type',
      foreground: 'C18401',
    },
    {
      token: 'source.java keyword.operator.instanceof',
      foreground: 'A626A4',
    },
    {
      token: 'source.java-properties meta.key-pair',
      foreground: 'E45649',
    },
    {
      token: 'source.java-properties meta.key-pair > punctuation',
      foreground: '383A42',
    },
    {
      token: 'source.js keyword.operator',
      foreground: '0184BC',
    },
    {
      token: 'source.js keyword.operator.delete',
      foreground: 'A626A4',
    },
    {
      token: 'source.js keyword.operator.in',
      foreground: 'A626A4',
    },
    {
      token: 'source.js keyword.operator.of',
      foreground: 'A626A4',
    },
    {
      token: 'source.js keyword.operator.instanceof',
      foreground: 'A626A4',
    },
    {
      token: 'source.js keyword.operator.new',
      foreground: 'A626A4',
    },
    {
      token: 'source.js keyword.operator.typeof',
      foreground: 'A626A4',
    },
    {
      token: 'source.js keyword.operator.void',
      foreground: 'A626A4',
    },
    {
      token: 'source.ts keyword.operator',
      foreground: '0184BC',
    },
    {
      token: 'source.flow keyword.operator',
      foreground: '0184BC',
    },
    {
      token: 'source.json meta.structure.dictionary.json > string.quoted.json',
      foreground: 'E45649',
    },
    {
      token:
        'source.json meta.structure.dictionary.json > string.quoted.json > punctuation.string',
      foreground: 'E45649',
    },
    {
      token:
        'source.json meta.structure.dictionary.json > value.json > string.quoted.json',
      foreground: '50A14F',
    },
    {
      token:
        'source.json meta.structure.array.json > value.json > string.quoted.json',
      foreground: '50A14F',
    },
    {
      token:
        'source.json meta.structure.dictionary.json > value.json > string.quoted.json > punctuation',
      foreground: '50A14F',
    },
    {
      token:
        'source.json meta.structure.array.json > value.json > string.quoted.json > punctuation',
      foreground: '50A14F',
    },
    {
      token:
        'source.json meta.structure.dictionary.json > constant.language.json',
      foreground: '0184BC',
    },
    {
      token: 'source.json meta.structure.array.json > constant.language.json',
      foreground: '0184BC',
    },
    {
      token: 'ng.interpolation',
      foreground: 'E45649',
    },
    {
      token: 'ng.interpolation.begin',
      foreground: '4078F2',
    },
    {
      token: 'ng.interpolation.end',
      foreground: '4078F2',
    },
    {
      token: 'ng.interpolation function',
      foreground: 'E45649',
    },
    {
      token: 'ng.interpolation function.begin',
      foreground: '4078F2',
    },
    {
      token: 'ng.interpolation function.end',
      foreground: '4078F2',
    },
    {
      token: 'ng.interpolation bool',
      foreground: '986801',
    },
    {
      token: 'ng.interpolation bracket',
      foreground: '383A42',
    },
    {
      token: 'ng.pipe',
      foreground: '383A42',
    },
    {
      token: 'ng.operator',
      foreground: '383A42',
    },
    {
      token: 'ng.tag',
      foreground: '0184BC',
    },
    {
      token: 'ng.attribute-with-value attribute-name',
      foreground: 'C18401',
    },
    {
      token: 'ng.attribute-with-value string',
      foreground: 'A626A4',
    },
    {
      token: 'ng.attribute-with-value string.begin',
      foreground: '383A42',
    },
    {
      token: 'ng.attribute-with-value string.end',
      foreground: '383A42',
    },
    {
      token: 'source.ruby constant.other.symbol > punctuation',
      foreground: '00000002',
    },
    {
      token: 'source.php class.bracket',
      foreground: '383A42',
    },
    {
      token: 'source.python keyword.operator.logical.python',
      foreground: 'A626A4',
    },
    {
      token: 'source.python variable.parameter',
      foreground: '986801',
    },
    {
      token: 'customrule',
      foreground: '383A42',
    },
    {
      token: 'support.type.property-name',
      foreground: '383A42',
    },
    {
      token: 'string.quoted.double punctuation',
      foreground: '50A14F',
    },
    {
      token: 'support.constant',
      foreground: '986801',
    },
    {
      token: 'support.type.property-name.json',
      foreground: 'E45649',
    },
    {
      token: 'support.type.property-name.json punctuation',
      foreground: 'E45649',
    },
    {
      token: 'punctuation.separator.key-value.ts',
      foreground: '0184BC',
    },
    {
      token: 'punctuation.separator.key-value.js',
      foreground: '0184BC',
    },
    {
      token: 'punctuation.separator.key-value.tsx',
      foreground: '0184BC',
    },
    {
      token: 'source.js.embedded.html keyword.operator',
      foreground: '0184BC',
    },
    {
      token: 'source.ts.embedded.html keyword.operator',
      foreground: '0184BC',
    },
    {
      token: 'variable.other.readwrite.js',
      foreground: '383A42',
    },
    {
      token: 'variable.other.readwrite.ts',
      foreground: '383A42',
    },
    {
      token: 'variable.other.readwrite.tsx',
      foreground: '383A42',
    },
    {
      token: 'support.variable.dom.js',
      foreground: 'E45649',
    },
    {
      token: 'support.variable.dom.ts',
      foreground: 'E45649',
    },
    {
      token: 'support.variable.property.dom.js',
      foreground: 'E45649',
    },
    {
      token: 'support.variable.property.dom.ts',
      foreground: 'E45649',
    },
    {
      token: 'meta.template.expression.js punctuation.definition',
      foreground: 'CA1243',
    },
    {
      token: 'meta.template.expression.ts punctuation.definition',
      foreground: 'CA1243',
    },
    {
      token: 'source.ts punctuation.definition.typeparameters',
      foreground: '383A42',
    },
    {
      token: 'source.js punctuation.definition.typeparameters',
      foreground: '383A42',
    },
    {
      token: 'source.tsx punctuation.definition.typeparameters',
      foreground: '383A42',
    },
    {
      token: 'source.ts punctuation.definition.block',
      foreground: '383A42',
    },
    {
      token: 'source.js punctuation.definition.block',
      foreground: '383A42',
    },
    {
      token: 'source.tsx punctuation.definition.block',
      foreground: '383A42',
    },
    {
      token: 'source.ts punctuation.separator.comma',
      foreground: '383A42',
    },
    {
      token: 'source.js punctuation.separator.comma',
      foreground: '383A42',
    },
    {
      token: 'source.tsx punctuation.separator.comma',
      foreground: '383A42',
    },
    {
      token: 'support.variable.property.js',
      foreground: 'E45649',
    },
    {
      token: 'support.variable.property.ts',
      foreground: 'E45649',
    },
    {
      token: 'support.variable.property.tsx',
      foreground: 'E45649',
    },
    {
      token: 'keyword.control.default.js',
      foreground: 'E45649',
    },
    {
      token: 'keyword.control.default.ts',
      foreground: 'E45649',
    },
    {
      token: 'keyword.control.default.tsx',
      foreground: 'E45649',
    },
    {
      token: 'keyword.operator.expression.instanceof.js',
      foreground: 'A626A4',
    },
    {
      token: 'keyword.operator.expression.instanceof.ts',
      foreground: 'A626A4',
    },
    {
      token: 'keyword.operator.expression.instanceof.tsx',
      foreground: 'A626A4',
    },
    {
      token: 'keyword.operator.expression.of.js',
      foreground: 'A626A4',
    },
    {
      token: 'keyword.operator.expression.of.ts',
      foreground: 'A626A4',
    },
    {
      token: 'keyword.operator.expression.of.tsx',
      foreground: 'A626A4',
    },
    {
      token: 'meta.brace.round.js',
      foreground: '383A42',
    },
    {
      token: 'meta.array-binding-pattern-variable.js',
      foreground: '383A42',
    },
    {
      token: 'meta.brace.square.js',
      foreground: '383A42',
    },
    {
      token: 'meta.brace.round.ts',
      foreground: '383A42',
    },
    {
      token: 'meta.array-binding-pattern-variable.ts',
      foreground: '383A42',
    },
    {
      token: 'meta.brace.square.ts',
      foreground: '383A42',
    },
    {
      token: 'meta.brace.round.tsx',
      foreground: '383A42',
    },
    {
      token: 'meta.array-binding-pattern-variable.tsx',
      foreground: '383A42',
    },
    {
      token: 'meta.brace.square.tsx',
      foreground: '383A42',
    },
    {
      token: 'source.js punctuation.accessor',
      foreground: '383A42',
    },
    {
      token: 'source.ts punctuation.accessor',
      foreground: '383A42',
    },
    {
      token: 'source.tsx punctuation.accessor',
      foreground: '383A42',
    },
    {
      token: 'punctuation.terminator.statement.js',
      foreground: '383A42',
    },
    {
      token: 'punctuation.terminator.statement.ts',
      foreground: '383A42',
    },
    {
      token: 'punctuation.terminator.statement.tsx',
      foreground: '383A42',
    },
    {
      token:
        'meta.array-binding-pattern-variable.js variable.other.readwrite.js',
      foreground: '986801',
    },
    {
      token:
        'meta.array-binding-pattern-variable.ts variable.other.readwrite.ts',
      foreground: '986801',
    },
    {
      token:
        'meta.array-binding-pattern-variable.tsx variable.other.readwrite.tsx',
      foreground: '986801',
    },
    {
      token: 'source.js support.variable',
      foreground: 'E45649',
    },
    {
      token: 'source.ts support.variable',
      foreground: 'E45649',
    },
    {
      token: 'source.tsx support.variable',
      foreground: 'E45649',
    },
    {
      token: 'variable.other.constant.property.js',
      foreground: '986801',
    },
    {
      token: 'variable.other.constant.property.ts',
      foreground: '986801',
    },
    {
      token: 'variable.other.constant.property.tsx',
      foreground: '986801',
    },
    {
      token: 'keyword.operator.new.ts',
      foreground: 'A626A4',
    },
    {
      token: 'keyword.operator.new.j',
      foreground: 'A626A4',
    },
    {
      token: 'keyword.operator.new.tsx',
      foreground: 'A626A4',
    },
    {
      token: 'source.ts keyword.operator',
      foreground: '0184BC',
    },
    {
      token: 'source.tsx keyword.operator',
      foreground: '0184BC',
    },
    {
      token: 'punctuation.separator.parameter.js',
      foreground: '383A42',
    },
    {
      token: 'punctuation.separator.parameter.ts',
      foreground: '383A42',
    },
    {
      token: 'punctuation.separator.parameter.tsx ',
      foreground: '383A42',
    },
    {
      token: 'constant.language.import-export-all.js',
      foreground: 'E45649',
    },
    {
      token: 'constant.language.import-export-all.ts',
      foreground: 'E45649',
    },
    {
      token: 'constant.language.import-export-all.jsx',
      foreground: '0184BC',
    },
    {
      token: 'constant.language.import-export-all.tsx',
      foreground: '0184BC',
    },
    {
      token: 'keyword.control.as.js',
      foreground: '383A42',
    },
    {
      token: 'keyword.control.as.ts',
      foreground: '383A42',
    },
    {
      token: 'keyword.control.as.jsx',
      foreground: '383A42',
    },
    {
      token: 'keyword.control.as.tsx',
      foreground: '383A42',
    },
    {
      token: 'variable.other.readwrite.alias.js',
      foreground: 'E45649',
    },
    {
      token: 'variable.other.readwrite.alias.ts',
      foreground: 'E45649',
    },
    {
      token: 'variable.other.readwrite.alias.jsx',
      foreground: 'E45649',
    },
    {
      token: 'variable.other.readwrite.alias.tsx',
      foreground: 'E45649',
    },
    {
      token: 'variable.other.constant.js',
      foreground: '986801',
    },
    {
      token: 'variable.other.constant.ts',
      foreground: '986801',
    },
    {
      token: 'variable.other.constant.jsx',
      foreground: '986801',
    },
    {
      token: 'variable.other.constant.tsx',
      foreground: '986801',
    },
    {
      token: 'meta.export.default.js variable.other.readwrite.js',
      foreground: 'E45649',
    },
    {
      token: 'meta.export.default.ts variable.other.readwrite.ts',
      foreground: 'E45649',
    },
    {
      token: 'source.js meta.template.expression.js punctuation.accessor',
      foreground: '50A14F',
    },
    {
      token: 'source.ts meta.template.expression.ts punctuation.accessor',
      foreground: '50A14F',
    },
    {
      token: 'source.tsx meta.template.expression.tsx punctuation.accessor',
      foreground: '50A14F',
    },
    {
      token: 'source.js meta.import-equals.external.js keyword.operator',
      foreground: '383A42',
    },
    {
      token: 'source.jsx meta.import-equals.external.jsx keyword.operator',
      foreground: '383A42',
    },
    {
      token: 'source.ts meta.import-equals.external.ts keyword.operator',
      foreground: '383A42',
    },
    {
      token: 'source.tsx meta.import-equals.external.tsx keyword.operator',
      foreground: '383A42',
    },
    {
      token:
        'entity.name.type.module.js,entity.name.type.module.ts,entity.name.type.module.jsx,entity.name.type.module.tsx',
      foreground: '50A14F',
    },
    {
      token: 'meta.class.js,meta.class.ts,meta.class.jsx,meta.class.tsx',
      foreground: '383A42',
    },
    {
      token: 'meta.definition.property.js variable',
      foreground: '383A42',
    },
    {
      token: 'meta.definition.property.ts variable',
      foreground: '383A42',
    },
    {
      token: 'meta.definition.property.jsx variable',
      foreground: '383A42',
    },
    {
      token: 'meta.definition.property.tsx variable',
      foreground: '383A42',
    },
    {
      token: 'meta.type.parameters.js support.type',
      foreground: '383A42',
    },
    {
      token: 'meta.type.parameters.jsx support.type',
      foreground: '383A42',
    },
    {
      token: 'meta.type.parameters.ts support.type',
      foreground: '383A42',
    },
    {
      token: 'meta.type.parameters.tsx support.type',
      foreground: '383A42',
    },
    {
      token: 'source.js meta.tag.js keyword.operator',
      foreground: '383A42',
    },
    {
      token: 'source.jsx meta.tag.jsx keyword.operator',
      foreground: '383A42',
    },
    {
      token: 'source.ts meta.tag.ts keyword.operator',
      foreground: '383A42',
    },
    {
      token: 'source.tsx meta.tag.tsx keyword.operator',
      foreground: '383A42',
    },
    {
      token: 'meta.tag.js punctuation.section.embedded',
      foreground: '383A42',
    },
    {
      token: 'meta.tag.jsx punctuation.section.embedded',
      foreground: '383A42',
    },
    {
      token: 'meta.tag.ts punctuation.section.embedded',
      foreground: '383A42',
    },
    {
      token: 'meta.tag.tsx punctuation.section.embedded',
      foreground: '383A42',
    },
    {
      token: 'meta.array.literal.js variable',
      foreground: 'C18401',
    },
    {
      token: 'meta.array.literal.jsx variable',
      foreground: 'C18401',
    },
    {
      token: 'meta.array.literal.ts variable',
      foreground: 'C18401',
    },
    {
      token: 'meta.array.literal.tsx variable',
      foreground: 'C18401',
    },
    {
      token: 'support.type.object.module.js',
      foreground: 'E45649',
    },
    {
      token: 'support.type.object.module.jsx',
      foreground: 'E45649',
    },
    {
      token: 'support.type.object.module.ts',
      foreground: 'E45649',
    },
    {
      token: 'support.type.object.module.tsx',
      foreground: 'E45649',
    },
    {
      token: 'constant.language.json',
      foreground: '0184BC',
    },
    {
      token: 'variable.other.constant.object.js',
      foreground: '986801',
    },
    {
      token: 'variable.other.constant.object.jsx',
      foreground: '986801',
    },
    {
      token: 'variable.other.constant.object.ts',
      foreground: '986801',
    },
    {
      token: 'variable.other.constant.object.tsx',
      foreground: '986801',
    },
    {
      token: 'storage.type.property.js',
      foreground: '0184BC',
    },
    {
      token: 'storage.type.property.jsx',
      foreground: '0184BC',
    },
    {
      token: 'storage.type.property.ts',
      foreground: '0184BC',
    },
    {
      token: 'storage.type.property.tsx',
      foreground: '0184BC',
    },
    {
      token: 'meta.template.expression.js string.quoted punctuation.definition',
      foreground: '50A14F',
    },
    {
      token:
        'meta.template.expression.jsx string.quoted punctuation.definition',
      foreground: '50A14F',
    },
    {
      token: 'meta.template.expression.ts string.quoted punctuation.definition',
      foreground: '50A14F',
    },
    {
      token:
        'meta.template.expression.tsx string.quoted punctuation.definition',
      foreground: '50A14F',
    },
    {
      token:
        'meta.template.expression.js string.template punctuation.definition.string.template',
      foreground: '50A14F',
    },
    {
      token:
        'meta.template.expression.jsx string.template punctuation.definition.string.template',
      foreground: '50A14F',
    },
    {
      token:
        'meta.template.expression.ts string.template punctuation.definition.string.template',
      foreground: '50A14F',
    },
    {
      token:
        'meta.template.expression.tsx string.template punctuation.definition.string.template',
      foreground: '50A14F',
    },
    {
      token: 'keyword.operator.expression.in.js',
      foreground: 'A626A4',
    },
    {
      token: 'keyword.operator.expression.in.jsx',
      foreground: 'A626A4',
    },
    {
      token: 'keyword.operator.expression.in.ts',
      foreground: 'A626A4',
    },
    {
      token: 'keyword.operator.expression.in.tsx',
      foreground: 'A626A4',
    },
    {
      token: 'variable.other.object.js',
      foreground: '383A42',
    },
    {
      token: 'variable.other.object.ts',
      foreground: '383A42',
    },
    {
      token: 'meta.object-literal.key.js',
      foreground: 'E45649',
    },
    {
      token: 'meta.object-literal.key.ts',
      foreground: 'E45649',
    },
    {
      token: 'source.python constant.other',
      foreground: '383A42',
    },
    {
      token: 'source.python constant',
      foreground: '986801',
    },
    {
      token: 'constant.character.format.placeholder.other.python storage',
      foreground: '986801',
    },
    {
      token: 'support.variable.magic.python',
      foreground: 'E45649',
    },
    {
      token: 'meta.function.parameters.python',
      foreground: '986801',
    },
    {
      token: 'punctuation.separator.annotation.python',
      foreground: '383A42',
    },
    {
      token: 'punctuation.separator.parameters.python',
      foreground: '383A42',
    },
    {
      token: 'entity.name.variable.field.cs',
      foreground: 'E45649',
    },
    {
      token: 'source.cs keyword.operator',
      foreground: '383A42',
    },
    {
      token: 'variable.other.readwrite.cs',
      foreground: '383A42',
    },
    {
      token: 'variable.other.object.cs',
      foreground: '383A42',
    },
    {
      token: 'variable.other.object.property.cs',
      foreground: '383A42',
    },
    {
      token: 'entity.name.variable.property.cs',
      foreground: '4078F2',
    },
    {
      token: 'storage.type.cs',
      foreground: 'C18401',
    },
    {
      token: 'keyword.other.unsafe.rust',
      foreground: 'A626A4',
    },
    {
      token: 'entity.name.type.rust',
      foreground: '0184BC',
    },
    {
      token: 'storage.modifier.lifetime.rust',
      foreground: '383A42',
    },
    {
      token: 'entity.name.lifetime.rust',
      foreground: '986801',
    },
    {
      token: 'storage.type.core.rust',
      foreground: '0184BC',
    },
    {
      token: 'meta.attribute.rust',
      foreground: '986801',
    },
    {
      token: 'storage.class.std.rust',
      foreground: '0184BC',
    },
    {
      token: 'markup.raw.block.markdown',
      foreground: '383A42',
    },
    {
      token: 'punctuation.definition.variable.shell',
      foreground: 'E45649',
    },
    {
      token: 'support.constant.property-value.css',
      foreground: '383A42',
    },
    {
      token: 'punctuation.definition.constant.css',
      foreground: '986801',
    },
    {
      token: 'punctuation.separator.key-value.scss',
      foreground: 'E45649',
    },
    {
      token: 'punctuation.definition.constant.scss',
      foreground: '986801',
    },
    {
      token: 'meta.property-list.scss punctuation.separator.key-value.scss',
      foreground: '383A42',
    },
    {
      token: 'storage.type.primitive.array.java',
      foreground: 'C18401',
    },
    {
      token: 'entity.name.section.markdown',
      foreground: 'E45649',
    },
    {
      token: 'punctuation.definition.heading.markdown',
      foreground: 'E45649',
    },
    {
      token: 'markup.heading.setext',
      foreground: '383A42',
    },
    {
      token: 'punctuation.definition.bold.markdown',
      foreground: '986801',
    },
    {
      token: 'markup.inline.raw.markdown',
      foreground: '50A14F',
    },
    {
      token: 'beginning.punctuation.definition.list.markdown',
      foreground: 'E45649',
    },
    {
      token: 'markup.quote.markdown',
      foreground: 'A0A1A7',
    },
    {
      token: 'punctuation.definition.string.begin.markdown',
      foreground: '383A42',
    },
    {
      token: 'punctuation.definition.string.end.markdown',
      foreground: '383A42',
    },
    {
      token: 'punctuation.definition.metadata.markdown',
      foreground: '383A42',
    },
    {
      token: 'punctuation.definition.metadata.markdown',
      foreground: 'A626A4',
    },
    {
      token: 'markup.underline.link.markdown',
      foreground: 'A626A4',
    },
    {
      token: 'markup.underline.link.image.markdown',
      foreground: 'A626A4',
    },
    {
      token: 'string.other.link.title.markdown',
      foreground: '4078F2',
    },
    {
      token: 'string.other.link.description.markdown',
      foreground: '4078F2',
    },
    {
      token: 'punctuation.separator.variable.ruby',
      foreground: 'E45649',
    },
    {
      token: 'variable.other.constant.ruby',
      foreground: '986801',
    },
    {
      token: 'keyword.operator.other.ruby',
      foreground: '50A14F',
    },
    {
      token: 'punctuation.definition.variable.php',
      foreground: 'E45649',
    },
    {
      token: 'meta.class.php',
      foreground: '383A42',
    },
  ],
} as const satisfies monaco.editor.IStandaloneThemeData;
