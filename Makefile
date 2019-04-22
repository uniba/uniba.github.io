
deploy: clean build
	bundle exec rake deploy

server: bundle data
	open http://0.0.0.0:4567
	bundle exec middleman server

build: bundle
	bundle exec middleman build --verbose

clean:
	rm -frv publish

data:
	sh bin/download.sh
	bundle exec ruby bin/convert.rb

bundle:
	bundle install --path vendor/bundle

.PHONY: build data
