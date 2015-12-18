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
      DepartmentPresenter.as_brief_infos(Department.search(
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
                                         ).records, true)
    end
  end


  def self.full_text_access_kpi q, user
    if q.blank?
      KpiPresenter.as_on_users(Kpi.accesses_by_user(user).order('name asc').limit(3000), user, false).count
    else
      KpiPresenter.as_on_users(full_text_kpi(q, Kpi.accesses_by_user(user).pluck(:id)), user, false).count
    end
  end

  def self.full_text_followed_kpi q, user
    if q.blank?
      KpiPresenter.as_on_users(full_text_kpi(q, Kpi.joins(:kpi_subscribes).where(kpi_subscribes: {user_id: user.id}).pluck(:id)), user, false)
    else
      KpiPresenter.as_on_users(full_text_kpi(q, Kpi.joins(:kpi_subscribes).where(kpi_subscribes: {user_id: user.id}).pluck(:id)), user, false)
    end
  end


  def self.full_text_kpi q, ids
    Kpi.search(
        {
            query: {
                query_string: {
                    query: "*#{q}*",
                    fields: [:name, :description]
                }
            },
            size: 3000,
            filter: {
                terms: {id: ids}
            },
            sort: {
                name: {order: :asc}
            }
        }
    ).records
  end
end