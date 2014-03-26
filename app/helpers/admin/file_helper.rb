#encoding: utf-8
require 'csv'
require 'iconv' unless String.method_defined?(:encoding)
require 'zip'
class CSV
  class Row
    def strip
      self.each do |value|
        value[1].strip! if value[1]
      end
    end
  end
end

module Admin::FileHelper
  def updata
    msg=Message.new(:content => '')
    #begin
      files=params[:files]
      if files.count==1
        file=files[0]
        uuid_name=SecureRandom.uuid
        csv=FileData.new(:data => file, :oriName => file.original_filename, :path => $UPDATAPATH, :uuidName => uuid_name)
        csv.saveFile
        pathName=csv.pathName
        hfile=File.join($UPDATAPATH, pathName)
        path=File.join($UPDATAPATH,uuid_name)
        puts path
        if FileData.get_type(csv.pathName)=='zip'
          Zip::File.open(hfile) do |zip|
            zip.each do |f|
              _path=File.join($UPDATAPATH, f.name)
              FileUtils.mkdir_p(File.dirname(_path))
              zip.extract(f, _path) { true }
            end
          end
          hfile= Dir["#{path}/*.csv"].first
        end
        row_line=0
        puts '-----------------'
        puts hfile
        encoding=SystemHelper.csv_read_encode(request.user_agent)
        CSV.foreach(hfile, :headers => true, :col_sep => $CSVSP, :encoding => encoding) do |row|
          row.strip
          row_line+=1
          m=model
          uniquery=nil
          if m.respond_to?(:csv_headers)
            rheader=m.csv_headers-row.headers
            raise(ArgumentError, "#{rheader}为必需包含列！") unless rheader.empty?
          end
          data={}
          query=nil
          if block_given?
            if m.respond_to?(:uniq_attr)
              query={}
            end
            yield(data, query, row, row_line,path)
          end
          data.delete($UPMARKER)
          if query
            if item=m.where(query).first
              item.update_attributes(data) if row[$UPMARKER].to_i==1
            else
              m.create(data)
            end
          else
            m.create(data)
          end
        end
        msg.result=true
        msg.content="新建/更新成功！"
      else
        msg.content='未选择文件或只能上传一个文件'
      end
    #rescue Exception => e
    #  puts e.message.to_json
    #  msg.content=e.message
    #end
    render :json => msg
  end

  def download query=nil, mm=nil
    file_name=@model+".csv"
    path=File.join($DOWNLOADPATH, file_name)
    File.open(path, 'wb') do |f|
      m=mm.nil? ? model : mm
      f.puts m.csv_headers.join($CSVSP)
      items=query.nil? ? m.all : m.where(query)
      items.each do |item|
        line=[]
        proc=BlockHelper.send "get_#{@model}_down_block"
        proc.call(line, item)
        f.puts line.join($CSVSP)
      end
    end
    send_file path, :type => 'application/csv', :filename => file_name
  end

  def template
    file_name="#{@model}_csv_upload_template.csv"
    path=File.join($TEMPLATEPATH, file_name)
    send_file path, :type => 'application/csv', :filename => file_name
  end
end