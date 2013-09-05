#encoding: utf-8
module UserKpiItemsHelper
  # batch update user kpi item target
  def self.batch_update_target items
    UserKpiItem.transaction do
      items.each do |item|
        if kpi_item=UserKpiItem.find_by_id(item[:id])
          kpi_item.update_attributes(:target=>item[:target])
        end
      end
    end
  end
end
