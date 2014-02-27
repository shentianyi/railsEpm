require 'colorize'
Dir["#{Rails.root}/script/restructure/steps/*.rb"].each do |f|
  require f
end
puts %Q{
*************** steps of restruct ***************
****select no. to execute, print Q to quit*******
1. change user role from manager to director
2. build departmentStructure
 ## two params, first is method index, second is file path
 ## example: rails runner script/restructure/restructor.rb
 ##2,/root/data/build_departments.csv
3. add entity to department
 ## two params, first is method index, second is file path
 ## example: rails runner script/restructure/restructor.rb
 ## 3,/root/data/add_entity_to_department.csv
4. reindex user entity group
5. add user to entity group item
6. cancel user kpi assign
 ## two params, first is method index, second is file path
 ## example: rails runner script/restructure/restructor.rb
 ## 6,/root/data/cancel_kpi_assign.csv
     }.yellow


while (m=gets.chomp)
  args=m.split(',')
  case args[0]
    when '1'
      UpdateUserRole.execute
    when '2'
      BuildDepartmentStructure.execute(args[1], args[2])
    when '3'
         AddEntityToDepartment.execute(args[1])
    when '4'
      ReindexUserEntityGroup.execute
    when '5'
      AddUserToEntityGroupItem.execute
    when '6'
      CancelUserKpiAssign.execute(args[1])
    when 'Q'
      break
  end
  puts '------------select next step------------------'.yellow
end

puts '======================finish restruct======================'.red