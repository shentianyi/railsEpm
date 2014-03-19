require 'csv'
#create dashboard
ActiveRecord::Base.transaction do
  puts "start importing dashboard".blue
  dashboards = {}
  entity_groups = {}
  CSV.foreach("#{ARGV[0]}/a.csv", :headers => true, :col_sep => ';') do |row|
    params= {}
    if user = User.find_by_email(row["email"])
      #if someone already has the same dashbaord?
      if dashboard = Dashboard.where("user_id = ? AND name= ?",user.id,row["name"]).first
        puts ("arleady find"+dashboard.name).yellow
        dashboards[row["code"]] = dashboard
        entity_groups[row["code"]] = row["entitygroups"]
      else
        params[:user_id] = user.id
        params[:name] = row["name"]
        dashboard = Dashboard.new(params)
        if dashboard.save!
          puts "create new dashboard"+dashboard.name + "with code :" + row["code"]
          dashboards[row["code"]] = dashboard
          entity_groups[row["code"]] = row["entitygroups"]
        else
          puts ("##Dashboard with email:"+row["email"]+" name:"+row["name"] + "created failed!").red;
        end
      end
    else
      puts ("##User with: "+row["email"] + "not found!").red
    end
  end

  #create dashboard item
  CSV.foreach("#{ARGV[0]}/b.csv", :headers => true, :col_sep => ';') do |row|
    params = {}
    if dashboards.has_key? row["belongs_to"]

      #for each kpis
      row["kpis"].split("|").each do |kpi|
        #check if we already have the same dashboar item
        if d = DashboardItem.where("dashboard_id = ? AND title = ?",dashboards[row["belongs_to"]].id,kpi).first
          d.destroy
          puts ("already find dashboard item "+d.title+",destroy!").yellow
        end
        params[:dashboard_id] = dashboards[row["belongs_to"]].id
        params[:interval] = row["interval"]
        params[:title] = kpi
        params[:chart_type]=row["chart_type"]
        params[:sizex] = row["sizex"]
        params[:sizey] = row["sizey"]
        dashboard_item = DashboardItem.new(params)
        if dashboard_item.save!
          puts "##create new dashboard item "+kpi + " for Dashboard:"+row["belongs_to"]
          groups = entity_groups[row["belongs_to"]].split("+")

          if groups.last.include?("|")
            # do not use this
            #if we have "|"
            list_groups = groups.last.split("|")
            groups.delete(groups.last)

            list_groups.each do |all|

            end
          else
            #if we do not have "|"
            groups.each do |g|
              if (k = Kpi.find_by_name(kpi)) && (entity_group = EntityGroup.find_by_name(g))
                param = {}
                param[:entity_group] = entity_group.id
                param[:kpi_id] = k.id
                param[:dashboard_item_id] = dashboard_item.id
                param[:calculate_type] = row["calculate_type"]
                param[:time_string] = row["time_string"]
                param[:count] = 1
                condition = DashboardCondition.new(param)

                if condition.save!
                  puts "####Dashboard condition created for "+dashboard_item.id.to_s
                else
                  puts ("##condition save failed with dashboard_item_id"+kpi).red
                end

              else
                puts ("##Kpi not found with name:"+kpi+ " or entity_group not found with id "+g).red
              end
            end
          end
        else
          puts ("##Dashboard Item created failed with code:"+row["code"]).red
        end
      end
    else
      puts ("Dashboard not exit with code:"+row["belongs_to"]).red
    end
  end
  puts "end importing dashboard ".blue
end
