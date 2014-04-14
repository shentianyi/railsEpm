#encoding: utf-8
module KpiEntryAnalyseHelper
  def self.analysis_data(params)
    parameter=Entry::Parameter::AnalyseParameter.new(params)
    ds=Entry::DataService.new(parameter)
    ds.aggregate
  end
end
