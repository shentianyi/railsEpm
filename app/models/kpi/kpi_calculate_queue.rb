#encoding: utf-8
class KpiCalcylateQueue
  KPICALCULATENAME="kpi_calculate_queue"
  cal_queue = {}

  def self.push entry_id
    cal_queue = $redis.get(KPICALCULATENAME)
    if cal_queue.nil?
      cal_queue = {}
    end
  end

  def self.finish key

  end

  def self.check
    
  end

  #============
  #private
  #============
  private

  def push_to_queue q,entry_id
    entry = KpiEntry.find_by(entry_id: entry_id)
    unless entry.nil?
      if kpis = Kpi.parent_kpis_by_id(entry.kpi_id)
        kpis.each do |k|
          q[redis_key(k.id,entry.parsed_entry_at)] = true
        end
        $redis.set(KPICALCULATENAME,q)
      end
    end
  end

  def redis_key kpi_id,parsed_entry_at
    "#"+kpi_id.to_s+"-"+parsed_entry_at.to_s
  end
end