require 'axlsx'

module FileHandler
  module Excel
    class KpiHandler< Base
      def self.download_entry_template(user, kpis)
        # 初始化消息的实例
        msg=Message.new

        # 初始化临时文件的路径
        # tmp_file = "#{$UPDATAPATH}/#{SecureRandom.hex}_#{user.first_name}_kpis_template.xlsx"
        tmp_file = "#{$UPDATAPATH}/#{SecureRandom.uuid}_kpis_template.xlsx"

        # 新建一个Excel文件
        begin
          p=Axlsx::Package.new

          kpis.each do |kpi|
            # 新建一个sheet
            sheet=p.workbook.add_worksheet(:name => kpi.name)
            # 写表头-写基本的
            column=['Email', 'KPIID', 'KPIName', 'Date', 'Value']
            kpi.kpi_properties.each do |property|
              column << property.name.to_s
            end
            sheet.add_row column
            # 写动态数据:用户信息和KPI信息
            sheet.add_row [
                              user.email,
                              kpi.id,
                              kpi.name,
                              '',
                              ''
                          ], types:[:string]
          end


          # 将Excel写入临时文件
          p.use_shared_strings =true
          p.serialize(tmp_file)

          # 更改msg值
          msg.result=true # or false
          msg.content=tmp_file # or others
        rescue Exception => e
          msg.content = e.message
        end
        msg
      end
    end
  end
end
