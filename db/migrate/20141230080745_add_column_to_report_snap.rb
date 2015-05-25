class AddColumnToReportSnap < ActiveRecord::Migration
  def change
    add_column :report_snaps,:extra_info,:string
  end
end
