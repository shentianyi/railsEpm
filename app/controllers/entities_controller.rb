#encoding: utf-8
class EntitiesController < ApplicationController
  before_filter :require_user_as_admin, :only => :index
  before_filter :get_ability_entity, :only => [:update, :destroy]

  #index
  def index
    @entities = Entity.all
  end

  # create entity
  def create
    contacts=params[:entity].slice(:contacts)[:contacts].values if params[:entity].has_key?(:contacts)
    puts '-------------c----------------'.red
    puts params[:entity]
    @entity=Entity.new(params[:entity])
    contacts.each do |contact|
      @entity.entity_contacts<<contact
    end if contacts
    @msg=Message.new
    @msg.content=(@msg.result=@entity.save) ? @entity.id : @entity.errors.messages.values.join('; ')
    render :json => @msg
  end

  def update
    @msg=Message.new
    if @entity
      @msg.result = @entity.update_attributes(params[:entity])
      @msg.object =EntityPresenter.new(@entity).to_json
    else
      msg.content=I18n.t "fix.not_exists"
    end
    render json: @msg
  end

  def destroy
    msg=Message.new
    if @entity # and @entity.users.count==0
      msg.result=@entity.destroy
    else
      msg.content=I18n.t "fix.cannot_destroy"
    end
    render :json => msg
  end

end
