module FileHandler
  module Excel
    class ProductionPlansHandler<Base
      HEADERS=[
          "Date", "stock_no", "Producton Name", "Qty", "Actual qty", "model", "Control System", "Spin",
          "Top Plate", "Control Panel", "Color", "Front Door", "Cabinet", "Remark"
      ]

      def self.import(product_line, file, current_user)
        puts '-----------------------------------------------------------------'
        p product_line
        p file.full_path
        puts '-----------------------------------------------------------------'

        msg = Message.new
        book = Roo::Excelx.new file.full_path
        book.default_sheet = book.sheets.first

        # validate_msg = validate_import(file)
        #  if validate_msg.result
        #validate file
        # begin
          ProductionPlan.transaction do

            2.upto(book.last_row) do |line|
              row = {}
              HEADERS.each_with_index do |k, i|
                row[k] = book.cell(line, i+1).to_s.strip
                row[k]=row[k].sub(/\.0/, '') if k=='stock_no'
              end

              if row['Date'].present?

                begin

                  # if pp=ProductionPlan.where(assembly: row['stock_no'],
                  #                            product_line: '滚筒总装线',
                  #                            date: Time.parse(row['Date']).utc).first
                  #   pp.update_attributes(planned: row['Qty'])
                  # else
                  ProductionPlan.create(assembly: row['stock_no'],
                                        product_line: product_line,
                                        planned: row['Qty'],
                                        date: Time.parse(row['Date']).utc,
                                        remark: row['Remark'])
                    # end
                rescue => e
                  p e.class

                end

              end

              # if !row["ID"].blank? && wg=WireGroup.find_by_id(row["ID"])
              #   if row['operator'].blank? || row['operator']=='update'
              #     wg.update(row.except("ID", "operator"))
              #   elsif row['operator']=='delete'
              #     wg.destroy
              #   end
              # elsif row["ID"].blank?
              #   WireGroup.create(row.except("ID", "operator")) if row['operator'].blank?
              # end

            end
          end
          msg.result = true
          msg.content = "生产计划 上传成功"
        # rescue => e
        #   puts e.backtrace
        #   msg.result = false
        #   msg.content = e.message
        # end
        # else
        #   msg.result = false
        #   msg.content = validate_msg.content
        # end
        msg
      end


      def self.validate_import file
        tmp_file=full_tmp_path(file.original_name)
        msg = Message.new(result: true)
        book = Roo::Excelx.new file.full_path
        book.default_sheet = book.sheets.first

        p = Axlsx::Package.new
        p.workbook.add_worksheet(:name => "Basic Worksheet") do |sheet|
          sheet.add_row HEADERS+['Error Msg']
          #validate file
          2.upto(book.last_row) do |line|
            row = {}
            HEADERS.each_with_index do |k, i|
              row[k] = book.cell(line, i+1).to_s.strip
            end

            mssg = validate_row(row, line)
            if mssg.result
              sheet.add_row row.values
            else
              if msg.result
                msg.result = false
                msg.content = "下载错误文件<a href='/files/#{Base64.urlsafe_encode64(tmp_file)}'>#{::File.basename(tmp_file)}</a>"
              end
              sheet.add_row row.values<<mssg.content
            end
          end
        end
        p.use_shared_strings = true
        p.serialize(tmp_file)
        msg
      end

      def self.validate_row(row, line)
        msg=Message.new(contents: [])
        if row["Date"].blank?
          # items = WireGroup.where(wire_type: row["wire_type"])
          # items.each do |item|
          #   if item.cross_section == row["cross_section"].to_f
          #     msg.contents << "wire_type:#{row['wire_type']}, cross_section:#{row['cross_section']},该信息已存在线组名：#{item.group_name}"
          #   end
          # end
        end

        unless msg.result=(msg.contents.size==0)
          msg.content=msg.contents.join('/')
        end
        return msg
      end

    end
  end
end