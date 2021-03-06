#encoding: utf-8
class UserDepartmentObserver<ActiveRecord::Observer
	observe :user_department

  def after_create user_department
    #auto share sub departments' entity groups to this user
    user = user_department.user
    if user
      user_department.department.subtree.each do |sub|
        if sub.entity_group
          if UserEntityGroup.where(user_id:user.id,entity_group_id:sub.entity_group.id ).first.nil?
            ueg = user.user_entity_groups.build
            ueg.entity_group = sub.entity_group
            ueg.save
          end
        end
      end
    end
  end

	def after_save user_department
		#auto share the department entity group

=begin
		user_department.department.subtree.each do |sub|
			if sub.entity_group && user = user_department.user
				ueg = user.user_entity_groups.build
				ueg.entity_group = sub.entity_group
				ueg.save
			end
		end
=end
		#end
	end 

	def after_destroy user_department
		#remove share entity group
		user_department.department.subtree.each do |sub|
			if sub.entity_group && user = user_department.user
				ueg = UserEntityGroup.where("user_id = ? and entity_group_id = ?",user.id,sub.entity_group.id).first
				ueg.destroy if ueg
			end
		end
		#
	end
end