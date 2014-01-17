#encoding: utf-8
require 'aliyun/oss'

class AliyunOssService
  KPI_ENTRY_BUCKET='epm-kpi-entry' 
  LINK_EXPIRES=Time.mktime(2555, 12, 12).to_i
 

  def self.store_kpi_entry_file name,path,del=true
    Aliyun::OSS::OSSObject.store(name,File.open(path),KPI_ENTRY_BUCKET)
    File.delete(path) if del && File.exists?(path)
    Aliyun::OSS::OSSObject.url_for(name,KPI_ENTRY_BUCKET ,expires:LINK_EXPIRES)
  end
end
