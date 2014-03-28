#encoding: utf-8
module UsersHelper
  def self.get_user_role_display role_id
    Role.display role_id
  end
end
