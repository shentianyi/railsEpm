#encoding: utf-8
class TenantObserver<ActiveRecord::Observer

  observe :tenant

  def before_create tenant
    tenant.access_key=SecureRandom.uuid
    # create default kpi category
    tenant.kpi_categories<<KpiCategory.new
    # create default entity
    # set super user's entity be default entity
    entity=Entity.new(:name => tenant.company_name.length==0 ? 'Default Entity' : tenant.company_name)
    tenant.super_user.entity = entity
    tenant.super_user.role_id=400
    tenant.entities<<entity

    department=Department.new(:name => tenant.company_name.length==0 ? 'Default Department' : tenant.company_name)
    department.creator =tenant.super_user
    tenant.departments<<department

    #department.entity_group.entities << entity
    department.default_entity=entity
  end


end
