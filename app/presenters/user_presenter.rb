class UserPresenter<Presenter
  Delegators=[:id, :first_name, :last_name, :email, :role_id, :title, :tel, :phone, :is_tenant, :entity_id, :department_id, :role]
  def_delegators :@user, *Delegators

  def initialize(user, host=nil, port=nil)
    @user=user
    @host=host
    @port=port
    self.delegators =Delegators
  end

  def id
    @user.id
  end

  def name
    @user.first_name.nil? ? '' : @user.first_name
  end

  def email
    @user.email.nil? ? '' : @user.email
  end

  def tel
    @user.tel.nil? ? '' : @user.tel
  end

  def phone
    @user.phone.nil? ? '' : @user.phone
  end

  def image_url
    "#{@host}#{@port}#{@user.image}"
  end

  def to_json
    {
        id: self.id,
        name: self.name,
        email: self.email,
        tel: self.tel,
        phone: self.phone,
        image_url: self.image_url
    }
  end

  def self.init_json_presenters(users, host, port)
    jsons=[]
    users.each do |u|
      jsons<<UserPresenter.new(u,host,port).to_json
    end
    jsons
  end

end
