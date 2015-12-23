class KpiEntry

  include Mongoid::Document
  include Mongoid::Timestamps
 # include DynamicAttributable
  #
  # base field
  field :kpi_id, type: Integer
  field :user_id, type: Integer
  field :entity_id, type: Integer
  field :tenant_id, type: Integer
  field :department_id, type: Integer
  field :user_kpi_item_id, type: Integer

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
  # dynamic field
  #field :properties, type: Hash
  #embeds_many :properties

  # 在处理文件或API时，KEY_MARKS是保留字段
  KEY_MARKS=%w(DELETE)


  def self.dynamic_field_name
    'properties'
  end

  def self.date_map_filed
    'parsed_entry_at'
  end


  def kpi
    if (kpi = Kpi.find_by_id(self.kpi_id)).nil?
      nil
    else
      kpi
    end
  end


  def self.map
    map=%Q{
           function(){
  emit({kpi_id:this.kpi_id,entity_id:this.entity_id},parseFloat(this.value));
      };
     }
    map1=%Q{
       function(){
           emit({date:this.parsed_entry_at.getFullYear()+'-'+(this.parsed_entry_at.getMonth()+1)+'-'+this.parsed_entry_at.getDate()},
               parseFloat(this.value));
        };
      }

    map=%Q{
           function(){
  emit({property:this.:1},parseFloat(this.value));
      };
     }

    reduce=%Q{
          function(key,values){
  return Array.sum(values);
  }
      }
    KpiEntry.where(kpi_id: 1, entry_type: 1).map_reduce(map1, reduce).out(inline: true)
  end

  def last_detail?
    KpiEntry.where(user_kpi_item_id: self.user_kpi_item_id, parsed_entry_at: self.parsed_entry_at, entity_id: self.entity_id, entry_type: self.entry_type).first.nil?
  end

  def property_val property_id
    key = "a"+property_id.to_s
    if self[key].nil?
      ""
    else
      self[key]
    end
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

end
