# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

# activate :autoprefixer do |prefix|
#   prefix.browsers = "last 2 versions"
# end

# Change Compass configuration
# activate :compass
compass_config do |config|
  config.output_style = :expanded
end

ignore 'inbrowser/common/sass/screen.scss'
ignore 'inbrowser/common/sass/style.scss'

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false


activate :livereload, host: '0.0.0.0', port: '1234'


set :haml, { :attr_wrapper => "\"" }
set :relative_link, true

activate :relative_assets

page "/inbrowser/**", 
  :css_dir => "inbrowser/common/css", 
  :sass_dir => "inbrowser/common/sass", 
  :images_dir => "inbrowser/common/img", 
  :javascripts_dir => "inbrowser/common/js", 
  :fonts_dir => "inbrowser/common/fonts"


preferred_syntax = :scss

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minifyするとエラーする
  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end

after_configuration do
  sprockets.append_path "#{root}/bower_components/"
end

activate :s3_sync do |s3_sync|
  s3_sync.bucket = 'uniba.jp'
  s3_sync.region = 'ap-northeast-1'
  s3_sync.delete = true
  s3_sync.prefer_gzip = true
  s3_sync.path_style = true
  s3_sync.reduced_redundancy_storage = false
  s3_sync.acl = 'public-read'
end

activate :cloudfront do |cf|
  cf.access_key_id = ENV.fetch('AWS_ACCESS_KEY_ID', '')
  cf.secret_access_key = ENV.fetch('AWS_SECRET_ACCESS_KEY', '')
  cf.distribution_id = 'EDVJRRM7U37CZ'
end
