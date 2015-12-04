class UserInvite < ActiveRecord::Base
  belongs_to :user #user is inviter
  attr_accessible :email, :sign_uped
end
