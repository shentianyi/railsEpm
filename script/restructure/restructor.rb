require 'colorize'
Dir["#{Rails.root}/script/restructure/steps/*.rb"].each do |f|
  require f
end
puts %Q{
*************** steps of restruct ***************
****select no. to execute, print Q to quit*******
1. create root department
2. change user role from manager to director
3. reindex user entity group
4. add user to entity group item
     }.yellow

while (m=gets.chomp)
  case m
    when '1'
      CreateRootDepartment.execute
    when '2'
      UpdateUserRole.execute
    when '3'
      ReindexUserEntityGroup.execute
    when '4'
      AddUserToEntityGroupItem.execute
    when 'Q'
      break
  end
  puts '------------select next step------------------'.yellow
end

puts '======================finish restruct======================'.red