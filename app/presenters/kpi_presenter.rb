#encoding: utf-8
class KpiPresenter<Presenter
  Delegators=[:id, :name, :is_calculated, :formula_string, :frequency, :direction, :unit, :target_max, :target_min, :description, :kpi_property_items]
  def_delegators :@kpi, *Delegators

  def initialize(kpi)
    @kpi=kpi
    self.delegators =Delegators
  end

  def properties
    attrs = []
    @kpi.kpi_property_items.each { |item|
      attrs << {id: item.id, name: item.kpi_property.name}
    }
    attrs
  end

  def to_json
    {
        id: @kpi.id,
        name: @kpi.name,
        is_calculated: @kpi.is_calculated,
        formula_string: @kpi.formula_string,
        interval: KpiFrequency.get_desc_by_value(@kpi.frequency),
        trend: KpiDirection.get_desc_by_value(@kpi.direction),
        target_max: KpiUnit.parse_entry_value(@kpi.unit, @kpi.target_max),
        target_min: KpiUnit.parse_entry_value(@kpi.unit, @kpi.target_min),
        section: KpiUnit.get_entry_unit_sym(@kpi.unit),
        desc: @kpi.description,
        properties: properties
    }
  end

  def as_basic_info(with_properties=true)
    {
        kpi_id: @kpi.id,
        kpi_name: @kpi.name,
        description: @kpi.description,
        creator: @kpi.user_id,
        created_on: @kpi.created_at,
        target_max: @kpi.target_max,#KpiUnit.parse_entry_value(@kpi.unit, @kpi.target_max),
        target_min: @kpi.target_min,#KpiUnit.parse_entry_value(@kpi.unit, @kpi.target_min),
        uom: @kpi.unit,
        calculate_method: @kpi.calculate_method,
        viewable: {
            viewable_code: @kpi.viewable,
            user_group_id: @kpi.user_group_id
        },
        attributes: with_properties ? properties : nil
    }
  end

  def as_kpi_assignments kpi_id
    assignments=[]

    UserKpiItem.where(kpi_id: kpi_id).each do |item|
      assignments<<{
          assignment_id: item.id,
          user: User.find_by_id(item.user_id).email,
          department_id: item.department_id,
          time: item.remind_time,
          frequency: item.frequency
      }
    end

    assignments
  end

  def as_kpi_basic_feedback(messages=nil, result_code=nil, with_properties=false)
    if @kpi.nil?
      {
          result_code: 0,
          messages: messages
      }
    else
      {
          result_code: result_code||1,
          messages: messages,
          need_instruction: false,
          customized_field: as_kpi_details(with_properties)
      }
    end
  end

  def as_kpi_details(with_properties=false)
    {
        kpi: as_basic_info(with_properties),
        assignments: as_kpi_assignments(@kpi.id)
    }
  end

  def as_on_user(user, with_properties=true)
    {
        user: UserPresenter.new(user).as_brief_info(false),
        kpi: as_basic_info(with_properties),
        follow_flag: Kpi::KpiFollowFlag.display(@kpi.follow_flag(user).follow_flag),
        follow_flag_value: @kpi.follow_flag(user).follow_flag,
        is_created: @kpi.user_id==user.id,
        is_managable: @kpi.user_id==user.id
    }
  end

  def self.as_on_users(kpis, user, with_properties=true)
    infos=[]

    kpis.each do |kpi|
      infos<<KpiPresenter.new(kpi).as_on_user(user, with_properties)
    end

    infos
  end

  def as_properties_info
    infos=[]

    @kpi.kpi_properties.each do |p|
      infos<<{id: p.id, name: p.name, type: p.type}
    end

    infos
  end

  def as_assigns
    infos=[]

    @kpi.user_kpi_items.each do |item|
      infos<<{
          assignment_id: item.id,
          department_id: item.department_id,
          time: item.remind_time,
          frequency: item.frequency,
          user: UserPresenter.new(User.find_by_id(item.user_id)).as_brief_info
      }
    end

    infos
  end

end