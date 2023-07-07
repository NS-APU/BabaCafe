# Lint 利用ガイド

## 概要

本プロジェクトでは Linter(ESLint, StyleLint) と Formatter(Prettier) を用いて、コードスタイルを整えたり、バグの要因を事前に検出することで、コードの保守性や品質の向上を図っています。
本ガイドでは開発において Lint を適切で快適に利用するための環境構築方法について説明します。

## コマンドラインからの実行

server/app, web/app ディレクトリではコマンドラインから以下の操作ができる。

- ESLint で検査する

  ```
  yarn lint
  ```

- ESLint で指摘箇所を自動修正する

  ```
  yarn lint:fix
  ```

- コードフォーマットをする

  ```
  yarn format
  ```

## VS Code で Lint 環境を整備する

### VS Code 拡張機能

VS Code で Lint を適切で快適に利用するためには以下の拡張機能をインストールします。

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Prettier ESLint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)

### VS Code の設定

VS Code では _デフォルト_, _ユーザー設定_, _ワークスペース設定_ の順に設定の優先度が扱われ、プロジェクト固有の設定は _ワークスペース設定_ で設定します。
_ワークスペース設定_ はワークスペース直下の .vscode/settings.json というファイルに設定します。

.vscode/settings.json には、以下のような記載があることを確認し、不足があれば追記をしてください。

```
  "settings": {
    "editor.tabSize": 2,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "[svelte]": {
      "editor.defaultFormatter": "svelte.svelte-vscode"
    },
    "prettier.documentSelectors": ["**/*.svelte"],
    "eslint.workingDirectories": [{ "mode": "auto" }],
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
      "source.fixAll.stylelint": true
    },
    "stylelint.validate": ["css", "svelte"],
    "eslint.validate": ["javascript", "typescript", "svelte"],
    "css.validate": false
  }
```

## Git でコミットする際に自動で Lint が効くようにする

Git のコミットやプッシュといったアクションのタイミングで、コマンドを実行する仕組み（Git フック）として husky というライブラリを利用しています。

husky を利用して Git フック を有効化するには、ルートディレクトリで以下のコマンドを実行してください。

```
yarn prepare
```

ルートディレクトリ直下に .husky というディレクトリが作成されていれば、Git フックが効くようになります。
