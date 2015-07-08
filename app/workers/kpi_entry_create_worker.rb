#encoding: utf-8

class KpiEntryCreateWorker
  include Sidekiq::Worker

  sidekiq_options :queue => :kpicreatejob, :backtrace => true, :retry => true

  def perform(entries)
    entries.each do |k|
      Entry::OperateService.new.insert_entry(k)
    end
  end
end