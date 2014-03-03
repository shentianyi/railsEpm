#encoding: utf-8
module KpisHelper
  # get kpi formula items
  def self.parse_formula_items formula
    formula.scan(/\[\d+\]/).map { |item| /\d+/.match(item).to_s }
  end

  def self.parse_formula_string_items formula
    formula.scan(/\[(.*?)\]/).map { |item| item[0] }
  end

  # assign kpi to user by id
  def self.assign_kpi_to_user_by_id kpi_id, user
    if kpi=Kpi.find_by_id(kpi_id)
      return assign_kpi_to_user(kpi, user), kpi
    end
    return nil
  end

  # assign kpis to user by category

  def self.assign_kpi_to_user_by_category category_id, user_id, current_ability
    if category=KpiCategory.accessible_by(current_ability).find_by_id(category_id) and user=User.find_by_id(user_id)
      UserKpiItem.transaction do
        assigned=[]
        category.kpis.each do |kpi|
          assigned<<kpi if assign_kpi_to_user(kpi, user)
        end
        return assigned.length>0 ? assigned : nil
      end
    end
    return nil
  end

  # assign kpis to user
  def self.assign_kpi_to_user kpi, user
    unless user.kpis.find_by_id(kpi.id)
      item = UserKpiItem.new(:user_id => user.id, :kpi_id => kpi.id, :entity_id => user.entity_id, :target_max => kpi.target_max, :target_min => kpi.target_min)
      item.save
      return item
    end
    return nil
  end

  # get user kpis by user id
  def self.get_kpis_by_user_id user_id, current_ability
    if user=User.accessible_by(current_ability).find_by_id(user_id)
      return get_kpis_by_user(user)
    end
    return []
  end

  # get user kpis by user
  def self.get_kpis_by_user user
    user.kpis.joins(:kpi_category).select(user_kpi_base_query_field)
  end

  # get user kpis by user and frequency
  def self.get_kpis_by_user_and_frequency user, frequency
    user.kpis.joins(:kpi_category).where('kpis.frequency=? and kpis.is_calculated=?', frequency, false).select(user_kpi_base_query_field)
  end

  # get user unassigned kpi
  def self.get_user_unassigned_kpis user_id, current_ability
    if  user=User.accessible_by(current_ability).find_by_id(user_id)
      return user.tenant.kpis.joins('left join user_kpi_items item on item.kpi_id=kpis.id').where('item.kpi_id is null').all
    end
    return nil
  end

  # get user unassign kpi categories
  ### this method is not completed
  def self.get_user_unassigned_kpi_categories user_id, current_ability
    if   user=User.accessible_by(current_ability).find_by_id(user_id)
      return user.tenant.kpi_categories
    end
    return nil
  end

  private

  def self.user_kpi_base_query_field
    "kpis.*,user_kpi_items.target_max as 'user_kpi_item_target_max',user_kpi_items.target_min as 'user_kpi_item_target_min',user_kpi_items.id as 'user_kpi_item_id',kpi_categories.name as 'category_name'"
  end
end
