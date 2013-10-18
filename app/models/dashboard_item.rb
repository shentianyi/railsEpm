class DashboardItem < ActiveRecord::Base
  belongs_to :dashboard
  has_many :dashboard_conditions, :dependent => :destroy
  attr_accessible :dashboard_id,:sequence,:interval,:name,:title,:chart_type
  attr_accessible :row, :col, :sizex, :sizey

  #validates_with TimeStringValidator
  validates :dashboard_id,:presence => true
  #validates :entity_group,:presence => true
  #validates :kpi_id,:presence => true
  #validates :calculate_type,:presence => true

   def self.get_formatted_items_by_dashboard_id(dashboard_id)

     items= DashboardItem.where('dashboard_id=?',dashboard_id).reorder('sequence')

     formatted_items = []
     formatted_conditions = []
     if items
       items.each{|item|
         formatted=item.as_json
         #find conditions

=begin
         conditions = DashboardCondition.where('dashboard_item_id=?',item.id).reorder('count')
         conditions.each{|condition|
           formatted_con = condition.as_json
           formatted_con[:kpi_name] = Kpi.find(condition.kpi_id).name
           formatted_con[:start] = self.time_string_to_time_span(condition.time_string)[:start]
           formatted_con[:end] = self.time_string_to_time_span(condition.time_string)[:end]
           formatted_conditions << formatted_con
         }
         formatted[:conditions] = formatted_conditions
=end


         #formatted[:kpi_name]=Kpi.find(item.kpi_id).name
         #formatted[:start] = self.time_string_to_time_span(item.time_string)[:start]
         #formatted[:end] = self.time_string_to_time_span(item.time_string)[:end]
         formatted_items << formatted
       }
     end
     return formatted_items
   end



  def self.get_item_formatted_data(id)
    data=nil
    item = DashboardItem.find(id)
    if item
      time_span=self.time_string_to_time_span item.time_string
      data = KpiEntryAnalyseHelper::get_kpi_entry_analysis_data(
          item.kpi_id,
          item.entity_group,
          time_span[:start].iso8601.to_s,
          time_span[:end].iso8601.to_s,
          item.calculate_type=='AVERAGE')
      if data
        data[:result]=true
        data[:startTime] = time_span[:start].iso8601
        data[:endTime]=time_span[:end].iso8601
        data[:interval] = Kpi.find_by_id(item.kpi_id).frequency.to_s
      end
    end
    return data
  end


  def self.time_string_to_time_span(time_str)
    result=nil
    self.time_string_patterns.keys.each{|item|

      if time_str=~ time_string_patterns[item][:pattern]

        result=  time_string_patterns[item][:processor].call(time_str)

      end
    }
    return result
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

     :today=>{:pattern=>/^TODAY$/,
             :processor=>Proc.new{|str|
               result={}
               span=0

               time_now = Time.now

               if time_now.utc?
                 time_now = time_now.localtime
               end
               start_time = time_now.strftime("%Y-%m-%d 00:00:00")
               end_time = time_now.strftime("%Y-%m-%d 23:59:59")
               result[:start]=Time.parse(start_time)
               result[:end] = Time.parse(end_time)

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
               start_time = DashboardCondition.time_by_diff_unit(eval(span+ '.' + str[last_digit+1,str.length-last_digit].downcase+'.ago'),time_unit)
               end_time = DashboardCondition.time_by_diff_unit(Time.now,time_unit)

               result[:start]=Time.parse(start_time)
               result[:end]=Time.parse(end_time)
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

               time_unit = str[last_digit+1,str.length-last_digit]
               start_time = DashboardCondition.time_by_diff_unit(Time.now,time_unit)
               end_time = DashboardCondition.time_by_diff_unit(eval(span+ '.' + str[last_digit+1,str.length-last_digit].downcase+'.ago'),time_unit)

               result[:start]=Time.now
               result[:end]=eval(span+ '.' + str[last_digit+1,str.length-last_digit].downcase+'.from_now')
               result
             }}
    }

  end

end

