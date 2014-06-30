class ChartCondition < ActiveRecord::Base
  # attr_accessible :title, :body
  belongs_to :chartable, :polymorphic => true
end
