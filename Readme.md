
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
'/source/' 直下は uniba.jpトップであり、基本的にはいじらない。

uniba.jp の主なコンテンツは http://uniba.jp/inbrowser/ なので、
実質、 '/source/inbrowser/' 内のファイルを編集する。
スタイリングは '/source/inbrowser/common/sass' 内の.scss ファイルを編集。

Sass -> CSS (cssをアップデートするときは)

    $ cd source/inbrowser
    $ bundle exec compass compile

## To make preview server.

    make server

## Deployment

masterブランチへコピーする。http://uniba.jp から見えるようになる

    make deploy

## Notice

- middleman ブランチで作業し、middleman ブランチにpushすること。  
※ middleman ブランチに push せずに、make deploy してしまうと master と middleman ブランチに差分が出てしまうので要注意！
- make deploy は Makefile があるルートディレクトリに cd で移動してからやりましょう！

