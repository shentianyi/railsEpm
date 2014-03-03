#encoding: utf-8
class KpiObserver<ActiveRecord::Observer
  observe :kpi
  def before_create kpi
    # add kpi items
    if kpi.is_calculated
      KpisHelper.parse_formula_items(kpi.formula).each do |item|
        if Kpi.where(:id=>item,:tenant_id=>kpi.tenant_id).first
          kpi.kpi_items<<KpiItem.new(:item_id=>item) 
        else
          return false
        end
      end
    else
      kpi.formula=kpi.formula_string=nil
    end
  end

  def after_create kpi
    # incr kpi category count
    kpi.kpi_category.increment!(:kpi_quantity)
    # default assgin kpi to creator
    UserKpiItem.new(:user_id=>kpi.creator.id,:target_max=>kpi.target_max,:target_min=>kpi.target_min,:entity_id=>kpi.creator.entity_id,:kpi_id=>kpi.id).save if kpi.creator.entity
    # init the calculate type kpi
    Resque.enqueue(KpiEntryCalTypeInitor,kpi.id) if kpi.is_calculated
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
