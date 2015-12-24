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
      attrs << {
          attribute_id: item.id,
          attribute_name: item.kpi_property.name,
          attribute_type: item.kpi_property.type
      }
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
        target_max: KpiUnit.parse_entry_value(@kpi.unit, @kpi.target_max),
        target_min: KpiUnit.parse_entry_value(@kpi.unit, @kpi.target_min),
        target_max_text: KpiUnit.get_value_display(@kpi.unit, @kpi.target_max),
        target_min_text: KpiUnit.get_value_display(@kpi.unit, @kpi.target_min),
        uom: @kpi.unit,
        calculate_method: @kpi.calculate_method,
        viewable: {
            viewable_code: @kpi.viewable,
            user_group_id: @kpi.user_group_id
        },
        attributes: with_properties ? properties : nil
    }
  end

  # def as_kpi_assignments kpi_id,user
  #   assignments=[]
  #
  #   UserKpiItem.where(kpi_id: kpi_id,assigner: user.id).each do |item|
  #     assignments<<{
  #         assignment_id: item.id,
  #         user: User.find_by_id(item.user_id).email,
  #         department_id: item.department_id,
  #         time: item.remind_time,
  #         frequency: item.frequency,
  #         auto_notification:item.auto_notification
  #     }
  #   end
  #
  #   assignments
  # end

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

  def as_kpi_details(with_properties=false,user)
    {
        kpi: as_basic_info(with_properties),
        assignments: as_assigns(user)
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

  def as_assigns user
    infos=[]

    @kpi.user_kpi_items.each do |item|
      infos<<{
          assignment_id: item.id,
          department_id: item.department_id,
          time: item.remind_time,
          frequency: item.frequency,
          auto_notification:item.auto_notification,
          user: UserPresenter.new(User.find_by_id(item.user_id)).as_brief_info(false)
      }
    end

    infos
  end

  def as_on_kpi_department(user, department)
    {
        department: DepartmentPresenter.new(department).as_brief_info(true),
        followed: @kpi.followed?(user,department),
        follow_flag: Kpi::KpiFollowFlag.display(@kpi.follow_flag(user,department).follow_flag),
        follow_flag_value: @kpi.follow_flag(user,department).follow_flag
    }
  end

  def self.as_on_kpi_departments(user, kpi, departments)
    infos=[]
    departments.each do |department|
      infos<<KpiPresenter.new(kpi).as_on_kpi_department(user, department)
    end

    infos
  end

end