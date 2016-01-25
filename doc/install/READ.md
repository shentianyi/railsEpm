1. elastic search 作为默认搜索
1.1. 安装：https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-repositories.html
1.2. 初始化数据：
bundle exec rake environment elasticsearch:import:model CLASS='User' FORCE=y
bundle exec rake environment elasticsearch:import:model CLASS='Department' FORCE=y
bundle exec rake environment elasticsearch:import:model CLASS='Kpi' FORCE=y

1.3 安装中文搜索插件(Ubuntu)(in use)(es version: 2.1.0)
1.3.1 将ik/ik.config.tar.gz 解压到es的安装目录的配置文件夹中(若无，则新建)，如/uselasticsearch/config/
1.3.2 将ik/ik.plugins.tar.gz 解压到es的安装目录的插件文件夹中，如/usr/share/elasticsearch/plugins/
1.3.3 将ik/ik.etc.config.tar.gz 解压到es的运行目录的文件夹中，如/etc/elasticsearch/
1.3.4 重启es
1.3.5 重新初始化数据

1.4 安装默认中文插件（no in use）
1.4.1 bin/plugin install elasticsearch/elasticsearch-analysis-smartcn/2.7.0


2. god 作为sidekiq的监控
2.1 安装 gem install god
2.2 启动: god -c config.god


3.  附件上传使用gem carrierwave & gem carrierwave-aliyun
3.1 ImageMagick 作图片处理
mac: brew install imagemagick
ubuntu: sudo apt-get install imagemagick

4. whenever 作为定时任务去生成
注意配置里的environment

4.1 KPI Entry 输入任务