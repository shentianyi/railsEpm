#encoding: utf-8
class TenantObserver<ActiveRecord::Observer
  observe :tenant
  def before_create tenant
    # create default kpi category
    tenant.kpi_categories<<KpiCategory.new
    # create default entity
    # set super user's entity be default entity
    entity=Entity.new(:name=>tenant.company)
    tenant.super_user.entity=entity
    tenant.super_user.role_id=400
    tenant.entities<<entity
  #
  end
end
