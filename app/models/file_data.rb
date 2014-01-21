#encoding: utf-8
require 'base_class'

class  FileData<CZ::BaseClass
  attr_accessor :type,:oriName,:size,:path,:pathName,:data,:extention,:uuidName,:full_path
  def default
    {:uuidName=>SecureRandom.uuid}
  end

  def saveFile
    begin
      @extention=File.extname(@oriName).downcase
      @pathName=@uuidName+@extention if @pathName.nil?
      @full_path=File.join(@path,@pathName)
      File.open(@full_path,'wb') do |f|
        if @data.kind_of?(String)
        f.write(@data)
        else
        f.write(@data.read)
        end
      end
      return true
    rescue
    return false
    end
  end
end
