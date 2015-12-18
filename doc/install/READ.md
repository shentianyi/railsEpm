1. elastic search 作为默认搜索
1.1. 安装：https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-repositories.html
1.2. 初始化数据：
bundle exec rake environment elasticsearch:import:model CLASS='User' FORCE=y
bundle exec rake environment elasticsearch:import:model CLASS='Department' FORCE=y
bundle exec rake environment elasticsearch:import:model CLASS='Kpi' FORCE=y


2. god 作为sidekiq的监控
2.1 安装 gem install god
