class DashboardCondition < ActiveRecord::Base
  # attr_accessible :title, :body
  belongs_to :dashboard_item
  attr_accessible :dashboard_item_id,:entity_group,:kpi_id,:calculate_type,:time_string,:count

  validates_with TimeStringValidator
  validates :dashboard_item_id,:presence => true
  validates :entity_group,:presence => true
  validates :kpi_id,:presence => true
  validates :calculate_type,:presence => true

  def self.time_string_to_time_span(time_str)
    result=nil
    self.time_string_patterns.keys.each{|item|
      if time_str=~ time_string_patterns[item][:pattern]
        result=  time_string_patterns[item][:processor].call(time_str)
      end
    }
    return result
  end

  #
  # move from DashboardItem::get_item_formatted_data(id)
  # return the array of conditions
  #
  def self.get_item_formatted_data(id)

    datas = []
    conditions = DashboardCondition.where('dashboard_item_id=?',id)

    if conditions
      conditions.each { |condition|
        time_span = self.time_string_to_time_span condition.time_string
        puts condition.time_string
        puts "===================="
        puts time_span.as_json
        puts "===================="
        data = KpiEntryAnalyseHelper::get_kpi_entry_analysis_data(
            condition.kpi_id,
            condition.entity_group,
            time_span[:start].iso8601.to_s,
            time_span[:end].iso8601.to_s,
            condition.calculate_type=='AVERAGE')
        if data
          data[:result]=true
          data[:startTime] = time_span[:start]
          data[:endTime] = time_span[:end]
          data[:interval] = Kpi.find_by_id(condition.kpi_id).frequency.to_s
          data[:kpi_id] = condition.kpi_id
          data[:count] = condition.count
          data[:id] = condition.id
          datas << data
        end
      }
    end

    return datas
  end

  private
  def self.time_string_patterns
    {:span=>{:pattern=>/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?\|([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/,
             :processor=>Proc.new{|str|     #请先使用：pattern检查输入的STR后再调用CALL，防止脏数据EVAL执行
               result={}
               time_arr= str.split('|')
               result[:start]=Time.parse(time_arr[0])
               result[:end]=Time.parse(time_arr[1])
               result
             }},


     :last=>{:pattern=>/^LAST(0|[1-9]\d*)(MINUTE|HOUR|DAY|WEEK|MONTH|YEAR)$/,
             :processor=>Proc.new{|str|
               result={}
               span=0
               before_first_digit= str.index(/\D\d/)
               last_digit =  str.index(/\d\D/)
               if before_first_digit+1 == last_digit
                 span=str[last_digit]
               else
                 span= str[before_first_digit+1,last_digit-before_first_digit]
               end
               time_unit = str[last_digit+1,str.length-last_digit]

               start_time = time_by_diff_unit(eval(span+ '.' + str[last_digit+1,str.length-last_digit].downcase+'.ago'),time_unit)
               end_time = time_by_diff_unit(Time.now,time_unit)
               Time.parse(start_time)

               result[:start]=eval(span+ '.' + str[last_digit+1,str.length-last_digit].downcase+'.ago')
               result[:end]=Time.now
               result
             }},


     :next=>{:pattern=>/^NEXT(0|[1-9]\d*)(MINUTE|HOUR|DAY|WEEK|MONTH|YEAR)$/,
             :processor=>Proc.new{|str|
               result={}
               span=0
               before_first_digit= str.index(/\D\d/)
               last_digit =  str.index(/\d\D/)
               if before_first_digit+1 == last_digit
                 span=str[last_digit]
               else
                 span= str[before_first_digit+1,last_digit-before_first_digit]
               end

               result[:start]=Time.now
               result[:end]=eval(span+ '.' + str[last_digit+1,str.length-last_digit].downcase+'.from_now')
               result
             }}
    }

  end

  def self.time_by_diff_unit(timestr,time_unit)
    result = {}
    puts "============================================="
    localtime = timestr
    if timestr.utc?
      localtime = timestr.localtime
    end

    if time_unit == "MINUTE"
      result = localtime.strftime("%Y-%m-%d %H:%M:00")
    end
    if time_unit == "HOUR"
      result = localtime.strftime("%Y-%m-%d %H:00:00")
    end
    if time_unit == "DAY"
      result = localtime.strftime("%Y-%m-%d")
    end

    result
    puts result
  end
end