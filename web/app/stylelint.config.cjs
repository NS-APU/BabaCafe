module.exports = {
  plugions: [],
  extends: ['stylelint-config-recess-order', 'stylelint-config-standard', 'stylelint-config-prettier'],
  rules: {
    ['selector-class-pattern']: '^[a-z][a-zA-Z0-9-]+$',
    ['function-no-unknown']: [true, { ignoreFunctions: ['/\\${/'] }],
  },
  overrides: [
    {
      files: ['**/*.{js,ts,json,svelte,css}', '**/*.cjs', '**/.*.cjs'],
      customSyntax: '@stylelint/postcss-css-in-js',
      rules: {
        'at-rule-no-unknown': null,
      },
    },
    {
      files: ['**/*.{html,svelte}'],
      customSyntax: 'postcss-html',
    },
  ],
  ignoreFiles: ['dist/**', 'node_modules/**', '**/*.cjs', '**/.*.cjs'],
};
