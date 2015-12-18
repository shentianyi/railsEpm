#encoding: utf-8
class TenantObserver<ActiveRecord::Observer

  observe :tenant

  def before_create tenant
    tenant.access_key=SecureRandom.uuid
    # create default kpi category
    tenant.kpi_categories<<KpiCategory.new
    # create default entity
    # set super user's entity be default entity
    entity=Entity.new(:name => tenant.company_name.blank? ? 'Default Entity' : tenant.company_name, is_default: true)
    tenant.super_user.entity = entity
    tenant.super_user.role_id=400
    tenant.entities<<entity

    department=Department.new(:name => tenant.company_name.blank? ? 'Default Department' : tenant.company_name)
    department.creator =tenant.super_user
    tenant.departments<<department

    #department.entity_group.entities << entity
    department.default_entity=entity
    ud=UserDepartment.new(is_manager:true)
    ud.user=tenant.super_user
    department.user_departments<<ud
  end


end
