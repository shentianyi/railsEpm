#encoding: utf-8
require 'singleton'

class KpiCalculateQueue
  include Singleton

  KPICALCULATENAME="kpi_calculate_queue"
  @cal_queue = {}

  def initialize
    @cal_queue = $redis.get(KPICALCULATENAME)
    if @cal_queue.nil?
      @cal_queue = {}
      $redis.set(KPICALCULATENAME,@cal_queue)
    end

    #set those PROCESSING to WAIT
    @cal_queue.each do |key,val|
      if val["status"] == KpiQueueStatus::PROCESSING
        val["status"] == KpiQueueStatus::WAIT
      end
    end

    $redis.set(KPICALCULATENAME,@cal_queue)
  end

  #push calculate id to queue
  def self.push entry_id
    entry = KpiEntry.find_by(entry_id: entry_id)
    unless entry.nil?
      if kpis = Kpi.parent_kpis_by_id(entry.kpi_id)
        kpis.each do |k|
          #q[redis_key(k.id,entry.parsed_entry_at)] = true
          if @cal_queue[redis_key(k.id,entry.parsed_entry_at)].nil?
            @cal_queue[redis_key(k.id,entry.parsed_entry_at)] = {}
            @cal_queue[redis_key(k.id,entry.parsed_entry_at)]["status"] = KpiQueueStatus::WAIT
            @cal_queue[redis_key(k.id,entry.parsed_entry_at)]["kpi_id"] = k.id
            @cal_queue[redis_key(k.id,entry.parsed_entry_at)]["entry_id"] = entry.id
          elsif KpiQueueStatus.need_to_push(@cal_queue[redis_key(k.id,entry.id)]["status"])
            @cal_queue[redis_key(k.id,entry.parsed_entry_at)]["status"] = KpiQueueStatus::WAIT
          else
            #Do nothing
          end
        end
        $redis.set(KPICALCULATENAME,@cal_queue)
      end
    end
  end

  #switch PUSHED to PROCESSING
  def self.process kpi_id,paesed_enrey_at
    rkey = redis_key(kpi_id,parsed_entry_at)
    if @cal_queue[rkey]["status"] == KpiQueueStatus::PUSHED
      @cal_queue[rkey]["status"] = KpiQueueStatus::PROCESSING
    end
    $redis.set(KPICALCULATENAME,@cal_queue)
  end

  #switch PROCESSING to FINISHED
  def self.finish kpi_id,parsed_entry_at
    rkey = redis_key(kpi_id,parsed_entry_at)
    if @cal_queue[rkey]["status"] == KpiQueueStatus::PROCESSING
      @cal_queue[rkey]["status"] = KpiQueueStatus::FINISHED
    end
    $redis.set(KPICALCULATENAME,@cal_queue)
  end

  #check queue, push WAIT jon to sidekiq and switch WAIT to PUSHED
  def self.check
    @cal_queue.each do |k,val|
      if val["status"] == KpiQueueStatus::WAIT
        #push to resque queue
        Resque.enqueue(KpiEntryCalculator, val["kpi_id"],val["entry_id"])
        #change status to PUSHED
        val["status"] == KpiQueueStatus::PUSHED
      end
    end
    $redis.set(KPICALCULATENAME,@cal_queue)
  end


  #============
  #private
  #============
  private

  def redis_key kpi_id,entry_id
    "#"+kpi_id.to_s+"-"+entry_id.to_s
  end
end
