set :css_dir, 'inbrowser/common/sass'

set :relative_link, true

activate :relative_assets

configure :build do
  ignore 'inbrowser/common/sass/style'
  activate :minify_css
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
