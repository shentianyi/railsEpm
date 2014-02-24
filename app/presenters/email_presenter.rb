#encoding: utf-8
class EmailPresenter<Presenter
  Delegators=[:id, :sender, :content, :title, :receivers]
  def_delegators :@email, *Delegators

  def initialize(email)
    @email=email
    self.delegators =Delegators
  end

  def to_detail_json
    json=self.to_json
    json[:attchments]=[]
    @email.attachments.each do |att|
      json[:attchments]<<{name: att.name, path: att.path}
    end
  end
end