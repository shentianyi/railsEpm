#encoding: utf-8
module KpiEntryAnalyseHelper
  def self.analysis_data(params)
    parameter=Entry::Parameter::AnalyseParameter.new(params)
    ds=Entry::DataService.new(parameter)
    ds.aggregate
  end

  def self.data_detail(params)
    params[:data_module]=Entry::DataService::DETAIL_TABLE
    parameter=Entry::Parameter::AnalyseParameter.new(params)
    ds=Entry::DataService.new(parameter)
    ds.aggregate
  end

end
