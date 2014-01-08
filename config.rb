###
# Compass
###

### chnage path if develop this changes...
page "/movies/*", :layout => :movie

### ignore tmp files...
ignore "/temp"
# Change Compass configuration
compass_config do |config|
  config.output_style = :expanded
end

data.works.each do |project|
  proxy "/works/#{project.page_name}/index.html", "/works/template.html", :locals => { :project => project }, :ignore => true
end

data.channelCategory.each do |category|
  proxy "/movies/#{category.page_name}.html", "/movies/template.html", :locals => { :channelData => category }, :ignore => true
end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
# activate :livereload

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

set :haml, { :attr_wrapper => "\"" }
set :relative_link, true

activate :relative_assets

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

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

activate :deploy do |deploy|
  deploy.method = :git
  deploy.branch = 'master'
end
