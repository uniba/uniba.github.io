
deploy: clean bower build
	bundle exec middleman deploy
	open http://uniba.jp

server: bundle bower
	open http://0.0.0.0:4567
	bundle exec middleman server

build: bundle bower
	bundle exec middleman build

clean:
	rm -frv publish

bower:
	bower install

bundle:
	bundle install --path vendor/bundle

.PHONY: build
