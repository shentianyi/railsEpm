#encoding: utf-8
require 'singleton'

class KpiCalculateQueue

  KPICALCULATENAME="kpi_calculate_queue:"+Rails.env
  @cal_queue = {}

  #push calculate id to queue
  def self.push entry
    fetch
    unless entry.nil?
      if kpis = Kpi.parent_kpis_by_id(entry["kpi_id"])
        kpis.each do |k|
<<<<<<< HEAD
          rkey = redis_key(k.id,entry["user_id"],entry["parsed_entry_at"].to_milli)
=======
          #CalculateWorker.perform_async(k.id,entry)
          rkey = redis_key(k.id,entry["parsed_entry_at"].to_milli)
>>>>>>> qoros-demo
          if !@cal_queue.has_key?(rkey)
            @cal_queue[rkey] = 1
            save
            #puts "Calculate".red
            #CalculateWorker.perform_async(k.id,entry)
            #KpiEntriesHelper.calculate_caled_kpi(k.id,entry)
          elsif @cal_queue[rkey] < 1
            @cal_queue[rkey] = 1
            save
            #puts "Calculate".red
            #CalculateWorker.perform_async(k.id,entry)
            #KpiEntriesHelper.calculate_caled_kpi(k.id,entry)
          else
            #Do nothing
          end
          #CalculateWorker.perform_async(k.id,entry)
          #puts @cal_queue.to_json.green
        end
      end
    end
  end

  #switch PUSHED to PROCESSING
  def self.process kpi_id,user_id,parsed_entry_at
    fetch
<<<<<<< HEAD
    rkey = redis_key(kpi_id,user_id,parsed_entry_at)
    puts "--PROCESS START--".blue
    puts rkey.green
    puts @cal_queue.to_json.green
=======
    rkey = redis_key(kpi_id,parsed_entry_at)
    #puts rkey.green
    #puts @cal_queue.to_json.green
>>>>>>> qoros-demo
    if @cal_queue[rkey] && @cal_queue[rkey] > 0
      @cal_queue[rkey] = @cal_queue[rkey] - 1
    end
    puts @cal_queue.to_json.green
    puts "--PROCESS END--".blue
    save
  end

  #============
  #private
  #============
  private

  def self.redis_key kpi_id,user_id,parsed_entry_at
    "#z"+kpi_id.to_s+"z"+user_id.to_s+"z"+parsed_entry_at.to_s
  end

  def self.fetch
    @cal_queue = {}
    if $redis.get(KPICALCULATENAME)
      @cal_queue = JSON.parse($redis.get(KPICALCULATENAME))
    end
  end

  def self.save
    $redis.set(KPICALCULATENAME,@cal_queue.to_json)
  end
end
