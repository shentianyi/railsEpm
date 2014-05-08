#encoding: utf-8
class KpiQueueStatus
  WAIT=0        #wait in queue to be pushed into sidekiq queue
  PROCESSING=1  #sidekiq worker is working
  FINISHED=2      #finish working
  PUSHED=3      #pushed to sideqie queue

  def self.need_to_push status
    if status == PROCESSING || status == FINISHED
      true
    end
    false
  end
end
