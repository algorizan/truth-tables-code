const INDENT = 4;// "tab";
const INDENT_SIZE = 4;
const INDENT_HTML = 2;

module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    plugins: [
        "html", "css", "@html-eslint", "md",
    ],
    extends: ["eslint:recommended", "plugin:json/recommended", "plugin:css/standard"],
    overrides: [
        {
            env: { node: true },
            files: [".eslintrc.{js,cjs,json}"],
            parserOptions: { sourceType: "script" },
        },
        {
            files: ["*.html"],
            parser: "@html-eslint/parser",
            extends: ["plugin:@html-eslint/recommended"],
            rules: {
                "@html-eslint/indent": ["error", INDENT_HTML],
                "@html-eslint/require-lang": "off",
                "spaced-comment": "off",
            },
        },
        {
            files: ["*.md"],
            parser: "markdown-eslint-parser",
            extends: ["plugin:md/recommended"],
            rules: {"md/remark": ["error", {"maximum-line-length": "off"} ]},
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: { // Full List: https://eslint.org/docs/latest/rules/

        // "no-console": process.env.NODE_ENV === "production" ? "error" : "off"
        // "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        // "no-warning-comments": process.env.NODE_ENV === "production" ? "error" : "off",

        "no-await-in-loop": "off",
        "no-constant-binary-expression": "error",
        "no-constructor-return": "error",
        "no-duplicate-imports": "error",
        "no-new-native-nonconstructor": "error",
        "no-promise-executor-return": "error",
        "no-self-compare": "error",
        "no-template-curly-in-string": "warn",
        "no-unmodified-loop-condition": "warn",
        "no-unreachable-loop": "error",
        "no-unused-private-class-members": "warn",
        "no-use-before-define": "off",
        "require-atomic-updates": "error",
        "accessor-pairs": "warn",
        "arrow-body-style": [
            "error",
            "as-needed",
        ],
        "camelcase": [
            "warn",
            { ignoreGlobals: true },
        ],
        "consistent-this": "warn",
        "curly": [
            "warn",
            "multi-line",
        ],
        "default-case": "warn",
        "default-case-last": "warn",
        "default-param-last": "error",
        "dot-notation": [
            "error",
            { allowKeywords: false },
        ],
        "eqeqeq": [
            "error",
            "always",
        ],
        "func-style": [
            "error",
            "declaration",
            { allowArrowFunctions: true },
        ],
        "grouped-accessor-pairs": [
            "error",
            "getBeforeSet",
        ],
        "logical-assignment-operators": [
            "warn",
            "always",
        ],
        "max-classes-per-file": [
            "warn",
            {
                max: 1,
                ignoreExpressions: true,
            },
        ],
        "new-cap": [
            "error",
            {
                newIsCap: true,
                properties: false,
            },
        ],
        "no-alert": "off",
        "no-array-constructor": "error",
        "no-bitwise": "off",
        "no-caller": "error",
        "no-confusing-arrow": "error",
        "no-continue": "error",
        "no-div-regex": "error",
        "no-else-return": "error",
        "no-empty-function": "off",
        "no-empty-static-block": "off",
        "no-eval": "off",
        "no-implied-eval": "error",
        "no-extend-native": "error",
        "no-extra-bind": "error",
        "no-extra-label": "error",
        "no-floating-decimal": "error",
        "no-implicit-coercion": [
            "error",
            {
                boolean: false,
                disallowTemplateShorthand: false,
            },
        ],
        "no-invalid-this": "error",
        "no-iterator": "error",
        "no-inline-comments": "off",
        "no-label-var": "error",
        "no-labels": "error",
        "no-lone-blocks": "error",
        "no-lonely-if": "error",
        "no-loop-func": "error",
        "no-magic-numbers": [
            "warn",
            {
                ignore: [
                    1, 0, -1, 2,
                ],
                enforceConst: true,
                ignoreArrayIndexes: true,
                ignoreClassFieldInitialValues: true,
                ignoreDefaultValues: true,
            },
        ],
        "no-mixed-operators": [
            "error",
            {
                groups: [
                    [
                        "&", "|", "^", "~", "<<", ">>", ">>>",
                    ],
                    [
                        "&&", "||", "?:", "??",
                    ],
                    [
                        "==", "!=", "===", "!==", ">", ">=", "<", "<=",
                    ],
                ],
            },
        ],
        "no-multi-assign": "error",
        "no-multi-str": "error",
        "no-nested-ternary": "warn",
        "no-new": "error",
        "no-new-func": "error",
        "no-new-object": "error",
        "no-new-wrappers": "error",
        "no-param-reassign": "warn",
        "no-proto": "error",
        "no-return-assign": "error",
        "no-return-await": "error",
        "no-script-url": "error",
        "no-sequences": "error",
        "no-shadow": [
            "error",
            {
                builtinGlobals: true,
                allow: [],
            },
        ],
        "no-throw-literal": "error",
        "no-undefined": "error",
        "no-unneeded-ternary": "warn",
        "no-unused-vars": "off",
        "no-unused-expressions": "warn",
        "no-useless-call": "error",
        "no-useless-computed-key": "error",
        "no-useless-concat": "error",
        "no-useless-constructor": "warn",
        "no-useless-rename": "error",
        "no-useless-return": "warn",
        "no-var": "error",
        "no-void": "error",
        "object-shorthand": ["error", "consistent-as-needed"],
        "one-var-declaration-per-line": ["error", "initializations"],
        "operator-assignment": ["error", "always"],
        "prefer-const": "error",
        "prefer-exponentiation-operator": "warn",
        "prefer-promise-reject-errors": "error",
        "prefer-rest-params": "warn",
        "prefer-spread": "error",
        "prefer-template": "error",
        "sort-imports": [
            "error",
            {
                allowSeparatedGroups: true,
                ignoreCase: true,
                ignoreMemberSort: true,
            },
        ],
        // "sort-keys": [
        //   "error",
        //   "asc",
        //   { natural: true },
        // ],
        "spaced-comment": [
            "error",
            "always",
            {
                line: {
                    markers: ["/"],
                    exceptions: [
                        "-",
                        "+",
                        "*",
                    ],
                },
                block: {
                    markers: ["!"],
                    exceptions: [
                        "-",
                        "=",
                        "*",
                    ],
                    balanced: true,
                },
            },
        ],
        "yoda": ["error", "never", { exceptRange: true } ],

        //* Layout & Formatting
        "array-bracket-newline": [
            "error",
            {
                multiline: true,
                minItems: 4,
            },
        ],
        "array-bracket-spacing": [
            "error",
            "never",
            {
                objectsInArrays: true,
                arraysInArrays: true,
            },
        ],
        "array-element-newline": [
            "error",
            {
                ArrayExpression: "consistent",
                ArrayPattern: "never",
            },
        ],
        "arrow-parens": "error",
        "arrow-spacing": "error",
        "block-spacing": "error",
        "brace-style": [
            "error",
            "stroustrup",
        ],
        "comma-dangle": [
            "error",
            "always-multiline",
        ],
        "comma-spacing": "error",
        "comma-style": [
            "error",
            "last",
        ],
        "computed-property-spacing": [
            "error",
            "never",
        ],
        "dot-location": [
            "error",
            "property",
        ],
        "eol-last": "error",
        "func-call-spacing": "error",
        "function-call-argument-newline": [
            "error",
            "consistent",
        ],
        "function-paren-newline": [
            "error",
            "consistent",
        ],
        "generator-star-spacing": "error",
        "implicit-arrow-linebreak": "error",
        "indent": ["error", INDENT, { ignoreComments: false } ],
        "jsx-quotes": "error",
        "key-spacing": "error",
        "keyword-spacing": "error",
        "lines-between-class-members": [
            "error",
            "always",
            { exceptAfterSingleLine: true },
        ],
        "max-len": [
            "error",
            {
                code: 140,
                tabWidth: INDENT_SIZE,
                ignoreComments: true,
                ignoreTrailingComments: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true,
                ignorePattern: "^import .*",
            },
        ],
        "max-statements-per-line": "error",
        // "multiline-ternary": [
        //     "error",
        //     "always-multiline",
        // ],
        "new-parens": "error",
        "newline-per-chained-call": [
            "error",
            { ignoreChainWithDepth: 4 },
        ],
        "no-extra-parens": "off",
        "no-multi-spaces": [
            "error",
            {
                ignoreEOLComments: true,
                exceptions: {
                    Property: true,
                    ImportDeclaration: true,
                    VariableDeclarator: true,
                },
            },
        ],
        "no-multiple-empty-lines": [
            "error",
            {
                max: 2,
                maxEOF: 1,
                maxBOF: 1,
            },
        ],
        "no-tabs": "off",
        "no-trailing-spaces": "error",
        "no-whitespace-before-property": "error",
        "object-curly-newline": [
            "error",
            {
                ObjectExpression: { multiline: true },
                ObjectPattern: { multiline: true },
                ImportDeclaration: "never",
                ExportDeclaration: {
                    multiline: true,
                    minProperties: 3,
                },
            },
        ],
        "operator-linebreak": [
            "error",
            "before",
        ],
        "padded-blocks": [
            "error",
            "never",
        ],
        "padding-line-between-statements": [
            "error",
            {
                blankLine: "always",
                prev: "import",
                next: "*",
            },
            {
                blankLine: "any",
                prev: "import",
                next: "import",
            },
            {
                blankLine: "always",
                prev: "directive",
                next: "*",
            },
            {
                blankLine: "any",
                prev: "directive",
                next: "directive",
            },
            {
                blankLine: "always",
                prev: "export",
                next: "*",
            },
            {
                blankLine: "any",
                prev: "export",
                next: "export",
            },
        ],
        "quotes": [
            "error",
            "double",
            { allowTemplateLiterals: true },
        ],
        "quote-props": [
            "error",
            "consistent-as-needed",
        ],
        "rest-spread-spacing": ["error"],
        "semi": [
            "error",
            "always",
        ],
        "semi-spacing": "error",
        "semi-style": [
            "error",
            "last",
        ],
        "space-before-blocks": "error",
        "space-before-function-paren": [
            "error",
            {
                anonymous: "never",
                named: "never",
                asyncArrow: "always",
            },
        ],
        "space-in-parens": "error",
        "space-infix-ops": [
            "error",
            { int32Hint: true },
        ],
        "space-unary-ops": "error",
        "switch-colon-spacing": "error",
        "template-curly-spacing": "error",
        "template-tag-spacing": "error",
        "unicode-bom": "error",
        "wrap-iife": [
            "error",
            "inside",
        ],
        "wrap-regex": "error",
        "yield-star-spacing": "error",
    },
};
