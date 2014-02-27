#encoding: utf-8
class EmailPresenter<Presenter
  Delegators=[:id, :sender, :content, :title, :receivers, :created_at, :kpi_id, :entity_group_id]
  def_delegators :@email, *Delegators
  attr_accessor :time_group

  def initialize(email)
    @email=email
    self.delegators =Delegators
    self.time_group = TimeGroup.new(self.created_at)
  end

  def to_detail_json
    json=self.to_json
    json[:attachments]=[]
    @email.attachments.where(type:'image').each do |att|
      json[:attachments]<<{name: att.name, path: att.path}
    end
    return json
  end


  def self.group_by_time emails
    groupd_emails={}
    emails.each do |email|
      if groupd_emails.has_key?(email.time_group.key)
        groupd_emails[email.time_group.key]<<email.to_detail_json
      else
        groupd_emails[email.time_group.key]=[email.to_detail_json]
      end
    end
    return groupd_emails
  end
end

class TimeGroup
  attr_accessor :key, :value, :text

  def initialize time
    self.value=time
    self.key=init_key
  end

  def init_key
    if (diff=Date.current.mjd-self.value.to_date.mjd)==0
      'Today'
    elsif diff==1
      'Yesterday'
    elsif diff<= Date.current.end_of_month.day
      'This Month'
    else
      self.value.strftime('%Y-%m')
    end
  end

end