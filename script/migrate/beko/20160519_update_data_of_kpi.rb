ActiveRecord::Base.transaction do
  Kpi.first.update_attributes(code: 'CYCLE_TIME_KPI')
  user=User.find_by_email('admin@beko.com')
  tenant=Tenant.first
  category=KpiCategory.first

  moving_time_kpi=nil

  unless moving_time_kpi=Kpi.moving_time
    moving_time_kpi= Kpi.new(
        name: 'MovingTime',
        description: 'Moving Time',
        code: 'MOVING_TIME_KPI',
        frequency: KpiFrequency::Daily,
        target_max: 21,
        unit: 100,
        target_min: 5,
        is_calculated: 0,
        direction: 300
    )
    moving_time_kpi.kpi_category=category
    moving_time_kpi.creator=user
    moving_time_kpi.tenant=tenant
    moving_time_kpi.save
  end

  unless moving_time_kpi_pro=KpiPropertyItem.where(kpi_id: moving_time_kpi.id, kpi_property_id: KpiProperty.first.id).first
    moving_time_kpi_pro=KpiPropertyItem.new
    moving_time_kpi_pro.kpi=moving_time_kpi
    moving_time_kpi_pro.kpi_property=KpiProperty.first
    moving_time_kpi_pro.save
  end

  User.all.each do |u|
    if u.entity_id.present?
      unless moving_time_kpi.user_kpi_items.where(user_id: u.id, entity_id: u.entity_id).first
        moving_time_kpi.user_kpi_items.create(
            user_id: u.id,
            entity_id: u.entity_id,
            target_max: 21,
            target_min: 0
        )
      end
    end
  end



  scram_time_kpi=nil


  unless scram_time_kpi=Kpi.scram_time
    scram_time_kpi= Kpi.new(
        name: 'ScramTime',
        description: 'Scram Time',
        code: 'SCRAM_TIME_KPI',
        frequency: KpiFrequency::Daily,
        target_max: 21,
        unit: 100,
        target_min: 5,
        is_calculated: 0,
        direction: 300
    )
    scram_time_kpi.kpi_category=category
    scram_time_kpi.creator=user
    scram_time_kpi.tenant=tenant
    scram_time_kpi.save
  end

  unless scram_time_kpi_pro=KpiPropertyItem.where(kpi_id: scram_time_kpi.id, kpi_property_id: KpiProperty.first.id).first
    scram_time_kpi_pro=KpiPropertyItem.new
    scram_time_kpi_pro.kpi=scram_time_kpi
    scram_time_kpi_pro.kpi_property=KpiProperty.first
    scram_time_kpi_pro.save
  end

  User.all.each do |u|
    if u.entity_id.present?
      unless scram_time_kpi.user_kpi_items.where(user_id: u.id, entity_id: u.entity_id).first
        scram_time_kpi.user_kpi_items.create(
            user_id: u.id,
            entity_id: u.entity_id,
            target_max: 21,
            target_min: 0
        )
      end
    end
  end
end