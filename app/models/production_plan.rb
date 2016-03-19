class ProductionPlan < ActiveRecord::Base
  belongs_to :user
  attr_accessible :assembly, :date, :planned, :produced, :product_line,:trigger_min,:trigger_max,:index,:remark

  validates_presence_of :product_line,:assembly,:planned,:date
  # before_save :set_time
  # def set_time
  #   self.date=(self.date-8.hours).utc
  # end

  before_create :set_index

  def date_display
    self.date.strftime('%Y-%m-%d')
  end

  def set_index
    count=self.class.where(product_line: self.product_line,date:self.date).count
    self.index=count+1
  end
end
