class Email < ActiveRecord::Base
  attr_accessible :file_path, :receivers, :sender, :user_id, :content, :title

  belongs_to :user
end
