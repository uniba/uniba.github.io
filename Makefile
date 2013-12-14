
deploy: clean bower build
	bundle exec middleman deploy

server: bower
	bundle exec middleman server

build: bower
	bundle exec middleman build

clean:
	rm -frv publish

bower:
	bower install

.PHONY: build