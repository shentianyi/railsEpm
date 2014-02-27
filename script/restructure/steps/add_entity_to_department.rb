module AddEntityToDepartment
  def self.execute file_path
    if File.exist?(file_path)
      CSV.foreach(file_path, :headers => true, :col_sep => ';') do |row|
        if (entity=Entity.find_by_name(row['Entity'])) && (department=Department.find_by_name(row['Department']))
          puts "add #{entity.name} to #{department.name}...".yellow
          entity.department=department
          entity.save
        else
          puts 'entity or department data error!'.red
        end

      end
    else
      puts "file:#{file_path} not exist!!".red
    end
  end
end