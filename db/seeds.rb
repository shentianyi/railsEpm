# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
unless user=User.find_by_email('admin@ifscm.com')
  user=User.new.create_tenant_user!('admin@ifscm.com','123456@','123456@','IFSCM')
end
user.update_attributes(:is_sys=>true)

print "test\n"



# Testing Data for performance test
# Shen @  2013-11-07 11:00
#  Target: set quantitative data volume to make a controllable test process and reliable test result
#
#
#  Solution:
#    Data volume will be generated in three level: predicted, large and extreme
#       single: data volume of a single client
#       predicted: decide the data volume by the business forecast
#       large: decide the data volume by the big competitor's data volume
#       extreme: simulate an semi-impossible large data solution


# Testing Target:

# 001 User & Tenant
#   single: 1 tenants * 100 users
#   Predicted: 50 tenants * 15 users
#   large: 500 tenants * 20 users
#   extreme: 1000 tenants * 50 users


# 002 KPI & KPI Category
#   single: 10 categories * 30 kpis
#   Predicted: 10 categories * 30 kpis * 50 tenants
#   large: 10 categories * 30 kpis * 500 tenants
#   extreme: 10 categories * 30 kpis* 1000 tenants


# 003 Entity & Entity Group
#   single: 500 Entity * 25000 Entity Group
#   Predicted:  500 Entity * 25000 Entity Group * 50 tenants
#   large:  500 Entity * 25000 Entity Group * 500 tenants
#   extreme:   500 Entity * 25000 Entity Group * 1000 tenants



# 004 Kpi Entry
#   single:  500 Entity * 10 categories * 30 kpi /per day
#   Predicted: 500 Entity * 10 categories * 30 kpis * 50 tenants /per day
#   large: 500 Entity *  10 categories * 30 kpis * 500 tenants /per day
#   extreme: 500 Entity * 10 categories * 30 kpis * 1000 tenants  /per day



# 005 Dashboard & Dashboard Item
#   single: 1 tenants * 100 users * 10 Dashboards * 10 Items
#   Predicted: 50 tenants * 15 users * 10 Dashboards * 10 Items
#   large: 500 tenants * 20 users * 10 Dashboards * 10 Items
#   extreme: 1000 tenants * 50 users  * 10 Dashboards * 10 Items



# global
test_period = 1 #days



# define volume
# single model
single = {}

single[:tenant] = 1
single[:user_per_tenant] = 10
single[:kpi_category]= 20
single[:kpi_per_category] =  2      #prefer to change this
single[:entity]= 2
single[:entity_group_per_user]= 2
single[:entity_group_item]=5
single[:dashboard_per_user] =  10
single[:dashboard_item_per_dashboard] =   10

# fill in your configure for following testing models
predicted={}
large = {}
extreme = {}


#config your testing model here
current_mode = single


#begin generate
tenant_ids =[]
index=1
print "++++++++++++++++++++++start inserting\n\n"

