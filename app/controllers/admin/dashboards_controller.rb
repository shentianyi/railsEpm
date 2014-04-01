#encoding: utf-8
class Admin::DashboardsController < Admin::ApplicationController
  # Get /admin/dashboards
  # Get /admin/dashboards.json
  def index

  end

  # POST /admin/dashboards/import
  # POST /admin/dashboards/import.json
  def import_dashboards
    msg = Message.new
    msg.result = true
    a = params[:files]

    #---------------------
    #Predefined variables
    #---------------------
    p_users = {}
    p_dashboards = {}
    p_entitygroups = {}
    p_kpis = {}
    if a.count == 1
      file = a[0]
      #save csv file
      csv = FileData.new(:data=>file,:oriName=>file.original_filename,:path=>$UPDATAPATH,:pathName=>SecureRandom.uuid+file.original_filename)
      csv.saveFile
      #read file
      updafile_path = File.join($UPDATAPATH,csv.pathName)
      encoding=SystemHelper.csv_read_encode( request.user_agent)
      oldfile_row_arrs = CSV.read(updafile_path,:headers=>true,:col_sep=>$CSVSP,:encoding=>encoding)
      #validation
      is_valid = true
      oldfile_row_arrs.each do |row|
        #validate every row and write errors
        #validate row
        row['errors'] = "#"
        if row['email'].nil? || row['name'].nil? || row['entitygroups'].nil? || row['chart_type'].nil? || row['sizex'].nil? || row['sizey'].nil? || row['kpis'].nil? || row['calculate_type'].nil? || row['time_string'].nil? || row['interval'].nil?
          is_valid = false
          row['errors'] += row['errors'] + "email,name,entitygroups,chart_type,sizex,sizey,kpis,calculate_type,chart_type,time_string,interval should not be empty;"
        end
        #---------------------
        #Validate Dashboard
        #---------------------
        #validate email
        if row['email'] && (p_users[row['email']] = User.find_by_email(row['email'])).nil?
          row['errors'] += row['errors'] + "User with email: "+ row['email']+ " not found;"
          is_valid = false
        end

        #validate oriname
        if row['oriname'] && (p_dashboards[row['name']] = Dashboard.find_by_name(row['oriname'])).nil?
          row['errors'] += "Dashboard with oriname:"+row['oriname']+" not found;"
          is_valid = false
        end
        #validate entitygroups
        if row['entitygroups']
          row['entitygroups'].split('+').each do |e|
            if (p_entitygroups[e] = EntityGroup.find_by_name(e)).nil?
              row['errors'] += "EntityGroup "+e+" not found;"
              is_valid = false
            end
          end
        end
        
        #---------------------
        #Validate Dashboard Items
        #---------------------
        #validate kpis
        if row['kpis']
          row['kpis'].split('|').each do |k|
            if (p_kpis[k] = Kpi.find_by_name(k)).nil?
              row['errors'] += "Kpi "+k+ " not found;"
              is_valid =false
            end
          end
        end
      end

      #failed validation
      if !is_valid
        #delete ori file
        File.delete(updafile_path) if File.exists?(updafile_path)
        #error doc
        new_file_path = File.join($UPDATAPATH,"dashboards_errors.csv")
        CSV.open(new_file_path,'w',:headers=>oldfile_row_arrs.headers,:write_headers=>true,:col_sep=>$CSVSP,:encoding=>encoding) do |csv|
          oldfile_row_arrs.each do |row|
            csv << row
          end
        end
        msg.result = false
        msg.content = {"file_path"=>new_file_path,"file_name"=>"dashboards_errors.csv"}
      else
        msg.result = true
        #start import dashboards
        oldfile_row_arrs.each do |row|
          #create dashboards
          if row['oriname']
            msg.result = p_dashboards[row['name']].update_attribute("name",row['name'])
            if !msg.result
              row["errors"] += "Update dashboard "+row["oriname"] + " to " + row['name'] +"failed!;"
            end
          else
            if p_dashboards[row['name']] = Dashboard.find_by_name(row['name'])

            else
              p_dashboards[row['name']] = Dashboard.new(:user_id=>p_users[row['email']].id,:name=>row['name'])
              msg.result = p_dashboards[row['name']].save
              if !msg.result
                row["errors"] += "Create dashboard " +row['name']+"failed!;"
              end
            end
          end

          #create dashboard item
          row['kpis'].split('|').each do |k|

            if d = DashboardItem.where("dashboard_id = ? AND title = ?",p_dashboards[row['name']].id,k).first
              d.destroy
            end

            params = {}
            params[:dashboard_id] = p_dashboards[row['name']].id
            params[:interval] = row['interval']
            params[:title] = k
            params[:chart_type] = row['chart_type']
            params[:sizex] = row['sizex']
            params[:sizey] = row['sizey']
            item = DashboardItem.new(params)
            msg.result = item.save
            if !msg.result
              row['errors'] += "Create DashboardItem "+k + "for Dashboard "+row['name'] +"email"+ row['email'] +" falied!;"
            end

            #create dsahboard conditions
            row['entitygroups'].split("+").each do |entity|
              param = {}
              param[:entity_group] = p_entitygroups[entity].id
              param[:kpi_id] = p_kpis[k].id
              param[:dashboard_item_id] = item.id
              param[:calculate_type] = row["calculate_type"]
              param[:time_string] = row["time_string"]
              param[:count] = 1
              condition = DashboardCondition.new(param)
              msg.result = condition.save
              if !msg.result
                row['errors'] += "Create DashboardCondition failed for "+ k +" for Dashboard "+row['name'] + " email "+row['email']+"failed!;"
              end
            end
          end
        end
        if msg.result
          #delete ori file and return true
          File.delete(updafile_path) if File.exists?(updafile_path)
        else
          #delete ori file
          File.delete(updafile_path) if File.exists?(updafile_path)
          #error doc
          new_file_path = File.join($UPDATAPATH,"dashboards_errors.csv")
          CSV.open(new_file_path,'w',:headers=>oldfile_row_arrs.headers,:write_headers=>true,:col_sep=>$CSVSP,:encoding=>encoding) do |csv|
            oldfile_row_arrs.each do |row|
              csv << row
            end
          end
          msg.result = false
          msg.content = {"file_path"=>new_file_path,"file_name"=>"dashboards_errors.csv"}
        end
      end
    else
      msg.result = false
      msg.content = "File count error!"
    end
    render :json=>msg
  end

  def error_file
    send_file(params[:file_path],:type=>"text/csv")
  end
end