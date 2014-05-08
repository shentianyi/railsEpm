#encoding: utf-8
require 'singleton'

class KpiCalculateQueue
  include Singleton

  KPICALCULATENAME="kpi_calculate_queue"
  @cal_queue = {}

  def initialize
    #@cal_queue = JSON.parse($redis.get(KPICALCULATENAME))
    #if @cal_queue.nil?
    @cal_queue = {}
    #$redis.set(KPICALCULATENAME,@cal_queue.to_json)
    #end

    #set those PROCESSING to WAIT
    @cal_queue.each do |key,val|
      if val["status"] == KpiQueueStatus::PROCESSING
        val["status"] == KpiQueueStatus::WAIT
      end
    end

    #$redis.set(KPICALCULATENAME,@cal_queue.to_json)
  end

  #push calculate id to queue
  def push entry_id
    entry = KpiEntry.find_by(id: entry_id)
    unless entry.nil?
      if kpis = Kpi.parent_kpis_by_id(entry.kpi_id)
        kpis.each do |k|
          rkey = redis_key(k.id,entry.id)
          if @cal_queue[rkey].nil?
            @cal_queue[rkey] = {}
            @cal_queue[rkey]["status"] = KpiQueueStatus::WAIT
            @cal_queue[rkey]["kpi_id"] = k.id
            @cal_queue[rkey]["entry_id"] = entry.id.to_s
          elsif KpiQueueStatus.need_to_push(@cal_queue[rkey]["status"])
            @cal_queue[rkey]["status"] = KpiQueueStatus::WAIT
          else
            #Do nothing
          end
        end
        #$redis.set(KPICALCULATENAME,@cal_queue.to_json)
      end
    end
  end

  #switch PUSHED to PROCESSING
  def process kpi_id,entry_id
    rkey = redis_key(kpi_id,entry_id)
    puts ("process"+rkey).blue
    if @cal_queue[rkey] && @cal_queue[rkey]["status"] == KpiQueueStatus::PUSHED
      @cal_queue[rkey]["status"] = KpiQueueStatus::PROCESSING
      puts @cal_queue[rkey].to_json.blue
    end
    #$redis.set(KPICALCULATENAME,@cal_queue.to_json)
  end

  #switch PROCESSING to FINISHED
  def finish kpi_id,entry_id
    rkey = redis_key(kpi_id,entry_id)
    puts ("finish"+rkey).blue
    if @cal_queue[rkey] && @cal_queue[rkey]["status"] == KpiQueueStatus::PROCESSING
      @cal_queue[rkey]["status"] = KpiQueueStatus::FINISHED
      puts @cal_queue[rkey].to_json.blue
    end

    #$redis.set(KPICALCULATENAME,@cal_queue.to_json)
  end

  #check queue, push WAIT jon to sidekiq and switch WAIT to PUSHED
  def check
    @cal_queue.each do |k,val|
      if val["status"] == KpiQueueStatus::WAIT
        #push to resque queue
        @cal_queue[k]["status"] = KpiQueueStatus::PUSHED
        #Resque.enqueue(KpiEntryCalculator, val["kpi_id"],val["entry_id"])
        CalculateWorker.perform_async(val["kpi_id"],val["entry_id"])
        #KpiEntriesHelper.calculate_caled_kpi(val["kpi_id"],val["entry_id"])
        #change status to PUSHED

      end
    end
    #$redis.set(KPICALCULATENAME,@cal_queue.to_json)
  end


  #============
  #private
  #============
  private

  def redis_key kpi_id,entry_id
    "#"+kpi_id.to_s+"-"+entry_id.to_s
  end
end
