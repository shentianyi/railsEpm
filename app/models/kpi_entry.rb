class KpiEntry

  include Mongoid::Document
  include Mongoid::Timestamps
  include DynamicAttributable
  #
  # base field
  field :kpi_id, type: Integer
  field :user_id, type: Integer
  field :entity_id, type: Integer
  field :tenant_id, type: Integer
  field :department_id, type: Integer
  field :user_kpi_item_id, type: Integer

  field :task_item_id, type: Integer

  field :target_max, type: BigDecimal
  field :target_min, type: BigDecimal
  field :value, type: BigDecimal
  field :original_value, type: BigDecimal
  field :entry_at, type: DateTime
  field :parsed_entry_at, type: DateTime
  field :frequency, type: Integer
  # entry_type is a mark of calculated or not
  # default query use 1
  field :entry_type, type: Integer, :default => 0
  field :abnormal, type: Boolean, :default => false


  after_create :update_task_status

  def kpi
    @kpi||= Kpi.find_by_id(self.kpi_id)
  end

  def property_val property_id
    self["a#{property_id.to_s}"]
  end

  def self.do_search params
    puts params
    puts params[:from_time]
    puts params[:to_time]

    msg=Message.new
    msg.result = false

    return msg if (kpi = Kpi.find_by_id(params[:kpi_id])).nil?
    entities = KpiEntry.where(kpi_id: params[:kpi_id],
                              #     entry_at: params[:from_time]..params[:to_time],
                              user_id: params[:user_id])
                   .offset(params[:page].to_i * params[:size].to_i)
                   .limit(params[:size].to_i).order_by(entry_at: :desc)

    records = []
    entities.each_with_index do |entry, index|
      record = {}
      record[:id] = entry._id
      record[:value] = entry.value.to_s
      record[:date] = entry.entry_at.to_time.to_s
      record[:kpi_properties] = {}
      kpi.kpi_properties.each do |property|
        record[:kpi_properties][:"#{property.name}"] =entry.respond_to?("a#{property.id.to_s}") ? entry.send("a#{property.id.to_s}") : ''
      end
      records[index] = record
    end
    msg.result =true if records.length>0
    msg.content = records

    return msg
  end

  def self.generated_history_data(user, kpi, start_time, end_time)
    kpi_entries = []
    return kpi_entries if kpi.blank?

    if user.admin?
      kpi_entries = KpiEntry.where({:user_id.in => (User.where(tenant_id: 12).pluck(:id).uniq), kpi_id: kpi.id}).where(:entry_at.gte => start_time).where(:entry_at.lte => end_time)
    elsif user.director?
      kpi_entries = KpiEntry.accessible_by(Ability.new(user)).where(:entry_at.gte => start_time).where(:entry_at.lte => end_time)
    elsif user.user?
      kpi_entries = KpiEntry.where(kpi_id: kpi.id, user_id: user.id).where(:entry_at.gte => start_time).where(:entry_at.lte => end_time)
    end

    kpi_entries
  end


  private
  def update_task_status
    if self.task_item_id.present?
      if (task_item=Task::EntryItem.find_by_id(self.task_item_id))
        task_item.due
      end
    end
  end
end
