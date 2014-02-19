require 'csv'
#create dashboard
ActiveRecord::Base.transaction do
  puts "start importing a.csv"
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
  puts "finish importing a.csv"

  #create dashboard item
  CSV.foreach("#{ARGV[0]}/b.csv", :headers => true, :col_sep => ';') do |row|
    params = {}
    if dashboards.has_key? row["belongs_to"]

      #for each kpis
      row["kpis"].split("|").each do |c|
        params[:dashboard_id] = dashboards[row["belongs_to"]].id
        params[:interval] = row["interval"]
        params[:title] = c
        params[:chart_type]=row["chart_type"]
        params[:sizex] = row["sizex"]
        params[:sizey] = row["sizey"]
        dashboard_item = DashboardItem.new(params)
        if dashboard_item.save!
          dashboarditems[row["code"]] = dashboard_item
        else
          puts "Dashboard Item created failed wit code:"+row["code"]
        end

        entity_groups = row["entitygroups"].split("+")
        if entity_groups.last.include?("|")
        else

        end

      end
    else
      puts "Dashboard not exit with code:"+row["belongs_to"]
    end
  end
  puts dashboarditems
end