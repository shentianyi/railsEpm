module Api
  class EntityGroupsController < ApiController

    def index
      get_user_entity_groups
      egs= @entity_groups.select('entity_groups.*').all
      #egs=EntityGroupPresenter.init_detail_json_presenters(egs)
      jegs=[]
      puts request.protocol

      puts request.protocol.class
      puts request.host_with_port
      egs.each do |eg|
        eg.code= eg.code||''
        eg.description= eg.description || ''
        a=JSON.parse(eg.to_json)
        #a[:contacts]=eg.contacts.select(User.contact_attrs).each { |c| c.image_url=request.protocol+request.host_with_port+'/files/avatar?f='+c.image_url }
        a[:contacts]=eg.contacts.select(User.contact_attrs).each { |c| c.image_url=request.protocol+request.host_with_port+c.image }
        jegs<< a
      end
      respond_to do |t|
        t.json { render :json => jegs }
        t.js { render :js => jsonp_str(jegs) }
      end
    end

    #def contacts
    #  contacts=EntityGroup.find_by_id(params[:id]).contacts.select(User.contact_attrs)
    #  puts request.host_with_port
    #  contacts.each { |c| c.image_url=request.host_with_port+'/files/avatar?f='+c.image_url }
    #  respond_to do |t|
    #    t.json { render :json => contacts }
    #    t.js { render :js => jsonp_str(contacts) }
    #  end
    #end

    def kpis
      kpis=Kpi.all #.by_entity_group params[:id]
      respond_to do |t|
        t.json { render :json => kpis }
        t.js { render :js => jsonp_str(kpis) }
      end
    end

    # def detail
    #  entity_group = EntityGroup.find(params[:id])
    # contacts = entity_group.contacts.select('users.id,users.first_name,tel,phone,email,title,image_url')
    # respond_to do |t|
    #  t.json { render :json => {contact: contacts, entityGroup: entity_group} }
    # t.js { render :js => jsonp_str({contact: contacts, entityGroup: entity_group}) }
    # end
    #end
    def detail
      unless entity_group=EntityGroup.find_by_code(params[:id])
        entity_group = EntityGroup.find_by_id(params[:id])
      end
      # contacts = entity_group.contacts.select('user.id,name,tel,phone,email,title,image_url')
      contacts = UserPresenter.init_json_presenters(entity_group.contacts, request.protocol, request.host_with_port)

      #render json:{contact: contacts, entityGroup: EntityGroupPresenter.new(entity_group).to_json}
      respond_to do |t|
        t.json { render :json => {contact: contacts, entityGroup: EntityGroupPresenter.new(entity_group).to_json} }
        t.js { render :js => jsonp_str({contact: contacts, entityGroup: EntityGroupPresenter.new(entity_group).to_json}) }
      end
    end
  end
end
