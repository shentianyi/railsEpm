#encoding: utf-8
class EnumPresenter<Presenter
  Delegators=[:key, :value, :desc]
  def_delegators :@enum,*Delegators

  def initialize(enum)
    @enum=enum
    self.delegators =Delegators
  end

  def to_json
    json={}
    self.delegators.each do |dele|
      json[dele]=self.send(dele)
    end
    json[:desc]=@enum.i18nt_desc
    return json
  end

end