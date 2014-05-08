#encoding: utf-8
class KpiCalcylateQueue
  require 'singleton'

  KPICALCULATENAME="kpi_calculate_queue"
  @cal_queue = {}

  def initialize
    @cal_queue = $redis.get(KPICALCULATENAME)
    if @cal_queue.nil?
      @cal_queue = {}
      $redis.set(KPICALCULATENAME,@cal_queue)
    end
  end

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
            @cal_queue[redis_key(k.id,entry.parsed_entry_at)]["parsed_entry_at"] = entry.parsed_entry_at
          elsif @cal_queue[redis_key(k.id,entry.parsed_entry_at)]["status"] != KpiQueueStatus::WAIT
            @cal_queue[redis_key(k.id,entry.parsed_entry_at)]["status"] = KpiQueueStatus::WAIT
          else
            #Do nothing
          end
        end
        $redis.set(KPICALCULATENAME,@cal_queue)
      end
    end
  end

  def self.finish kpi_id,parsed_entry_at
    key = redis_key(kpi_id,parsed_entry_at)
    @cal_queue[k]["status"] = KpiQueueStatus::FINISH
    $redis.set(KPICALCULATENAME,@cal_queue)
  end

  def self.check
    @cal_queue.each do |k,val|
      if val["status"] == KpiQueueStatus::WAIT
        #push to sidekiq worker

        #change status to PROCESSING
        val["status"] == KpiQueueStatus::PROCESSING
      end
    end
    $redis.set(KPICALCULATENAME,@cal_queue)
  end

  #============
  #private
  #============
  private

  def redis_key kpi_id,parsed_entry_at
    "#"+kpi_id.to_s+"-"+parsed_entry_at.to_s
  end
end