#encoding: utf-8
class TenantObserver<ActiveRecord::Observer

  observe :tenant
  def before_create tenant
    tenant.access_key=SecureRandom.uuid
    # create default kpi category
    tenant.kpi_categories<<KpiCategory.new
    # create default entity
    # set super user's entity be default entity
    entity=Entity.new(:name=>tenant.company_name.length==0 ? 'Default Entity' : tenant.company_name)
    tenant.super_user.entity = entity
    tenant.super_user.role_id=400
<<<<<<< HEAD
    #tenant.entities<<entity
    department=tenant.super_user.create_departs.build(:name=>tenant.company_name.length==0 ? 'Default Entity Group' : tenant.company_name)
    department.save
    department.entity_group.entities << entity
=======
    tenant.entities<<entity
    entity_group=tenant.super_user.entity_groups.build(:name=>tenant.company_name.length==0 ? 'Default Entity' : tenant.company_name)
    entity_group.entities<<entity
>>>>>>> e8cc1d6ecf8081ea2d645b846bbe024a15dd0822
  #
  end

end
