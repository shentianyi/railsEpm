#encoding: utf-8
module Tool
class Cron
  
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