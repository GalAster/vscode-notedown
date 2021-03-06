import { Rule, including } from '../utils'
import { html } from './html'
import { heading } from './heading'
import { list } from './list'
import { style } from './style'

export const repository: Rule = {
    Program: {
        patterns: [
            including('Heading'),
            including('Quote'),
            including('List'),
            including('Codeblock:Unknown'),
            including('HTML'),
            including('Paragraph'),
            including('Command'),
            including('Math'),
        ],
    },
    inline: {
        patterns: [
            including('ampersand'),
            including('bracket'),
            including('bold'),
            including('italic'),
            including('Codeblock:Raw'),
            including('escape'),
            including('link-email'),
            including('link-inet'),
        ],
    },
}

export const raw : Rule = {
    'Program': {
        patterns: [
            {
                include: '#Heading',
            },
            {
                include: '#Quote',
            },
            {
                include: '#List',
            },
            {
                include: '#Codeblock:Unknown',
            },
            {
                include: '#HTML',
            },
            {
                include: '#Paragraph',
            },
            {
                include: '#Command',
            },
            {
                include: '#Math',
            },
        ],
    },
    'Command': {
        patterns: [
            {
                match: '(\\\\)(comment)(\\[)(.*?)(\\])',
                captures: {
                    1: {
                        name: 'punctuation.definition.comment.notedown',
                    },
                    2: {
                        name: 'punctuation.definition.comment.notedown',
                    },
                    3: {
                        name: 'punctuation.definition.comment.notedown',
                    },
                    4: {
                        name: 'comment.text.notedown',
                    },
                    5: {
                        name: 'punctuation.definition.comment.notedown',
                    },
                },
            },
            {
                match: '\\s*(\\\\)(comment)(:)(.*)$',
                captures: {
                    1: {
                        name: 'punctuation.definition.comment.notedown',
                    },
                    2: {
                        name: 'punctuation.definition.comment.notedown',
                    },
                    3: {
                        name: 'punctuation.definition.comment.notedown',
                    },
                    4: {
                        name: 'comment.text.line.notedown',
                    },
                },
                while: '(^|\\G)\\s*(>) ?',
            },
            {
                include: '#Command:Span',
            },
            {
                include: '#Command:Line',
            },
            {
                include: '#Command:Block',
            },
            {
                include: '#Command:Single',
            },
        ],
    },
    'Command:Line': {
        begin: '\\s*(\\\\)(\\w+)(:)(.*)$',
        captures: {
            1: {
                name: 'storage.type.punctuation.notedown',
            },
            2: {
                name: 'storage.type.notedown',
            },
            3: {
                name: 'storage.type.punctuation.notedown',
            },
            4: {
                name: 'string.single.notedown',
            },
        },
        while: '(^|\\G)\\s*(>) ?',
    },
    'Command:Span': {
        match: '(\\\\)(\\w+)((:?\\[.*?\\])+)',
        captures: {
            1: {
                name: 'storage.type.punctuation.notedown',
            },
            2: {
                name: 'storage.type.notedown',
            },
            3: {
                patterns: [
                    {
                        match: '(\\[)(.*?)(\\])',
                        captures: {
                            1: {
                                name: 'storage.type.punctuation.notedown',
                            },
                            2: {
                                name: 'string.quote.notedown',
                            },
                            3: {
                                name: 'storage.type.punctuation.notedown',
                            },
                        },
                    },
                ],
            },
        },
    },
    'Command:Block': {
        begin: '(\\\\)(\\w+)\\s*({)',
        beginCaptures: {
            1: {
                name: 'storage.type.punctuation.notedown',
            },
            2: {
                name: 'storage.type.notedown',
            },
            3: {
                name: 'storage.type.punctuation.notedown',
            },
        },
        end: '}',
        endCaptures: {
            0: {
                name: 'storage.type.punctuation.notedown',
            },
        },
        patterns: [
            {
                name: 'string.quoted.notedown',
                match: '"[^"\\\\]*(?:\\\\.[^"\\\\]*)*"',
                patterns: [
                    {
                        match: '\\\\([btnfr"/\\\\\\n]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})',
                        name: 'constant.character.escape.notedown',
                    },
                    {
                        match: '\\\\[^btnfr"/\\\\\\n]',
                        name: 'invalid.illegal.escape.notedown',
                    },
                ],
            },
            {
                match: '([_\\w]+)\\s*(=)',
                captures: {
                    1: {
                        name: 'meta.object-literal.key.ts',
                    },
                    2: {
                        name: 'keyword.operator.assignment.ts',
                    },
                },
            },
            {
                match: '[1-9][0-9]*',
                name: 'constant.numeric.integer.notedown',
            },
            {
                match: '[1-9][0-9]*[.][0-9]+',
                name: 'constant.numeric.decimal.notedown',
            },
            {
                match: '\\b(self)',
                name: 'storage.type.self.notedown',
            },
            {
                match: '\\w+',
                name: 'meta.function-call.generic.python',
            },
            {
                match: '([#&])',
                name: 'keyword.operator.assignment.nyar',
            },
        ],
    },
    'Command:Single': {
        match: '(\\\\)(\\w+)',
        captures: {
            1: {
                name: 'storage.type.punctuation.notedown',
            },
            2: {
                name: 'storage.type.notedown',
            },
        },
    },
    'Heading': {
        match: '(?:^|\\G)[ ]{0,3}((#{1,6})\\s+(?=[\\S[^#]]).*?\\s*(#{1,6})?)$\\n?',
        captures: {
            1: {
                patterns: [
                    {
                        match: '(#{6})\\s+(?=[\\S[^#]])(.*?)\\s*(\\s+#+)?$\\n?',
                        name: 'heading.6.notedown',
                        captures: {
                            1: {
                                name: 'punctuation.definition.heading.notedown',
                            },
                            2: {
                                name: 'entity.name.section.notedown',
                            },
                            3: {
                                name: 'punctuation.definition.heading.notedown',
                            },
                        },
                    },
                    {
                        match: '(#{5})\\s+(?=[\\S[^#]])(.*?)\\s*(\\s+#+)?$\\n?',
                        name: 'heading.5.notedown',
                        captures: {
                            1: {
                                name: 'punctuation.definition.heading.notedown',
                            },
                            2: {
                                name: 'entity.name.section.notedown',
                            },
                            3: {
                                name: 'punctuation.definition.heading.notedown',
                            },
                        },
                    },
                    {
                        match: '(#{4})\\s+(?=[\\S[^#]])(.*?)\\s*(\\s+#+)?$\\n?',
                        name: 'heading.4.notedown',
                        captures: {
                            1: {
                                name: 'punctuation.definition.heading.notedown',
                            },
                            2: {
                                name: 'entity.name.section.notedown',
                            },
                            3: {
                                name: 'punctuation.definition.heading.notedown',
                            },
                        },
                    },
                    {
                        match: '(#{3})\\s+(?=[\\S[^#]])(.*?)\\s*(\\s+#+)?$\\n?',
                        name: 'heading.3.notedown',
                        captures: {
                            1: {
                                name: 'punctuation.definition.heading.notedown',
                            },
                            2: {
                                name: 'entity.name.section.notedown',
                            },
                            3: {
                                name: 'punctuation.definition.heading.notedown',
                            },
                        },
                    },
                    {
                        match: '(#{2})\\s+(?=[\\S[^#]])(.*?)\\s*(\\s+#+)?$\\n?',
                        name: 'heading.2.notedown',
                        captures: {
                            1: {
                                name: 'punctuation.definition.heading.notedown',
                            },
                            2: {
                                name: 'entity.name.section.notedown',
                            },
                            3: {
                                name: 'punctuation.definition.heading.notedown',
                            },
                        },
                    },
                    {
                        match: '(#{1})\\s+(?=[\\S[^#]])(.*?)\\s*(\\s+#+)?$\\n?',
                        name: 'heading.1.notedown',
                        captures: {
                            1: {
                                name: 'punctuation.definition.heading.notedown',
                            },
                            2: {
                                name: 'entity.name.section.notedown',
                            },
                            3: {
                                name: 'punctuation.definition.heading.notedown',
                            },
                        },
                    },
                ],
            },
        },
        name: 'markup.heading.notedown',
        patterns: [
            {
                include: '#inline',
            },
        ],
    },
    'Quote': {
        begin: '(^|\\G)[ ]{0,3}(>) ?',
        captures: {
            2: {
                name: 'punctuation.definition.quote.begin.notedown',
            },
        },
        name: 'markup.quote.notedown',
        patterns: [
            {
                include: '#Program',
            },
        ],
        while: '(^|\\G)\\s*(>) ?',
    },
    'HTML': {
        patterns: [
            {
                begin: '(^|\\G)\\s*(<!--)',
                captures: {
                    1: {
                        name: 'punctuation.definition.comment.html',
                    },
                    2: {
                        name: 'punctuation.definition.comment.html',
                    },
                },
                end: '(-->)',
                name: 'comment.block.html',
            },
            {
                begin: '(?i)(^|\\G)\\s*(?=<(script|style|pre)(\\s|$|>)(?!.*?</(script|style|pre)>))',
                end: '(?i)(.*)((</)(script|style|pre)(>))',
                endCaptures: {
                    1: {
                        patterns: [
                            {
                                include: 'text.html.derivative',
                            },
                        ],
                    },
                    2: {
                        name: 'meta.tag.structure.$4.end.html',
                    },
                    3: {
                        name: 'punctuation.definition.tag.begin.html',
                    },
                    4: {
                        name: 'entity.name.tag.html',
                    },
                    5: {
                        name: 'punctuation.definition.tag.end.html',
                    },
                },
                patterns: [
                    {
                        begin: '(\\s*|$)',
                        patterns: [
                            {
                                include: 'text.html.derivative',
                            },
                        ],
                        while: '(?i)^(?!.*</(script|style|pre)>)',
                    },
                ],
            },
            {
                begin: '(?i)(^|\\G)\\s*(?=</?[a-zA-Z]+[^\\s/&gt;]*(\\s|$|/?>))',
                patterns: [
                    {
                        include: 'text.html.derivative',
                    },
                ],
                while: '^(?!\\s*$)',
            },
            {
                begin: '(^|\\G)\\s*(?=(<[a-zA-Z0-9\\-](/?>|\\s.*?>)|</[a-zA-Z0-9\\-]>)\\s*$)',
                patterns: [
                    {
                        include: 'text.html.derivative',
                    },
                ],
                while: '^(?!\\s*$)',
            },
        ],
    },
    'List': {
        patterns: [
            {
                begin: '(^|\\G)([ ]{0,3})([*+-])([ \\t])',
                beginCaptures: {
                    3: {
                        name: 'punctuation.definition.list.begin.notedown',
                    },
                },
                comment: 'Currently does not support un-indented second lines.',
                name: 'markup.list.unnumbered.notedown',
                patterns: [
                    {
                        include: '#Program',
                    },
                    {
                        include: '#ListParagraph',
                    },
                ],
                while: '((^|\\G)([ ]{2,4}|\\t))|(^[ \\t]*$)',
            },
            {
                begin: '(^|\\G)([ ]{0,3})([0-9]+\\.)([ \\t])',
                beginCaptures: {
                    3: {
                        name: 'punctuation.definition.list.begin.notedown',
                    },
                },
                name: 'markup.list.numbered.notedown',
                patterns: [
                    {
                        include: '#Program',
                    },
                    {
                        include: '#ListParagraph',
                    },
                ],
                while: '((^|\\G)([ ]{2,4}|\\t))|(^[ \\t]*$)',
            },
        ],
    },
    'ListParagraph': {
        begin: '(^|\\G)(?=\\S)(?![*+->]\\s|[0-9]+\\.\\s)',
        name: 'meta.paragraph.notedown',
        patterns: [
            {
                include: '#inline',
            },
            {
                include: 'text.html.derivative',
            },
        ],
        while: '(^|\\G)(?!\\s*$|#|[ ]{0,3}([-*_>][ ]{2,}){3,}[ \\t]*$\\n?|[ ]{0,3}[*+->]|[ ]{0,3}[0-9]+\\.)',
    },
    'Paragraph': {
        begin: '(^|\\G)[ ]{0,3}(?=\\S)',
        name: 'meta.paragraph.notedown',
        patterns: [
            {
                include: '#Command',
            },
            {
                include: '#inline',
            },
            {
                include: 'text.html.derivative',
            },
        ],
        while: '(^|\\G)((?=\\s*[-=]{3,}\\s*$)|[ ]{0,}(?=\\S))',
    },
    'inline': {
        patterns: [
            {
                include: '#ampersand',
            },
            {
                include: '#bracket',
            },
            {
                include: '#bold',
            },
            {
                include: '#italic',
            },
            {
                include: '#Codeblock:Raw',
            },
            {
                include: '#escape',
            },
            {
                include: '#link-email',
            },
            {
                include: '#link-inet',
            },
        ],
    },
    'ampersand': {
        comment: 'Markdown will convert this for us. We match it so that the HTML grammar will not mark it up as invalid.',
        match: '&(?!([a-zA-Z0-9]+|#[0-9]+|#x[0-9a-fA-F]+);)',
        name: 'meta.other.valid-ampersand.notedown',
    },
    'bold': {
        begin: "(?x) (\\*\\*(?=\\w)|(?<!\\w)\\*\\*|(?<!\\w))(?=\\S) (?=\n  (\n    <[^>]*+>              # HTML tags\n    | (?<raw>`+)([^`]|(?!(?<!`)\\k<raw>(?!`))`)*+\\k<raw>\n                      # Raw\n    | \\\\[\\\\`*_{}\\[\\]()#.!+\\->]?+      # Escapes\n    | \\[\n    (\n        (?<square>          # Named group\n          [^\\[\\]\\\\]        # Match most chars\n          | \\\\.            # Escaped chars\n          | \\[ \\g<square>*+ \\]    # Nested brackets\n        )*+\n      \\]\n      (\n        (              # Reference Link\n          [ ]?          # Optional space\n          \\[[^\\]]*+\\]        # Ref name\n        )\n        | (              # Inline Link\n          \\(            # Opening paren\n            [ \\t]*+        # Optional whitespace\n            <?(.*?)>?      # URL\n            [ \\t]*+        # Optional whitespace\n            (          # Optional Title\n              (?<title>['\"])\n              (.*?)\n              \\k<title>\n            )?\n          \\)\n        )\n      )\n    )\n    |(?!(?<=\\S)\\1).)++(?<=\\S)(?=\\*\\*)\\1)",
        captures: {
            1: {
                name: 'punctuation.definition.bold.notedown',
            },
        },
        end: '(?<=\\S)(\\1)',
        name: 'markup.bold.notedown',
        patterns: [
            {
                applyEndPatternLast: 1,
                begin: '(?=<[^>]*?>)',
                end: '(?<=>)',
                patterns: [
                    {
                        include: 'text.html.derivative',
                    },
                ],
            },
            {
                include: '#escape',
            },
            {
                include: '#ampersand',
            },
            {
                include: '#bracket',
            },
            {
                include: '#Codeblock:Raw',
            },
            {
                include: '#bold',
            },
            {
                include: '#italic',
            },
            {
                include: '#link-inet',
            },
            {
                include: '#link-email',
            },
        ],
    },
    'italic': {
        begin: "(?x) (\\*(?=\\w)|(?<!\\w)\\*|(?<!\\w)\\b_)(?=\\S)                # Open\n  (?=\n    (\n      <[^>]*+>              # HTML tags\n      | (?<raw>`+)([^`]|(?!(?<!`)\\k<raw>(?!`))`)*+\\k<raw>\n                        # Raw\n      | \\\\[\\\\`*_{}\\[\\]()#.!+\\->]?+      # Escapes\n      | \\[\n      (\n          (?<square>          # Named group\n            [^\\[\\]\\\\]        # Match most chars\n            | \\\\.            # Escaped chars\n            | \\[ \\g<square>*+ \\]    # Nested brackets\n          )*+\n        \\]\n        (\n          (              # Reference Link\n            [ ]?          # Optional space\n            \\[[^\\]]*+\\]        # Ref name\n          )\n          | (              # Inline Link\n            \\(            # Opening paren\n              [ \\t]*+        # Optional whtiespace\n              <?(.*?)>?      # URL\n              [ \\t]*+        # Optional whtiespace\n              (          # Optional Title\n                (?<title>['\"])\n                (.*?)\n                \\k<title>\n              )?\n            \\)\n          )\n        )\n      )\n      | \\1\\1                # Must be bold closer\n      | (?!(?<=\\S)\\1).            # Everything besides\n                        # style closer\n    )++\n    (?<=\\S)(?=_\\b|\\*)\\1                # Close\n  )\n",
        captures: {
            1: {
                name: 'punctuation.definition.italic.notedown',
            },
        },
        end: '(?<=\\S)(\\1)((?!\\1)|(?=\\1\\1))',
        name: 'markup.italic.notedown',
        patterns: [
            {
                applyEndPatternLast: 1,
                begin: '(?=<[^>]*?>)',
                end: '(?<=>)',
                patterns: [
                    {
                        include: 'text.html.derivative',
                    },
                ],
            },
            {
                include: '#escape',
            },
            {
                include: '#ampersand',
            },
            {
                include: '#bracket',
            },
            {
                include: '#Codeblock:Raw',
            },
            {
                include: '#bold',
            },
            {
                include: '#link-inet',
            },
            {
                include: '#link-email',
            },
        ],
    },
    'bracket': {
        comment: 'Markdown will convert this for us. We match it so that the HTML grammar will not mark it up as invalid.',
        match: '<(?![a-zA-Z/?\\$!])',
        name: 'meta.other.valid-bracket.notedown',
    },
    'escape': {
        match: '\\\\[-`*_#+.!(){}\\[\\]\\\\>]',
        name: 'constant.character.escape.notedown',
    },
    'link-email': {
        captures: {
            1: {
                name: 'punctuation.definition.link.notedown',
            },
            2: {
                name: 'markup.underline.link.notedown',
            },
            4: {
                name: 'punctuation.definition.link.notedown',
            },
        },
        match: '(<)((?:mailto:)?[-.\\w]+@[-a-z0-9]+(\\.[-a-z0-9]+)*\\.[a-z]+)(>)',
        name: 'meta.link.email.lt-gt.notedown',
    },
    'link-inet': {
        captures: {
            1: {
                name: 'punctuation.definition.link.notedown',
            },
            2: {
                name: 'markup.underline.link.notedown',
            },
            3: {
                name: 'punctuation.definition.link.notedown',
            },
        },
        match: '(<)((?:https?|ftp)://.*?)(>)',
        name: 'meta.link.inet.notedown',
    },
    'Math': {
        patterns: [
            {
                name: 'markup.inserted.math.display.notedown',
                begin: '(^|\\G)([ ]{0,3})((?<![^\\\\]\\\\)\\$\\$(?!\\$))',
                end: '(?<![^\\\\]\\\\)(?<![^\\\\]\\$)(\\$\\$)([\\s]*)$',
                beginCaptures: {
                    0: {
                        name: 'punctuation.definition.math.display.notedown',
                    },
                },
                endCaptures: {
                    0: {
                        name: 'punctuation.definition.math.display.notedown',
                    },
                },
                contentName: 'meta.embedded.block.katex',
                patterns: [
                    {
                        include: 'text.katex',
                    },
                ],
            },
            {
                name: 'markup.inserted.math.inline.notedown',
                begin: "(?x) #turn on extended mode\n  (?<!^\\\\)(?<![^\\\\][\\$\\\\]) #without '$' and '\\' on the left\n  (\\$) #a '$'\n  (?![\\s\\$]) #without whitespace and '$' on the right\n  (?=((?!\\s\\$).)* #not match ' $'\n  (?<!\\\\)((\\\\{2})*(\\\\\\$)?)(?<!\\s)(\\$)(?![0-9]) #match the end '$'\n  ) #ensure math closed\n",
                end: "(?x) #turn on extended mode\n  (?<![^\\\\][\\$\\\\])(?<!\\s) #without '$' '\\' and whitespace on the left\n  (\\$) #a '$'\n  (?![0-9]) #without number on the right\n  (?!((\\$)(?![\\s\\$])(?=((?!\\s\\$).)+((?<![^\\\\][\\$\\\\])(?<!\\s)(\\$)(?![0-9]))))) #without a begin '$' on the right\n",
                captures: {
                    1: {
                        name: 'punctuation.definition.math.inline.notedown',
                    },
                },
                contentName: 'meta.embedded.block.katex',
                patterns: [
                    {
                        name: 'markup.inserted.math.inline.notedown',
                        match: '(?<![^\\\\][\\$\\\\])(?<!\\s)(\\$\\$)',
                        comment: "match a end '$' and a begin '$'",
                        captures: {
                            1: {
                                name: 'punctuation.definition.math.inline.notedown',
                            },
                        },
                    },
                    {
                        include: 'text.katex',
                    },
                ],
            },
        ],
    },
    'Codeblock:Unknown': {
        name: 'markup.codeblock.notedown',
        begin: '(^|\\G)(\\s*)(`{3,})\\s*(?=([^`]*)?$)',
        beginCaptures: {
            3: {
                name: 'punctuation.definition.notedown',
            },
            4: {
                name: 'fenced_code.block.language',
            },
        },
        end: '(^|\\G)(\\2|\\s{0,3})(\\3)\\s*$',
        endCaptures: {
            3: {
                name: 'punctuation.definition.notedown',
            },
        },
    },
    'Codeblock:Raw': {
        captures: {
            1: {
                name: 'punctuation.definition.raw.notedown',
            },
            3: {
                name: 'punctuation.definition.raw.notedown',
            },
        },
        match: '(`+)([^`]|(?!(?<!`)\\1(?!`))`)*+(\\1)',
        name: 'string.raw.notedown',
    },
}
