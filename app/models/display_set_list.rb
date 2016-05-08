class DisplaySetList < ActiveRecord::Base
  belongs_to :user
  has_many :display_set_items

  attr_accessible :name, :remark, :user_id
end
