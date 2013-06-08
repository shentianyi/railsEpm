#encoding: utf-8
module Tool
class Cron
  
  # [功能：] 更新 cron 定时器的设置。
  #（Caution：这里是在程序中更改 Linux 系统的 cron ，所以在服务器上需要已 nobody 用户的身份执行 crontab -l 才能看到。）
  def self.set_time( type, num )
    return false  if type!=:min
    return false  unless num.is_a?(Fixnum) and 60%num==0
    reg = / \d+\.minutes/
    rep = " #{num}.minutes"
    sFile = File.join(Rails.root,"/config/schedule.rb")
    
    hFile = File.open( sFile, "r" )
    lines = hFile.readlines
    lines.each do |li|
      li.sub!( reg, rep )  if reg === li
    end
    hFile = File.new( sFile, "w" )
    hFile.puts lines
    hFile.close
    system "cd #{Rails.root} && whenever --update-crontab epm  --set environment=development  1>>tmp/EPM_log  2>>tmp/EPM_errorlog"
    return true
  end

end
end