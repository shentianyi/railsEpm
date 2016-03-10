class ProductionPlan < ActiveRecord::Base
  belongs_to :user
  attr_accessible :assembly, :date, :planned, :produced, :product_line,:trigger_min,:trigger_max

  # before_save :set_time
  # def set_time
  #   self.date=(self.date-8.hours).utc
  # end
end
