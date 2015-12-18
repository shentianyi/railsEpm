#encoding: utf-8

class SearchService
  def self.full_text_user q, user
    # UserPresenter.as_brief_infos(User.search({
    #                                              query: {
    #                                                  multi_match: {
    #                                                      query: "*#{q}*",
    #                                                      fields: [:nick_name, :email]
    #                                                  }
    #                                              }
    #                                          }).records.where(tenant_id: user.tenant.id), false
    # )


    if q.blank?
      UserPresenter.as_brief_infos(User.where(tenant_id: user.tenant.id).order('nick_name asc').limit(30), false)
    else
      UserPresenter.as_brief_infos(User.search(
                                       {
                                           query: {
                                               query_string: {
                                                   query: "*#{q}*",
                                                   fields: [:nick_name, :email]
                                               }
                                           },
                                           size: 30,
                                           filter: {
                                               term: {tenant_id: user.tenant_id}
                                           },
                                           sort: {
                                               nick_name: {order: :asc}
                                           }
                                       }
                                   ).records, false)
    end
  end

  def self.full_text_department q, user
    if q.blank?
      DepartmentPresenter.as_brief_infos(Department.all_departments(user).order('name asc').limit(30), true)
    else
      Department.search(
          {
              query: {
                  query_string: {
                      query: "*#{q}*",
                      fields: [:name, :description]
                  }
              },
              size: 30,
              filter: {
                  terms: {id: Department.all_departments(user).pluck(:id)}
              },
              sort: {
                  name: {order: :asc}
              }
          }
      ).records


      #DepartmentPresenter.as_brief_infos(Department.search("*#{q}*").records.where(tenant_id: user.tenant.id).limit(30), true)
    end
  end


  def self.full_text_access_kpi q, user
    ids= full_text_kpi(q, user).pluck(:id)
    KpiPresenter.as_on_users(Kpi.accesses_by_user(user).select { |k| ids.include?(k.id) }, user, false)
  end

  def self.full_text_followed_kpi q, user
    ids= full_text_kpi(q, user).pluck(:id)
    KpiPresenter.as_on_users(Kpi.joins(:kpi_subscribes).where(kpi_subscribes: {user_id: user.id}).select { |k| ids.include?(k.id) }, user, false)
  end


  def self.full_text_kpi q, user
    Kpi.search("*#{q}*").records.where(tenant_id: user.tenant.id)
  end
end