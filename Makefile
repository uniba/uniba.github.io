
deploy: clean build
	bundle exec rake deploy

server: bundle
	( cd ./source/inbrowser && bundle exec compass watch ) &
	open http://0.0.0.0:4567
	bundle exec middleman server

build: bundle
	cd ./source/inbrowser && bundle exec compass compile --time
	bundle exec middleman build --verbose

clean:
	rm -frv publish

bundle:
	ARCHFLAGS=-Wno-error=unused-command-line-argument-hard-error-in-future bundle install --path vendor/bundle

.PHONY: build
