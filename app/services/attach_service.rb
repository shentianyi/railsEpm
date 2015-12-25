#encoding: utf-8
class AttachService
  def self.generate_attachment tmppath
    #read from tmppath and generate to stream
    File.read(tmppath)
  end


  def self.test(params)
    puts params[:name]
    puts params[:image]
    image=ActionDispatch::Http::UploadedFile.new(params[:image])

    puts '------------------------------------'
    p image

    i=Attach::Image.new(path: image)
    i.save
  end

  def self.tests(params)
    puts params[:name]
    puts params[:images]
    params[:images].values.each do |image|
      image=ActionDispatch::Http::UploadedFile.new(image)
      puts '------------------------------------'
      p image
      
      i=Attach::Image.new(path: image)
      i.save
    end
  end
end