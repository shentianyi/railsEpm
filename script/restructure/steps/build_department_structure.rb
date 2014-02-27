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
        d=tenant.departments.build(name: row['Department'])
        if parent=tenant.departments.find_by_name(row['Parent'])
          d.parent=parent
        end

        d.creator=tenant.super_user
        d.save
      end
    else
      puts "file:#{file_path} not exist!!".red
    end
  end
end