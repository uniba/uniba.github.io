
require 'slack-notifier'

@notifier = Slack::Notifier.new 'https://hooks.slack.com/services/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',
  channel: '#general',
  username: 'UNIBA.JP 更新するマン',
  icon_url: 'https://cldup.com/9d8HemtVpA.png'

task :deploy do
  puts "Deploying to uniba.jp"
  @notifier.ping(Slack::Notifier::LinkFormatter.format(":up: UNIBA.JP 更新中..."))
  system 'bundle exec middleman deploy'
  url = 'http://uniba.jp/'
  @notifier.ping(Slack::Notifier::LinkFormatter.format(":tani_hello: UNIBA.JP 更新完了 CHECK IT OUT [#{url}](#{url}) :tada::tada::tada:"))
end
