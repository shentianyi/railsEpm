class Email < ActiveRecord::Base
  attr_accessible :file_path, :receivers, :sender, :user_id

  belongs_to :user
end
