module CancelUserKpiAssign
  def self.execute file_path
    if File.exist?(file_path)
      CSV.foreach(file_path, :headers => true, :col_sep => ';') do |row|
        if user=User.find_by_email(row['Email'])
         puts "cancel #{user.first_name}:#{user.email} kpi assign....".yellow
         user.user_kpi_items.destroy_all
        end
      end
    else
      puts "file:#{file_path} not exist!!".red
    end
    #User.all.each do |u|
    #  puts u.email
    #  unless Entity.find_by_id(u.entity_id)
    #    u.update_attributes(entity_id: nil)
    #  end
    #  unless Department.find_by_id(u.department_id)
    #    u.update_attributes(department_id: nil)
    #  end
    #end
  end
end