class Email < ActiveRecord::Base
  attr_accessible :file_path, :receivers, :sender, :user_id, :content

  belongs_to :user
end
