# BabaCafe

秋田県三種町の BabaCafe アプリ

## ローカルの node でサーバ立ち上げ

```shell
$ yarn all-install
$ yarn all-dev
```

## docker-compose

### ローカル開発環境(M1,M2 の Mac, コンテナの node 環境使用)

```shell
$ docker-compose -f docker-compose.yml -f docker-compose.develop.yml -f docker-compose.mac_arm64.yml up -d
```

### ローカル開発環境(x86_64, コンテナの node 環境使用)

```shell
$ docker-compose -f docker-compose.yml -f docker-compose.develop.yml up -d --build
```

### ローカルテスト環境

まだだよ

### 本番環境

```shell
$ docker-compose up -d --build
```
