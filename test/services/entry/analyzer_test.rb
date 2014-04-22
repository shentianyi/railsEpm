#encoding: utf-8
require 'test_helper'

class AnalyzerTest < ActiveSupport::TestCase
  #test 'analyse avg kpi daily frequency' do
  #  puts 'analyse avg kpi daily frequency:'.blue
  #  puts Entry::Analyzer.new(base_params).analyse
  #  assert true
  #end
  #
  #test 'property analyse avg kpi daily frequency' do
  #  puts 'property analyse avg kpi daily frequency:'.blue
  #  params=base_params
  #  params[:property]={a1: '2'}
  #  puts Entry::Analyzer.new(params).analyse
  #  assert true
  #end


  #test 'analyse sum kpi daily frequency' do
  #  puts 'analyse sum kpi daily frequency:'.blue
  #  params=base_params
  #  params[:average]=false
  #  puts Entry::Analyzer.new(params).analyse
  #  assert true
  #end
  #
  #test 'analyse avg kpi monthly frequency' do
  #  puts 'analyse avg kpi monthly frequency:'.blue
  #  params=base_params
  #  params[:frequency]=KpiFrequency::Monthly
  #  puts Entry::Analyzer.new(params).analyse
  #  assert true
  #end

  #test 'analyse avg kpi quarterly frequency' do
  #  puts 'analyse avg kpi quarterly frequency:'.blue
  #  params=base_params
  #  params[:frequency]=KpiFrequency::Quarterly
  #  puts Entry::Analyzer.new(params).analyse
  #  assert true
  #end

  #
  #test 'analyse sum kpi monthly frequency' do
  #  puts 'analyse sum kpi monthly frequency:'.blue
  #  params=base_params
  #  params[:average]=false
  #  params[:frequency]=KpiFrequency::Monthly
  #  puts Entry::Analyzer.new(params).analyse
  #  assert true
  #end
  #
  #test 'analyse with table' do
  #  puts 'analyse_with_table:'.blue
  #  puts Entry::Analyzer.new(base_params).analyse_with_table
  #  assert true
  #end
  #
  #test 'detail' do
  #  puts 'detail(size default limit is 20):'.blue
  #  params=base_params
  #  params[:start_time]=params[:end_time]='2014-04-01T16:00:00.000Z'
  #  puts Entry::Analyzer.new(base_params).detail
  #  assert true
  #end

  test 'period compare group by entity id (monthly)' do
    puts 'period compare group by entity id (monthly):'.blue
    params= {kpi_id: '1',
             entity_group_id: '129',
             average: 'true',
             frequency: '100'
    }
    params[:frequency]=KpiFrequency::Monthly
    params[:map_group]={'输入点' => 'a1'}
    params[:base_time]={start_time: '2013-12-31T16:00:00.000Z',
                        end_time: '2014-01-30T16:00:00.000Z'}

    puts Entry::Analyzer.new(params).period_compare
    assert true
  end

  #test 'period compares group by entity id (monthly)' do
  #  puts 'period compares group by entity id (monthly):'.blue
  #  params=base_params
  #  params[:frequency]=KpiFrequency::Monthly
  #  #params[:map_group]={'输入点' => 'a1'}
  #  params[:property]={a1: '2'}
  #  params[:base_time]={start_time: '2013-12-31T16:00:00.000Z',
  #                      end_time: '2014-01-30T16:00:00.000Z'}
  #  puts Entry::Analyzer.new(params).period_compares
  #  assert true
  #end


  private
  def base_params
    {kpi_id: '1',
     entity_group_id: '129',
     average: 'true',
     start_time: '2013-12-31T16:00:00.000Z',
     end_time: '2014-04-21T16:00:00.000Z',
     frequency: '100'
    }
  end

end