while index<= current_mode[:tenant] do
  entity_ids=[]  #store the generated entity id
  user_ids=[] #store the generated user id
  kpi_ids=[]  #store the generated kpi id
  kpi_categories =[] #store the generated kpi category id
  entity_groups = []  #store the generated entity group id
  dashboard_ids=[] #store the generated dashboard id

  print "===================tenant#{index} inserted\n\n\n"

  create_user = User.new
  create_user = create_user.create_tenant_user!("tenant#{Time.now.strftime('%Y%m%dT%H%M%S%N')}@tenant#{index}.com",'1234567','1234567',"tenant#{index}")
  tenant_ids.push(create_user.tenant_id)


  print "===================start to insert entity\n"
  1.upto(current_mode[:entity]){|entity_i|
    to_create = Entity.new
    to_create.tenant_id = create_user.tenant_id
    to_create.name=  "entity#{entity_i}"
    to_create.save!
    entity_ids.push(to_create.id)
  }

  print "===================entity inserted\n\n\n"


  print "===================start to insert user\n"
  1.upto(current_mode[:user_per_tenant]){|user_i|
    user_to_create = User.new()
    user_to_create.email= "tenant#{Time.now.strftime('%Y%m%dT%H%M%S%N')}@tenant#{create_user.tenant_id}.com"
    user_to_create.password='123456'
    user_to_create.password_confirmation='123456'
    user_to_create.tenant_id = create_user.tenant_id
    user_to_create.status = UserStatus::ACTIVE
    user_to_create.is_tenant=false
    user_to_create.entity_id= entity_ids[rand(entity_ids.length)]
    user_to_create.role_id=400
    user_to_create.save!
    user_ids.push(user_to_create.id)
  }

  print "===================user inserted\n\n\n"



  print "===================start to insert entity group\n"
  user_ids.each{|usr|
    1.upto(current_mode[:entity_group_per_user]){|i|
      entity_group_to_create = EntityGroup.new
      entity_group_to_create.user_id = usr
      entity_group_to_create.name = "entity_group_#{i}"
      entity_group_to_create.save!
      entity_groups.push(entity_group_to_create.id)
    }
  }

  print "===================entity group inserted\n\n\n"



  print "===================start to insert entity group item\n"
  entity_groups.each{|eg|
    items=[]
    1.upto(current_mode[:entity_group_item]){|i|
      items.push({:entity_id=>entity_ids[rand(entity_ids.length)], :entity_group_id=>eg})

    }
    EntityGroupItem.create(items)
  }
  print "===================entity group item inserted\n\n\n"



  print "===================start to insert kpi category\n"
  1.upto(current_mode[:kpi_category]){|kpi_category_i|
    to_create = KpiCategory.new
    to_create.tenant_id= create_user.tenant_id
    to_create.name = "Kpi_Category_#{kpi_category_i}"
    to_create.save!
    kpi_categories.push(to_create.id)
  }
  print "===================kpi category inserted\n\n\n"



  print "===================start to insert kpi\n"
  frequency = [90,100,200,300]
  kpi_categories.each {|i|
    current_kpi = []
    current_frequency = frequency[rand(frequency.length)]
    1.upto(current_mode[:kpi_per_category]/2-1){|j|

      #half of direct API, another half of calculate KPI
      kpi_c = Kpi.new
      kpi_c.kpi_category_id = i
      kpi_c.name =  "KPI#{Time.now.strftime('%d%H%M%S%N')}"
      kpi_c.unit = 200
      kpi_c.frequency= current_frequency
      kpi_c.target_max= 100
      kpi_c.target_min= 0
      kpi_c.is_calculated = 0
      kpi_c.direction= 100
      kpi_c.user_id = user_ids[rand(user_ids.length)]
      kpi_c.tenant_id = create_user.tenant_id
      kpi_c.save!
      current_kpi.push(kpi_c.id)
      kpi_ids.push(kpi_c.id)
    }

    current_mode[:kpi_per_category]/2.upto(current_mode[:kpi_per_category]){|k|
      kpi_c = Kpi.new
      kpi_c.kpi_category_id = i
      kpi_c.unit = 200
      kpi_c.name =  "KPI#{Time.now.strftime('%d%H%M%S%N')}"
      kpi_c.frequency= current_frequency
      kpi_c.target_max= 100
      kpi_c.target_min= 0
      kpi_c.is_calculated = 1
      kpi_c.user_id = user_ids[rand(user_ids.length)]
      kpi_c.formula = "[#{current_kpi[rand(current_kpi.length)]}]+[#{current_kpi[rand(current_kpi.length)]}]-[#{current_kpi[rand(current_kpi.length)]}]*[#{current_kpi[rand(current_kpi.length)]}]"
      kpi_c.direction= 100
      kpi_c.tenant_id = create_user.tenant_id
      kpi_c.save!
      kpi_ids.push(kpi_c.id)
    }
  }
  print "===================kpi inserted\n\n\n"


  print "===================start to insert KPI entry\n"

  Kpi.all.each{|item|
    entry_items = []
    loop_time=0
    entry_time_block = nil
    case item.frequency
      when 90
        loop_time=24*test_period
        entry_time_block = Proc.new {|time,i| time+i*60*60}
      when 100
        loop_time=test_period
        entry_time_block = Proc.new {|time,i| time+i*60*60*24}
      when 200
        loop_time=(test_period/7).to_i
        entry_time_block = Proc.new {|time,i| time+i*7*60*60*24}
      when 300
        loop_time=test_period/30.to_i
        entry_time_block = Proc.new {|time,i| time+i*30*60*60*24}
    end
    time = Time.now

    Entity.all.each{|e|
      1.upto(loop_time){|i|
        kpi_value=rand(item.target_min-10..item.target_max+10)
        entry_time=  entry_time_block.call(time,i)
        entry_items.push({:entry_at=>entry_time.to_s,
                          :frequency=>item.frequency,
                          :value=>kpi_value,
                          :original_value=>kpi_value,
                          :parsed_entry_at=>entry_time,
                          #:user_kpi_item_id=>item.id,
                          :kpi_id=>item.id,
                          :abnormal=>0,
                          :user_id=>item.user_id,
                          :entity_id=>e.id,
                          :target_max=>item.target_max,
                          :target_min=>item.target_min})
      }
    }
    KpiEntry.create(entry_items)
  }

  print "===================kpi entry inserted\n\n\n"




  print "===================dashboard insert start\n"

  User.all.each{|usr|
    to_insert = Dashboard.new
    to_insert.user_id = usr.id
    to_insert.name = "Dashboard#{Time.now.strftime('%d%H%M%S%N')}"
    to_insert.description = 'test'
    to_insert.save!
    dashboard_ids.push(to_insert.id)
  }
  print "===================dashboard inserted\n\n\n"


  #fill some unrelated data to reach the target database volume.
  print "===================dashboard item data insert start\n"
  dashboard_ids.each{|i|

    1.upto(current_mode[:dashboard_item_per_dashboard]){|i|
      to_insert = DashboardItem.new
      to_insert.dashboard_id=i
      to_insert.sequence=1
      to_insert.interval=1
      to_insert.title='test'
      to_insert.chart_type='pie'
      to_insert.save!

      to_insert_condition = DashboardCondition.new
      to_insert_condition.entity_group =  entity_groups[rand(entity_groups.length)]
      to_insert_condition.dashboard_item_id = to_insert.id
      to_insert_condition.kpi_id=kpi_ids[rand(kpi_ids.length)]
      to_insert_condition.calculate_type =  'ACCUMULATE'
      to_insert_condition.time_string = 'LAST7DAY'
      to_insert_condition.count = 0
      to_insert_condition.save!
    }
  }
  print "===================dashboard item inserted\n\n\n"



  print "===================testing-specialized dashboard item data insert start\n"


  dash_config = []
  chart_types=['pie','line','scatter','column']
  dash_user_id=5
  time_now=Time.now



  ######################Configure enabled part#############
  # you can configure your own dashboard context via changing or adding new dash_config hash



  #case 1 Crash 50 DahboardItem, 2160 points per graph, all kpi calculated KPI -90 Days
  dash_config.push({
                       :dashboard_name=> 'CRASH',
                       :user_id=> dash_user_id ,
                       :chart_type=> chart_types[rand(chart_types.length)],
                       :calculate_type=>'AVERAGE',
                       :time_string=> "#{time_now.utc.iso8601}|#{(time_now+60*60*24*test_period).utc.iso8601}",
                       :count=> 0,
                       :dashboard_item_amount=>50,
                       :kpi_id=>Kpi.where('frequency=90').first.id
                   })


  #case 2 Abnormal 30 Dashboard Item, 1000 Points per graph, all KPI calculated KPI - 90 Days
  dash_config.push({
                       :dashboard_name=> 'ABNORMAL',
                       :user_id=> dash_user_id ,
                       :chart_type=> chart_types[rand(chart_types.length)],
                       :calculate_type=>'AVERAGE',
                       :time_string=> "#{time_now.utc.iso8601}|#{(time_now+(60*60*24*(test_period/2))).utc.iso8601}",
                       :count=> 0,
                       :dashboard_item_amount=>50,
                       :kpi_id=>Kpi.where('frequency=90').first.id
                   })


  #case 3 Big 15 Dashboard item, 200 points per graph, all KPI calculated KPI - 90 Days
  dash_config.push({
                       :dashboard_name=> 'BIG',
                       :user_id=> dash_user_id ,
                       :chart_type=> chart_types[rand(chart_types.length)],
                       :calculate_type=>'AVERAGE',
                       :time_string=> "#{time_now.utc.iso8601}|#{(time_now+(60*60*24*10)).utc.iso8601}",
                       :count=> 0,
                       :dashboard_item_amount=>50,
                       :kpi_id=>Kpi.where('frequency=90').first.id
                   })


  #case 4 small 5 dashboard item, 30 points per graph, all kpi calculated KPI -90 Days
  dash_config.push({
                       :dashboard_name=> 'SMALL',
                       :user_id=> dash_user_id ,
                       :chart_type=> chart_types[rand(chart_types.length)],
                       :calculate_type=>'AVERAGE',
                       :time_string=> "#{time_now.utc.iso8601}|#{(time_now+(60*60*24*30)).utc.iso8601}",
                       :count=> 0,
                       :dashboard_item_amount=>50,
                       :kpi_id=>Kpi.where('frequency=100 and is_calculated=1').first.id
                   })

  ######################Configure enabled part#############

  # Load Case Data
  dash_config.each{|config|

    #create dashboard
    to_insert_db = Dashboard.new
    to_insert_db.user_id = config[:user_id]
    to_insert_db.name = config[:dashboard_name]
    to_insert_db.description = 'case test dashboard'
    to_insert_db.save!

    1.upto(config[:dashboard_item_amount]) {|i|
      to_insert = DashboardItem.new
      to_insert.dashboard_id=i
      to_insert.sequence=1
      to_insert.interval=1
      to_insert.title="#{config[:dashboard_name]}#{i}"
      to_insert.chart_type=config[:chart_type]
      to_insert.save!

      to_insert_condition = DashboardCondition.new
      to_insert_condition.entity_group =  entity_groups[rand(entity_groups.length)]
      to_insert_condition.dashboard_item_id = to_insert.id
      to_insert_condition.kpi_id=config[:kpi_id]
      to_insert_condition.calculate_type =  'ACCUMULATE'
      to_insert_condition.time_string = config[:time_string]
      to_insert_condition.count = 0
      to_insert_condition.save!
    }



  }
  print "===================testing-specialized dashboard item data inserted\n\n\n"

 index=index+1
end

print '+++++++++++++++++++++++++++++++finished++++++++++++++++++++++++++++'










