if Rails.env.local?
  CarrierWave.configure do |config|
    config.storage = :file

    config.ignore_integrity_errors = false
    config.ignore_processing_errors = false
    config.ignore_download_errors = false
  end
else
  CarrierWave.configure do |config|
    config.ignore_integrity_errors = false
    config.ignore_processing_errors = false
    config.ignore_download_errors = false

    # config.storage = :aliyun
    # config.aliyun_access_id = Settings.oss.aliyun_access_id
    # config.aliyun_access_key = Settings.oss.aliyun_access_key
    # # 你需要在 Aliyum OSS 上面提前创建一个 Bucket
    # config.aliyun_bucket = Settings.oss.aliyun_bucket
    # # 是否使用内部连接，true - 使用 Aliyun 局域网的方式访问  false - 外部网络访问
    # config.aliyun_internal = Settings.oss.aliyun_internal
    # # 配置存储的地区数据中心，默认: cn-hangzhou
    # config.aliyun_area =Settings.oss.aliyun_area
    # # 使用自定义域名，设定此项，carrierwave 返回的 URL 将会用自定义域名
    # # 自定于域名请 CNAME 到 you_bucket_name.oss.aliyuncs.com (you_bucket_name 是你的 bucket 的名称)
    # # config.aliyun_host       = "http://foo.bar.com"
    # # 如果有需要，你可以自己定义上传 host, 比如阿里内部的上传地址和 Aliyun OSS 对外的不同，可以在这里定义，没有需要可以不用配置
    # config.aliyun_upload_host = Settings.oss.aliyun_upload_host #"http://you_bucket_name.oss.aliyun-inc.com"
  end
end
