require 'csv'
#create dashboard
ActiveRecord::Base.transaction do
  puts "importing: a.csv"
  dashboards = {}
  CSV.foreach("#{ARGV[0]}/a.csv", :headers => true, :col_sep => ';') do |row|
    params= {}
    if user = User.find_by_email(row["email"])
      params[:user_id] = user.id
      params[:name] = row["name"]
      dashboard = Dashboard.new(params)
      if dashboard.save!
        dashboards[row["code"]] = dashboard
      else
        puts "Dashboard with email:"+row["email"]+" name:"+row["name"] + "created failed!";
      end
    else
      puts "User with: "+row["email"] + "not found!"
    end
  end
  puts dashboards
  puts "imported: a.csv"

  puts "importing: b.csv"
  dashboarditems = {}
  CSV.foreach("#{ARGV[0]}/b.csv", :headers => true, :col_sep => ';') do |row|
    params = {}
    if dashboards.has_key? row["belongs_to"]
      params[:dashboard_id] = dashboards[row["belongs_to"]].id
      params[:interval] = row["interval"]
      params[:title] = row["title"]
      params[:chart_type]=row["chart_type"]
      params[:sizex] = row["sizex"]
      params[:sizey] = row["sizey"]

      dashboard_item = DashboardItem.new(params)
      if dashboard_item.save!
        dashboarditems[row["code"]] = dashboard_item
      else
        puts "Dashboard Item created failed wit code:"+row["code"]
      end
    else
      puts "Dashboard not exit with code:"+row["belongs_to"]
    end
  end
  puts dashboarditems
  puts "imported: b.csv"

  puts "importing: c.csv"
  CSV.foreach("#{ARGV[0]}/c.csv", :headers => true, :col_sep => ';') do |row|
    params = {}

    if dashboarditems.has_key? row["belongs_to"]

    else
      puts "dashboard not founc with code:"+row["belongs_to"]
    end

    if (kpi = Kpi.find_by_name(row["kpi"])) && (entity_group = EntityGroup.find(row["entity_group"]))
      params[:entity_group] = entity_group.id
      params[:kpi_id] = kpi.id
      params[:dashboard_item_id] = dashboarditems[row["belongs_to"]].id
      params[:calculate_type] = row["calculate_type"]
      params[:time_string] = row["time_string"]
      params[:count] = 1
      condition = DashboardCondition.new(params)

      if condition.save!

      else
        puts "condition save failed with dashboard_item_id"+dashbord_item.id
      end

    else
      puts "Kpi not found with name:"+row["kpi"]+ "or entity_group not found with id "+row["entity_group"]
    end
  end
  puts "imported: c.csv"
end
