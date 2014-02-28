#encoding: utf-8
require 'aliyun/oss'

class AliyunOssService
  KPI_ENTRY_BUCKET='epm-kpi-entry'
  ATTACH_BUCKET='epm-attach'
  AVATAR_BUCKET='epm-avatar'
  LINK_EXPIRES=Time.mktime(2555, 12, 12).to_i


  def self.store_kpi_entry_file name, path, del=true
    Aliyun::OSS::OSSObject.store(name, File.open(path), KPI_ENTRY_BUCKET)
    File.delete(path) if del && File.exists?(path)
    Aliyun::OSS::OSSObject.url_for(name, KPI_ENTRY_BUCKET, expires: LINK_EXPIRES)
  end

  def self.store_attachments name, data
    Aliyun::OSS::OSSObject.store(name, data, ATTACH_BUCKET)
    Aliyun::OSS::OSSObject.url_for(name, ATTACH_BUCKET, expires: LINK_EXPIRES)
  end

  def self.store_avatar name, path ,del=true
    Aliyun::OSS::OSSObject.store(name, File.open(path), AVATAR_BUCKET)
    File.delete(path) if del && File.exists?(path) if del
    Aliyun::OSS::OSSObject.url_for(name, AVATAR_BUCKET, expires: LINK_EXPIRES)
  end

  def self.delete_attachments name
    Aliyun::OSS::OSSObject.delete(name, ATTACH_BUCKET)
  end

end
