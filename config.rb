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



# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# proxy(
#   '/this-page-has-no-template.html',
#   '/template-file.html',
#   locals: {
#     which_fake_page: 'Rendering a fake page with a local variable'
#   },
# )

# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

# helpers do
#   def some_helper
#     'Helping'
#   end
# end

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

# configure :build do
#   activate :minify_css
#   activate :minify_javascript
# end

# activate :external_pipeline,
#   name: :webpack,
#   command: build? ?
#     "./node_modules/webpack/bin/webpack.js --bail -p" :
#     "./node_modules/webpack/bin/webpack.js --watch --color --mode development",
#   source: ".tmp/dist",
#   latency: 1

# # Dev environment
# configure :development do
#   config[:js_dir] = ".tmp/dist"
# end
