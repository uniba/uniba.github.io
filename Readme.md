[![Circle CI](https://circleci.com/gh/uniba/uniba.github.io.svg?style=shield&circle-token=4515192076141eb0b74d483c82f6cd2707181bb2)](https://circleci.com/gh/uniba/uniba.github.io)

# uniba.jp

Corporate site of Uniba Inc.

## Installation

Clone repository and solve dependencies.

    $ git clone git@github.com:uniba/uniba.github.io.git
    $ cd uniba.github.io
    $ bundle install --path vendor/bundle

### 作業ブランチについて

- デフォルトブランチは **middleman**  
  ※何かを編集する際は必ずこのブランチで！
- **master** ブランチは公開用

### 編集ファイルについて

何かを編集する際は、'/source/'のなかをいじるが、
'/source/' 直下は uniba.jp トップであり、基本的にはいじらない。

uniba.jp の主なコンテンツは http://uniba.jp/inbrowser/ なので、
実質、 '/source/inbrowser/' 内のファイルを編集する。
スタイリングは '/source/inbrowser/common/sass' 内の.scss ファイルを編集。

Sass -> CSS (css をアップデートするときは)

    $ cd source/inbrowser
    $ bundle exec compass compile

## To make preview server.

# Requirement

Docker を利用しています。インストールを事前にお願いします
https://www.docker.com/products/docker-desktop

# setup

root directory で以下を実行します

```
docker-compose build
```

これで環境が調います。

このコマンドを実行するごとに新規のイメージが立ち上がります。

容量を圧迫する可能性があるので注意してください。

**新しい gem ファイルを追加した場合などはこれを実行して直してください**

# preview 環境の立ち上げ

root directory で以下を実行します

```
docker-compose up
```

以上で localhost:4567 にアクセスすると preview が可能です

# css の更新

また この 環境では css を 都度ビルドが必要です。

立ち上げたばかりの場合や、 `/source/inbrowser` 以下のの sass の編集を行った場合には以下のコマンドを root directory で実行してください

```
docker-compose run middleman_web bundle exec compass compile ./source/inbrowser --config="./source/inbrowser/config-for-style"
```

以上で 環境は調います

# TODO

- 自動ビルド環境の構築
- コマンドの簡略化など
- Readme.md の充実など

## Deployment

CircleCI がいい感じに反映してくれます。

## Notice

- middleman ブランチで作業し、middleman ブランチに push すること。
