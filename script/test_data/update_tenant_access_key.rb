Tenant.all.each do |tenant|
 tenant.update_attributes(:access_key=>SecureRandom.uuid)
end
