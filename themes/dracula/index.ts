import * as monaco from 'monaco-editor';

export default {
  base: 'vs-dark',
  inherit: false,
  rules: [
    {
      token: 'emphasis',
      fontStyle: 'italic',
    },
    {
      token: 'strong',
      fontStyle: 'bold',
    },
    {
      token: 'header',
      foreground: 'BD93F9',
    },
    {
      token: 'meta.diff',
      foreground: '6272A4',
    },
    {
      token: 'meta.diff.header',
      foreground: '6272A4',
    },
    {
      token: 'markup.inserted',
      foreground: '50FA7B',
    },
    {
      token: 'markup.deleted',
      foreground: 'FF5555',
    },
    {
      token: 'markup.changed',
      foreground: 'FFB86C',
    },
    {
      token: 'invalid',
      foreground: 'FF5555',
      fontStyle: 'underline italic',
    },
    {
      token: 'invalid.deprecated',
      foreground: 'F8F8F2',
      fontStyle: 'underline italic',
    },
    {
      token: 'entity.name.filename',
      foreground: 'F1FA8C',
    },
    {
      token: 'markup.error',
      foreground: 'FF5555',
    },
    {
      token: 'markup.underline',
      fontStyle: 'underline',
    },
    {
      token: 'markup.bold',
      foreground: 'FFB86C',
      fontStyle: 'bold',
    },
    {
      token: 'markup.heading',
      foreground: 'BD93F9',
      fontStyle: 'bold',
    },
    {
      token: 'markup.italic',
      foreground: 'F1FA8C',
      fontStyle: 'italic',
    },
    {
      token: 'beginning.punctuation.definition.list.markdown',
      foreground: '8BE9FD',
    },
    {
      token: 'beginning.punctuation.definition.quote.markdown',
      foreground: '8BE9FD',
    },
    {
      token: 'punctuation.definition.link.restructuredtext',
      foreground: '8BE9FD',
    },
    {
      token: 'markup.inline.raw',
      foreground: '50FA7B',
    },
    {
      token: 'markup.raw.restructuredtext',
      foreground: '50FA7B',
    },
    {
      token: 'markup.underline.link',
      foreground: '8BE9FD',
    },
    {
      token: 'markup.underline.link.image',
      foreground: '8BE9FD',
    },
    {
      token: 'meta.link.reference.def.restructuredtext',
      foreground: 'FF79C6',
    },
    {
      token: 'punctuation.definition.directive.restructuredtext',
      foreground: 'FF79C6',
    },
    {
      token: 'string.other.link.description',
      foreground: 'FF79C6',
    },
    {
      token: 'string.other.link.title',
      foreground: 'FF79C6',
    },
    {
      token: 'entity.name.directive.restructuredtext',
      foreground: 'F1FA8C',
      fontStyle: 'italic',
    },
    {
      token: 'markup.quote',
      foreground: 'F1FA8C',
      fontStyle: 'italic',
    },
    {
      token: 'meta.separator.markdown',
      foreground: '6272A4',
    },
    {
      token: 'fenced_code.block.language',
      foreground: '50FA7B',
    },
    {
      token: 'markup.raw.inner.restructuredtext',
      foreground: '50FA7B',
    },
    {
      token:
        'markup.fenced_code.block.markdown punctuation.definition.markdown',
      foreground: '50FA7B',
    },
    {
      token: 'punctuation.definition.constant.restructuredtext',
      foreground: 'BD93F9',
    },
    {
      token: 'markup.heading.markdown punctuation.definition.string.begin',
      foreground: 'BD93F9',
    },
    {
      token: 'markup.heading.markdown punctuation.definition.string.end',
      foreground: 'BD93F9',
    },
    {
      token: 'meta.paragraph.markdown punctuation.definition.string.begin',
      foreground: 'F8F8F2',
    },
    {
      token: 'meta.paragraph.markdown punctuation.definition.string.end',
      foreground: 'F8F8F2',
    },
    {
      token:
        'markup.quote.markdown meta.paragraph.markdown punctuation.definition.string.begin',
      foreground: 'F1FA8C',
    },
    {
      token:
        'markup.quote.markdown meta.paragraph.markdown punctuation.definition.string.end',
      foreground: 'F1FA8C',
    },
    {
      token: 'entity.name.type.class',
      foreground: '8BE9FD',
      fontStyle: 'normal',
    },
    {
      token: 'entity.name.class',
      foreground: '8BE9FD',
      fontStyle: 'normal',
    },
    {
      token: 'keyword.expressions-and-types.swift',
      foreground: 'BD93F9',
      fontStyle: 'italic',
    },
    {
      token: 'keyword.other.this',
      foreground: 'BD93F9',
      fontStyle: 'italic',
    },
    {
      token: 'variable.language',
      foreground: 'BD93F9',
      fontStyle: 'italic',
    },
    {
      token: 'variable.language punctuation.definition.variable.php',
      foreground: 'BD93F9',
      fontStyle: 'italic',
    },
    {
      token: 'variable.other.readwrite.instance.ruby',
      foreground: 'BD93F9',
      fontStyle: 'italic',
    },
    {
      token: 'variable.parameter.function.language.special',
      foreground: 'BD93F9',
      fontStyle: 'italic',
    },
    {
      token: 'entity.other.inherited-class',
      foreground: '8BE9FD',
      fontStyle: 'italic',
    },
    {
      token: 'comment',
      foreground: '6272A4',
    },
    {
      token: 'punctuation.definition.comment',
      foreground: '6272A4',
    },
    {
      token: 'unused.comment',
      foreground: '6272A4',
    },
    {
      token: 'wildcard.comment',
      foreground: '6272A4',
    },
    {
      token: 'comment keyword.codetag.notation',
      foreground: 'FF79C6',
    },
    {
      token: 'comment.block.documentation keyword',
      foreground: 'FF79C6',
    },
    {
      token: 'comment.block.documentation storage.type.class',
      foreground: 'FF79C6',
    },
    {
      token: 'comment.block.documentation entity.name.type',
      foreground: '8BE9FD',
      fontStyle: 'italic',
    },
    {
      token:
        'comment.block.documentation entity.name.type punctuation.definition.bracket',
      foreground: '8BE9FD',
    },
    {
      token: 'comment.block.documentation variable',
      foreground: 'FFB86C',
      fontStyle: 'italic',
    },
    {
      token: 'constant',
      foreground: 'BD93F9',
    },
    {
      token: 'variable.other.constant',
      foreground: 'BD93F9',
    },
    {
      token: 'constant.character.escape',
      foreground: 'FF79C6',
    },
    {
      token: 'constant.character.string.escape',
      foreground: 'FF79C6',
    },
    {
      token: 'constant.regexp',
      foreground: 'FF79C6',
    },
    {
      token: 'entity.name.tag',
      foreground: 'FF79C6',
    },
    {
      token: 'entity.other.attribute-name.parent-selector',
      foreground: 'FF79C6',
    },
    {
      token: 'entity.other.attribute-name',
      foreground: '50FA7B',
      fontStyle: 'italic',
    },
    {
      token: 'entity.name.function',
      foreground: '50FA7B',
    },
    {
      token: 'meta.function-call.object',
      foreground: '50FA7B',
    },
    {
      token: 'meta.function-call.php',
      foreground: '50FA7B',
    },
    {
      token: 'meta.function-call.static',
      foreground: '50FA7B',
    },
    {
      token: 'meta.method-call.java meta.method',
      foreground: '50FA7B',
    },
    {
      token: 'meta.method.groovy',
      foreground: '50FA7B',
    },
    {
      token: 'support.function.any-method.lua',
      foreground: '50FA7B',
    },
    {
      token: 'keyword.operator.function.infix',
      foreground: '50FA7B',
    },
    {
      token: 'entity.name.variable.parameter',
      foreground: 'FFB86C',
      fontStyle: 'italic',
    },
    {
      token: 'meta.at-rule.function variable',
      foreground: 'FFB86C',
      fontStyle: 'italic',
    },
    {
      token: 'meta.at-rule.mixin variable',
      foreground: 'FFB86C',
      fontStyle: 'italic',
    },
    {
      token: 'meta.function.arguments variable.other.php',
      foreground: 'FFB86C',
      fontStyle: 'italic',
    },
    {
      token:
        'meta.selectionset.graphql meta.arguments.graphql variable.arguments.graphql',
      foreground: 'FFB86C',
      fontStyle: 'italic',
    },
    {
      token: 'variable.parameter',
      foreground: 'FFB86C',
      fontStyle: 'italic',
    },
    {
      token: 'meta.decorator variable.other.readwrite',
      foreground: '50FA7B',
      fontStyle: 'italic',
    },
    {
      token: 'meta.decorator variable.other.property',
      foreground: '50FA7B',
      fontStyle: 'italic',
    },
    {
      token: 'meta.decorator variable.other.object',
      foreground: '50FA7B',
    },
    {
      token: 'keyword',
      foreground: 'FF79C6',
    },
    {
      token: 'punctuation.definition.keyword',
      foreground: 'FF79C6',
    },
    {
      token: 'keyword.control.new',
      fontStyle: 'bold',
    },
    {
      token: 'keyword.operator.new',
      fontStyle: 'bold',
    },
    {
      token: 'meta.selector',
      foreground: 'FF79C6',
    },
    {
      token: 'support',
      foreground: '8BE9FD',
      fontStyle: 'italic',
    },
    {
      token: 'support.function.magic',
      foreground: 'BD93F9',
      fontStyle: 'regular',
    },
    {
      token: 'support.variable',
      foreground: 'BD93F9',
      fontStyle: 'regular',
    },
    {
      token: 'variable.other.predefined',
      foreground: 'BD93F9',
      fontStyle: 'regular',
    },
    {
      token: 'support.function',
      fontStyle: 'regular',
    },
    {
      token: 'support.type.property-name',
      fontStyle: 'regular',
    },
    {
      token:
        'constant.other.symbol.hashkey punctuation.definition.constant.ruby',
      foreground: 'FF79C6',
    },
    {
      token: 'entity.other.attribute-name.placeholder punctuation',
      foreground: 'FF79C6',
    },
    {
      token: 'entity.other.attribute-name.pseudo-class punctuation',
      foreground: 'FF79C6',
    },
    {
      token: 'entity.other.attribute-name.pseudo-element punctuation',
      foreground: 'FF79C6',
    },
    {
      token: 'meta.group.double.toml',
      foreground: 'FF79C6',
    },
    {
      token: 'meta.group.toml',
      foreground: 'FF79C6',
    },
    {
      token: 'meta.object-binding-pattern-variable punctuation.destructuring',
      foreground: 'FF79C6',
    },
    {
      token: 'punctuation.colon.graphql',
      foreground: 'FF79C6',
    },
    {
      token: 'punctuation.definition.block.scalar.folded.yaml',
      foreground: 'FF79C6',
    },
    {
      token: 'punctuation.definition.block.scalar.literal.yaml',
      foreground: 'FF79C6',
    },
    {
      token: 'punctuation.definition.block.sequence.item.yaml',
      foreground: 'FF79C6',
    },
    {
      token: 'punctuation.definition.entity.other.inherited-class',
      foreground: 'FF79C6',
    },
    {
      token: 'punctuation.function.swift',
      foreground: 'FF79C6',
    },
    {
      token: 'punctuation.separator.dictionary.key-value',
      foreground: 'FF79C6',
    },
    {
      token: 'punctuation.separator.hash',
      foreground: 'FF79C6',
    },
    {
      token: 'punctuation.separator.inheritance',
      foreground: 'FF79C6',
    },
    {
      token: 'punctuation.separator.key-value',
      foreground: 'FF79C6',
    },
    {
      token: 'punctuation.separator.key-value.mapping.yaml',
      foreground: 'FF79C6',
    },
    {
      token: 'punctuation.separator.namespace',
      foreground: 'FF79C6',
    },
    {
      token: 'punctuation.separator.pointer-access',
      foreground: 'FF79C6',
    },
    {
      token: 'punctuation.separator.slice',
      foreground: 'FF79C6',
    },
    {
      token: 'string.unquoted.heredoc punctuation.definition.string',
      foreground: 'FF79C6',
    },
    {
      token: 'support.other.chomping-indicator.yaml',
      foreground: 'FF79C6',
    },
    {
      token: 'punctuation.separator.annotation',
      foreground: 'FF79C6',
    },
    {
      token: 'keyword.operator.other.powershell',
      foreground: 'F8F8F2',
    },
    {
      token: 'keyword.other.statement-separator.powershell',
      foreground: 'F8F8F2',
    },
    {
      token: 'meta.brace.round',
      foreground: 'F8F8F2',
    },
    {
      token: 'meta.function-call punctuation',
      foreground: 'F8F8F2',
    },
    {
      token: 'punctuation.definition.arguments.begin',
      foreground: 'F8F8F2',
    },
    {
      token: 'punctuation.definition.arguments.end',
      foreground: 'F8F8F2',
    },
    {
      token: 'punctuation.definition.entity.begin',
      foreground: 'F8F8F2',
    },
    {
      token: 'punctuation.definition.entity.end',
      foreground: 'F8F8F2',
    },
    {
      token: 'punctuation.definition.tag.cs',
      foreground: 'F8F8F2',
    },
    {
      token: 'punctuation.definition.type.begin',
      foreground: 'F8F8F2',
    },
    {
      token: 'punctuation.definition.type.end',
      foreground: 'F8F8F2',
    },
    {
      token: 'punctuation.section.scope.begin',
      foreground: 'F8F8F2',
    },
    {
      token: 'punctuation.section.scope.end',
      foreground: 'F8F8F2',
    },
    {
      token: 'punctuation.terminator.expression.php',
      foreground: 'F8F8F2',
    },
    {
      token: 'storage.type.generic.java',
      foreground: 'F8F8F2',
    },
    {
      token: 'string.template meta.brace',
      foreground: 'F8F8F2',
    },
    {
      token: 'string.template punctuation.accessor',
      foreground: 'F8F8F2',
    },
    {
      token:
        'meta.string-contents.quoted.double punctuation.definition.variable',
      foreground: 'FF79C6',
    },
    {
      token: 'punctuation.definition.interpolation.begin',
      foreground: 'FF79C6',
    },
    {
      token: 'punctuation.definition.interpolation.end',
      foreground: 'FF79C6',
    },
    {
      token: 'punctuation.definition.template-expression.begin',
      foreground: 'FF79C6',
    },
    {
      token: 'punctuation.definition.template-expression.end',
      foreground: 'FF79C6',
    },
    {
      token: 'punctuation.section.embedded.begin',
      foreground: 'FF79C6',
    },
    {
      token: 'punctuation.section.embedded.coffee',
      foreground: 'FF79C6',
    },
    {
      token: 'punctuation.section.embedded.end',
      foreground: 'FF79C6',
    },
    {
      token: 'punctuation.section.embedded.end source.php',
      foreground: 'FF79C6',
    },
    {
      token: 'punctuation.section.embedded.end source.ruby',
      foreground: 'FF79C6',
    },
    {
      token: 'punctuation.definition.variable.makefile',
      foreground: 'FF79C6',
    },
    {
      token: 'entity.name.function.target.makefile',
      foreground: '8BE9FD',
    },
    {
      token: 'entity.name.section.toml',
      foreground: '8BE9FD',
    },
    {
      token: 'entity.name.tag.yaml',
      foreground: '8BE9FD',
    },
    {
      token: 'variable.other.key.toml',
      foreground: '8BE9FD',
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
      foreground: '50FA7B',
      fontStyle: 'italic underline',
    },
    {
      token: 'storage',
      foreground: 'FF79C6',
      fontStyle: 'regular',
    },
    {
      token: 'meta.implementation storage.type.objc',
      foreground: 'FF79C6',
      fontStyle: 'regular',
    },
    {
      token: 'meta.interface-or-protocol storage.type.objc',
      foreground: 'FF79C6',
      fontStyle: 'regular',
    },
    {
      token: 'source.groovy storage.type.def',
      foreground: 'FF79C6',
      fontStyle: 'regular',
    },
    {
      token: 'entity.name.type',
      foreground: '8BE9FD',
      fontStyle: 'italic',
    },
    {
      token: 'keyword.primitive-datatypes.swift',
      foreground: '8BE9FD',
      fontStyle: 'italic',
    },
    {
      token: 'keyword.type.cs',
      foreground: '8BE9FD',
      fontStyle: 'italic',
    },
    {
      token: 'meta.protocol-list.objc',
      foreground: '8BE9FD',
      fontStyle: 'italic',
    },
    {
      token: 'meta.return-type.objc',
      foreground: '8BE9FD',
      fontStyle: 'italic',
    },
    {
      token: 'source.go storage.type',
      foreground: '8BE9FD',
      fontStyle: 'italic',
    },
    {
      token: 'source.groovy storage.type',
      foreground: '8BE9FD',
      fontStyle: 'italic',
    },
    {
      token: 'source.java storage.type',
      foreground: '8BE9FD',
      fontStyle: 'italic',
    },
    {
      token: 'source.powershell entity.other.attribute-name',
      foreground: '8BE9FD',
      fontStyle: 'italic',
    },
    {
      token: 'storage.class.std.rust',
      foreground: '8BE9FD',
      fontStyle: 'italic',
    },
    {
      token: 'storage.type.attribute.swift',
      foreground: '8BE9FD',
      fontStyle: 'italic',
    },
    {
      token: 'storage.type.c',
      foreground: '8BE9FD',
      fontStyle: 'italic',
    },
    {
      token: 'storage.type.core.rust',
      foreground: '8BE9FD',
      fontStyle: 'italic',
    },
    {
      token: 'storage.type.cs',
      foreground: '8BE9FD',
      fontStyle: 'italic',
    },
    {
      token: 'storage.type.groovy',
      foreground: '8BE9FD',
      fontStyle: 'italic',
    },
    {
      token: 'storage.type.objc',
      foreground: '8BE9FD',
      fontStyle: 'italic',
    },
    {
      token: 'storage.type.php',
      foreground: '8BE9FD',
      fontStyle: 'italic',
    },
    {
      token: 'storage.type.haskell',
      foreground: '8BE9FD',
      fontStyle: 'italic',
    },
    {
      token: 'storage.type.ocaml',
      foreground: '8BE9FD',
      fontStyle: 'italic',
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
      foreground: 'FF79C6',
    },
    {
      token: 'string.regexp',
      foreground: 'F1FA8C',
    },
    {
      token: 'constant.other.character-class.set.regexp',
      foreground: 'F1FA8C',
    },
    {
      token: 'constant.character.escape.backslash.regexp',
      foreground: 'F1FA8C',
    },
    {
      token: 'punctuation.definition.group.capture.regexp',
      foreground: 'FF79C6',
    },
    {
      token: 'string.regexp punctuation.definition.string.begin',
      foreground: 'FF5555',
    },
    {
      token: 'string.regexp punctuation.definition.string.end',
      foreground: 'FF5555',
    },
    {
      token: 'punctuation.definition.character-class.regexp',
      foreground: '8BE9FD',
    },
    {
      token: 'punctuation.definition.group.regexp',
      foreground: 'FFB86C',
    },
    {
      token: 'punctuation.definition.group.assertion.regexp',
      foreground: 'FF5555',
    },
    {
      token: 'keyword.operator.negation.regexp',
      foreground: 'FF5555',
    },
    {
      token: 'meta.assertion.look-ahead.regexp',
      foreground: '50FA7B',
    },
    {
      token: 'string',
      foreground: 'F1FA8C',
    },
    {
      token: 'punctuation.definition.string.begin',
      foreground: 'E9F284',
    },
    {
      token: 'punctuation.definition.string.end',
      foreground: 'E9F284',
    },
    {
      token: 'punctuation.support.type.property-name.begin',
      foreground: '8BE9FE',
    },
    {
      token: 'punctuation.support.type.property-name.end',
      foreground: '8BE9FE',
    },
    {
      token: 'string.quoted.docstring.multi',
      foreground: '6272A4',
    },
    {
      token:
        'string.quoted.docstring.multi.python punctuation.definition.string.begin',
      foreground: '6272A4',
    },
    {
      token:
        'string.quoted.docstring.multi.python punctuation.definition.string.end',
      foreground: '6272A4',
    },
    {
      token: 'string.quoted.docstring.multi.python constant.character.escape',
      foreground: '6272A4',
    },
    {
      token: 'variable',
      foreground: 'F8F8F2',
    },
    {
      token: 'constant.other.key.perl',
      foreground: 'F8F8F2',
    },
    {
      token: 'support.variable.property',
      foreground: 'F8F8F2',
    },
    {
      token: 'variable.other.constant.js',
      foreground: 'F8F8F2',
    },
    {
      token: 'variable.other.constant.ts',
      foreground: 'F8F8F2',
    },
    {
      token: 'variable.other.constant.tsx',
      foreground: 'F8F8F2',
    },
    {
      token: 'meta.import variable.other.readwrite',
      foreground: 'FFB86C',
      fontStyle: 'italic',
    },
    {
      token: 'meta.variable.assignment.destructured.object.coffee variable',
      foreground: 'FFB86C',
      fontStyle: 'italic',
    },
    {
      token: 'meta.import variable.other.readwrite.alias',
      foreground: 'F8F8F2',
      fontStyle: 'normal',
    },
    {
      token: 'meta.export variable.other.readwrite.alias',
      foreground: 'F8F8F2',
      fontStyle: 'normal',
    },
    {
      token:
        'meta.variable.assignment.destructured.object.coffee variable variable',
      foreground: 'F8F8F2',
      fontStyle: 'normal',
    },
    {
      token: 'meta.selectionset.graphql variable',
      foreground: 'F1FA8C',
    },
    {
      token: 'meta.selectionset.graphql meta.arguments variable',
      foreground: 'F8F8F2',
    },
    {
      token: 'entity.name.fragment.graphql',
      foreground: '8BE9FD',
    },
    {
      token: 'variable.fragment.graphql',
      foreground: '8BE9FD',
    },
    {
      token: 'constant.other.symbol.hashkey.ruby',
      foreground: 'F8F8F2',
    },
    {
      token: 'keyword.operator.dereference.java',
      foreground: 'F8F8F2',
    },
    {
      token: 'keyword.operator.navigation.groovy',
      foreground: 'F8F8F2',
    },
    {
      token: 'meta.scope.for-loop.shell punctuation.definition.string.begin',
      foreground: 'F8F8F2',
    },
    {
      token: 'meta.scope.for-loop.shell punctuation.definition.string.end',
      foreground: 'F8F8F2',
    },
    {
      token: 'meta.scope.for-loop.shell string',
      foreground: 'F8F8F2',
    },
    {
      token: 'storage.modifier.import',
      foreground: 'F8F8F2',
    },
    {
      token: 'punctuation.section.embedded.begin.tsx',
      foreground: 'F8F8F2',
    },
    {
      token: 'punctuation.section.embedded.end.tsx',
      foreground: 'F8F8F2',
    },
    {
      token: 'punctuation.section.embedded.begin.jsx',
      foreground: 'F8F8F2',
    },
    {
      token: 'punctuation.section.embedded.end.jsx',
      foreground: 'F8F8F2',
    },
    {
      token: 'punctuation.separator.list.comma.css',
      foreground: 'F8F8F2',
    },
    {
      token: 'constant.language.empty-list.haskell',
      foreground: 'F8F8F2',
    },
    {
      token: 'source.shell variable.other',
      foreground: 'BD93F9',
    },
    {
      token: 'support.constant',
      foreground: 'BD93F9',
      fontStyle: 'normal',
    },
    {
      token: 'meta.scope.prerequisites.makefile',
      foreground: 'F1FA8C',
    },
    {
      token: 'meta.attribute-selector.scss',
      foreground: 'F1FA8C',
    },
    {
      token:
        'punctuation.definition.attribute-selector.end.bracket.square.scss',
      foreground: 'F8F8F2',
    },
    {
      token:
        'punctuation.definition.attribute-selector.begin.bracket.square.scss',
      foreground: 'F8F8F2',
    },
    {
      token: 'meta.preprocessor.haskell',
      foreground: '6272A4',
    },
    {
      token: 'log.error',
      foreground: 'FF5555',
      fontStyle: 'bold',
    },
    {
      token: 'log.warning',
      foreground: 'F1FA8C',
      fontStyle: 'bold',
    },
  ],
  colors: {
    'terminal.background': '282A36',
    'terminal.foreground': 'F8F8F2',
    'terminal.ansiBrightBlack': '6272A4',
    'terminal.ansiBrightRed': 'FF6E6E',
    'terminal.ansiBrightGreen': '69FF94',
    'terminal.ansiBrightYellow': 'FFFFA5',
    'terminal.ansiBrightBlue': 'D6ACFF',
    'terminal.ansiBrightMagenta': 'FF92DF',
    'terminal.ansiBrightCyan': 'A4FFFF',
    'terminal.ansiBrightWhite': 'FFFFFF',
    'terminal.ansiBlack': '21222C',
    'terminal.ansiRed': 'FF5555',
    'terminal.ansiGreen': '50FA7B',
    'terminal.ansiYellow': 'F1FA8C',
    'terminal.ansiBlue': 'BD93F9',
    'terminal.ansiMagenta': 'FF79C6',
    'terminal.ansiCyan': '8BE9FD',
    'terminal.ansiWhite': 'F8F8F2',
    focusBorder: '6272A4',
    foreground: 'F8F8F2',
    'selection.background': 'BD93F9',
    errorForeground: 'FF5555',
    'button.background': '44475A',
    'button.foreground': 'F8F8F2',
    'button.secondaryBackground': '282A36',
    'button.secondaryForeground': 'F8F8F2',
    'button.secondaryHoverBackground': '343746',
    'dropdown.background': '343746',
    'dropdown.border': '191A21',
    'dropdown.foreground': 'F8F8F2',
    'input.background': '282A36',
    'input.foreground': 'F8F8F2',
    'input.border': '191A21',
    'input.placeholderForeground': '6272A4',
    'inputOption.activeBorder': 'BD93F9',
    'inputValidation.infoBorder': 'FF79C6',
    'inputValidation.warningBorder': 'FFB86C',
    'inputValidation.errorBorder': 'FF5555',
    'badge.foreground': 'F8F8F2',
    'badge.background': '44475A',
    'progressBar.background': 'FF79C6',
    'list.activeSelectionBackground': '44475A',
    'list.activeSelectionForeground': 'F8F8F2',
    'list.dropBackground': '44475A',
    'list.focusBackground': '44475A75',
    'list.highlightForeground': '8BE9FD',
    'list.hoverBackground': '44475A75',
    'list.inactiveSelectionBackground': '44475A75',
    'list.warningForeground': 'FFB86C',
    'list.errorForeground': 'FF5555',
    'activityBar.background': '343746',
    'activityBar.inactiveForeground': '6272A4',
    'activityBar.foreground': 'F8F8F2',
    'activityBar.activeBorder': 'FF79C680',
    'activityBar.activeBackground': 'BD93F910',
    'activityBarBadge.background': 'FF79C6',
    'activityBarBadge.foreground': 'F8F8F2',
    'sideBar.background': '21222C',
    'sideBarTitle.foreground': 'F8F8F2',
    'sideBarSectionHeader.background': '282A36',
    'sideBarSectionHeader.border': '191A21',
    'editorGroup.border': 'BD93F9',
    'editorGroup.dropBackground': '44475A70',
    'editorGroupHeader.tabsBackground': '191A21',
    'tab.activeBackground': '282A36',
    'tab.activeForeground': 'F8F8F2',
    'tab.border': '191A21',
    'tab.activeBorderTop': 'FF79C680',
    'tab.inactiveBackground': '21222C',
    'tab.inactiveForeground': '6272A4',
    'editor.foreground': 'F8F8F2',
    'editor.background': '282A36',
    'editorLineNumber.foreground': '6272A4',
    'editor.selectionBackground': '44475A',
    'editor.selectionHighlightBackground': '424450',
    'editor.foldBackground': '21222C80',
    'editor.wordHighlightBackground': '8BE9FD50',
    'editor.wordHighlightStrongBackground': '50FA7B50',
    'editor.findMatchBackground': 'FFB86C80',
    'editor.findMatchHighlightBackground': 'FFFFFF40',
    'editor.findRangeHighlightBackground': '44475A75',
    'editor.hoverHighlightBackground': '8BE9FD50',
    'editor.lineHighlightBorder': '44475A',
    'editorLink.activeForeground': '8BE9FD',
    'editor.rangeHighlightBackground': 'BD93F915',
    'editor.snippetTabstopHighlightBackground': '282A36',
    'editor.snippetTabstopHighlightBorder': '6272A4',
    'editor.snippetFinalTabstopHighlightBackground': '282A36',
    'editor.snippetFinalTabstopHighlightBorder': '50FA7B',
    'editorWhitespace.foreground': 'FFFFFF1A',
    'editorIndentGuide.background': 'FFFFFF1A',
    'editorIndentGuide.activeBackground': 'FFFFFF45',
    'editorRuler.foreground': 'FFFFFF1A',
    'editorCodeLens.foreground': '6272A4',
    'editorBracketHighlight.foreground1': 'F8F8F2',
    'editorBracketHighlight.foreground2': 'FF79C6',
    'editorBracketHighlight.foreground3': '8BE9FD',
    'editorBracketHighlight.foreground4': '50FA7B',
    'editorBracketHighlight.foreground5': 'BD93F9',
    'editorBracketHighlight.foreground6': 'FFB86C',
    'editorBracketHighlight.unexpectedBracket.foreground': 'FF5555',
    'editorOverviewRuler.border': '191A21',
    'editorOverviewRuler.selectionHighlightForeground': 'FFB86C',
    'editorOverviewRuler.wordHighlightForeground': '8BE9FD',
    'editorOverviewRuler.wordHighlightStrongForeground': '50FA7B',
    'editorOverviewRuler.modifiedForeground': '8BE9FD80',
    'editorOverviewRuler.addedForeground': '50FA7B80',
    'editorOverviewRuler.deletedForeground': 'FF555580',
    'editorOverviewRuler.errorForeground': 'FF555580',
    'editorOverviewRuler.warningForeground': 'FFB86C80',
    'editorOverviewRuler.infoForeground': '8BE9FD80',
    'editorError.foreground': 'FF5555',
    'editorWarning.foreground': '8BE9FD',
    'editorGutter.modifiedBackground': '8BE9FD80',
    'editorGutter.addedBackground': '50FA7B80',
    'editorGutter.deletedBackground': 'FF555580',
    'gitDecoration.modifiedResourceForeground': '8BE9FD',
    'gitDecoration.deletedResourceForeground': 'FF5555',
    'gitDecoration.untrackedResourceForeground': '50FA7B',
    'gitDecoration.ignoredResourceForeground': '6272A4',
    'gitDecoration.conflictingResourceForeground': 'FFB86C',
    'diffEditor.insertedTextBackground': '50FA7B20',
    'diffEditor.removedTextBackground': 'FF555550',
    'inlineChat.regionHighlight': '343746',
    'editorWidget.background': '21222C',
    'editorSuggestWidget.background': '21222C',
    'editorSuggestWidget.foreground': 'F8F8F2',
    'editorSuggestWidget.selectedBackground': '44475A',
    'editorHoverWidget.background': '282A36',
    'editorHoverWidget.border': '6272A4',
    'editorMarkerNavigation.background': '21222C',
    'peekView.border': '44475A',
    'peekViewEditor.background': '282A36',
    'peekViewEditor.matchHighlightBackground': 'F1FA8C80',
    'peekViewResult.background': '21222C',
    'peekViewResult.fileForeground': 'F8F8F2',
    'peekViewResult.lineForeground': 'F8F8F2',
    'peekViewResult.matchHighlightBackground': 'F1FA8C80',
    'peekViewResult.selectionBackground': '44475A',
    'peekViewResult.selectionForeground': 'F8F8F2',
    'peekViewTitle.background': '191A21',
    'peekViewTitleDescription.foreground': '6272A4',
    'peekViewTitleLabel.foreground': 'F8F8F2',
    'merge.currentHeaderBackground': '50FA7B90',
    'merge.incomingHeaderBackground': 'BD93F990',
    'editorOverviewRuler.currentContentForeground': '50FA7B',
    'editorOverviewRuler.incomingContentForeground': 'BD93F9',
    'panel.background': '282A36',
    'panel.border': 'BD93F9',
    'panelTitle.activeBorder': 'FF79C6',
    'panelTitle.activeForeground': 'F8F8F2',
    'panelTitle.inactiveForeground': '6272A4',
    'statusBar.background': '191A21',
    'statusBar.foreground': 'F8F8F2',
    'statusBar.debuggingBackground': 'FF5555',
    'statusBar.debuggingForeground': '191A21',
    'statusBar.noFolderBackground': '191A21',
    'statusBar.noFolderForeground': 'F8F8F2',
    'statusBarItem.prominentBackground': 'FF5555',
    'statusBarItem.prominentHoverBackground': 'FFB86C',
    'statusBarItem.remoteForeground': '282A36',
    'statusBarItem.remoteBackground': 'BD93F9',
    'titleBar.activeBackground': '21222C',
    'titleBar.activeForeground': 'F8F8F2',
    'titleBar.inactiveBackground': '191A21',
    'titleBar.inactiveForeground': '6272A4',
    'extensionButton.prominentForeground': 'F8F8F2',
    'extensionButton.prominentBackground': '50FA7B90',
    'extensionButton.prominentHoverBackground': '50FA7B60',
    'pickerGroup.border': 'BD93F9',
    'pickerGroup.foreground': '8BE9FD',
    'debugToolBar.background': '21222C',
    'walkThrough.embeddedEditorBackground': '21222C',
    'settings.headerForeground': 'F8F8F2',
    'settings.modifiedItemIndicator': 'FFB86C',
    'settings.dropdownBackground': '21222C',
    'settings.dropdownForeground': 'F8F8F2',
    'settings.dropdownBorder': '191A21',
    'settings.checkboxBackground': '21222C',
    'settings.checkboxForeground': 'F8F8F2',
    'settings.checkboxBorder': '191A21',
    'settings.textInputBackground': '21222C',
    'settings.textInputForeground': 'F8F8F2',
    'settings.textInputBorder': '191A21',
    'settings.numberInputBackground': '21222C',
    'settings.numberInputForeground': 'F8F8F2',
    'settings.numberInputBorder': '191A21',
    'breadcrumb.foreground': '6272A4',
    'breadcrumb.background': '282A36',
    'breadcrumb.focusForeground': 'F8F8F2',
    'breadcrumb.activeSelectionForeground': 'F8F8F2',
    'breadcrumbPicker.background': '191A21',
    'listFilterWidget.background': '343746',
    'listFilterWidget.outline': '424450',
    'listFilterWidget.noMatchesOutline': 'FF5555',
  },
} as const satisfies monaco.editor.IStandaloneThemeData;
