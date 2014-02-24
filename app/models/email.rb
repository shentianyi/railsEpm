#encoding: utf-8
class Email < ActiveRecord::Base
  attr_accessible :file_path, :receivers, :sender, :user_id, :content, :title
  has_many :attachments, :as => :attachable, :dependent => :destroy
  belongs_to :user
  attr_accessor :user_name

  def init_user_info user
    self.user= user
    self.user_name=user.first_name
    self.sender=user.email
  end

  #def initialize analysis,user
  #  self.user= user
  #  self.user_name=user.first_name
  #  self.sender=user.email
  #  super analysis
  #end

  def save_attachments attachments
    Attachment.add(attachments, self)
  end

  def send_mail
    MailerService.new(from_name: self.user_name,
                      from_mail: self.sender,
                      to: self.receivers.split(';'),
                      subject: self.title,
                      text: self.content.blank? ? 'From EPM' : self.content,
                      attachment: self.attachments.pluck(:pathname),
                      file_path:$AttachTmpPath).send
  end

  def generate_analysis_pdf_and_cache analysis
    if analysis
      if da=KpiEntryAnalyseHelper.analysis_data(analysis[:kpi_id], analysis[:entity_group_id],
                                                analysis[:start_time], analysis[:end_time],
                                                true, analysis[:frequency].to_i, false)
        data = da[0]
        table_data = da[1]
        @kpi_id = analysis[:kpi_id]
        @kpi_name = analysis[:kpi_name]
        @entity_group = analysis[:entity_group_id]
        @entity_group_name = analysis[:entity_group_name]
        @start_time = analysis[:start_time]
        @end_time = analysis[:end_time]
        @frequency = analysis[:frequency]
        @type = analysis[:type]
        @average=true
        datas = {:data => data.to_json, :kpi_id => @kpi_id, :kpi_name => @kpi_name, :entity_group_id => @entity_group, :entity_group_name => @entity_group_name,
                 :start_time => @start_time, :end_time => @end_time, :frequency => @frequency, :type => @type, :average => @average, :table_data => table_data.to_json}
        KpiEntryAnalyseCache.new(id: self.id, cacheable_type: self.class.name, query: analysis.to_json, chart_data: data, table_data: table_data).save
        return FileData.new(:data => PdfService.generate_analysis_pdf(datas), :oriName => "analysis.pdf", :path => $AttachTmpPath).saveFile
      end
    end
  end
end
