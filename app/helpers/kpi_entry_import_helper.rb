#encoding: utf-8

module KpiEntryImportHelper
  def self.import file, extention
    case extention
      when '.xls'
        return import_xls(file, extention)
      when '.xlsx'
        return import_xlsx(file, extention)
    end
  end

  def self.import_xls file, extention
    book=Spreadsheet.open file

    # error file
    error_book=Spreadsheet::Workbook.new
    error_sheet=error_book.create_worksheet
    error_header.each { |header| error_sheet.row(0).push(header) }
    error_format=excel_error_fromat
    error_header_length=error_header.length

    # read and handle file
    sheet=book.worksheet 0
    headers = sheet.rows[0]
    valid=true
    sheet.rows[1..-1].each_with_index do |row, i|
      params=excel_xls_param row,headers
      params.values.each { |v| error_sheet.row(i+1).push v }
      #date
     # if params[:date].is_a?(String)
        #params[:date] = Time.parse(params[:date])
      #else
        #params[:date] = params[:date].change(:offset => "+0800") if params[:date] #&& params[:date].utc?
      #end

      #
      params = Entry::OperateService.new.doc_upload_filter(params)
      validator=KpiEntryValidator.new(params)
      validator.validate
      
	  unless validator.valid
        valid=false
        error_sheet.row(i+1).push validator.content.length
        error_sheet.row(i+1).push validator.content.join(' # ')
        error_sheet.row(i+1).set_format(error_header_length-1, error_format)
      else
        validator.entry
      end
    end
    return write_excel(error_book, SecureRandom.uuid+extention, extention) unless valid
  end

  def self.import_xlsx file, extention
    book=Roo::Excelx.new file
    # error file
    error_book=Axlsx::Package.new
    error_sheet=error_book.workbook
    #error_header_length=error_header.length
    error_format=error_sheet.styles.add_style excelx_error_format

    valid=true
    book.sheets.each do |ssheet|

      book.default_sheet=ssheet

      next if book.first_row.blank?

      error_sheet.add_worksheet do |sheet|

        column_num = 1
        error_headers = []
        while !book.cell(1, column_num).nil?
          ss = book.cell(1, column_num)
          error_headers += [ss]
          column_num = column_num + 1
        end
        error_headers += ['ErrorCount', 'Error']
        error_header_length=error_headers.length
        sheet.add_row error_headers

        2.upto(book.last_row) do |line|
          params={}
          entry_param_keys.each_with_index do |key, i|
            params[key]=book.cell(line, i+1)
          end
          #fetch attrs
          i = entry_param_keys.length+1
          while !book.cell(1,i).nil?
            params[book.cell(1,i)] = book.cell(line,i)
            i = i+1
          end

          row_values=params.values


          params = Entry::OperateService.new.doc_upload_filter(params)
          validator=KpiEntryValidator.new(params)
          validator.validate



          unless validator.valid
            valid=false
            row_values<<validator.content.length
            row_values<< validator.content.join(' # ')
          else
            validator.entry
          end
          sheet.add_row row_values
          sheet.rows[line-1].cells[error_header_length-1].style=error_format unless validator.valid
        end
      end

    end
    return write_excel(error_book, SecureRandom.uuid+extention, extention) unless valid
  end

  def self.write_excel book, file, extention=nil
    path="tmp/#{file}"
    case extention
      when '.xls'
        book.write path
      when '.xlsx'
        book.serialize path
    end
    AliyunOssService.store_kpi_entry_file(file, path)
  end

  def self.error_header
    ['Email', 'KPIID', 'KPIName', 'Date', 'Value', 'ErrorCount', 'Error']
  end

  def self.excel_error_fromat
    Spreadsheet::Format.new :color => :red, :weight => :bold
  end

  def self.excelx_error_format
    {:style => :bold, :color => Axlsx::Color.new(:rgb => "FF0000"), :b => true}
  end

  def self.excel_xls_param row, headers
    params={}
    entry_param_keys.each_with_index do |key, i|
      params[key]=row[i]
    end
    #fetach attrs
    for col in entry_param_keys.length..(row.length-1)
      params[headers[col]] = row[col]
    end
    return params
  end

  def self.entry_param_keys
    [:email, :kpi_id, :kpi_name, :date, :value]
  end
end
