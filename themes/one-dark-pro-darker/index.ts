import * as monaco from 'monaco-editor';

export default {
  base: 'vs-dark',
  inherit: false,
  rules: [
    {
      token: 'meta.embedded',
      foreground: 'ABB2BF',
    },
    {
      token:
        'punctuation.definition.delayed.unison,punctuation.definition.list.begin.unison,punctuation.definition.list.end.unison,punctuation.definition.ability.begin.unison,punctuation.definition.ability.end.unison,punctuation.operator.assignment.as.unison,punctuation.separator.pipe.unison,punctuation.separator.delimiter.unison,punctuation.definition.hash.unison',
      foreground: 'E06C75',
    },
    {
      token: 'variable.other.generic-type.haskell',
      foreground: 'C678DD',
    },
    {
      token: 'storage.type.haskell',
      foreground: 'D19A66',
    },
    {
      token: 'support.variable.magic.python',
      foreground: 'E06C75',
    },
    {
      token:
        'punctuation.separator.period.python,punctuation.separator.element.python,punctuation.parenthesis.begin.python,punctuation.parenthesis.end.python',
      foreground: 'ABB2BF',
    },
    {
      token: 'variable.parameter.function.language.special.self.python',
      foreground: 'E5C07B',
    },
    {
      token: 'variable.parameter.function.language.special.cls.python',
      foreground: 'E5C07B',
    },
    {
      token: 'storage.modifier.lifetime.rust',
      foreground: 'ABB2BF',
    },
    {
      token: 'support.function.std.rust',
      foreground: '61AFEF',
    },
    {
      token: 'entity.name.lifetime.rust',
      foreground: 'E5C07B',
    },
    {
      token: 'variable.language.rust',
      foreground: 'E06C75',
    },
    {
      token: 'support.constant.edge',
      foreground: 'C678DD',
    },
    {
      token: 'constant.other.character-class.regexp',
      foreground: 'E06C75',
    },
    {
      token: 'keyword.operator.word',
      foreground: 'C678DD',
    },
    {
      token: 'keyword.operator.quantifier.regexp',
      foreground: 'D19A66',
    },
    {
      token: 'variable.parameter.function',
      foreground: 'ABB2BF',
    },
    {
      token: 'comment markup.link',
      foreground: '5C6370',
    },
    {
      token: 'markup.changed.diff',
      foreground: 'E5C07B',
    },
    {
      token:
        'meta.diff.header.from-file,meta.diff.header.to-file,punctuation.definition.from-file.diff,punctuation.definition.to-file.diff',
      foreground: '61AFEF',
    },
    {
      token: 'markup.inserted.diff',
      foreground: '98C379',
    },
    {
      token: 'markup.deleted.diff',
      foreground: 'E06C75',
    },
    {
      token: 'meta.function.c,meta.function.cpp',
      foreground: 'E06C75',
    },
    {
      token:
        'punctuation.section.block.begin.bracket.curly.cpp,punctuation.section.block.end.bracket.curly.cpp,punctuation.terminator.statement.c,punctuation.section.block.begin.bracket.curly.c,punctuation.section.block.end.bracket.curly.c,punctuation.section.parens.begin.bracket.round.c,punctuation.section.parens.end.bracket.round.c,punctuation.section.parameters.begin.bracket.round.c,punctuation.section.parameters.end.bracket.round.c',
      foreground: 'ABB2BF',
    },
    {
      token: 'punctuation.separator.key-value',
      foreground: 'ABB2BF',
    },
    {
      token: 'keyword.operator.expression.import',
      foreground: '61AFEF',
    },
    {
      token: 'support.constant.math',
      foreground: 'E5C07B',
    },
    {
      token: 'support.constant.property.math',
      foreground: 'D19A66',
    },
    {
      token: 'variable.other.constant',
      foreground: 'E5C07B',
    },
    {
      token: 'storage.type.annotation.java',
      foreground: 'E5C07B',
    },
    {
      token: 'storage.type.object.array.java',
      foreground: 'E5C07B',
    },
    {
      token: 'source.java',
      foreground: 'E06C75',
    },
    {
      token:
        'punctuation.section.block.begin.java,punctuation.section.block.end.java,punctuation.definition.method-parameters.begin.java,punctuation.definition.method-parameters.end.java,meta.method.identifier.java,punctuation.section.method.begin.java,punctuation.section.method.end.java,punctuation.terminator.java,punctuation.section.class.begin.java,punctuation.section.class.end.java,punctuation.section.inner-class.begin.java,punctuation.section.inner-class.end.java,meta.method-call.java,punctuation.section.class.begin.bracket.curly.java,punctuation.section.class.end.bracket.curly.java,punctuation.section.method.begin.bracket.curly.java,punctuation.section.method.end.bracket.curly.java,punctuation.separator.period.java,punctuation.bracket.angle.java,punctuation.definition.annotation.java,meta.method.body.java',
      foreground: 'ABB2BF',
    },
    {
      token: 'meta.method.java',
      foreground: '61AFEF',
    },
    {
      token:
        'storage.modifier.import.java,storage.type.java,storage.type.generic.java',
      foreground: 'E5C07B',
    },
    {
      token: 'keyword.operator.instanceof.java',
      foreground: 'C678DD',
    },
    {
      token: 'meta.definition.variable.name.java',
      foreground: 'E06C75',
    },
    {
      token: 'keyword.operator.logical',
      foreground: '56B6C2',
    },
    {
      token: 'keyword.operator.bitwise',
      foreground: '56B6C2',
    },
    {
      token: 'keyword.operator.channel',
      foreground: '56B6C2',
    },
    {
      token:
        'support.constant.property-value.scss,support.constant.property-value.css',
      foreground: 'D19A66',
    },
    {
      token: 'keyword.operator.css,keyword.operator.scss,keyword.operator.less',
      foreground: '56B6C2',
    },
    {
      token:
        'support.constant.color.w3c-standard-color-name.css,support.constant.color.w3c-standard-color-name.scss',
      foreground: 'D19A66',
    },
    {
      token: 'punctuation.separator.list.comma.css',
      foreground: 'ABB2BF',
    },
    {
      token: 'support.constant.color.w3c-standard-color-name.css',
      foreground: 'D19A66',
    },
    {
      token: 'support.type.vendored.property-name.css',
      foreground: '56B6C2',
    },
    {
      token:
        'support.module.node,support.type.object.module,support.module.node',
      foreground: 'E5C07B',
    },
    {
      token: 'entity.name.type.module',
      foreground: 'E5C07B',
    },
    {
      token:
        'variable.other.readwrite,meta.object-literal.key,support.variable.property,support.variable.object.process,support.variable.object.node',
      foreground: 'E06C75',
    },
    {
      token: 'support.constant.json',
      foreground: 'D19A66',
    },
    {
      token: 'keyword.operator.expression.instanceof',
      foreground: 'C678DD',
    },
    {
      token: 'keyword.operator.new',
      foreground: 'C678DD',
    },
    {
      token: 'keyword.operator.ternary',
      foreground: 'C678DD',
    },
    {
      token: 'keyword.operator.optional',
      foreground: 'C678DD',
    },
    {
      token: 'keyword.operator.expression.keyof',
      foreground: 'C678DD',
    },
    {
      token: 'support.type.object.console',
      foreground: 'E06C75',
    },
    {
      token: 'support.variable.property.process',
      foreground: 'D19A66',
    },
    {
      token: 'entity.name.function,support.function.console',
      foreground: '61AFEF',
    },
    {
      token: 'keyword.operator.misc.rust',
      foreground: 'ABB2BF',
    },
    {
      token: 'keyword.operator.sigil.rust',
      foreground: 'C678DD',
    },
    {
      token: 'keyword.operator.delete',
      foreground: 'C678DD',
    },
    {
      token: 'support.type.object.dom',
      foreground: '56B6C2',
    },
    {
      token: 'support.variable.dom,support.variable.property.dom',
      foreground: 'E06C75',
    },
    {
      token:
        'keyword.operator.arithmetic,keyword.operator.comparison,keyword.operator.decrement,keyword.operator.increment,keyword.operator.relational',
      foreground: '56B6C2',
    },
    {
      token:
        'keyword.operator.assignment.c,keyword.operator.comparison.c,keyword.operator.c,keyword.operator.increment.c,keyword.operator.decrement.c,keyword.operator.bitwise.shift.c,keyword.operator.assignment.cpp,keyword.operator.comparison.cpp,keyword.operator.cpp,keyword.operator.increment.cpp,keyword.operator.decrement.cpp,keyword.operator.bitwise.shift.cpp',
      foreground: 'C678DD',
    },
    {
      token: 'punctuation.separator.delimiter',
      foreground: 'ABB2BF',
    },
    {
      token: 'punctuation.separator.c,punctuation.separator.cpp',
      foreground: 'C678DD',
    },
    {
      token: 'support.type.posix-reserved.c,support.type.posix-reserved.cpp',
      foreground: '56B6C2',
    },
    {
      token: 'keyword.operator.sizeof.c,keyword.operator.sizeof.cpp',
      foreground: 'C678DD',
    },
    {
      token: 'variable.parameter.function.language.python',
      foreground: 'D19A66',
    },
    {
      token: 'support.type.python',
      foreground: '56B6C2',
    },
    {
      token: 'keyword.operator.logical.python',
      foreground: 'C678DD',
    },
    {
      token: 'variable.parameter.function.python',
      foreground: 'D19A66',
    },
    {
      token:
        'punctuation.definition.arguments.begin.python,punctuation.definition.arguments.end.python,punctuation.separator.arguments.python,punctuation.definition.list.begin.python,punctuation.definition.list.end.python',
      foreground: 'ABB2BF',
    },
    {
      token: 'meta.function-call.generic.python',
      foreground: '61AFEF',
    },
    {
      token: 'constant.character.format.placeholder.other.python',
      foreground: 'D19A66',
    },
    {
      token: 'keyword.operator',
      foreground: 'ABB2BF',
    },
    {
      token: 'keyword.operator.assignment.compound',
      foreground: 'C678DD',
    },
    {
      token:
        'keyword.operator.assignment.compound.js,keyword.operator.assignment.compound.ts',
      foreground: '56B6C2',
    },
    {
      token: 'keyword',
      foreground: 'C678DD',
    },
    {
      token: 'entity.name.namespace',
      foreground: 'E5C07B',
    },
    {
      token: 'variable',
      foreground: 'E06C75',
    },
    {
      token: 'variable.c',
      foreground: 'ABB2BF',
    },
    {
      token: 'variable.language',
      foreground: 'E5C07B',
    },
    {
      token: 'token.variable.parameter.java',
      foreground: 'ABB2BF',
    },
    {
      token: 'import.storage.java',
      foreground: 'E5C07B',
    },
    {
      token: 'token.package.keyword',
      foreground: 'C678DD',
    },
    {
      token: 'token.package',
      foreground: 'ABB2BF',
    },
    {
      token: 'entity.name.function',
      foreground: '61AFEF',
    },
    {
      token: 'meta.require',
      foreground: '61AFEF',
    },
    {
      token: 'support.function.any-method',
      foreground: '61AFEF',
    },
    {
      token: 'variable.function',
      foreground: '61AFEF',
    },
    {
      token: 'entity.name.type.namespace',
      foreground: 'E5C07B',
    },
    {
      token: 'support.class, entity.name.type.class',
      foreground: 'E5C07B',
    },
    {
      token: 'entity.name.class.identifier.namespace.type',
      foreground: 'E5C07B',
    },
    {
      token: 'entity.name.class',
      foreground: 'E5C07B',
    },
    {
      token: 'variable.other.class.js',
      foreground: 'E5C07B',
    },
    {
      token: 'variable.other.class.ts',
      foreground: 'E5C07B',
    },
    {
      token: 'variable.other.class.php',
      foreground: 'E06C75',
    },
    {
      token: 'entity.name.type',
      foreground: 'E5C07B',
    },
    {
      token: 'keyword.control',
      foreground: 'C678DD',
    },
    {
      token: 'control.elements, keyword.operator.less',
      foreground: 'D19A66',
    },
    {
      token: 'keyword.other.special-method',
      foreground: '61AFEF',
    },
    {
      token: 'storage',
      foreground: 'C678DD',
    },
    {
      token: 'token.storage',
      foreground: 'C678DD',
    },
    {
      token:
        'keyword.operator.expression.delete,keyword.operator.expression.in,keyword.operator.expression.of,keyword.operator.expression.instanceof,keyword.operator.new,keyword.operator.expression.typeof,keyword.operator.expression.void',
      foreground: 'C678DD',
    },
    {
      token: 'token.storage.type.java',
      foreground: 'E5C07B',
    },
    {
      token: 'support.function',
      foreground: '56B6C2',
    },
    {
      token: 'support.type.property-name',
      foreground: 'ABB2BF',
    },
    {
      token:
        'support.type.property-name.toml, support.type.property-name.table.toml, support.type.property-name.array.toml',
      foreground: 'E06C75',
    },
    {
      token: 'support.constant.property-value',
      foreground: 'ABB2BF',
    },
    {
      token: 'support.constant.font-name',
      foreground: 'D19A66',
    },
    {
      token: 'meta.tag',
      foreground: 'ABB2BF',
    },
    {
      token: 'string',
      foreground: '98C379',
    },
    {
      token: 'constant.other.symbol',
      foreground: '56B6C2',
    },
    {
      token: 'constant.numeric',
      foreground: 'D19A66',
    },
    {
      token: 'constant',
      foreground: 'D19A66',
    },
    {
      token: 'punctuation.definition.constant',
      foreground: 'D19A66',
    },
    {
      token: 'entity.name.tag',
      foreground: 'E06C75',
    },
    {
      token: 'entity.other.attribute-name',
      foreground: 'D19A66',
    },
    {
      token: 'entity.other.attribute-name.id',
      foreground: '61AFEF',
    },
    {
      token: 'entity.other.attribute-name.class.css',
      foreground: 'D19A66',
    },
    {
      token: 'meta.selector',
      foreground: 'C678DD',
    },
    {
      token: 'markup.heading',
      foreground: 'E06C75',
    },
    {
      token:
        'markup.heading punctuation.definition.heading, entity.name.section',
      foreground: '61AFEF',
    },
    {
      token: 'keyword.other.unit',
      foreground: 'E06C75',
    },
    {
      token: 'markup.bold,todo.bold',
      foreground: 'D19A66',
    },
    {
      token: 'punctuation.definition.bold',
      foreground: 'E5C07B',
    },
    {
      token: 'markup.italic, punctuation.definition.italic,todo.emphasis',
      foreground: 'C678DD',
    },
    {
      token: 'emphasis md',
      foreground: 'C678DD',
    },
    {
      token: 'entity.name.section.markdown',
      foreground: 'E06C75',
    },
    {
      token: 'punctuation.definition.heading.markdown',
      foreground: 'E06C75',
    },
    {
      token: 'punctuation.definition.list.begin.markdown',
      foreground: 'E5C07B',
    },
    {
      token: 'markup.heading.setext',
      foreground: 'ABB2BF',
    },
    {
      token: 'punctuation.definition.bold.markdown',
      foreground: 'D19A66',
    },
    {
      token: 'markup.inline.raw.markdown',
      foreground: '98C379',
    },
    {
      token: 'markup.inline.raw.string.markdown',
      foreground: '98C379',
    },
    {
      token: 'punctuation.definition.raw.markdown',
      foreground: 'E5C07B',
    },
    {
      token: 'punctuation.definition.list.markdown',
      foreground: 'E5C07B',
    },
    {
      token: 'punctuation.definition.string.begin.markdown',
      foreground: 'E06C75',
    },
    {
      token: 'punctuation.definition.string.end.markdown',
      foreground: 'E06C75',
    },
    {
      token: 'punctuation.definition.metadata.markdown',
      foreground: 'E06C75',
    },
    {
      token: 'beginning.punctuation.definition.list.markdown',
      foreground: 'E06C75',
    },
    {
      token: 'punctuation.definition.metadata.markdown',
      foreground: 'E06C75',
    },
    {
      token:
        'markup.underline.link.markdown,markup.underline.link.image.markdown',
      foreground: 'C678DD',
    },
    {
      token:
        'string.other.link.title.markdown,string.other.link.description.markdown',
      foreground: '61AFEF',
    },
    {
      token: 'markup.raw.monospace.asciidoc',
      foreground: '98C379',
    },
    {
      token: 'punctuation.definition.asciidoc',
      foreground: 'E5C07B',
    },
    {
      token: 'markup.list.asciidoc',
      foreground: 'E5C07B',
    },
    {
      token: 'markup.link.asciidoc,markup.other.url.asciidoc',
      foreground: 'C678DD',
    },
    {
      token: 'string.unquoted.asciidoc,markup.other.url.asciidoc',
      foreground: '61AFEF',
    },
    {
      token: 'string.regexp',
      foreground: '56B6C2',
    },
    {
      token: 'punctuation.section.embedded, variable.interpolation',
      foreground: 'E06C75',
    },
    {
      token:
        'punctuation.section.embedded.begin,punctuation.section.embedded.end',
      foreground: 'C678DD',
    },
    {
      token: 'invalid.illegal',
      foreground: 'FFFFFF',
    },
    {
      token: 'invalid.illegal.bad-ampersand.html',
      foreground: 'ABB2BF',
    },
    {
      token: 'invalid.illegal.unrecognized-tag.html',
      foreground: 'E06C75',
    },
    {
      token: 'invalid.broken',
      foreground: 'FFFFFF',
    },
    {
      token: 'invalid.deprecated',
      foreground: 'FFFFFF',
    },
    {
      token: 'invalid.deprecated.entity.other.attribute-name.html',
      foreground: 'D19A66',
    },
    {
      token: 'invalid.unimplemented',
      foreground: 'FFFFFF',
    },
    {
      token: 'source.json meta.structure.dictionary.json > string.quoted.json',
      foreground: 'E06C75',
    },
    {
      token:
        'source.json meta.structure.dictionary.json > string.quoted.json > punctuation.string',
      foreground: 'E06C75',
    },
    {
      token:
        'source.json meta.structure.dictionary.json > value.json > string.quoted.json,source.json meta.structure.array.json > value.json > string.quoted.json,source.json meta.structure.dictionary.json > value.json > string.quoted.json > punctuation,source.json meta.structure.array.json > value.json > string.quoted.json > punctuation',
      foreground: '98C379',
    },
    {
      token:
        'source.json meta.structure.dictionary.json > constant.language.json,source.json meta.structure.array.json > constant.language.json',
      foreground: '56B6C2',
    },
    {
      token: 'support.type.property-name.json',
      foreground: 'E06C75',
    },
    {
      token: 'support.type.property-name.json punctuation',
      foreground: 'E06C75',
    },
    {
      token:
        'text.html.laravel-blade source.php.embedded.line.html entity.name.tag.laravel-blade',
      foreground: 'C678DD',
    },
    {
      token:
        'text.html.laravel-blade source.php.embedded.line.html support.constant.laravel-blade',
      foreground: 'C678DD',
    },
    {
      token:
        'support.other.namespace.use.php,support.other.namespace.use-as.php,entity.other.alias.php,meta.interface.php',
      foreground: 'E5C07B',
    },
    {
      token: 'keyword.operator.error-control.php',
      foreground: 'C678DD',
    },
    {
      token: 'keyword.operator.type.php',
      foreground: 'C678DD',
    },
    {
      token: 'punctuation.section.array.begin.php',
      foreground: 'ABB2BF',
    },
    {
      token: 'punctuation.section.array.end.php',
      foreground: 'ABB2BF',
    },
    {
      token: 'invalid.illegal.non-null-typehinted.php',
      foreground: 'F44747',
    },
    {
      token:
        'storage.type.php,meta.other.type.phpdoc.php,keyword.other.type.php,keyword.other.array.phpdoc.php',
      foreground: 'E5C07B',
    },
    {
      token:
        'meta.function-call.php,meta.function-call.object.php,meta.function-call.static.php',
      foreground: '61AFEF',
    },
    {
      token:
        'punctuation.definition.parameters.begin.bracket.round.php,punctuation.definition.parameters.end.bracket.round.php,punctuation.separator.delimiter.php,punctuation.section.scope.begin.php,punctuation.section.scope.end.php,punctuation.terminator.expression.php,punctuation.definition.arguments.begin.bracket.round.php,punctuation.definition.arguments.end.bracket.round.php,punctuation.definition.storage-type.begin.bracket.round.php,punctuation.definition.storage-type.end.bracket.round.php,punctuation.definition.array.begin.bracket.round.php,punctuation.definition.array.end.bracket.round.php,punctuation.definition.begin.bracket.round.php,punctuation.definition.end.bracket.round.php,punctuation.definition.begin.bracket.curly.php,punctuation.definition.end.bracket.curly.php,punctuation.definition.section.switch-block.end.bracket.curly.php,punctuation.definition.section.switch-block.start.bracket.curly.php,punctuation.definition.section.switch-block.begin.bracket.curly.php,punctuation.definition.section.switch-block.end.bracket.curly.php',
      foreground: 'ABB2BF',
    },
    {
      token: 'support.constant.core.rust',
      foreground: 'D19A66',
    },
    {
      token:
        'support.constant.ext.php,support.constant.std.php,support.constant.core.php,support.constant.parser-token.php',
      foreground: 'D19A66',
    },
    {
      token: 'entity.name.goto-label.php,support.other.php',
      foreground: '61AFEF',
    },
    {
      token:
        'keyword.operator.logical.php,keyword.operator.bitwise.php,keyword.operator.arithmetic.php',
      foreground: '56B6C2',
    },
    {
      token: 'keyword.operator.regexp.php',
      foreground: 'C678DD',
    },
    {
      token: 'keyword.operator.comparison.php',
      foreground: '56B6C2',
    },
    {
      token: 'keyword.operator.heredoc.php,keyword.operator.nowdoc.php',
      foreground: 'C678DD',
    },
    {
      token: 'meta.function.decorator.python',
      foreground: '61AFEF',
    },
    {
      token:
        'support.token.decorator.python,meta.function.decorator.identifier.python',
      foreground: '56B6C2',
    },
    {
      token: 'function.parameter',
      foreground: 'ABB2BF',
    },
    {
      token: 'function.brace',
      foreground: 'ABB2BF',
    },
    {
      token: 'function.parameter.ruby, function.parameter.cs',
      foreground: 'ABB2BF',
    },
    {
      token: 'constant.language.symbol.ruby',
      foreground: '56B6C2',
    },
    {
      token: 'constant.language.symbol.hashkey.ruby',
      foreground: '56B6C2',
    },
    {
      token: 'rgb-value',
      foreground: '56B6C2',
    },
    {
      token: 'inline-color-decoration rgb-value',
      foreground: 'D19A66',
    },
    {
      token: 'less rgb-value',
      foreground: 'D19A66',
    },
    {
      token: 'selector.sass',
      foreground: 'E06C75',
    },
    {
      token:
        'support.type.primitive.ts,support.type.builtin.ts,support.type.primitive.tsx,support.type.builtin.tsx',
      foreground: 'E5C07B',
    },
    {
      token: 'block.scope.end,block.scope.begin',
      foreground: 'ABB2BF',
    },
    {
      token: 'storage.type.cs',
      foreground: 'E5C07B',
    },
    {
      token: 'entity.name.variable.local.cs',
      foreground: 'E06C75',
    },
    {
      token: 'token.info-token',
      foreground: '61AFEF',
    },
    {
      token: 'token.warn-token',
      foreground: 'D19A66',
    },
    {
      token: 'token.error-token',
      foreground: 'F44747',
    },
    {
      token: 'token.debug-token',
      foreground: 'C678DD',
    },
    {
      token: 'punctuation.definition.template-expression.begin',
      foreground: 'C678DD',
    },
    {
      token: 'punctuation.definition.template-expression.end',
      foreground: 'C678DD',
    },
    {
      token: 'punctuation.section.embedded',
      foreground: 'C678DD',
    },
    {
      token: 'meta.template.expression',
      foreground: 'ABB2BF',
    },
    {
      token: 'keyword.operator.module',
      foreground: 'C678DD',
    },
    {
      token: 'support.type.type.flowtype',
      foreground: '61AFEF',
    },
    {
      token: 'support.type.primitive',
      foreground: 'E5C07B',
    },
    {
      token: 'meta.property.object',
      foreground: 'E06C75',
    },
    {
      token: 'variable.parameter.function.js',
      foreground: 'E06C75',
    },
    {
      token: 'keyword.other.template.begin',
      foreground: '98C379',
    },
    {
      token: 'keyword.other.template.end',
      foreground: '98C379',
    },
    {
      token: 'keyword.other.substitution.begin',
      foreground: '98C379',
    },
    {
      token: 'keyword.other.substitution.end',
      foreground: '98C379',
    },
    {
      token: 'keyword.operator.assignment',
      foreground: '56B6C2',
    },
    {
      token: 'keyword.operator.assignment.go',
      foreground: 'E5C07B',
    },
    {
      token: 'keyword.operator.arithmetic.go',
      foreground: 'C678DD',
    },
    {
      token: 'keyword.operator.address.go',
      foreground: 'C678DD',
    },
    {
      token: 'entity.name.package.go',
      foreground: 'E5C07B',
    },
    {
      token: 'support.type.prelude.elm',
      foreground: '56B6C2',
    },
    {
      token: 'support.constant.elm',
      foreground: 'D19A66',
    },
    {
      token: 'punctuation.quasi.element',
      foreground: 'C678DD',
    },
    {
      token: 'constant.character.entity',
      foreground: 'E06C75',
    },
    {
      token: 'entity.other.attribute-name.pseudo-element',
      foreground: '56B6C2',
    },
    {
      token: 'entity.other.attribute-name.pseudo-class',
      foreground: '56B6C2',
    },
    {
      token: 'entity.global.clojure',
      foreground: 'E5C07B',
    },
    {
      token: 'meta.symbol.clojure',
      foreground: 'E06C75',
    },
    {
      token: 'constant.keyword.clojure',
      foreground: '56B6C2',
    },
    {
      token: 'meta.arguments.coffee',
      foreground: 'E06C75',
    },
    {
      token: 'variable.parameter.function.coffee',
      foreground: 'E06C75',
    },
    {
      token: 'source.ini',
      foreground: '98C379',
    },
    {
      token: 'meta.scope.prerequisites.makefile',
      foreground: 'E06C75',
    },
    {
      token: 'source.makefile',
      foreground: 'E5C07B',
    },
    {
      token: 'storage.modifier.import.groovy',
      foreground: 'E5C07B',
    },
    {
      token: 'meta.method.groovy',
      foreground: '61AFEF',
    },
    {
      token: 'meta.definition.variable.name.groovy',
      foreground: 'E06C75',
    },
    {
      token: 'meta.definition.class.inherited.classes.groovy',
      foreground: '98C379',
    },
    {
      token: 'support.variable.semantic.hlsl',
      foreground: 'E5C07B',
    },
    {
      token: 'support.type.texture.hlsl',
      foreground: 'C678DD',
    },
    {
      token: 'support.type.sampler.hlsl',
      foreground: 'C678DD',
    },
    {
      token: 'support.type.object.hlsl',
      foreground: 'C678DD',
    },
    {
      token: 'support.type.object.rw.hlsl',
      foreground: 'C678DD',
    },
    {
      token: 'support.type.fx.hlsl',
      foreground: 'C678DD',
    },
    {
      token: 'support.type.object.hlsl',
      foreground: 'C678DD',
    },
    {
      token: 'text.variable',
      foreground: 'E06C75',
    },
    {
      token: 'text.bracketed',
      foreground: 'E06C75',
    },
    {
      token: 'support.type.swift',
      foreground: 'E5C07B',
    },
    {
      token: 'support.type.vb.asp',
      foreground: 'E5C07B',
    },
    {
      token: 'entity.name.function.xi',
      foreground: 'E5C07B',
    },
    {
      token: 'entity.name.class.xi',
      foreground: '56B6C2',
    },
    {
      token: 'constant.character.character-class.regexp.xi',
      foreground: 'E06C75',
    },
    {
      token: 'constant.regexp.xi',
      foreground: 'C678DD',
    },
    {
      token: 'keyword.control.xi',
      foreground: '56B6C2',
    },
    {
      token: 'invalid.xi',
      foreground: 'ABB2BF',
    },
    {
      token: 'beginning.punctuation.definition.quote.markdown.xi',
      foreground: '98C379',
    },
    {
      token: 'beginning.punctuation.definition.list.markdown.xi',
      foreground: '7F848E',
    },
    {
      token: 'constant.character.xi',
      foreground: '61AFEF',
    },
    {
      token: 'accent.xi',
      foreground: '61AFEF',
    },
    {
      token: 'wikiword.xi',
      foreground: 'D19A66',
    },
    {
      token: 'constant.other.color.rgb-value.xi',
      foreground: 'FFFFFF',
    },
    {
      token: 'punctuation.definition.tag.xi',
      foreground: '5C6370',
    },
    {
      token: 'entity.name.label.cs',
      foreground: 'E5C07B',
    },
    {
      token: 'entity.name.scope-resolution.function.call',
      foreground: 'E5C07B',
    },
    {
      token: 'entity.name.scope-resolution.function.definition',
      foreground: 'E5C07B',
    },
    {
      token: 'entity.name.label.cs',
      foreground: 'E06C75',
    },
    {
      token: 'markup.heading.setext.1.markdown',
      foreground: 'E06C75',
    },
    {
      token: 'markup.heading.setext.2.markdown',
      foreground: 'E06C75',
    },
    {
      token: ' meta.brace.square',
      foreground: 'ABB2BF',
    },
    {
      token: 'comment, punctuation.definition.comment',
      foreground: '7F848E',
    },
    {
      token: 'markup.quote.markdown',
      foreground: '5C6370',
    },
    {
      token: 'punctuation.definition.block.sequence.item.yaml',
      foreground: 'ABB2BF',
    },
    {
      token: 'constant.language.symbol.elixir',
      foreground: '56B6C2',
    },
    {
      token: 'constant.language.symbol.double-quoted.elixir',
      foreground: '56B6C2',
    },
    {
      token: 'entity.name.variable.parameter.cs',
      foreground: 'E5C07B',
    },
    {
      token: 'entity.name.variable.field.cs',
      foreground: 'E06C75',
    },
    {
      token: 'markup.deleted',
      foreground: 'E06C75',
    },
    {
      token: 'markup.inserted',
      foreground: '98C379',
    },
    {
      token: 'markup.underline',
      fontStyle: 'underline',
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
      foreground: 'ABB2BF',
    },
    {
      token: 'variable.parameter.function.latex',
      foreground: 'E06C75',
    },
    {
      token: 'variable.other.object',
      foreground: 'E5C07B',
    },
    {
      token: 'variable.other.constant.property',
      foreground: 'E06C75',
    },
    {
      token: 'entity.other.inherited-class',
      foreground: 'E5C07B',
    },
    {
      token: 'variable.other.readwrite.c',
      foreground: 'E06C75',
    },
    {
      token:
        'entity.name.variable.parameter.php,punctuation.separator.colon.php,constant.other.php',
      foreground: 'ABB2BF',
    },
    {
      token: 'constant.numeric.decimal.asm.x86_64',
      foreground: 'C678DD',
    },
    {
      token: 'support.other.parenthesis.regexp',
      foreground: 'D19A66',
    },
    {
      token: 'constant.character.escape',
      foreground: '56B6C2',
    },
    {
      token: 'string.regexp',
      foreground: 'E06C75',
    },
    {
      token: 'log.info',
      foreground: '98C379',
    },
    {
      token: 'log.warning',
      foreground: 'E5C07B',
    },
    {
      token: 'log.error',
      foreground: 'E06C75',
    },
    {
      token: 'keyword.operator.expression.is',
      foreground: 'C678DD',
    },
    {
      token: 'entity.name.label',
      foreground: 'E06C75',
    },
    {
      token: 'enumMember',
      foreground: '56B6C2',
    },
    {
      token: 'variable.constant',
      foreground: 'D19A66',
    },
    {
      token: 'variable.defaultLibrary',
      foreground: 'E5C07B',
    },
    {
      token: 'variable:dart',
      foreground: 'D19A66',
    },
    {
      token: 'property:dart',
      foreground: 'D19A66',
    },
    {
      token: 'annotation:dart',
      foreground: 'D19A66',
    },
    {
      token: 'parameter.label:dart',
      foreground: 'ABB2BF',
    },
    {
      token: 'macro',
      foreground: 'D19A66',
    },
    {
      token: 'tomlArrayKey',
      foreground: 'E5C07B',
    },
    {
      token: 'memberOperatorOverload',
      foreground: 'C678DD',
    },
  ],
  colors: {
    'activityBar.background': '23272E',
    'activityBar.foreground': 'D7DAE0',
    'activityBarBadge.background': '4D78CC',
    'activityBarBadge.foreground': 'F8FAFD',
    'badge.background': '23272E',
    'button.background': '404754',
    'button.secondaryBackground': '30333D',
    'button.secondaryForeground': 'C0BDBD',
    'checkbox.border': '404754',
    'debugToolBar.background': '1E2227',
    descriptionForeground: 'ABB2BF',
    'diffEditor.insertedTextBackground': '00809B33',
    'dropdown.background': '1E2227',
    'dropdown.border': '1E2227',
    'editor.background': '23272E',
    'editor.findMatchBackground': 'D19A6644',
    'editor.findMatchBorder': 'FFFFFF5A',
    'editor.findMatchHighlightBackground': 'FFFFFF22',
    'editor.foreground': 'ABB2BF',
    'editorBracketHighlight.foreground1': 'D19A66',
    'editorBracketHighlight.foreground2': 'C678DD',
    'editorBracketHighlight.foreground3': '56B6C2',
    'editorHoverWidget.highlightForeground': '61AFEF',
    'editorInlayHint.foreground': 'ABB2BF',
    'editorInlayHint.background': '2C313C',
    'editor.lineHighlightBackground': '2C313C',
    'editorLineNumber.activeForeground': 'ABB2BF',
    'editorGutter.addedBackground': '109868',
    'editorGutter.deletedBackground': '9A353D',
    'editorGutter.modifiedBackground': '948B60',
    'editorOverviewRuler.addedBackground': '109868',
    'editorOverviewRuler.deletedBackground': '9A353D',
    'editorOverviewRuler.modifiedBackground': '948B60',
    'editor.selectionBackground': '67769660',
    'editor.selectionHighlightBackground': 'FFFFFF10',
    'editor.selectionHighlightBorder': 'DDDDDD',
    'editor.wordHighlightBackground': 'D2E0FF2F',
    'editor.wordHighlightBorder': '7F848E',
    'editor.wordHighlightStrongBackground': 'ABB2BF26',
    'editor.wordHighlightStrongBorder': '7F848E',
    'editorBracketMatch.background': '515A6B',
    'editorBracketMatch.border': '515A6B',
    'editorCursor.background': 'FFFFFFC9',
    'editorCursor.foreground': '528BFF',
    'editorError.foreground': 'C24038',
    'editorGroup.background': '181A1F',
    'editorGroup.border': '181A1F',
    'editorGroupHeader.tabsBackground': '1E2227',
    'editorHoverWidget.background': '1E2227',
    'editorHoverWidget.border': '181A1F',
    'editorIndentGuide.activeBackground': 'C8C8C859',
    'editorIndentGuide.background': '3B4048',
    'editorLineNumber.foreground': '495162',
    'editorMarkerNavigation.background': '1E2227',
    'editorRuler.foreground': 'ABB2BF26',
    'editorSuggestWidget.background': '1E2227',
    'editorSuggestWidget.border': '181A1F',
    'editorSuggestWidget.selectedBackground': '2C313A',
    'editorWarning.foreground': 'D19A66',
    'editorWhitespace.foreground': 'FFFFFF1D',
    'editorWidget.background': '1E2227',
    focusBorder: '3E4452',
    'gitDecoration.ignoredResourceForeground': '636B78',
    'input.background': '1D1F23',
    'input.foreground': 'ABB2BF',
    'list.activeSelectionBackground': '2C313A',
    'list.activeSelectionForeground': 'D7DAE0',
    'list.focusBackground': '323842',
    'list.focusForeground': 'F0F0F0',
    'list.highlightForeground': 'ECEBEB',
    'list.hoverBackground': '2C313A',
    'list.hoverForeground': 'ABB2BF',
    'list.inactiveSelectionBackground': '323842',
    'list.inactiveSelectionForeground': 'D7DAE0',
    'list.warningForeground': 'D19A66',
    'menu.foreground': 'ABB2BF',
    'menu.separatorBackground': '343A45',
    'minimapGutter.addedBackground': '109868',
    'minimapGutter.deletedBackground': '9A353D',
    'minimapGutter.modifiedBackground': '948B60',
    'panel.border': '3E4452',
    'panelSectionHeader.background': '1E2227',
    'peekViewEditor.background': '1B1D23',
    'peekViewEditor.matchHighlightBackground': '29244B',
    'peekViewResult.background': '22262B',
    'scrollbar.shadow': '23252C',
    'scrollbarSlider.activeBackground': '747D9180',
    'scrollbarSlider.background': '4E566660',
    'scrollbarSlider.hoverBackground': '5A637580',
    'settings.focusedRowBackground': '23272E',
    'settings.headerForeground': 'FFFFFF',
    'sideBar.background': '1E2227',
    'sideBar.foreground': 'ABB2BF',
    'sideBarSectionHeader.background': '23272E',
    'sideBarSectionHeader.foreground': 'ABB2BF',
    'statusBar.background': '1E2227',
    'statusBar.debuggingBackground': 'CC6633',
    'statusBar.debuggingBorder': 'FF000000',
    'statusBar.debuggingForeground': 'FFFFFF',
    'statusBar.foreground': '9DA5B4',
    'statusBar.noFolderBackground': '1E2227',
    'statusBarItem.remoteBackground': '4D78CC',
    'statusBarItem.remoteForeground': 'F8FAFD',
    'tab.activeBackground': '23272E',
    'tab.activeBorder': 'B4B4B4',
    'tab.activeForeground': 'DCDCDC',
    'tab.border': '181A1F',
    'tab.hoverBackground': '323842',
    'tab.inactiveBackground': '1E2227',
    'tab.unfocusedHoverBackground': '323842',
    'terminal.ansiBlack': '3F4451',
    'terminal.ansiBlue': '4AA5F0',
    'terminal.ansiBrightBlack': '4F5666',
    'terminal.ansiBrightBlue': '4DC4FF',
    'terminal.ansiBrightCyan': '4CD1E0',
    'terminal.ansiBrightGreen': 'A5E075',
    'terminal.ansiBrightMagenta': 'DE73FF',
    'terminal.ansiBrightRed': 'FF616E',
    'terminal.ansiBrightWhite': 'E6E6E6',
    'terminal.ansiBrightYellow': 'F0A45D',
    'terminal.ansiCyan': '42B3C2',
    'terminal.ansiGreen': '8CC265',
    'terminal.ansiMagenta': 'C162DE',
    'terminal.ansiRed': 'E05561',
    'terminal.ansiWhite': 'D7DAE0',
    'terminal.ansiYellow': 'D18F52',
    'terminal.background': '23272E',
    'terminal.border': '3E4452',
    'terminal.foreground': 'ABB2BF',
    'terminal.selectionBackground': 'ABB2BF30',
    'textBlockQuote.background': '2E3440',
    'textBlockQuote.border': '4B5362',
    'textLink.foreground': '61AFEF',
    'textPreformat.foreground': 'D19A66',
    'titleBar.activeBackground': '23272E',
    'titleBar.activeForeground': '9DA5B4',
    'titleBar.inactiveBackground': '23272E',
    'titleBar.inactiveForeground': '6B717D',
    'tree.indentGuidesStroke': 'FFFFFF1D',
    'walkThrough.embeddedEditorBackground': '2E3440',
    'welcomePage.buttonHoverBackground': '404754',
  },
} as const satisfies monaco.editor.IStandaloneThemeData;
