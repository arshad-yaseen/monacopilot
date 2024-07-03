
import * as monaco from 'monaco-editor';
export default {
  "base": "vs-dark",
  "inherit": false,
  "rules": [
    {
      "token": "emphasis",
      "fontStyle": "italic"
    },
    {
      "token": "strong",
      "fontStyle": "bold"
    },
    {
      "token": "header",
      "foreground": "BF9EEE"
    },
    {
      "token": "meta.diff",
      "foreground": "7B7F8B"
    },
    {
      "token": "meta.diff.header",
      "foreground": "7B7F8B"
    },
    {
      "token": "markup.inserted",
      "foreground": "62E884"
    },
    {
      "token": "markup.deleted",
      "foreground": "EE6666"
    },
    {
      "token": "markup.changed",
      "foreground": "FFB86C"
    },
    {
      "token": "invalid",
      "foreground": "EE6666",
      "fontStyle": "underline italic"
    },
    {
      "token": "invalid.deprecated",
      "foreground": "F6F6F4",
      "fontStyle": "underline italic"
    },
    {
      "token": "entity.name.filename",
      "foreground": "E7EE98"
    },
    {
      "token": "markup.error",
      "foreground": "EE6666"
    },
    {
      "token": "markup.underline",
      "fontStyle": "underline"
    },
    {
      "token": "markup.bold",
      "foreground": "FFB86C",
      "fontStyle": "bold"
    },
    {
      "token": "markup.heading",
      "foreground": "BF9EEE",
      "fontStyle": "bold"
    },
    {
      "token": "markup.italic",
      "foreground": "E7EE98",
      "fontStyle": "italic"
    },
    {
      "token": "beginning.punctuation.definition.list.markdown",
      "foreground": "97E1F1"
    },
    {
      "token": "beginning.punctuation.definition.quote.markdown",
      "foreground": "97E1F1"
    },
    {
      "token": "punctuation.definition.link.restructuredtext",
      "foreground": "97E1F1"
    },
    {
      "token": "markup.inline.raw",
      "foreground": "62E884"
    },
    {
      "token": "markup.raw.restructuredtext",
      "foreground": "62E884"
    },
    {
      "token": "markup.underline.link",
      "foreground": "97E1F1"
    },
    {
      "token": "markup.underline.link.image",
      "foreground": "97E1F1"
    },
    {
      "token": "meta.link.reference.def.restructuredtext",
      "foreground": "F286C4"
    },
    {
      "token": "punctuation.definition.directive.restructuredtext",
      "foreground": "F286C4"
    },
    {
      "token": "string.other.link.description",
      "foreground": "F286C4"
    },
    {
      "token": "string.other.link.title",
      "foreground": "F286C4"
    },
    {
      "token": "entity.name.directive.restructuredtext",
      "foreground": "E7EE98",
      "fontStyle": "italic"
    },
    {
      "token": "markup.quote",
      "foreground": "E7EE98",
      "fontStyle": "italic"
    },
    {
      "token": "meta.separator.markdown",
      "foreground": "7B7F8B"
    },
    {
      "token": "fenced_code.block.language",
      "foreground": "62E884"
    },
    {
      "token": "markup.raw.inner.restructuredtext",
      "foreground": "62E884"
    },
    {
      "token": "markup.fenced_code.block.markdown punctuation.definition.markdown",
      "foreground": "62E884"
    },
    {
      "token": "punctuation.definition.constant.restructuredtext",
      "foreground": "BF9EEE"
    },
    {
      "token": "markup.heading.markdown punctuation.definition.string.begin",
      "foreground": "BF9EEE"
    },
    {
      "token": "markup.heading.markdown punctuation.definition.string.end",
      "foreground": "BF9EEE"
    },
    {
      "token": "meta.paragraph.markdown punctuation.definition.string.begin",
      "foreground": "F6F6F4"
    },
    {
      "token": "meta.paragraph.markdown punctuation.definition.string.end",
      "foreground": "F6F6F4"
    },
    {
      "token": "markup.quote.markdown meta.paragraph.markdown punctuation.definition.string.begin",
      "foreground": "E7EE98"
    },
    {
      "token": "markup.quote.markdown meta.paragraph.markdown punctuation.definition.string.end",
      "foreground": "E7EE98"
    },
    {
      "token": "entity.name.type.class",
      "foreground": "97E1F1",
      "fontStyle": "normal"
    },
    {
      "token": "entity.name.class",
      "foreground": "97E1F1",
      "fontStyle": "normal"
    },
    {
      "token": "keyword.expressions-and-types.swift",
      "foreground": "BF9EEE",
      "fontStyle": "italic"
    },
    {
      "token": "keyword.other.this",
      "foreground": "BF9EEE",
      "fontStyle": "italic"
    },
    {
      "token": "variable.language",
      "foreground": "BF9EEE",
      "fontStyle": "italic"
    },
    {
      "token": "variable.language punctuation.definition.variable.php",
      "foreground": "BF9EEE",
      "fontStyle": "italic"
    },
    {
      "token": "variable.other.readwrite.instance.ruby",
      "foreground": "BF9EEE",
      "fontStyle": "italic"
    },
    {
      "token": "variable.parameter.function.language.special",
      "foreground": "BF9EEE",
      "fontStyle": "italic"
    },
    {
      "token": "entity.other.inherited-class",
      "foreground": "97E1F1",
      "fontStyle": "italic"
    },
    {
      "token": "comment",
      "foreground": "7B7F8B"
    },
    {
      "token": "punctuation.definition.comment",
      "foreground": "7B7F8B"
    },
    {
      "token": "unused.comment",
      "foreground": "7B7F8B"
    },
    {
      "token": "wildcard.comment",
      "foreground": "7B7F8B"
    },
    {
      "token": "comment keyword.codetag.notation",
      "foreground": "F286C4"
    },
    {
      "token": "comment.block.documentation keyword",
      "foreground": "F286C4"
    },
    {
      "token": "comment.block.documentation storage.type.class",
      "foreground": "F286C4"
    },
    {
      "token": "comment.block.documentation entity.name.type",
      "foreground": "97E1F1",
      "fontStyle": "italic"
    },
    {
      "token": "comment.block.documentation entity.name.type punctuation.definition.bracket",
      "foreground": "97E1F1"
    },
    {
      "token": "comment.block.documentation variable",
      "foreground": "FFB86C",
      "fontStyle": "italic"
    },
    {
      "token": "constant",
      "foreground": "BF9EEE"
    },
    {
      "token": "variable.other.constant",
      "foreground": "BF9EEE"
    },
    {
      "token": "constant.character.escape",
      "foreground": "F286C4"
    },
    {
      "token": "constant.character.string.escape",
      "foreground": "F286C4"
    },
    {
      "token": "constant.regexp",
      "foreground": "F286C4"
    },
    {
      "token": "entity.name.tag",
      "foreground": "F286C4"
    },
    {
      "token": "entity.other.attribute-name.parent-selector",
      "foreground": "F286C4"
    },
    {
      "token": "entity.other.attribute-name",
      "foreground": "62E884",
      "fontStyle": "italic"
    },
    {
      "token": "entity.name.function",
      "foreground": "62E884"
    },
    {
      "token": "meta.function-call.object",
      "foreground": "62E884"
    },
    {
      "token": "meta.function-call.php",
      "foreground": "62E884"
    },
    {
      "token": "meta.function-call.static",
      "foreground": "62E884"
    },
    {
      "token": "meta.method-call.java meta.method",
      "foreground": "62E884"
    },
    {
      "token": "meta.method.groovy",
      "foreground": "62E884"
    },
    {
      "token": "support.function.any-method.lua",
      "foreground": "62E884"
    },
    {
      "token": "keyword.operator.function.infix",
      "foreground": "62E884"
    },
    {
      "token": "entity.name.variable.parameter",
      "foreground": "FFB86C",
      "fontStyle": "italic"
    },
    {
      "token": "meta.at-rule.function variable",
      "foreground": "FFB86C",
      "fontStyle": "italic"
    },
    {
      "token": "meta.at-rule.mixin variable",
      "foreground": "FFB86C",
      "fontStyle": "italic"
    },
    {
      "token": "meta.function.arguments variable.other.php",
      "foreground": "FFB86C",
      "fontStyle": "italic"
    },
    {
      "token": "meta.selectionset.graphql meta.arguments.graphql variable.arguments.graphql",
      "foreground": "FFB86C",
      "fontStyle": "italic"
    },
    {
      "token": "variable.parameter",
      "foreground": "FFB86C",
      "fontStyle": "italic"
    },
    {
      "token": "meta.decorator variable.other.readwrite",
      "foreground": "62E884",
      "fontStyle": "italic"
    },
    {
      "token": "meta.decorator variable.other.property",
      "foreground": "62E884",
      "fontStyle": "italic"
    },
    {
      "token": "meta.decorator variable.other.object",
      "foreground": "62E884"
    },
    {
      "token": "keyword",
      "foreground": "F286C4"
    },
    {
      "token": "punctuation.definition.keyword",
      "foreground": "F286C4"
    },
    {
      "token": "keyword.control.new",
      "fontStyle": "bold"
    },
    {
      "token": "keyword.operator.new",
      "fontStyle": "bold"
    },
    {
      "token": "meta.selector",
      "foreground": "F286C4"
    },
    {
      "token": "support",
      "foreground": "97E1F1",
      "fontStyle": "italic"
    },
    {
      "token": "support.function.magic",
      "foreground": "BF9EEE",
      "fontStyle": "regular"
    },
    {
      "token": "support.variable",
      "foreground": "BF9EEE",
      "fontStyle": "regular"
    },
    {
      "token": "variable.other.predefined",
      "foreground": "BF9EEE",
      "fontStyle": "regular"
    },
    {
      "token": "support.function",
      "fontStyle": "regular"
    },
    {
      "token": "support.type.property-name",
      "fontStyle": "regular"
    },
    {
      "token": "constant.other.symbol.hashkey punctuation.definition.constant.ruby",
      "foreground": "F286C4"
    },
    {
      "token": "entity.other.attribute-name.placeholder punctuation",
      "foreground": "F286C4"
    },
    {
      "token": "entity.other.attribute-name.pseudo-class punctuation",
      "foreground": "F286C4"
    },
    {
      "token": "entity.other.attribute-name.pseudo-element punctuation",
      "foreground": "F286C4"
    },
    {
      "token": "meta.group.double.toml",
      "foreground": "F286C4"
    },
    {
      "token": "meta.group.toml",
      "foreground": "F286C4"
    },
    {
      "token": "meta.object-binding-pattern-variable punctuation.destructuring",
      "foreground": "F286C4"
    },
    {
      "token": "punctuation.colon.graphql",
      "foreground": "F286C4"
    },
    {
      "token": "punctuation.definition.block.scalar.folded.yaml",
      "foreground": "F286C4"
    },
    {
      "token": "punctuation.definition.block.scalar.literal.yaml",
      "foreground": "F286C4"
    },
    {
      "token": "punctuation.definition.block.sequence.item.yaml",
      "foreground": "F286C4"
    },
    {
      "token": "punctuation.definition.entity.other.inherited-class",
      "foreground": "F286C4"
    },
    {
      "token": "punctuation.function.swift",
      "foreground": "F286C4"
    },
    {
      "token": "punctuation.separator.dictionary.key-value",
      "foreground": "F286C4"
    },
    {
      "token": "punctuation.separator.hash",
      "foreground": "F286C4"
    },
    {
      "token": "punctuation.separator.inheritance",
      "foreground": "F286C4"
    },
    {
      "token": "punctuation.separator.key-value",
      "foreground": "F286C4"
    },
    {
      "token": "punctuation.separator.key-value.mapping.yaml",
      "foreground": "F286C4"
    },
    {
      "token": "punctuation.separator.namespace",
      "foreground": "F286C4"
    },
    {
      "token": "punctuation.separator.pointer-access",
      "foreground": "F286C4"
    },
    {
      "token": "punctuation.separator.slice",
      "foreground": "F286C4"
    },
    {
      "token": "string.unquoted.heredoc punctuation.definition.string",
      "foreground": "F286C4"
    },
    {
      "token": "support.other.chomping-indicator.yaml",
      "foreground": "F286C4"
    },
    {
      "token": "punctuation.separator.annotation",
      "foreground": "F286C4"
    },
    {
      "token": "keyword.operator.other.powershell",
      "foreground": "F6F6F4"
    },
    {
      "token": "keyword.other.statement-separator.powershell",
      "foreground": "F6F6F4"
    },
    {
      "token": "meta.brace.round",
      "foreground": "F6F6F4"
    },
    {
      "token": "meta.function-call punctuation",
      "foreground": "F6F6F4"
    },
    {
      "token": "punctuation.definition.arguments.begin",
      "foreground": "F6F6F4"
    },
    {
      "token": "punctuation.definition.arguments.end",
      "foreground": "F6F6F4"
    },
    {
      "token": "punctuation.definition.entity.begin",
      "foreground": "F6F6F4"
    },
    {
      "token": "punctuation.definition.entity.end",
      "foreground": "F6F6F4"
    },
    {
      "token": "punctuation.definition.tag.cs",
      "foreground": "F6F6F4"
    },
    {
      "token": "punctuation.definition.type.begin",
      "foreground": "F6F6F4"
    },
    {
      "token": "punctuation.definition.type.end",
      "foreground": "F6F6F4"
    },
    {
      "token": "punctuation.section.scope.begin",
      "foreground": "F6F6F4"
    },
    {
      "token": "punctuation.section.scope.end",
      "foreground": "F6F6F4"
    },
    {
      "token": "punctuation.terminator.expression.php",
      "foreground": "F6F6F4"
    },
    {
      "token": "storage.type.generic.java",
      "foreground": "F6F6F4"
    },
    {
      "token": "string.template meta.brace",
      "foreground": "F6F6F4"
    },
    {
      "token": "string.template punctuation.accessor",
      "foreground": "F6F6F4"
    },
    {
      "token": "meta.string-contents.quoted.double punctuation.definition.variable",
      "foreground": "F286C4"
    },
    {
      "token": "punctuation.definition.interpolation.begin",
      "foreground": "F286C4"
    },
    {
      "token": "punctuation.definition.interpolation.end",
      "foreground": "F286C4"
    },
    {
      "token": "punctuation.definition.template-expression.begin",
      "foreground": "F286C4"
    },
    {
      "token": "punctuation.definition.template-expression.end",
      "foreground": "F286C4"
    },
    {
      "token": "punctuation.section.embedded.begin",
      "foreground": "F286C4"
    },
    {
      "token": "punctuation.section.embedded.coffee",
      "foreground": "F286C4"
    },
    {
      "token": "punctuation.section.embedded.end",
      "foreground": "F286C4"
    },
    {
      "token": "punctuation.section.embedded.end source.php",
      "foreground": "F286C4"
    },
    {
      "token": "punctuation.section.embedded.end source.ruby",
      "foreground": "F286C4"
    },
    {
      "token": "punctuation.definition.variable.makefile",
      "foreground": "F286C4"
    },
    {
      "token": "entity.name.function.target.makefile",
      "foreground": "97E1F1"
    },
    {
      "token": "entity.name.section.toml",
      "foreground": "97E1F1"
    },
    {
      "token": "entity.name.tag.yaml",
      "foreground": "97E1F1"
    },
    {
      "token": "variable.other.key.toml",
      "foreground": "97E1F1"
    },
    {
      "token": "constant.other.date",
      "foreground": "FFB86C"
    },
    {
      "token": "constant.other.timestamp",
      "foreground": "FFB86C"
    },
    {
      "token": "variable.other.alias.yaml",
      "foreground": "62E884",
      "fontStyle": "italic underline"
    },
    {
      "token": "storage",
      "foreground": "F286C4",
      "fontStyle": "regular"
    },
    {
      "token": "meta.implementation storage.type.objc",
      "foreground": "F286C4",
      "fontStyle": "regular"
    },
    {
      "token": "meta.interface-or-protocol storage.type.objc",
      "foreground": "F286C4",
      "fontStyle": "regular"
    },
    {
      "token": "source.groovy storage.type.def",
      "foreground": "F286C4",
      "fontStyle": "regular"
    },
    {
      "token": "entity.name.type",
      "foreground": "97E1F1",
      "fontStyle": "italic"
    },
    {
      "token": "keyword.primitive-datatypes.swift",
      "foreground": "97E1F1",
      "fontStyle": "italic"
    },
    {
      "token": "keyword.type.cs",
      "foreground": "97E1F1",
      "fontStyle": "italic"
    },
    {
      "token": "meta.protocol-list.objc",
      "foreground": "97E1F1",
      "fontStyle": "italic"
    },
    {
      "token": "meta.return-type.objc",
      "foreground": "97E1F1",
      "fontStyle": "italic"
    },
    {
      "token": "source.go storage.type",
      "foreground": "97E1F1",
      "fontStyle": "italic"
    },
    {
      "token": "source.groovy storage.type",
      "foreground": "97E1F1",
      "fontStyle": "italic"
    },
    {
      "token": "source.java storage.type",
      "foreground": "97E1F1",
      "fontStyle": "italic"
    },
    {
      "token": "source.powershell entity.other.attribute-name",
      "foreground": "97E1F1",
      "fontStyle": "italic"
    },
    {
      "token": "storage.class.std.rust",
      "foreground": "97E1F1",
      "fontStyle": "italic"
    },
    {
      "token": "storage.type.attribute.swift",
      "foreground": "97E1F1",
      "fontStyle": "italic"
    },
    {
      "token": "storage.type.c",
      "foreground": "97E1F1",
      "fontStyle": "italic"
    },
    {
      "token": "storage.type.core.rust",
      "foreground": "97E1F1",
      "fontStyle": "italic"
    },
    {
      "token": "storage.type.cs",
      "foreground": "97E1F1",
      "fontStyle": "italic"
    },
    {
      "token": "storage.type.groovy",
      "foreground": "97E1F1",
      "fontStyle": "italic"
    },
    {
      "token": "storage.type.objc",
      "foreground": "97E1F1",
      "fontStyle": "italic"
    },
    {
      "token": "storage.type.php",
      "foreground": "97E1F1",
      "fontStyle": "italic"
    },
    {
      "token": "storage.type.haskell",
      "foreground": "97E1F1",
      "fontStyle": "italic"
    },
    {
      "token": "storage.type.ocaml",
      "foreground": "97E1F1",
      "fontStyle": "italic"
    },
    {
      "token": "entity.name.type.type-parameter",
      "foreground": "FFB86C"
    },
    {
      "token": "meta.indexer.mappedtype.declaration entity.name.type",
      "foreground": "FFB86C"
    },
    {
      "token": "meta.type.parameters entity.name.type",
      "foreground": "FFB86C"
    },
    {
      "token": "storage.modifier",
      "foreground": "F286C4"
    },
    {
      "token": "string.regexp",
      "foreground": "E7EE98"
    },
    {
      "token": "constant.other.character-class.set.regexp",
      "foreground": "E7EE98"
    },
    {
      "token": "constant.character.escape.backslash.regexp",
      "foreground": "E7EE98"
    },
    {
      "token": "punctuation.definition.group.capture.regexp",
      "foreground": "F286C4"
    },
    {
      "token": "string.regexp punctuation.definition.string.begin",
      "foreground": "EE6666"
    },
    {
      "token": "string.regexp punctuation.definition.string.end",
      "foreground": "EE6666"
    },
    {
      "token": "punctuation.definition.character-class.regexp",
      "foreground": "97E1F1"
    },
    {
      "token": "punctuation.definition.group.regexp",
      "foreground": "FFB86C"
    },
    {
      "token": "punctuation.definition.group.assertion.regexp",
      "foreground": "EE6666"
    },
    {
      "token": "keyword.operator.negation.regexp",
      "foreground": "EE6666"
    },
    {
      "token": "meta.assertion.look-ahead.regexp",
      "foreground": "62E884"
    },
    {
      "token": "string",
      "foreground": "E7EE98"
    },
    {
      "token": "punctuation.definition.string.begin",
      "foreground": "DEE492"
    },
    {
      "token": "punctuation.definition.string.end",
      "foreground": "DEE492"
    },
    {
      "token": "punctuation.support.type.property-name.begin",
      "foreground": "97E2F2"
    },
    {
      "token": "punctuation.support.type.property-name.end",
      "foreground": "97E2F2"
    },
    {
      "token": "string.quoted.docstring.multi",
      "foreground": "7B7F8B"
    },
    {
      "token": "string.quoted.docstring.multi.python punctuation.definition.string.begin",
      "foreground": "7B7F8B"
    },
    {
      "token": "string.quoted.docstring.multi.python punctuation.definition.string.end",
      "foreground": "7B7F8B"
    },
    {
      "token": "string.quoted.docstring.multi.python constant.character.escape",
      "foreground": "7B7F8B"
    },
    {
      "token": "variable",
      "foreground": "F6F6F4"
    },
    {
      "token": "constant.other.key.perl",
      "foreground": "F6F6F4"
    },
    {
      "token": "support.variable.property",
      "foreground": "F6F6F4"
    },
    {
      "token": "variable.other.constant.js",
      "foreground": "F6F6F4"
    },
    {
      "token": "variable.other.constant.ts",
      "foreground": "F6F6F4"
    },
    {
      "token": "variable.other.constant.tsx",
      "foreground": "F6F6F4"
    },
    {
      "token": "meta.import variable.other.readwrite",
      "foreground": "FFB86C",
      "fontStyle": "italic"
    },
    {
      "token": "meta.variable.assignment.destructured.object.coffee variable",
      "foreground": "FFB86C",
      "fontStyle": "italic"
    },
    {
      "token": "meta.import variable.other.readwrite.alias",
      "foreground": "F6F6F4",
      "fontStyle": "normal"
    },
    {
      "token": "meta.export variable.other.readwrite.alias",
      "foreground": "F6F6F4",
      "fontStyle": "normal"
    },
    {
      "token": "meta.variable.assignment.destructured.object.coffee variable variable",
      "foreground": "F6F6F4",
      "fontStyle": "normal"
    },
    {
      "token": "meta.selectionset.graphql variable",
      "foreground": "E7EE98"
    },
    {
      "token": "meta.selectionset.graphql meta.arguments variable",
      "foreground": "F6F6F4"
    },
    {
      "token": "entity.name.fragment.graphql",
      "foreground": "97E1F1"
    },
    {
      "token": "variable.fragment.graphql",
      "foreground": "97E1F1"
    },
    {
      "token": "constant.other.symbol.hashkey.ruby",
      "foreground": "F6F6F4"
    },
    {
      "token": "keyword.operator.dereference.java",
      "foreground": "F6F6F4"
    },
    {
      "token": "keyword.operator.navigation.groovy",
      "foreground": "F6F6F4"
    },
    {
      "token": "meta.scope.for-loop.shell punctuation.definition.string.begin",
      "foreground": "F6F6F4"
    },
    {
      "token": "meta.scope.for-loop.shell punctuation.definition.string.end",
      "foreground": "F6F6F4"
    },
    {
      "token": "meta.scope.for-loop.shell string",
      "foreground": "F6F6F4"
    },
    {
      "token": "storage.modifier.import",
      "foreground": "F6F6F4"
    },
    {
      "token": "punctuation.section.embedded.begin.tsx",
      "foreground": "F6F6F4"
    },
    {
      "token": "punctuation.section.embedded.end.tsx",
      "foreground": "F6F6F4"
    },
    {
      "token": "punctuation.section.embedded.begin.jsx",
      "foreground": "F6F6F4"
    },
    {
      "token": "punctuation.section.embedded.end.jsx",
      "foreground": "F6F6F4"
    },
    {
      "token": "punctuation.separator.list.comma.css",
      "foreground": "F6F6F4"
    },
    {
      "token": "constant.language.empty-list.haskell",
      "foreground": "F6F6F4"
    },
    {
      "token": "source.shell variable.other",
      "foreground": "BF9EEE"
    },
    {
      "token": "support.constant",
      "foreground": "BF9EEE",
      "fontStyle": "normal"
    },
    {
      "token": "meta.scope.prerequisites.makefile",
      "foreground": "E7EE98"
    },
    {
      "token": "meta.attribute-selector.scss",
      "foreground": "E7EE98"
    },
    {
      "token": "punctuation.definition.attribute-selector.end.bracket.square.scss",
      "foreground": "F6F6F4"
    },
    {
      "token": "punctuation.definition.attribute-selector.begin.bracket.square.scss",
      "foreground": "F6F6F4"
    },
    {
      "token": "meta.preprocessor.haskell",
      "foreground": "7B7F8B"
    },
    {
      "token": "log.error",
      "foreground": "EE6666",
      "fontStyle": "bold"
    },
    {
      "token": "log.warning",
      "foreground": "E7EE98",
      "fontStyle": "bold"
    }
  ],
  "colors": {
    "terminal.background": "282A36",
    "terminal.foreground": "F6F6F4",
    "terminal.ansiBrightBlack": "7B7F8B",
    "terminal.ansiBrightRed": "F07C7C",
    "terminal.ansiBrightGreen": "78F09A",
    "terminal.ansiBrightYellow": "F6F6AE",
    "terminal.ansiBrightBlue": "D6B4F7",
    "terminal.ansiBrightMagenta": "F49DDA",
    "terminal.ansiBrightCyan": "ADF6F6",
    "terminal.ansiBrightWhite": "FFFFFF",
    "terminal.ansiBlack": "262626",
    "terminal.ansiRed": "EE6666",
    "terminal.ansiGreen": "62E884",
    "terminal.ansiYellow": "E7EE98",
    "terminal.ansiBlue": "BF9EEE",
    "terminal.ansiMagenta": "F286C4",
    "terminal.ansiCyan": "97E1F1",
    "terminal.ansiWhite": "F6F6F4",
    "focusBorder": "7B7F8B",
    "foreground": "F6F6F4",
    "selection.background": "BF9EEE",
    "errorForeground": "EE6666",
    "button.background": "44475A",
    "button.foreground": "F6F6F4",
    "button.secondaryBackground": "282A36",
    "button.secondaryForeground": "F6F6F4",
    "button.secondaryHoverBackground": "343746",
    "dropdown.background": "343746",
    "dropdown.border": "191A21",
    "dropdown.foreground": "F6F6F4",
    "input.background": "282A36",
    "input.foreground": "F6F6F4",
    "input.border": "191A21",
    "input.placeholderForeground": "7B7F8B",
    "inputOption.activeBorder": "BF9EEE",
    "inputValidation.infoBorder": "F286C4",
    "inputValidation.warningBorder": "FFB86C",
    "inputValidation.errorBorder": "EE6666",
    "badge.foreground": "F6F6F4",
    "badge.background": "44475A",
    "progressBar.background": "F286C4",
    "list.activeSelectionBackground": "44475A",
    "list.activeSelectionForeground": "F6F6F4",
    "list.dropBackground": "44475A",
    "list.focusBackground": "44475A75",
    "list.highlightForeground": "97E1F1",
    "list.hoverBackground": "44475A75",
    "list.inactiveSelectionBackground": "44475A75",
    "list.warningForeground": "FFB86C",
    "list.errorForeground": "EE6666",
    "activityBar.background": "343746",
    "activityBar.inactiveForeground": "7B7F8B",
    "activityBar.foreground": "F6F6F4",
    "activityBar.activeBorder": "FF79C680",
    "activityBar.activeBackground": "BD93F910",
    "activityBarBadge.background": "F286C4",
    "activityBarBadge.foreground": "F6F6F4",
    "sideBar.background": "262626",
    "sideBarTitle.foreground": "F6F6F4",
    "sideBarSectionHeader.background": "282A36",
    "sideBarSectionHeader.border": "191A21",
    "editorGroup.border": "BF9EEE",
    "editorGroup.dropBackground": "44475A70",
    "editorGroupHeader.tabsBackground": "191A21",
    "tab.activeBackground": "282A36",
    "tab.activeForeground": "F6F6F4",
    "tab.border": "191A21",
    "tab.activeBorderTop": "FF79C680",
    "tab.inactiveBackground": "262626",
    "tab.inactiveForeground": "7B7F8B",
    "editor.foreground": "F6F6F4",
    "editor.background": "282A36",
    "editorLineNumber.foreground": "7B7F8B",
    "editor.selectionBackground": "44475A",
    "editor.selectionHighlightBackground": "424450",
    "editor.foldBackground": "21222C80",
    "editor.wordHighlightBackground": "8BE9FD50",
    "editor.wordHighlightStrongBackground": "50FA7B50",
    "editor.findMatchBackground": "FFB86C80",
    "editor.findMatchHighlightBackground": "FFFFFF40",
    "editor.findRangeHighlightBackground": "44475A75",
    "editor.hoverHighlightBackground": "8BE9FD50",
    "editor.lineHighlightBorder": "44475A",
    "editorLink.activeForeground": "97E1F1",
    "editor.rangeHighlightBackground": "BD93F915",
    "editor.snippetTabstopHighlightBackground": "282A36",
    "editor.snippetTabstopHighlightBorder": "7B7F8B",
    "editor.snippetFinalTabstopHighlightBackground": "282A36",
    "editor.snippetFinalTabstopHighlightBorder": "62E884",
    "editorWhitespace.foreground": "FFFFFF1A",
    "editorIndentGuide.background": "FFFFFF1A",
    "editorIndentGuide.activeBackground": "FFFFFF45",
    "editorRuler.foreground": "FFFFFF1A",
    "editorCodeLens.foreground": "7B7F8B",
    "editorBracketHighlight.foreground1": "F6F6F4",
    "editorBracketHighlight.foreground2": "F286C4",
    "editorBracketHighlight.foreground3": "97E1F1",
    "editorBracketHighlight.foreground4": "62E884",
    "editorBracketHighlight.foreground5": "BF9EEE",
    "editorBracketHighlight.foreground6": "FFB86C",
    "editorBracketHighlight.unexpectedBracket.foreground": "EE6666",
    "editorOverviewRuler.border": "191A21",
    "editorOverviewRuler.selectionHighlightForeground": "FFB86C",
    "editorOverviewRuler.wordHighlightForeground": "97E1F1",
    "editorOverviewRuler.wordHighlightStrongForeground": "62E884",
    "editorOverviewRuler.modifiedForeground": "8BE9FD80",
    "editorOverviewRuler.addedForeground": "50FA7B80",
    "editorOverviewRuler.deletedForeground": "FF555580",
    "editorOverviewRuler.errorForeground": "FF555580",
    "editorOverviewRuler.warningForeground": "FFB86C80",
    "editorOverviewRuler.infoForeground": "8BE9FD80",
    "editorError.foreground": "EE6666",
    "editorWarning.foreground": "97E1F1",
    "editorGutter.modifiedBackground": "8BE9FD80",
    "editorGutter.addedBackground": "50FA7B80",
    "editorGutter.deletedBackground": "FF555580",
    "gitDecoration.modifiedResourceForeground": "97E1F1",
    "gitDecoration.deletedResourceForeground": "EE6666",
    "gitDecoration.untrackedResourceForeground": "62E884",
    "gitDecoration.ignoredResourceForeground": "7B7F8B",
    "gitDecoration.conflictingResourceForeground": "FFB86C",
    "diffEditor.insertedTextBackground": "50FA7B20",
    "diffEditor.removedTextBackground": "FF555550",
    "inlineChat.regionHighlight": "343746",
    "editorWidget.background": "262626",
    "editorSuggestWidget.background": "262626",
    "editorSuggestWidget.foreground": "F6F6F4",
    "editorSuggestWidget.selectedBackground": "44475A",
    "editorHoverWidget.background": "282A36",
    "editorHoverWidget.border": "7B7F8B",
    "editorMarkerNavigation.background": "262626",
    "peekView.border": "44475A",
    "peekViewEditor.background": "282A36",
    "peekViewEditor.matchHighlightBackground": "F1FA8C80",
    "peekViewResult.background": "262626",
    "peekViewResult.fileForeground": "F6F6F4",
    "peekViewResult.lineForeground": "F6F6F4",
    "peekViewResult.matchHighlightBackground": "F1FA8C80",
    "peekViewResult.selectionBackground": "44475A",
    "peekViewResult.selectionForeground": "F6F6F4",
    "peekViewTitle.background": "191A21",
    "peekViewTitleDescription.foreground": "7B7F8B",
    "peekViewTitleLabel.foreground": "F6F6F4",
    "merge.currentHeaderBackground": "50FA7B90",
    "merge.incomingHeaderBackground": "BD93F990",
    "editorOverviewRuler.currentContentForeground": "62E884",
    "editorOverviewRuler.incomingContentForeground": "BF9EEE",
    "panel.background": "282A36",
    "panel.border": "BF9EEE",
    "panelTitle.activeBorder": "F286C4",
    "panelTitle.activeForeground": "F6F6F4",
    "panelTitle.inactiveForeground": "7B7F8B",
    "statusBar.background": "191A21",
    "statusBar.foreground": "F6F6F4",
    "statusBar.debuggingBackground": "EE6666",
    "statusBar.debuggingForeground": "191A21",
    "statusBar.noFolderBackground": "191A21",
    "statusBar.noFolderForeground": "F6F6F4",
    "statusBarItem.prominentBackground": "EE6666",
    "statusBarItem.prominentHoverBackground": "FFB86C",
    "statusBarItem.remoteForeground": "282A36",
    "statusBarItem.remoteBackground": "BF9EEE",
    "titleBar.activeBackground": "262626",
    "titleBar.activeForeground": "F6F6F4",
    "titleBar.inactiveBackground": "191A21",
    "titleBar.inactiveForeground": "7B7F8B",
    "extensionButton.prominentForeground": "F6F6F4",
    "extensionButton.prominentBackground": "50FA7B90",
    "extensionButton.prominentHoverBackground": "50FA7B60",
    "pickerGroup.border": "BF9EEE",
    "pickerGroup.foreground": "97E1F1",
    "debugToolBar.background": "262626",
    "walkThrough.embeddedEditorBackground": "262626",
    "settings.headerForeground": "F6F6F4",
    "settings.modifiedItemIndicator": "FFB86C",
    "settings.dropdownBackground": "262626",
    "settings.dropdownForeground": "F6F6F4",
    "settings.dropdownBorder": "191A21",
    "settings.checkboxBackground": "262626",
    "settings.checkboxForeground": "F6F6F4",
    "settings.checkboxBorder": "191A21",
    "settings.textInputBackground": "262626",
    "settings.textInputForeground": "F6F6F4",
    "settings.textInputBorder": "191A21",
    "settings.numberInputBackground": "262626",
    "settings.numberInputForeground": "F6F6F4",
    "settings.numberInputBorder": "191A21",
    "breadcrumb.foreground": "7B7F8B",
    "breadcrumb.background": "282A36",
    "breadcrumb.focusForeground": "F6F6F4",
    "breadcrumb.activeSelectionForeground": "F6F6F4",
    "breadcrumbPicker.background": "191A21",
    "listFilterWidget.background": "343746",
    "listFilterWidget.outline": "424450",
    "listFilterWidget.noMatchesOutline": "EE6666"
  }
} as const satisfies monaco.editor.IStandaloneThemeData;
