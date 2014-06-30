class Comment < ActiveRecord::Base
  # attr_accessible :title, :body
  belongs_to :user
  belongs_to :commentable, :polymorphic => true
end
