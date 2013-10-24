Tenant.all.each_with_index do |t,i|
  puts "#{i}. #{t.company_name} expire at: #{t.expire_at.class}"
  t.update_attributes(:expire_at=>Date.parse(t.expire_at)+2.year)
    puts "after update expire at:#{t.expire_at}"
end
