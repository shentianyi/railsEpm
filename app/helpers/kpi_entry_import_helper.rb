#encoding: utf-8
module KpiEntryImportHelper
  def self.import file,extention
    case extention
    when '.xls'
      return import_xls(file,extention)
    when '.xlsx'
      return import_xlsx(file,extention)
    end
  end

  def self.import_xls file,extention
    book=Spreadsheet.open file

    # error file
    error_book=Spreadsheet::Workbook.new
    error_sheet=error_book.create_worksheet
    error_header.each{|header| error_sheet.row(0).push(header)}
    error_format=excel_error_fromat
    error_header_length=error_header.length

    # read and handle file
    sheet=book.worksheet 0
    valid=true
    sheet.rows[1..-1].each_with_index do |row,i|
      	params=excel_xls_param row
      params.values.each{|v| error_sheet.row(i+1).push v}
      valid_msg=validate params
      unless valid_msg[:result]
       valid=false
       error_sheet.row(i+1).push valid_msg[:content].length
       error_sheet.row(i+1).push valid_msg[:content].join('#')
       error_sheet.row(i+1).set_format(error_header_length-1,error_format)
      end
    end
    return write_excel(error_book,SecureRandom.uuid+extention) unless valid
  end

  def self.import_xlsx file,extention
  end

  def self.write_excel book,file
      path="tmp/#{file}"
      book.write path
      AliyunOssService.store_kpi_entry_file(file,path)
  end

  def self.error_header
    ['Email','KPIID','KPIName','Date','Value','ErrorCount','Error']
  end

  def self.excel_error_fromat
    Spreadsheet::Format.new :color=>:red,:weight=>:bold
  end

  def self.excel_xls_param row
    params={}
    [:email,:kpi_id,:name,:date,:value].each_with_index do |key,i|
      params[key]=row[i]
    end
    return params
  end

  def self.validate params
    valid_result={result:true,content:[]}
    if user=User.find_by_email(params[:email])
      if kpi=Kpi.find_by_id_and_name(params[:kpi_id],params[:name])
        unless user_kpi_item=UserKpiItem.find_by_user_id_and_kpi_id(user.id,kpi.id)
          valid_result[:result]=false
          valid_result[:content]<<'kpi not assign to user'
        end
      else
        valid_result[:result]=false
        valid_result[:content]<<'invalid kpi'
      end
    else
      valid_result[:result]=false
      valid_result[:content]<<'invalid user email'
    end
    
    unless params[:date].to_s.is_date?
      valid_result[:result]=false
      valid_result[:content]<<'invalid date'
    end

    unless params[:value].to_s.is_number?
      valid_result[:result]=false
      valid_result[:content]<<'invalid value'
    end

    return valid_result
  end
end
