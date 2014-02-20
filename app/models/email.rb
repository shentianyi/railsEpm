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

  def initialize params,user
    self.user= user
    self.user_name=user.first_name
    self.sender=user.email
    super params
  end

  def save_attachments attachments
      Attachment.add(attachments, self)
  end

  def self.send_mail
    MailerService.new(from_name: self.first_name,
                      from_mail: self.sender,
                      to: self.receivers.split(';'),
                      subject: self.title,
                      text: self.content,
                      attachment: self.attachments.pluck(:path)).send
  end

  def generate_analysis_pdf_and_cache analysis
    if analysis
      if da=KpiEntryAnalyseHelper.analysis_data(analysis[:kpi_id], analysis[:entity_group_id],
                                                analysis[:start_time], analysis[:end_time],
                                                true, analysis[:frequency].to_i, false)
        data = da[0]
        table_data = da[1]
        @kpi_id = params[:kpi_id]
        @kpi_name = params[:kpi_name]
        @entity_group = params[:entity_group_id]
        @entity_group_name = params[:entity_group_name]
        @start_time = params[:start_time]
        @end_time = params[:end_time]
        @frequency = params[:frequency]
        #@type = params[:type]
        @type='area'
        @average=true
        datas = {:data => data.to_json, :kpi_id => @kpi_id, :kpi_name => @kpi_name, :entity_group_id => @entity_group, :entity_group_name => @entity_group_name,
                 :start_time => @start_time, :end_time => @end_time, :frequency => @frequency, :type => @type, :average => @average, :table_data => table_data.to_json}
        KpiEntryAnalyseCache.new(id: self.id, cacheable_type: self.class.name, query: params.to_json, chart_data: data, table_data: table_data).save
        f = FileData.new(:data => PdfService.generate_analysis_pdf(datas), :oriName => "analysis.pdf", :path => $EMAILATTACHPATH)
        return f.path
      end
    end
  end
end
