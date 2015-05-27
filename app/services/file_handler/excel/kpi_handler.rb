module FileHandler
  module Excel
    class KpiHandler< Base
      def self.download_entry_template(user, kpi)
        # 初始化消息的实例
        msg=Message.new
        # 初始化临时文件的路径
        tmp_file='*****'
        # 新建一个Excel文件
        p=Axlsx::Package.new
        # 新建一个sheet
        # 写表头-写基本的
        sheet.add_row ['Email', 'KPIID', 'KPIName', 'Date', 'Value']
        # 写动态数据:用户信息和KPI信息
        sheet.add_row [
                          user.email,
                          kpi.id,
                          kpi.name,
                          '',
                          ''
                      ], types:[:string]

        # 将Excel写入临时文件
        p.use_shared_strings =true
        p.serialize(tmp_file)

        # 更改msg值
        msg.result=true # or false
        msg.content=tmp_file # or others
        msg
      end
    end
  end
end