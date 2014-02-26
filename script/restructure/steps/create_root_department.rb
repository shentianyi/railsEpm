module CreateRootDepartment
  def self.execute
    Tenant.all.each do |t|
      unless department=t.departments.where(ancestry: nil).first
        department=Department.new(name: t.company_name)
        department.tenant=t
        department.creator=t.super_user
        department.save
        puts  puts "tenant: #{t.company_name}  root department: #{department.name} created...".yellow
      else
        puts "tenant: #{t.company_name} has a root department: #{department.name}".red
      end
    end
  end
end