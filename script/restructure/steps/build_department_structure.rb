require 'csv'
# creat root department for the tenants
# and build department  structure for the tenant

module BuildDepartmentStructure
  def self.execute file_path, clean
    if File.exist?(file_path)
      clean=clean.nil? ? true : clean=='1'
      tenant=Tenant.first
      if clean
        puts "clean #{tenant.company_name} departments...".blue
        tenant.departments.destroy_all
      end

      CSV.foreach(file_path, :headers => true, :col_sep => ';') do |row|
        puts "create department: #{row['Department']}, parent is #{row['Parent']}".yellow
        d=tenant.departments.build(name: row['Department'].strip)
        if row['Parent'] && parent=tenant.departments.find_by_name(row['Parent'].strip)
          d.parent=parent
        end

        d.creator=tenant.super_user
        d.save
        row['User'].split(';').each do |email|
          puts email
          if user=User.find_by_email(email.strip)
            puts user.first_name
            ug= user.user_departments.build
            ug.department=d
            ug.save
          end
        end if row['User']
      end
    else
      puts "file:#{file_path} not exist!!".red
    end
  end
end