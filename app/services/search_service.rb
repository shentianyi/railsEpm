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
    UserPresenter.as_brief_infos(User.search("*#{q}*").records.where(tenant_id: user.tenant.id), false)
  end

  def self.full_text_department q, user
    DepartmentPresenter.as_brief_infos(Department.search("*#{q}*").records.where(tenant_id: user.tenant.id))
  end


  def self.full_text_kpi q, user
    # DepartmentPresenter.as_brief_infos(Kpi.search("*#{q}*").records.where(tenant_id: user.tenant.id))
    []
  end

  def self.full_text_followed_kpi q,user
    []
  end
end