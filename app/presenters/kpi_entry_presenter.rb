#encoding: utf-8
class KpiEntryPresenter<Presenter
  Delegators=[:id, :value, :original_value, :entry_at, :parsed_entry_at]
  def_delegators :@kpi_entry, *Delegators

  def initialize(kpi_entry)
    @kpi_entry = kpi_entry
    self.delegators = Delegators
  end

  def values
    self.value
  end

  def date
    Time.parse(self.entry_at.to_s).strftime('%Y-%m-%d %H:%M:%S')
  end

  def property_val property_id
    @kpi_entry.property_val property_id
  end


  def as_brief_info(with_property=false)
    {
        id: @kpi_entry.id,
        task_item_id:@kpi_entry.task_item_id==0 ? nil : @kpi_entry.task_item_id,
        user_id: @kpi_entry.user_id,
        kpi_id: @kpi_entry.kpi_id,
        department_id: @kpi_entry.kpi_id,
        user_kpi_item_id: @kpi_entry.user_kpi_item_id,
        value: @kpi_entry.value.to_f,
        value_text: KpiUnit.get_value_display(@kpi_entry.kpi.unit, @kpi_entry.value),
        entry_at: @kpi_entry.entry_at.utc,
        properties: with_property ? properties : nil
    }
  end

  def properties
    ps=[]
    @kpi_entry.kpi.kpi_properties.each do |p|
      if @kpi_entry.respond_to?("a#{p.id}")
        ps<<{
            attribute_id: p.id,
            attribute_name: p.name,
            attribute_type: p.type,
            attribute_value: @kpi_entry.send("a#{p.id}")
        }
      end
    end
    ps
  end

  def as_kpi_basic_feedback(messages=nil, result_code=nil)
    if @kpi_entry.nil?
      {
          result_code: 0,
          messages: messages
      }
    else
      {
          result_code: result_code||1,
          messages: messages,
          need_instruction: false,
          customized_field: as_brief_info(true)
      }
    end
  end
end