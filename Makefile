
deploy: clean bower build
	bundle exec middleman deploy

server: bower
	open http://0.0.0.0:4567
	bundle exec middleman server

build: bower
	bundle exec middleman build

clean:
	rm -frv publish

bower:
	bower install

.PHONY: build