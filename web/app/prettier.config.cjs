module.exports = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 120,
  plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
  pluginSearchDirs: ['.'],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
};
