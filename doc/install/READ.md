1. elastic search 作为默认搜索
1.1. 安装：https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-repositories.html
1.2. 初始化数据：
bundle exec rake environment elasticsearch:import:model CLASS='User' FORCE=y
bundle exec rake environment elasticsearch:import:model CLASS='Department' FORCE=y
bundle exec rake environment elasticsearch:import:model CLASS='Kpi' FORCE=y

1.3 安装中文搜索插件(Ubuntu)
1.3.1 将ik/ik.config.tar.gz 解压到es的安装目录的配置文件夹中，如/usr/share/elasticsearch/config/
1.3.2 将ik/ik.plugins.tar.gz 解压到es的安装目录的插件文件夹中，如/usr/share/elasticsearch/plugins/
1.3.3 将ik/ik.etc.config.tar.gz 解压到es的运行目录的文件夹中，如/etc/elasticsearch/
1.3.4 重启es
1.3.5 重新初始化数据


2. god 作为sidekiq的监控
2.1 安装 gem install god
