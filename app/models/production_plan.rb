class ProductionPlan < ActiveRecord::Base
  belongs_to :user
  attr_accessible :assembly, :date, :planned, :produced, :product_line,:trigger_min,:trigger_max

  validates_presence_of :product_line,:assembly,:planned,:date
  # before_save :set_time
  # def set_time
  #   self.date=(self.date-8.hours).utc
  # end

  def date_display
    self.date.strftime('%Y-%m-%d')
  end
end
