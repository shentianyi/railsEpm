require 'axlsx'

module FileHandler
  module Excel
    class AppCenterHandler< Base

      def self.download_cycle_time_detail(params)
        msg = Message.new
        begin
          tmp_file = full_export_path("CycleTime.xlsx") unless tmp_file
          p = Axlsx::Package.new

          parent=Department.find_by_id(params[:product_line])
          kpi=Kpi.first
          start_time=Time.parse(params[:start_time]).utc #.to_s
          end_time=(Time.parse(params[:end_time])-1.second).utc #.to_s

          p.workbook.add_worksheet(:name => "Total Count Worksheet") do |sheet|
            if kpi && parent

              sheet.add_row ['Name', 'Code', 'Value'], types: [:string, :string, :string]

              parent.children.each do |d|
                eg=d.entity_group
                e= eg.entities.first
                q = KpiEntry.where(kpi_id: Kpi.first.id,entity_id: e.id)

                q=q.between(Hash[:entry_at, (start_time..end_time)])
                sheet.add_row [eg.name, e.code, q.count], types: [:string, :string, :string]
              end
            else
              sheet.add_row ['No Data']
            end
          end


          if kpi && parent
            parent.children.each do |d|
              eg=d.entity_group
              e= eg.entities.first
              p.workbook.add_worksheet(:name => eg.name) do |sheet|

                q = KpiEntry.where(kpi_id: Kpi.first.id,
                                   entity_id: e.id)

                q=q.between(Hash[:entry_at, (start_time..end_time)]).order_by(entry_at: :asc)


                q.each do |entry|
                  sheet.add_row [
                      entry.entry_at,
                      KpiUnit.parse_entry_value(kpi.unit, entry.value),
                  ], types:[:string, :string]
                end
              end
            end
          end

          p.use_shared_strings = true
          p.serialize(tmp_file)

          msg.result =true
          msg.content =tmp_file
        rescue => e
          msg.content = e.message
        end
        msg
      end
    end
  end
end