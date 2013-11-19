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
    # id=params[:id].nil? ? @categories[0].id : params[:id].to_i unless id
    @kpis=id.nil? ? []:Kpi.accessible_by(current_ability).joins(:kpi_category).where(:kpi_category_id=>id).select("kpis.*,kpi_categories.name as 'category_name'").all
  end

  def get_user_entity_groups
    @entity_groups=current_user.ability_entity_groups(current_ability)
  end

  def get_ability_entity
    @entity=Entity.ability_find_by_id(params[:id],current_ability)
  end

  def need_guide
     return current_user.has_guide_item(self.controller_name,self.action_name)
  end
end
