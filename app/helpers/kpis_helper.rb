#encoding: utf-8
module KpisHelper
  # get kpi formula items
  def self.parse_formula_items formula
    formula.scan(/\[\d+\]/).map{|item| /\d+/.match(item).to_s}
  end

  # parse formula to calculate format
  # def self.parse_formula_to_calculate_fromat formula
    # formula.gsub(/\[/,"f[:'").gsub(/\]/,"']")
  # end
 
  # assign kpi to user by id
  def self.assign_kpi_to_user_by_id kpi_id,user_id
    if kpi=Kpi.find_by_id(kpi_id) and user=User.find_by_id(user_id)
      return assign_kpi_to_user kpi,user
    end
    return false
  end

  # assign kpis to user by category
  def self.assign_kpi_to_user_by_category category_id,user_id
    if category=KpiCategory.find_by_id(category_id) and user=User.find_by_id(user_id)
      UserKpiItem.transaction do
        category.kpis.each do |kpi|
          assign_kpi_to_user kpi,user
        end
        return true
      end
    end
    return false
  end

  # assign kpis to user
  def self.assign_kpi_to_user kpi,user
    unless user.kpis.find_by_id(kpi.id)
      UserKpiItem.new(:user_id=>user.id,:kpi_id=>kpi.id,:entity_id=>user.entity_id,:target=>kpi.target).save
    return true
    end
    return false
  end

  # get user kpis by user id
  def self.get_kpis_by_user_id user_id
    if user.User.find_by_id(user_id)
      return get_kpis_by_user(user)
    end
  end

  # get user kpis by user
  def self.get_kpis_by_user user
    user.kpis.select("*,user_kpi_items.target as 'user_kpi_item_target',user_kpi_items.id as 'user_kpi_item_id'")
  end

  # get user unassigned kpi
  def self.get_user_unassigned_kpis user_id
    if user=User.find_by_id(user_id)
      return  user.tenant.kpis.joins('left join user_kpi_items item on item.kpi_id=kpis.id').where('item.kpi_id is null').all
    end
    return nil
  end

  # get user unassign kpi categories
  ### this method is not completed
  def self.get_user_unassigned_kpi_categories user_id
    if user=User.find_by_id(user_id)
    return user.tenant.kpi_categories
    end
    return nil
  end
   
  def self.get_calculated_kpis_by_base_kpi_id kpi_id
    kpis= Kpi.joins(:kpi_items).where('kpi_items.item_id=?',kpi_id).all
    kpis.count>0 ? kpis : nil
  end

end
