class ProductionPlan < ActiveRecord::Base
  belongs_to :user
  attr_accessible :assembly, :date, :planned, :produced, :product_line
end
