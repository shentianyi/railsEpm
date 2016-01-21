#encoding: utf-8
class AttachService
  def self.generate_attachment tmppath
    #read from tmppath and generate to stream
    File.read(tmppath)
  end


  def self.test(params)
    puts params[:name]
    puts params[:image]
    puts '---------------------------------------------------------------------------------------'
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
collect
      i=Attach::Image.new(path: image)
      i.save
    end
  end

  def self.add_images attachments, base_url
    attachs=[]
    attachments.each do |attachment|
      attachs<<Attachment.add_image_attachment(attachment[:image])
    end

    AttachmentPresenter.as_basic_feedback(attachs, base_url, ['Images Add Success'], 1)
  end

  def self.add_image image, base_url
    AttachmentPresenter.as_basic_feedback(Attachment.add_image_attachment(image), base_url, ['Image Add Success'], 1)
  end

  def self.add_snapshot user, params, base_url
    AttachmentPresenter.as_basic_feedback(Attachment.add_snap_attachment(user, params), base_url, ['Snapshot Add Success'], 1)
  end

  def self.snap_details id
    if (attach=Attach::Snap.find_by_id(id)) && attach.snapshot
      SnapshotPresenter.new(attach.snapshot).as_basic_info(attach)
    else
      ApiMessage.new(messages: ['The Snapshot Not Found'])
    end
  end
end