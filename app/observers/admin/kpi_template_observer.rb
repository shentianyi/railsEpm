#encoding: utf-8
class Admin::KpiTemplateObserver<ActiveRecord::Observer
  def before_create kpi
    if kpi.is_calculated
      formula=kpi.formula_string.dup
      KpisHelper.parse_formula_string_items(kpi.formula_string).each do |item|
        if sub_kpi=Admin::KpiTemplate.where(:admin_kpi_category_template_id=>kpi.admin_kpi_category_template_id,:name=>item).first
          formula.gsub!("#{item}",sub_kpi.id.to_s)
        else
        return false
        end
      end
      kpi.formula=formula
    else
      kpi.formula=kpi.formula_string=nil
    end
  end

  def after_create kpi
    # incr kpi category count
    kpi.admin_kpi_category_template.update_attributes(:kpi_quantity=>kpi.admin_kpi_category_template.kpi_quantity+1)
  end

  def before_update kpi
    if kpi.admin_kpi_category_template_id_changed?
      incr_category_count(kpi.admin_kpi_category_template_id_was,-1)
    end
  end

  def after_update kpi
    if kpi.admin_kpi_category_template_id_changed?
      incr_category_count(kpi.admin_kpi_category_template_id,1)
    end
  end

  def after_destroy kpi
    incr_category_count(kpi.admin_kpi_category_template_id,-1)
  end

  private

  def incr_category_count category_id,incr
    if category=Admin::KpiCategoryTemplate.find_by_id(category_id)
      category.update_attributes(:kpi_quantity=>category.kpi_quantity+incr)
    end
  end
end
