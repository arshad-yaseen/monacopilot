import * as monaco from 'monaco-editor';

export default {
  base: 'vs-dark',
  inherit: false,
  colors: {
    'activityBar.activeBorder': '#EB64B9',
    'activityBar.background': '#27212e',
    'activityBar.foreground': '#dddddd',
    'activityBarBadge.background': '#EB64B9',
    'button.background': '#EB64B9',
    'diffEditor.border': '#b4dce7',
    'diffEditor.insertedTextBackground': '#74dfc423',
    'diffEditor.removedTextBackground': '#eb64b940',
    'editor.background': '#27212e',
    'editor.findMatchBackground': '#40b4c48c',
    'editor.findMatchHighlightBackground': '#40b4c460',
    'editor.foreground': '#ffffff',
    'editor.selectionBackground': '#eb64b927',
    'editor.selectionHighlightBackground': '#eb64b927',
    'editor.wordHighlightBackground': '#eb64b927',
    'editorError.foreground': '#ff3e7b',
    'editorGroupHeader.tabsBackground': '#242029',
    'editorGutter.addedBackground': '#74dfc4',
    'editorGutter.deletedBackground': '#eb64B9',
    'editorGutter.modifiedBackground': '#40b4c4',
    'editorSuggestWidget.border': '#b4dce7',
    focusBorder: '#EB64B9',
    'gitDecoration.conflictingResourceForeground': '#EB64B9',
    'gitDecoration.deletedResourceForeground': '#b381c5',
    'gitDecoration.ignoredResourceForeground': '#92889d',
    'gitDecoration.modifiedResourceForeground': '#74dfc4',
    'gitDecoration.untrackedResourceForeground': '#40b4c4',
    'input.background': '#3a3242',
    'input.border': '#964c7b',
    'inputOption.activeBorder': '#EB64B9',
    'list.activeSelectionBackground': '#eb64b98f',
    'list.activeSelectionForeground': '#eeeeee',
    'list.dropBackground': '#74dfc466',
    'list.errorForeground': '#ff3e7b',
    'list.focusBackground': '#eb64ba60',
    'list.highlightForeground': '#eb64b9',
    'list.hoverBackground': '#91889b80',
    'list.hoverForeground': '#eeeeee',
    'list.inactiveSelectionBackground': '#eb64b98f',
    'list.inactiveSelectionForeground': '#dddddd',
    'list.invalidItemForeground': '#ffffff',
    'menu.background': '#27212e',
    'merge.currentContentBackground': '#74dfc433',
    'merge.currentHeaderBackground': '#74dfc4cc',
    'merge.incomingContentBackground': '#40b4c433',
    'merge.incomingHeaderBackground': '#40b4c4cc',
    'notifications.background': '#3e3549',
    'peekView.border': '#40b4c4',
    'peekViewEditor.background': '#40b5c449',
    'peekViewEditor.matchHighlightBackground': '#40b5c460',
    'peekViewResult.matchHighlightBackground': '#27212e',
    'peekViewResult.selectionBackground': '#40b4c43f',
    'progressBar.background': '#40b4c4',
    'sideBar.background': '#27212e',
    'sideBar.foreground': '#dddddd',
    'sideBarSectionHeader.background': '#27212e',
    'sideBarTitle.foreground': '#EB64B9',
    'statusBar.background': '#EB64B9',
    'statusBar.debuggingBackground': '#74dfc4',
    'statusBar.foreground': '#27212e',
    'statusBar.noFolderBackground': '#EB64B9',
    'tab.activeBorder': '#EB64B9',
    'tab.inactiveBackground': '#242029',
    'terminal.ansiBlue': '#40b4c4',
    'terminal.ansiCyan': '#b4dce7',
    'terminal.ansiGreen': '#74dfc4',
    'terminal.ansiMagenta': '#b381c5',
    'terminal.ansiRed': '#EB64B9',
    'terminal.ansiYellow': '#ffe261',
    'titleBar.activeBackground': '#27212e',
    'titleBar.inactiveBackground': '#27212e',
    'tree.indentGuidesStroke': '#ffffff33',
  },
  rules: [
    {
      token: 'keyword.other',
      foreground: '40b4c4',
    },
    {
      token: 'keyword.control',
      foreground: '40b4c4',
    },
    {
      token: 'storage.type.class.js',
      foreground: '40b4c4',
    },
    {
      token: 'keyword.control.module.js',
      foreground: '40b4c4',
    },
    {
      token: 'storage.type.extends.js',
      foreground: '40b4c4',
    },
    {
      token: 'variable.language.this.js',
      foreground: '40b4c4',
    },
    {
      token: 'keyword.control.switch.js',
      foreground: '40b4c4',
    },
    {
      token: 'keyword.control.loop.js',
      foreground: '40b4c4',
    },
    {
      token: 'keyword.control.conditional.js',
      foreground: '40b4c4',
    },
    {
      token: 'keyword.control.flow.js',
      foreground: '40b4c4',
    },
    {
      token: 'keyword.operator.accessor.js',
      foreground: '40b4c4',
    },
    {
      token: 'keyword.other.important.css',
      foreground: '40b4c4',
    },
    {
      token: 'keyword.control.at-rule.media.scss',
      foreground: '40b4c4',
    },
    {
      token: 'entity.name.tag.reference.scss',
      foreground: '40b4c4',
    },
    {
      token: 'meta.class.python',
      foreground: '40b4c4',
    },
    {
      token: 'storage.type.function.python',
      foreground: '40b4c4',
    },
    {
      token: 'keyword.control.flow.python',
      foreground: '40b4c4',
    },
    {
      token: 'storage.type.function.js',
      foreground: '40b4c4',
    },
    {
      token: 'keyword.control.export.ts',
      foreground: '40b4c4',
    },
    {
      token: 'keyword.control.flow.ts',
      foreground: '40b4c4',
    },
    {
      token: 'keyword.control.from.ts',
      foreground: '40b4c4',
    },
    {
      token: 'keyword.control.import.ts',
      foreground: '40b4c4',
    },
    {
      token: 'storage.type.class.ts',
      foreground: '40b4c4',
    },
    {
      token: 'keyword.control.loop.ts',
      foreground: '40b4c4',
    },
    {
      token: 'keyword.control.ruby',
      foreground: '40b4c4',
    },
    {
      token: 'keyword.control.module.ruby',
      foreground: '40b4c4',
    },
    {
      token: 'keyword.control.class.ruby',
      foreground: '40b4c4',
    },
    {
      token: 'keyword.other.special-method.ruby',
      foreground: '40b4c4',
    },
    {
      token: 'keyword.control.def.ruby',
      foreground: '40b4c4',
    },
    {
      token: 'markup.heading',
      foreground: '40b4c4',
    },
    {
      token: 'keyword.other.import.java',
      foreground: '40b4c4',
    },
    {
      token: 'keyword.other.package.java',
      foreground: '40b4c4',
    },
    {
      token: 'storage.modifier.java',
      foreground: '40b4c4',
    },
    {
      token: 'storage.modifier.extends.java',
      foreground: '40b4c4',
    },
    {
      token: 'storage.modifier.implements.java',
      foreground: '40b4c4',
    },
    {
      token: 'storage.modifier.cs',
      foreground: '40b4c4',
    },
    {
      token: 'storage.modifier.js',
      foreground: '40b4c4',
    },
    {
      token: 'storage.modifier.dart',
      foreground: '40b4c4',
    },
    {
      token: 'keyword.declaration.dart',
      foreground: '40b4c4',
    },
    {
      token: 'keyword.package.go',
      foreground: '40b4c4',
    },
    {
      token: 'keyword.import.go',
      foreground: '40b4c4',
    },
    {
      token: 'keyword.fsharp',
      foreground: '40b4c4',
    },
    {
      token: 'variable.parameter.function-call.python',
      foreground: '40b4c4',
    },
    {
      token: 'binding.fsharp',
      foreground: 'EB64B9',
    },
    {
      token: 'support.function',
      foreground: 'EB64B9',
    },
    {
      token: 'meta.function-call',
      foreground: 'EB64B9',
    },
    {
      token: 'entity.name.function',
      foreground: 'EB64B9',
    },
    {
      token: 'support.function.misc.scss',
      foreground: 'EB64B9',
    },
    {
      token: 'meta.method.declaration.ts',
      foreground: 'EB64B9',
    },
    {
      token: 'entity.name.function.method.js',
      foreground: 'EB64B9',
    },
    {
      token: 'string',
      foreground: 'b4dce7',
    },
    {
      token: 'string.quoted',
      foreground: 'b4dce7',
    },
    {
      token: 'string.unquoted',
      foreground: 'b4dce7',
    },
    {
      token: 'string.other.link.title.markdown',
      foreground: 'b4dce7',
    },
    {
      token: 'constant.numeric',
      foreground: 'b381c5',
    },
    {
      token: 'meta.brace',
      foreground: '7b6995',
    },
    {
      token: 'punctuation',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.bracket',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.section',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.separator',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.comma.dart',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.terminator',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.definition',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.parenthesis',
      foreground: '7b6995',
    },
    {
      token: 'meta.delimiter.comma.js',
      foreground: '7b6995',
    },
    {
      token: 'meta.brace.curly.litobj.js',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.definition.tag',
      foreground: '7b6995',
    },
    {
      token: 'puncatuation.other.comma.go',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.section.embedded',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.definition.string',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.definition.tag.jsx',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.definition.tag.end',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.definition.markdown',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.terminator.rule.css',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.definition.block.ts',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.definition.tag.html',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.section.class.end.js',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.definition.tag.begin',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.squarebracket.open.cs',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.separator.dict.python',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.section.function.scss',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.section.class.begin.js',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.section.array.end.ruby',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.separator.key-value.js',
      foreground: '7b6995',
    },
    {
      token: 'meta.method-call.with-arguments.js',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.section.scope.end.ruby',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.squarebracket.close.cs',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.separator.key-value.css',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.definition.constant.css',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.section.array.begin.ruby',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.section.scope.begin.ruby',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.definition.string.end.js',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.definition.parameters.ruby',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.definition.string.begin.js',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.section.class.begin.python',
      foreground: '7b6995',
    },
    {
      token: 'storage.modifier.array.bracket.square.c',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.separator.parameters.python',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.section.group.end.powershell',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.definition.parameters.end.ts',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.section.braces.end.powershell',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.section.function.begin.python',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.definition.parameters.begin.ts',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.section.bracket.end.powershell',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.section.group.begin.powershell',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.section.braces.begin.powershell',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.definition.parameters.end.python',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.definition.typeparameters.end.cs',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.section.bracket.begin.powershell',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.definition.arguments.begin.python',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.definition.parameters.begin.python',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.definition.typeparameters.begin.cs',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.section.block.begin.bracket.curly.c',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.definition.map.begin.bracket.round.scss',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.section.property-list.end.bracket.curly.css',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.definition.parameters.end.bracket.round.java',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.section.property-list.begin.bracket.curly.css',
      foreground: '7b6995',
    },
    {
      token: 'punctuation.definition.parameters.begin.bracket.round.java',
      foreground: '7b6995',
    },
    {
      token: 'keyword.operator',
      foreground: '74dfc4',
    },
    {
      token: 'meta.decorator.ts',
      foreground: '74dfc4',
    },
    {
      token: 'entity.name.type.ts',
      foreground: '74dfc4',
    },
    {
      token: 'punctuation.dot.dart',
      foreground: '74dfc4',
    },
    {
      token: 'keyword.symbol.fsharp',
      foreground: '74dfc4',
    },
    {
      token: 'punctuation.accessor.ts',
      foreground: '74dfc4',
    },
    {
      token: 'punctuation.accessor.cs',
      foreground: '74dfc4',
    },
    {
      token: 'keyword.operator.logical',
      foreground: '74dfc4',
    },
    {
      token: 'meta.tag.inline.any.html',
      foreground: '74dfc4',
    },
    {
      token: 'punctuation.separator.java',
      foreground: '74dfc4',
    },
    {
      token: 'keyword.operator.comparison',
      foreground: '74dfc4',
    },
    {
      token: 'keyword.operator.arithmetic',
      foreground: '74dfc4',
    },
    {
      token: 'keyword.operator.assignment',
      foreground: '74dfc4',
    },
    {
      token: 'keyword.operator.ternary.js',
      foreground: '74dfc4',
    },
    {
      token: 'keyword.operator.other.ruby',
      foreground: '74dfc4',
    },
    {
      token: 'keyword.operator.logical.js',
      foreground: '74dfc4',
    },
    {
      token: 'punctuation.other.period.go',
      foreground: '74dfc4',
    },
    {
      token: 'keyword.operator.increment.ts',
      foreground: '74dfc4',
    },
    {
      token: 'keyword.operator.increment.js',
      foreground: '74dfc4',
    },
    {
      token: 'storage.type.function.arrow.js',
      foreground: '74dfc4',
    },
    {
      token: 'storage.type.function.arrow.ts',
      foreground: '74dfc4',
    },
    {
      token: 'keyword.operator.relational.js',
      foreground: '74dfc4',
    },
    {
      token: 'keyword.operator.relational.ts',
      foreground: '74dfc4',
    },
    {
      token: 'keyword.operator.arithmetic.js',
      foreground: '74dfc4',
    },
    {
      token: 'keyword.operator.assignment.js',
      foreground: '74dfc4',
    },
    {
      token: 'storage.type.function.arrow.tsx',
      foreground: '74dfc4',
    },
    {
      token: 'keyword.operator.logical.python',
      foreground: '74dfc4',
    },
    {
      token: 'punctuation.separator.period.java',
      foreground: '74dfc4',
    },
    {
      token: 'punctuation.separator.method.ruby',
      foreground: '74dfc4',
    },
    {
      token: 'keyword.operator.assignment.python',
      foreground: '74dfc4',
    },
    {
      token: 'keyword.operator.arithmetic.python',
      foreground: '74dfc4',
    },
    {
      token: 'keyword.operator.increment-decrement.java',
      foreground: '74dfc4',
    },
    {
      token: 'comment',
      foreground: '91889b',
    },
    {
      token: 'punctuation.definition.comment',
      foreground: '91889b',
    },
    {
      token: 'meta.tag.sgml',
      foreground: '74dfc4',
    },
    {
      token: 'entity.name.tag',
      foreground: '74dfc4',
    },
    {
      token: 'entity.name.tag.open.jsx',
      foreground: '74dfc4',
    },
    {
      token: 'entity.name.tag.close.jsx',
      foreground: '74dfc4',
    },
    {
      token: 'entity.name.tag.inline.any.html',
      foreground: '74dfc4',
    },
    {
      token: 'entity.name.tag.structure.any.html',
      foreground: '74dfc4',
    },
    {
      token: 'variable.other.enummember',
      foreground: 'EB64B9',
    },
    {
      token: 'entity.other.attribute-name',
      foreground: 'EB64B9',
    },
    {
      token: 'entity.other.attribute-name.jsx',
      foreground: 'EB64B9',
    },
    {
      token: 'entity.other.attribute-name.html',
      foreground: 'EB64B9',
    },
    {
      token: 'entity.other.attribute-name.id.css',
      foreground: 'EB64B9',
    },
    {
      token: 'entity.other.attribute-name.id.html',
      foreground: 'EB64B9',
    },
    {
      token: 'entity.other.attribute-name.class.css',
      foreground: 'EB64B9',
    },
    {
      token: 'variable.other.property',
      foreground: '40b4c4',
    },
    {
      token: 'variable.parameter.fsharp',
      foreground: '40b4c4',
    },
    {
      token: 'support.variable.property.js',
      foreground: '40b4c4',
    },
    {
      token: 'support.type.property-name.css',
      foreground: '40b4c4',
    },
    {
      token: 'support.type.property-name.json',
      foreground: '40b4c4',
    },
    {
      token: 'support.variable.property.dom.js',
      foreground: '40b4c4',
    },
    {
      token: 'constant.language',
      foreground: 'ffe261',
    },
    {
      token: 'constant.other.elm',
      foreground: 'ffe261',
    },
    {
      token: 'constant.language.c',
      foreground: 'ffe261',
    },
    {
      token: 'variable.language.dart',
      foreground: 'ffe261',
    },
    {
      token: 'variable.language.this',
      foreground: 'ffe261',
    },
    {
      token: 'support.class.builtin.js',
      foreground: 'ffe261',
    },
    {
      token: 'support.constant.json.ts',
      foreground: 'ffe261',
    },
    {
      token: 'support.class.console.ts',
      foreground: 'ffe261',
    },
    {
      token: 'support.class.console.js',
      foreground: 'ffe261',
    },
    {
      token: 'variable.language.this.js',
      foreground: 'ffe261',
    },
    {
      token: 'variable.language.this.ts',
      foreground: 'ffe261',
    },
    {
      token: 'entity.name.section.fsharp',
      foreground: 'ffe261',
    },
    {
      token: 'support.type.object.dom.js',
      foreground: 'ffe261',
    },
    {
      token: 'variable.other.constant.js',
      foreground: 'ffe261',
    },
    {
      token: 'variable.language.self.ruby',
      foreground: 'ffe261',
    },
    {
      token: 'variable.other.constant.ruby',
      foreground: 'ffe261',
    },
    {
      token: 'support.type.object.console.js',
      foreground: 'ffe261',
    },
    {
      token: 'constant.language.undefined.js',
      foreground: 'ffe261',
    },
    {
      token: 'support.function.builtin.python',
      foreground: 'ffe261',
    },
    {
      token: 'constant.language.boolean.true.js',
      foreground: 'ffe261',
    },
    {
      token: 'constant.language.boolean.false.js',
      foreground: 'ffe261',
    },
    {
      token: 'variable.language.special.self.python',
      foreground: 'ffe261',
    },
    {
      token: 'support.constant.automatic.powershell',
      foreground: 'ffe261',
    },
    {
      token: 'variable.other',
      foreground: 'ffffff',
    },
    {
      token: 'variable.scss',
      foreground: 'ffffff',
    },
    {
      token: 'meta.function-call.c',
      foreground: 'ffffff',
    },
    {
      token: 'variable.parameter.ts',
      foreground: 'ffffff',
    },
    {
      token: 'variable.parameter.dart',
      foreground: 'ffffff',
    },
    {
      token: 'variable.other.class.js',
      foreground: 'ffffff',
    },
    {
      token: 'variable.other.object.js',
      foreground: 'ffffff',
    },
    {
      token: 'variable.other.object.ts',
      foreground: 'ffffff',
    },
    {
      token: 'support.function.json.ts',
      foreground: 'ffffff',
    },
    {
      token: 'variable.name.source.dart',
      foreground: 'ffffff',
    },
    {
      token: 'variable.other.source.dart',
      foreground: 'ffffff',
    },
    {
      token: 'variable.other.readwrite.js',
      foreground: 'ffffff',
    },
    {
      token: 'variable.other.readwrite.ts',
      foreground: 'ffffff',
    },
    {
      token: 'support.function.console.ts',
      foreground: 'ffffff',
    },
    {
      token: 'entity.name.type.instance.js',
      foreground: 'ffffff',
    },
    {
      token: 'meta.function-call.arguments',
      foreground: 'ffffff',
    },
    {
      token: 'variable.other.property.dom.ts',
      foreground: 'ffffff',
    },
    {
      token: 'support.variable.property.dom.ts',
      foreground: 'ffffff',
    },
    {
      token: 'variable.other.readwrite.powershell',
      foreground: 'ffffff',
    },
    {
      token: 'storage.type.annotation',
      foreground: '74dfc4',
    },
    {
      token: 'punctuation.definition.annotation',
      foreground: '74dfc4',
    },
    {
      token: 'support.function.attribute.fsharp',
      foreground: '74dfc4',
    },
    {
      token: 'entity.name.type',
      foreground: 'a96bc0',
    },
    {
      token: 'storage.type',
      foreground: 'a96bc0',
    },
    {
      token: 'keyword.var.go',
      foreground: 'a96bc0',
    },
    {
      token: 'keyword.type.go',
      foreground: 'a96bc0',
    },
    {
      token: 'keyword.type.js',
      foreground: 'a96bc0',
    },
    {
      token: 'storage.type.js',
      foreground: 'a96bc0',
    },
    {
      token: 'storage.type.ts',
      foreground: 'a96bc0',
    },
    {
      token: 'keyword.type.cs',
      foreground: 'a96bc0',
    },
    {
      token: 'keyword.const.go',
      foreground: 'a96bc0',
    },
    {
      token: 'keyword.struct.go',
      foreground: 'a96bc0',
    },
    {
      token: 'support.class.dart',
      foreground: 'a96bc0',
    },
    {
      token: 'storage.modifier.c',
      foreground: 'a96bc0',
    },
    {
      token: 'storage.modifier.ts',
      foreground: 'a96bc0',
    },
    {
      token: 'keyword.function.go',
      foreground: 'a96bc0',
    },
    {
      token: 'keyword.operator.new.ts',
      foreground: 'a96bc0',
    },
    {
      token: 'meta.type.annotation.ts',
      foreground: 'a96bc0',
    },
    {
      token: 'entity.name.type.fsharp',
      foreground: 'a96bc0',
    },
    {
      token: 'meta.type.annotation.tsx',
      foreground: 'a96bc0',
    },
    {
      token: 'storage.modifier.async.js',
      foreground: 'a96bc0',
    },
    {
      token: 'punctuation.definition.variable.ruby',
      foreground: 'a96bc0',
    },
    {
      token: 'punctuation.definition.constant.ruby',
      foreground: 'a96bc0',
    },
    {
      token: 'markup.bold',
      foreground: 'EB64B9',
    },
    {
      token: 'markup.italic',
      foreground: 'EB64B9',
    },
    {
      token: 'meta.object-literal.key.js',
      foreground: '40b4c4',
    },
    {
      token: 'constant.other.object.key.js',
      foreground: '40b4c4',
    },
    {
      token: 'meta.diff',
      foreground: '40b4c4',
    },
    {
      token: 'meta.diff.header',
      foreground: '40b4c4',
    },
    {
      token: 'meta.diff.range.unified',
      foreground: 'b381c5',
    },
    {
      token: 'markup.deleted',
      foreground: 'eb64b9',
    },
    {
      token: 'punctuation.definition.deleted.diff',
      foreground: 'eb64b9',
    },
    {
      token: 'punctuation.definition.from-file.diff',
      foreground: 'eb64b9',
    },
    {
      token: 'meta.diff.header.from-file',
      foreground: 'eb64b9',
    },
    {
      token: 'markup.inserted',
      foreground: '74dfc4',
    },
    {
      token: 'punctuation.definition.inserted.diff',
      foreground: '74dfc4',
    },
    {
      token: 'punctuation.definition.to-file.diff',
      foreground: '74dfc4',
    },
    {
      token: 'meta.diff.header.to-file',
      foreground: '74dfc4',
    },
  ],
} as const satisfies monaco.editor.IStandaloneThemeData;
