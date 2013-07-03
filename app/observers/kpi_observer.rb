#encoding: utf-8
class KpiObserver<ActiveRecord::Observer
  observe :kpi
  def before_create kpi
    # add kpi items
    if kpi.is_calculated
      KpisHelper.get_formula_item(kpi.formula).each do |item|
        kpi.kpi_items<<KpiItem.new(:item_id=>item)
      end
    end
  end

  def after_create kpi
    # incr kpi category count
    kpi.kpi_category.update_attributes(:kpi_quantity=>kpi.kpi_category.kpi_quantity+1)
    # default assgin kpi to creator
    UserKpiItem.new(:user_id=>kpi.creator.id,:target=>kpi.target,:entity_id=>kpi.creator.entity_id,:kpi_id=>kpi.id).save
  end

  def before_update kpi
    if kpi.kpi_category_id_changed?
      incr_category_count(kpi.kpi_category_id_was,-1)
    end
  end

  def after_update kpi
    if kpi.kpi_category_id_changed?
      incr_category_count(kpi.kpi_category_id,1)
    end
  end

  def after_destroy kpi
    incr_category_count(kpi.kpi_category_id,-1)
  end

  private

  def incr_category_count category_id,incr
    if category=KpiCategory.find_by_id(category_id)
      category.update_attributes(:kpi_quantity=>category.kpi_quantity+incr)
    end
  end
end
