class KpiSubscribeAlert < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :alert_type, :tenant_id, :value, :kpi_subscribe_id

  belongs_to :tenant
  belongs_to :kpi_subscribe

  def execute data

    data.each do |d|
      if SubscribeAlert.alert(self.alert_type,self.value,d)
        return true
      end
      return false
    end
  end

  def display
    SubscribeAlert.display(self.alert_type) + self.value.to_s
  end
end
