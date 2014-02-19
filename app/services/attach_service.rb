#encoding: utf-8
class AttachService
  def self.generate_attachment tmppath
    #read from tmppath and generate to stream
    File.read(tmppath)
  end
end