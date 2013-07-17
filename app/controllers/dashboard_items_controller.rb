require 'time'
class DashboardItemsController < ApplicationController


    def create
      @new_item = DashboardItem.new(params[:dashboard_item])
      msg = new_message
      if @new_item.save
        msg[:result]=true
      else
        msg[:errors]= @new_item.errors.full_messages
      end
      respond_to do |t|
        t.json {render :json=>{:result=>false,:errors=>@new_item.errors.full_messages}}
        t.js {render :js=> jsonp_str({:result=>false,:errors=>@new_item.errors.full_messages})}
      end
    end


  def destroy
    DashboardItem.destroy(params[:id])
    respond_to do |t|
      t.json {render :json=>{:result=>true}}
      t.js {render :js=> jsonp_str({:result=>true})}
    end
  end

  def item_by_dashboard_id
    items= DashboardItem.where('dashboard_id=?',params[:id]).reorder('sequence')

    respond_to do |t|
      t.json {render :json=>items}
      t.js {render :js => jsonp_str(items)}
    end
  end


  def get_data
    item = DashboardItem.find(params[:id])
    if item
      time_span=time_string_to_time_span item.time_string
      data = KpiEntryAnalyseHelper::get_kpi_entry_analysis_data(
          item.kpi_id,
          item.entity_group,
          time_span[:start],
          time_span[:end],
          item.calculate_type=='AVERAGE')
      if data
        data[:result]=true
        data[:interval]=Kpi.find(item.kpi_id).frequency
        data[:startTime]=time_span[:start]
        data[:endTime]=time_span[:end]
      end
      respond_to do |t|
        t.json {render :json=>data.to_json}
        t.js {render :js=>jsonp_str(data)}
      end
    end
  end



  def update_sequence
    seq_arr=params[:sequence]
    if seq_arr && seq_arr.kind_of?(Array)
        for i in 0..seq_arr.length-1
            DashboardItem.find(seq[i]).update_attributes(:sequence=>i)
        end
    end
  end




  def self.time_string_to_time_span(time_str)
    result=nil
    time_string_patterns.keys.each{|item|
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


     :last=>{:pattern=>/^LAST[1-9][0-9]*(MINUTE|HOUR|DAY|WEEK|MONTH|YEAR)$/,
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

              result[:begin]=eval(span+ '.' + str[last_digit+1,str.length-last_digit].downcase+'.ago')
              result[:end]=Time.now
                    result
             }},


     :next=>{:pattern=>/^NEXT[1-9][0-9]*(MINUTE|HOUR|DAY|WEEK|MONTH|YEAR)$/,
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

              result[:begin]=Time.now
              result[:end]=eval(span+ '.' + str[last_digit+1,str.length-last_digit].downcase+'.from_now')
               result
             }}
    }

  end



end

