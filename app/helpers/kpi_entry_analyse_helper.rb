#encoding: utf-8
module KpiEntryAnalyseHelper
  def self.analysis_data(params)
    parameter=Entry::Parameter::AnalyseParameter.new(params)
    Entry::DataService.new(parameter).aggregate
  end

  def self.detail_data(params)
    params[:data_module]=Entry::DataService::DETAIL_TABLE
    parameter=Entry::Parameter::AnalyseParameter.new(params)
    Entry::DataService.new(parameter).aggregate
  end
end
