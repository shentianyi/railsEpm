#encoding: utf-8
module ApplicationHelper

  protected
  def get_ability_category
    @categories=KpiCategory.ability_all(current_ability)
  end

  def get_ability_category_by_id
    @category=KpiCategory.accessible_by(current_ability).find_by_id(params[:id])
  end

  def get_kpis_by_category id=nil
    @kpis=id.nil? ? [] : Kpi.accessible_by(current_ability).joins(:kpi_category).where(:kpi_category_id => id).select("kpis.*,kpi_categories.name as 'category_name'").uniq.all
  end

  def get_user_entity_groups
    #@entity_groups=current_user.entity_groups
    @entity_groups=EntityGroup.accessible_by(current_ability).uniq
  end

  def get_ability_entity
    @entity=Entity.ability_find_by_id(params[:id], current_ability)
  end

  def need_guide
    return current_user.has_guide_item(self.controller_name, self.action_name)
  end

  def current_controller_name
    return self.controller_name
  end

  def current_action_name
    return self.action_name
  end

  def init_message
    @msg=Msg.new
  end


  def method_missing(method_name, *args, &block)
    if [:require_user_as_admin, :require_user_as_director].include?(method_name)
      unless current_user.send(method_name.to_s.split('_').last+'?')
        error_page_403
      end
    else
      super
    end
  end

  def error_page_403
    respond_to do |format|
      format.html { render :file => File.join(Rails.root, 'public/403.html'), :status => 403, :layout => false }
      format.json { render json: {access: false, errorCode: -4000}, status: 403 }
    end
  end

  def error_page_404
    respond_to do |format|
      format.html { render :file => File.join(Rails.root, 'public/404.html'), :status => 404, :layout => false }
      format.json { render json: {access: false}, status: 404 }
    end
  end
end
