require 'colorize'
Dir["#{Rails.root}/script/restructure/steps/*.rb"].each do |f|
  require f
end
puts %Q{
*************** steps of restruct ***************
****select no. to execute, print Q to quit*******
1. change user role from manager to director
2. reindex user entity group
     }.yellow

while (m=gets.chomp)
  case m
    when '1'
      UpdateUserRole.execute
    when '2'
      ReindexUserEntityGroup.execute
    when 'Q'
      break
  end
  puts '------------select next step------------------'.yellow
end

puts '======================finish restruct======================'.red