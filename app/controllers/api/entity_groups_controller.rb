module Api
  class EntityGroupsController < ApiController

    def index
      get_user_entity_groups
      egs= @entity_groups.select('entity_groups.*').all
      egs=EntityGroupPresenter.init_detail_json_presenters(egs)
      respond_to do |t|
        t.json { render :json => egs }
        t.js { render :js => jsonp_str(egs) }
      end
    end

    def contacts
      contacts=EntityGroup.find_by_id(params[:id]).contacts.select('contacts.id,contacts.name,tel,phone,email,title,image_url')
      respond_to do |t|
        t.json { render :json => contacts }
        t.js { render :js => jsonp_str(contacts) }
      end
    end

    def kpis
      kpis=Kpi.by_entity_group params[:id]
      respond_to do |t|
        t.json { render :json => kpis }
        t.js { render :js => jsonp_str(kpis) }
      end
    end

    def detail
      entity_group = EntityGroup.find(params[:id])
      contacts = entity_group.contacts.select('contacts.id,contacts.name,tel,phone,email,title,image_url')
      respond_to do |t|
        t.json { render :json => {contact: contacts, entityGroup: entity_group} }
        t.js { render :js => jsonp_str({contact: contacts, entityGroup: entity_group}) }
      end
    end
  end
end
