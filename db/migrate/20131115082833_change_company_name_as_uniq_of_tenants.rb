class ChangeCompanyNameAsUniqOfTenants< ActiveRecord::Migration
  def change
    change_column :tenants,:company_name,:string,:unique=>true
  end
end
