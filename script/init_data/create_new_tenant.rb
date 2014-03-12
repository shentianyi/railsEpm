if ARGV.count==3
  user=User.new
  user.status=0
  user.create_tenant_user!(ARGV[0], ARGV[1], ARGV[1], ARGV[2])
  puts "email: #{ARGV[0]}, password: #{ARGV[1]}, company name: #{ARGV[2]}"
else
  puts 'params error!'.red
end