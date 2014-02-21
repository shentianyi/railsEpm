# step 1
module UpdateUserRole
  def self.execute
    User.where(role_id: 200).each do |user|
      puts "updating: #{user.first_name}".blue
      user.update_attributes(role_id: 300)
    end
  end
end