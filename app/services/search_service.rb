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
      UserPresenter.as_brief_infos(User.where(tenant_id: user.tenant.id).order('nick_name asc').limit(20), false)
    else
      UserPresenter.as_brief_infos(User.search(
                                       {
                                           query: {
                                               query_string: {
                                                   query: "*#{q}*",
                                                   fields: [:nick_name, :email]
                                               }
                                           },
                                           size: 20,
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
      DepartmentPresenter.as_brief_infos(Department.all_departments(user).order('name asc').limit(20), true)
    else
      DepartmentPresenter.as_brief_infos(Department.search(
                                             {
                                                 query: {
                                                     query_string: {
                                                         query: "*#{q}*",
                                                         fields: [:name, :description]
                                                     }
                                                 },
                                                 size: 20,
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
      KpiPresenter.as_on_users(Kpi.accesses_by_user(user).order('name asc').limit(20), user, false)
    else
      KpiPresenter.as_on_users(full_text_kpi(q,user, Kpi.accesses_by_user(user).pluck(:id)), user, false)
    end
  end

  def self.full_text_followed_kpi q, user
    if q.blank?
      KpiSubscribePresenter.as_followed_details(KpiSubscribe.followed_details_by_user(user).limit(20), user)
      # KpiPresenter.as_on_users(Kpi.followed_by_user(user).order('name asc').limit(20), user, false)
    else
      p full_text_kpi(q,user,nil)

      KpiSubscribePresenter.as_followed_details(
          user.kpi_subscribes.where(kpi_id: full_text_kpi(q,user,nil).pluck(:id)).limit(20), user
      )
      #KpiPresenter.as_on_users(full_text_kpi(q, Kpi.followed_by_user(user).pluck(:id)), user, false)
    end
  end


  def self.full_text_kpi q,user, ids=nil
    if ids.nil?
      Kpi.search(
          {
              query: {
                  query_string: {
                      query: "*#{q}*",
                      fields: [:name, :description]
                  }
              },
              size: 20,
              filter: {
                  term: {tenant_id: user.tenant_id}
              },
              sort: {
                  name:{order: :asc}
              }
          }
      ).records
    else
      Kpi.search(
          {
              query: {
                  query_string: {
                      query: "*#{q}*",
                      fields: [:name, :description]
                  }
              },
              size: 20,
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
end