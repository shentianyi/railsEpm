require 'test_helper'

class AnalyzerTest < ActiveSupport::TestCase
  test 'analyse avg kpi daily frequency' do
    puts 'analyse avg kpi daily frequency:'.blue
    puts Entry::Analyzer.new(base_params).analyse
    assert true
  end

  test 'analyse sum kpi daily frequency' do
    puts 'analyse sum kpi daily frequency:'.blue
    params=base_params
    params[:average]=false
    puts Entry::Analyzer.new(params).analyse
    assert true
  end

  test 'analyse avg kpi monthly frequency' do
    puts 'analyse avg kpi monthly frequency:'.blue
    params=base_params
    params[:frequency]=KpiFrequency::Monthly
    puts Entry::Analyzer.new(params).analyse
    assert true
  end

  test 'analyse sum kpi monthly frequency' do
    puts 'analyse sum kpi monthly frequency:'.blue
    params=base_params
    params[:average]=false
    params[:frequency]=KpiFrequency::Monthly
    puts Entry::Analyzer.new(params).analyse
    assert true
  end

  private
  def base_params
    {kpi_id: '1',
     entity_group_id: '129',
     average: 'true',
     start_time: '2014-01-31T16:00:00.000Z',
     end_time: '2014-04-15T16:00:00.000Z',
     frequency: '100'
    }
  end

end
