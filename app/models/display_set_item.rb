class DisplaySetItem < ActiveRecord::Base
  belongs_to :display_set_list
  belongs_to :department
  attr_accessible :display_set_list_id, :department_id
end
