
deploy: clean bower build
	bundle exec middleman deploy

build: bower
	bundle exec middleman build

clean:
	rm -frv publish

bower:
	bower install

.PHONY: build