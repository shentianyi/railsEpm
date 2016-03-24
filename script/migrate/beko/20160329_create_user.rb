users=[]
users<<'tanzer.zeytinoglu@beko.com'

users<<'brenda.zhang@beko.com'

users<<'nick.zhu@beko.com'

users<<'insomia.teng@beko.com'

users<<'dane.xie@beko.com'

users<<'caiqin.yang@beko.com'

users<<'qiang.wang@beko.com'

users<<'Ali.Osman@beko.com'

d=Department.find_by_name('Beko').id

users.each do |u|

  user=User.new(first_name: u.split('.').first.capitalize,
                email: u,
                password: '123456@', password_confirmation: '123456@', role_id: 300)
  user.tenant=Tenant.first

  user.save

  validator = DepartmentValidator.new({:user_id => user.id, :department_id => d})
  validator.valid_add_user
  if validator.valid
    user_department = UserDepartment.new(:user_id => user.id, :department_id => d)
    user_department.save
  end

end