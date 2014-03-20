puts ARGV
arr=ARGV
if ARGV.include?('-e')
  arr=ARGV[2..ARGV.count]
end
puts arr
if arr.count==3
  user=User.new
  user.status=0
  user.create_tenant_user!(ARGV[0], ARGV[1], ARGV[1], ARGV[2])
  puts "email: #{arr[0]}, password: #{arr[1]}, company name: #{arr[2]}"
else
  puts 'params error!'.red
end