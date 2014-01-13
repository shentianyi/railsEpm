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
  error_book=Spreadsheet::Workbook.open
  error_sheet=error_book.create_worksheet
  error_header.each{|header| error_sheet.row(0).push(header)}
  error_format=excel_error_fromat

  # read and handle file
  sheet=book.worksheet 0
  valid=true
  sheet.rows[1..-1].each_with_index do |row,i|
   params=excel_xls_param row
   params.values.each{|v| error_sheet.row(i+1).push v}
   
  end
  
 end

 def self.import_xlsx file,extention
 end

 def self.write_excel book,file
   
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
   params[key]=row(i)
  end
  return params
 end

 def self.validate params

 end
end
