# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20161014030853) do

  create_table "admin_kpi_category_templates", :force => true do |t|
    t.string "name"
    t.string "description"
    t.integer "kpi_quantity", :default => 0
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "admin_kpi_templates", :force => true do |t|
    t.string "description"
    t.string "name"
    t.integer "unit"
    t.integer "frequency"
    t.float "target"
    t.boolean "is_calculated", :default => false
    t.integer "direction"
    t.integer "period"
    t.string "formula"
    t.string "formula_string"
    t.integer "admin_kpi_category_template_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "admin_kpi_templates", ["admin_kpi_category_template_id"], :name => "index_admin_kpi_templates_on_admin_kpi_category_template_id"

  create_table "attachments", :force => true do |t|
    t.string "name"
    t.string "path"
    t.string "size"
    t.string "type"
    t.string "pathname"
    t.integer "attachable_id"
    t.string "attachable_type"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "attachments", ["attachable_id"], :name => "index_attachments_on_attachable_id"
  add_index "attachments", ["attachable_type"], :name => "index_attachments_on_attachable_type"

  create_table "auto_scrap_records", :force => true do |t|
    t.string "scrap_id"
    t.string "order_nr"
    t.string "kanban_nr"
    t.string "machine_nr"
    t.string "part_nr"
    t.decimal "qty", :precision => 15, :scale => 10
    t.string "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "auto_scrap_records", ["order_nr"], :name => "index_auto_scrap_records_on_order_nr"
  add_index "auto_scrap_records", ["scrap_id"], :name => "index_auto_scrap_records_on_scrap_id"

  create_table "chart_conditions", :force => true do |t|
    t.integer "entity_group_id"
    t.integer "kpi_id"
    t.string "calculate_type"
    t.string "time_string"
    t.integer "chartable_id"
    t.string "chartable_type"
    t.integer "interval"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string "chart_type"
    t.string "kpi_property"
    t.text "query"
    t.text "data"
  end

  add_index "chart_conditions", ["entity_group_id"], :name => "index_chart_conditions_on_entity_group_id"
  add_index "chart_conditions", ["kpi_id"], :name => "index_chart_conditions_on_kpi_id"

  create_table "comments", :force => true do |t|
    t.integer "user_id"
    t.integer "tenant_id"
    t.string "content"
    t.integer "commentable_id"
    t.string "commentable_type"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "comments", ["tenant_id"], :name => "index_comments_on_tenant_id"
  add_index "comments", ["user_id"], :name => "index_comments_on_user_id"

  create_table "contacts", :force => true do |t|
    t.string "name"
    t.string "department"
    t.string "tel"
    t.string "phone"
    t.string "email"
    t.string "title"
    t.integer "tenant_id"
    t.string "image_url"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "contacts", ["tenant_id"], :name => "index_contacts_on_tenant_id"

  create_table "crimp_configuration_items", :force => true do |t|
    t.integer "crimp_configuration_id"
    t.string "side"
    t.float "min_pulloff"
    t.float "crimp_height"
    t.float "crimp_height_iso"
    t.float "crimp_width"
    t.float "crimp_width_iso"
    t.float "i_crimp_height"
    t.float "i_crimp_height_iso"
    t.float "i_crimp_width"
    t.float "i_crimp_width_iso", :default => 0.0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "crimp_configuration_items", ["crimp_configuration_id"], :name => "index_crimp_configuration_items_on_crimp_configuration_id"

  create_table "crimp_configurations", :force => true do |t|
    t.string "custom_id"
    t.string "wire_group_name"
    t.string "part_id"
    t.string "wire_type"
    t.decimal "cross_section", :precision => 15, :scale => 10, :default => 0.0
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float "min_pulloff_value", :default => 0.0
    t.float "crimp_height", :default => 0.0
    t.float "crimp_height_iso", :default => 0.0
    t.float "crimp_width", :default => 0.0
    t.float "crimp_width_iso", :default => 0.0
    t.float "i_crimp_height", :default => 0.0
    t.float "i_crimp_height_iso", :default => 0.0
    t.float "i_crimp_width", :default => 0.0
    t.float "i_crimp_width_iso", :default => 0.0
  end

  add_index "crimp_configurations", ["part_id"], :name => "index_crimp_configurations_on_part_id"
  add_index "crimp_configurations", ["wire_group_name"], :name => "index_crimp_configurations_on_wire_group_name"
  add_index "crimp_configurations", ["wire_type"], :name => "index_crimp_configurations_on_wire_type"

  create_table "custom_details", :force => true do |t|
    t.string "part_nr_from"
    t.string "part_nr_to"
    t.string "custom_nr"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "custom_details", ["custom_nr"], :name => "index_custom_details_on_custom_nr"

  create_table "custom_fields", :force => true do |t|
    t.string "custom_fieldable_type"
    t.integer "custom_fieldable_id"
    t.string "type"
    t.string "name", :null => false
    t.string "field_format", :null => false
    t.text "possible_values"
    t.string "regexp"
    t.integer "min_length"
    t.integer "max_length"
    t.boolean "is_required", :default => false, :null => false
    t.boolean "is_for_all", :default => false, :null => false
    t.boolean "is_filter", :default => false, :null => false
    t.boolean "is_for_out_stock", :default => false, :null => false
    t.integer "position", :default => 1
    t.boolean "searchable", :default => false, :null => false
    t.text "default_value"
    t.boolean "editable", :default => true
    t.boolean "visible", :default => true, :null => false
    t.boolean "multiple", :default => false
    t.text "format_store"
    t.boolean "is_query_value", :default => false
    t.text "validate_query"
    t.string "validate_message"
    t.text "value_query"
    t.text "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "custom_fields", ["custom_fieldable_id", "custom_fieldable_type"], :name => "custom_fieldable_index"
  add_index "custom_fields", ["id", "type"], :name => "index_custom_fields_on_id_and_type"
  add_index "custom_fields", ["type"], :name => "index_custom_fields_on_type"

  create_table "custom_values", :force => true do |t|
    t.string "customized_type"
    t.integer "customized_id"
    t.boolean "is_for_out_stock", :default => false, :null => false
    t.integer "custom_field_id"
    t.text "value"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "custom_values", ["custom_field_id"], :name => "index_custom_values_on_custom_field_id"
  add_index "custom_values", ["customized_type", "customized_id"], :name => "index_custom_values_on_customized_type_and_customized_id"

  create_table "dashboard_conditions", :force => true do |t|
    t.integer "dashboard_item_id"
    t.string "entity_group", :null => false
    t.string "kpi_id", :null => false
    t.string "calculate_type", :null => false
    t.string "time_string", :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer "count"
    t.text "kpi_property"
    t.string "x_group"
  end

  create_table "dashboard_items", :force => true do |t|
    t.integer "dashboard_id", :null => false
    t.integer "sequence"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer "interval"
    t.string "title"
    t.string "chart_type"
    t.integer "row"
    t.integer "col"
    t.integer "sizex"
    t.integer "sizey"
    t.string "last_update"
  end

  create_table "dashboards", :force => true do |t|
    t.integer "user_id", :null => false
    t.string "name", :null => false
    t.string "description"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "department_kpis", :force => true do |t|
    t.integer "department_id"
    t.integer "kpi_id"
    t.integer "kpi_quantity", :default => 1
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "department_kpis", ["department_id"], :name => "index_department_kpis_on_department_id"
  add_index "department_kpis", ["kpi_id"], :name => "index_department_kpis_on_kpi_id"

  create_table "departments", :force => true do |t|
    t.string "name"
    t.string "ancestry"
    t.integer "tenant_id"
    t.integer "user_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string "cn_name"
    t.boolean "is_product_line", :default => false
  end

  add_index "departments", ["ancestry"], :name => "index_departments_on_ancestry"
  add_index "departments", ["tenant_id"], :name => "index_departments_on_tenant_id"
  add_index "departments", ["user_id"], :name => "index_departments_on_user_id"

  create_table "display_set_items", :force => true do |t|
    t.integer "display_set_list_id"
    t.integer "department_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "display_set_items", ["department_id"], :name => "index_display_set_items_on_department_id"
  add_index "display_set_items", ["display_set_list_id"], :name => "index_display_set_items_on_display_set_list_id"

  create_table "display_set_lists", :force => true do |t|
    t.integer "user_id"
    t.date "name"
    t.string "remark"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "display_set_lists", ["user_id"], :name => "index_display_set_lists_on_user_id"

  create_table "emails", :force => true do |t|
    t.string "sender"
    t.string "receivers"
    t.string "file_path"
    t.integer "user_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string "content"
    t.string "title"
    t.integer "kpi_id"
    t.integer "entity_group_id"
  end

  add_index "emails", ["entity_group_id"], :name => "index_emails_on_entity_group_id"
  add_index "emails", ["kpi_id"], :name => "index_emails_on_kpi_id"
  add_index "emails", ["user_id"], :name => "index_emails_on_user_id"

  create_table "entities", :force => true do |t|
    t.string "name"
    t.integer "status"
    t.integer "user_quantity", :default => 0
    t.integer "tenant_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string "description"
    t.string "code"
    t.integer "department_id"
    t.boolean "is_last", :default => false
    t.integer "type", :default => 100
  end

  add_index "entities", ["department_id"], :name => "index_entities_on_department_id"
  add_index "entities", ["tenant_id"], :name => "index_entities_on_tenant_id"

  create_table "entity_contacts", :force => true do |t|
    t.integer "contactable_id"
    t.string "contactable_type"
    t.integer "contact_id"
    t.integer "tenant_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer "user_id"
  end

  add_index "entity_contacts", ["contact_id"], :name => "index_entity_contacts_on_contact_id"
  add_index "entity_contacts", ["contactable_id"], :name => "index_entity_contacts_on_contactable_id"
  add_index "entity_contacts", ["contactable_type"], :name => "index_entity_contacts_on_contactable_type"
  add_index "entity_contacts", ["tenant_id"], :name => "index_entity_contacts_on_tenant_id"
  add_index "entity_contacts", ["user_id"], :name => "index_entity_contacts_on_user_id"

  create_table "entity_group_items", :force => true do |t|
    t.integer "entity_id"
    t.integer "entity_group_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer "user_id"
  end

  add_index "entity_group_items", ["entity_group_id"], :name => "index_entity_group_items_on_entity_group_id"
  add_index "entity_group_items", ["entity_id"], :name => "index_entity_group_items_on_entity_id"
  add_index "entity_group_items", ["user_id"], :name => "index_entity_group_items_on_user_id"

  create_table "entity_groups", :force => true do |t|
    t.string "name"
    t.integer "user_id"
    t.integer "tenant_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.boolean "is_public", :default => false
    t.string "description"
    t.string "code"
    t.integer "department_id"
    t.integer "show_index", :default => 10
  end

  add_index "entity_groups", ["department_id"], :name => "index_entity_groups_on_department_id"
  add_index "entity_groups", ["tenant_id"], :name => "index_entity_groups_on_tenant_id"
  add_index "entity_groups", ["user_id"], :name => "index_entity_groups_on_user_id"

  create_table "kanban_process_entities", :force => true do |t|
    t.integer "kanban_id"
    t.integer "process_entity_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer "position", :default => 0
    t.integer "state", :default => 100
  end

  add_index "kanban_process_entities", ["kanban_id"], :name => "index_kanban_process_entities_on_kanban_id"
  add_index "kanban_process_entities", ["process_entity_id"], :name => "index_kanban_process_entities_on_process_entity_id"
  add_index "kanban_process_entities", ["state"], :name => "index_kanban_process_entities_on_state"

  create_table "kanbans", :force => true do |t|
    t.string "nr", :null => false
    t.string "remark"
    t.integer "quantity", :default => 0
    t.float "safety_stock", :default => 0.0, :null => false
    t.integer "copies", :default => 0
    t.integer "state", :default => 0
    t.string "source_warehouse"
    t.string "source_storage"
    t.string "des_warehouse"
    t.string "des_storage"
    t.datetime "print_time"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer "ktype"
    t.integer "product_id", :null => false
    t.integer "bundle", :default => 0
    t.string "remark2", :default => ""
    t.integer "auto_copy_count", :default => 1
  end

  add_index "kanbans", ["des_storage"], :name => "index_kanbans_on_des_storage"
  add_index "kanbans", ["nr"], :name => "index_kanbans_on_nr"
  add_index "kanbans", ["product_id"], :name => "index_kanbans_on_product_id"
  add_index "kanbans", ["state"], :name => "index_kanbans_on_state"

  create_table "kpi_categories", :force => true do |t|
    t.string "name", :default => "Default"
    t.integer "kpi_quantity", :default => 0
    t.string "description"
    t.integer "tenant_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "kpi_categories", ["tenant_id"], :name => "index_kpi_categories_on_tenant_id"

  create_table "kpi_entries", :force => true do |t|
    t.string "entry_at"
    t.integer "frequency"
    t.float "value"
    t.float "original_value"
    t.datetime "parsed_entry_at"
    t.integer "user_kpi_item_id"
    t.integer "kpi_id"
    t.boolean "abnormal", :default => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer "user_id"
    t.integer "entity_id"
    t.float "target_max"
    t.float "target_min", :default => 0.0
  end

  add_index "kpi_entries", ["entity_id"], :name => "index_kpi_entries_on_entity_id"
  add_index "kpi_entries", ["entry_at"], :name => "index_kpi_entries_on_entry_at"
  add_index "kpi_entries", ["parsed_entry_at"], :name => "index_kpi_entries_on_parsed_entry_at"
  add_index "kpi_entries", ["user_id"], :name => "index_kpi_entries_on_user_id"
  add_index "kpi_entries", ["user_kpi_item_id"], :name => "index_kpi_entries_on_user_kpi_item_id"

  create_table "kpi_items", :force => true do |t|
    t.integer "item_id"
    t.integer "kpi_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "kpi_items", ["item_id"], :name => "index_kpi_items_on_item_id"
  add_index "kpi_items", ["kpi_id"], :name => "index_kpi_items_on_kpi_id"

  create_table "kpi_properties", :force => true do |t|
    t.string "name"
    t.integer "user_id"
    t.integer "tenant_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "kpi_properties", ["tenant_id"], :name => "index_kpi_properties_on_tenant_id"
  add_index "kpi_properties", ["user_id"], :name => "index_kpi_properties_on_user_id"

  create_table "kpi_property_items", :force => true do |t|
    t.integer "kpi_id"
    t.integer "kpi_property_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "kpi_property_items", ["kpi_id"], :name => "index_kpi_property_items_on_kpi_id"
  add_index "kpi_property_items", ["kpi_property_id"], :name => "index_kpi_property_items_on_kpi_property_id"

  create_table "kpi_property_values", :force => true do |t|
    t.integer "kpi_property_item_id"
    t.string "value"
    t.integer "count"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "kpi_property_values", ["kpi_property_item_id"], :name => "index_kpi_property_values_on_kpi_property_item_id"

  create_table "kpi_subscribe_alerts", :force => true do |t|
    t.integer "kpi_subscribe_id"
    t.string "alert_type"
    t.float "value"
    t.integer "tenant_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "kpi_subscribe_alerts", ["kpi_subscribe_id"], :name => "index_kpi_subscribe_alerts_on_kpi_subscribe_id"
  add_index "kpi_subscribe_alerts", ["tenant_id"], :name => "index_kpi_subscribe_alerts_on_tenant_id"

  create_table "kpi_subscribe_users", :force => true do |t|
    t.integer "user_id"
    t.integer "kpi_subscribe_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "kpi_subscribe_users", ["kpi_subscribe_id"], :name => "index_kpi_subscribe_users_on_kpi_subscribe_id"
  add_index "kpi_subscribe_users", ["user_id"], :name => "index_kpi_subscribe_users_on_user_id"

  create_table "kpi_subscribes", :force => true do |t|
    t.integer "user_id"
    t.integer "kpi_id"
    t.integer "tenant_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.boolean "is_alert", :default => false
    t.boolean "alert_by_sms", :default => false
    t.boolean "alert_by_email", :default => false
  end

  add_index "kpi_subscribes", ["kpi_id"], :name => "index_kpi_subscribes_on_kpi_id"
  add_index "kpi_subscribes", ["tenant_id"], :name => "index_kpi_subscribes_on_tenant_id"
  add_index "kpi_subscribes", ["user_id"], :name => "index_kpi_subscribes_on_user_id"

  create_table "kpis", :force => true do |t|
    t.string "name"
    t.string "description"
    t.integer "kpi_category_id"
    t.integer "unit"
    t.integer "frequency"
    t.float "target_max", :default => 0.0
    t.boolean "is_calculated", :default => false
    t.integer "direction"
    t.integer "period"
    t.text "formula"
    t.text "formula_string"
    t.integer "user_id"
    t.integer "tenant_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.float "target_min", :default => 0.0
    t.string "code"
  end

  add_index "kpis", ["kpi_category_id"], :name => "index_kpis_on_kpi_category_id"
  add_index "kpis", ["tenant_id"], :name => "index_kpis_on_tenant_id"
  add_index "kpis", ["user_id"], :name => "index_kpis_on_user_id"

  create_table "machine_combinations", :force => true do |t|
    t.integer "w1"
    t.integer "t1"
    t.integer "t2"
    t.integer "s1"
    t.integer "s2"
    t.string "wd1"
    t.integer "w2"
    t.integer "t3"
    t.integer "t4"
    t.integer "s3"
    t.integer "s4"
    t.string "wd2"
    t.integer "machine_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer "complexity", :default => 0
    t.integer "match_start_index", :default => 0
    t.integer "match_end_index", :default => 0
  end

  add_index "machine_combinations", ["machine_id"], :name => "index_machine_combinations_on_machine_id"

  create_table "machine_scopes", :force => true do |t|
    t.boolean "w1", :default => false
    t.boolean "t1", :default => false
    t.boolean "t2", :default => false
    t.boolean "s1", :default => false
    t.boolean "s2", :default => false
    t.boolean "wd1", :default => false
    t.boolean "w2", :default => false
    t.boolean "t3", :default => false
    t.boolean "t4", :default => false
    t.boolean "s3", :default => false
    t.boolean "s4", :default => false
    t.boolean "wd2", :default => false
    t.integer "machine_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "machine_scopes", ["machine_id"], :name => "index_machine_scopes_on_machine_id"

  create_table "machine_time_rules", :force => true do |t|
    t.integer "oee_code_id"
    t.integer "machine_type_id"
    t.float "length"
    t.float "time", :default => 0.0
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float "min_length"
    t.float "std_time"
  end

  add_index "machine_time_rules", ["length"], :name => "index_machine_time_rules_on_length"
  add_index "machine_time_rules", ["machine_type_id"], :name => "index_machine_time_rules_on_machine_type_id"
  add_index "machine_time_rules", ["min_length"], :name => "index_machine_time_rules_on_min_length"
  add_index "machine_time_rules", ["oee_code_id"], :name => "index_machine_time_rules_on_oee_code_id"

  create_table "machine_types", :force => true do |t|
    t.string "nr"
    t.string "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "machines", :force => true do |t|
    t.string "nr"
    t.string "name"
    t.string "description"
    t.integer "resource_group_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float "print_time", :default => 45.0
    t.float "seal_time", :default => 40.0
    t.float "terminal_time", :default => 15.0
    t.float "wire_time", :default => 5.0
    t.integer "status", :default => 0
    t.string "ip"
    t.integer "machine_type_id"
    t.float "wire_length_time", :default => 2.0
  end

  add_index "machines", ["machine_type_id"], :name => "index_machines_on_machine_type_id"
  add_index "machines", ["nr"], :name => "index_machines_on_nr"
  add_index "machines", ["resource_group_id"], :name => "index_machines_on_resource_group_id"

  create_table "master_bom_items", :force => true do |t|
    t.float "qty"
    t.integer "bom_item_id"
    t.integer "product_id"
    t.integer "department_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string "project_name"
  end

  add_index "master_bom_items", ["bom_item_id"], :name => "index_master_bom_items_on_bom_item_id"
  add_index "master_bom_items", ["department_id"], :name => "index_master_bom_items_on_department_id"
  add_index "master_bom_items", ["product_id"], :name => "index_master_bom_items_on_product_id"
  add_index "master_bom_items", ["project_name"], :name => "index_master_bom_items_on_project_name"

  create_table "measure_units", :force => true do |t|
    t.string "code"
    t.string "describe"
    t.string "cn"
    t.string "en"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "measure_units", ["code"], :name => "index_measure_units_on_code"

  create_table "measured_value_records", :force => true do |t|
    t.string "production_order_id"
    t.string "part_id"
    t.float "crimp_height_1"
    t.float "crimp_height_2"
    t.float "crimp_height_3"
    t.float "crimp_height_4"
    t.float "crimp_height_5"
    t.float "crimp_width"
    t.float "i_crimp_heigth"
    t.float "i_crimp_width"
    t.float "pulloff_value"
    t.string "note"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string "machine_id", :default => ""
  end

  add_index "measured_value_records", ["machine_id"], :name => "index_measured_value_records_on_machine_id"
  add_index "measured_value_records", ["production_order_id"], :name => "index_measured_value_records_on_production_order_id"

  create_table "ncr_api_logs", :force => true do |t|
    t.string "machine_nr"
    t.string "order_item_nr"
    t.integer "log_type"
    t.integer "order_item_state"
    t.float "order_item_qty"
    t.text "params_detail"
    t.text "return_detail"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "oauth_access_grants", :force => true do |t|
    t.integer "resource_owner_id", :null => false
    t.integer "application_id", :null => false
    t.string "token", :null => false
    t.integer "expires_in", :null => false
    t.text "redirect_uri", :null => false
    t.datetime "created_at", :null => false
    t.datetime "revoked_at"
    t.string "scopes"
  end

  add_index "oauth_access_grants", ["token"], :name => "index_oauth_access_grants_on_token", :unique => true

  create_table "oauth_access_tokens", :force => true do |t|
    t.integer "resource_owner_id"
    t.integer "application_id"
    t.string "token", :null => false
    t.string "refresh_token"
    t.integer "expires_in"
    t.datetime "revoked_at"
    t.datetime "created_at", :null => false
    t.string "scopes"
  end

  add_index "oauth_access_tokens", ["refresh_token"], :name => "index_oauth_access_tokens_on_refresh_token", :unique => true
  add_index "oauth_access_tokens", ["resource_owner_id"], :name => "index_oauth_access_tokens_on_resource_owner_id"
  add_index "oauth_access_tokens", ["token"], :name => "index_oauth_access_tokens_on_token", :unique => true

  create_table "oauth_applications", :force => true do |t|
    t.string "name", :null => false
    t.string "uid", :null => false
    t.string "secret", :null => false
    t.text "redirect_uri", :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer "owner_id"
    t.string "owner_type"
  end

  add_index "oauth_applications", ["owner_id", "owner_type"], :name => "index_oauth_applications_on_owner_id_and_owner_type"
  add_index "oauth_applications", ["uid"], :name => "index_oauth_applications_on_uid", :unique => true

  create_table "oee_codes", :force => true do |t|
    t.string "nr"
    t.string "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "part_boms", :force => true do |t|
    t.integer "part_id"
    t.integer "bom_item_id"
    t.float "quantity"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "part_boms", ["bom_item_id"], :name => "index_part_boms_on_bom_item_id"
  add_index "part_boms", ["part_id"], :name => "index_part_boms_on_part_id"

  create_table "part_positions", :force => true do |t|
    t.integer "part_id"
    t.string "storage"
    t.string "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "part_process_entities", :force => true do |t|
    t.integer "part_id"
    t.integer "process_entity_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "part_process_entities", ["part_id"], :name => "index_part_process_entities_on_part_id"
  add_index "part_process_entities", ["process_entity_id"], :name => "index_part_process_entities_on_process_entity_id"

  create_table "part_tools", :force => true do |t|
    t.integer "part_id"
    t.integer "tool_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "part_tools", ["part_id"], :name => "index_part_tools_on_part_id"
  add_index "part_tools", ["tool_id"], :name => "index_part_tools_on_tool_id"

  create_table "parts", :force => true do |t|
    t.string "nr"
    t.string "custom_nr"
    t.integer "type"
    t.float "strip_length"
    t.integer "resource_group_id"
    t.integer "measure_unit_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text "description"
    t.string "color"
    t.string "color_desc"
    t.string "component_type"
    t.float "cross_section", :default => 0.0
    t.string "remark"
    t.decimal "convert_unit", :precision => 10, :scale => 0, :default => 1
    t.string "addr"
    t.string "unit"
    t.string "desc1"
    t.string "pno"
    t.string "nick_name"
  end

  add_index "parts", ["custom_nr"], :name => "index_parts_on_custom_nr"
  add_index "parts", ["measure_unit_id"], :name => "index_parts_on_measure_unit_id"
  add_index "parts", ["nr"], :name => "index_parts_on_nr"
  add_index "parts", ["resource_group_id"], :name => "index_parts_on_resource_group_id"
  add_index "parts", ["type"], :name => "index_parts_on_type"

  create_table "positions", :force => true do |t|
    t.string "detail"
    t.integer "warehouse_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "positions", ["warehouse_id"], :name => "index_positions_on_warehouse_id"

  create_table "process_entities", :force => true do |t|
    t.string "nr", :null => false
    t.string "name"
    t.text "description"
    t.float "stand_time", :default => 0.0
    t.integer "process_template_id"
    t.integer "workstation_type_id"
    t.integer "cost_center_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer "product_id", :null => false
    t.text "remark"
  end

  add_index "process_entities", ["cost_center_id"], :name => "index_process_entities_on_cost_center_id"
  add_index "process_entities", ["process_template_id"], :name => "index_process_entities_on_process_template_id"
  add_index "process_entities", ["product_id"], :name => "index_process_entities_on_product_id"
  add_index "process_entities", ["workstation_type_id"], :name => "index_process_entities_on_workstation_type_id"

  create_table "process_parts", :force => true do |t|
    t.float "quantity", :default => 0.0
    t.integer "part_id"
    t.integer "process_entity_id"
    t.integer "unit"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer "custom_value_id"
  end

  add_index "process_parts", ["custom_value_id"], :name => "index_process_parts_on_custom_value_id"
  add_index "process_parts", ["part_id"], :name => "index_process_parts_on_part_id"
  add_index "process_parts", ["process_entity_id"], :name => "index_process_parts_on_process_entity_id"

  create_table "process_templates", :force => true do |t|
    t.string "code"
    t.integer "type"
    t.string "name"
    t.text "template"
    t.text "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer "wire_from", :default => 0
  end

  add_index "process_templates", ["code"], :name => "index_process_templates_on_code"
  add_index "process_templates", ["type"], :name => "index_process_templates_on_type"

  create_table "production_order_handler_items", :force => true do |t|
    t.string "nr"
    t.string "desc"
    t.text "remark"
    t.string "kanban_code"
    t.string "kanban_nr"
    t.integer "result"
    t.string "handler_user"
    t.datetime "item_terminated_at"
    t.integer "production_order_handler_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer "kanban_id"
    t.float "qty"
  end

  add_index "production_order_handler_items", ["production_order_handler_id"], :name => "production_order_handler_items_poh_index"

  create_table "production_order_handlers", :force => true do |t|
    t.string "nr"
    t.string "desc"
    t.string "remark"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "production_order_item_labels", :force => true do |t|
    t.integer "production_order_item_id"
    t.integer "bundle_no"
    t.float "qty"
    t.string "nr"
    t.integer "state", :default => 90
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string "whouse_nr"
    t.string "position_nr"
    t.integer "type", :default => 100
  end

  add_index "production_order_item_labels", ["production_order_item_id"], :name => "index_production_order_item_labels_on_production_order_item_id"

  create_table "production_order_items", :force => true do |t|
    t.string "nr"
    t.integer "state", :default => 100
    t.string "code"
    t.text "message"
    t.integer "kanban_id"
    t.integer "production_order_id"
    t.integer "machine_id"
    t.float "optimise_index", :default => 0.0
    t.datetime "optimise_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer "produced_qty"
    t.float "machine_time", :default => 0.0
    t.float "prev_index", :default => 0.0
    t.string "user_nr"
    t.string "user_group_nr"
    t.integer "type", :default => 100
    t.string "tool1"
    t.string "tool2"
    t.float "kanban_qty", :default => 0.0
    t.float "kanban_bundle", :default => 0.0
    t.boolean "is_urgent", :default => false
    t.datetime "terminated_at"
    t.string "terminate_user"
    t.string "terminated_kanban_code"
    t.boolean "auto", :default => true
  end

  add_index "production_order_items", ["kanban_id"], :name => "index_production_order_items_on_kanban_id"
  add_index "production_order_items", ["machine_id"], :name => "index_production_order_items_on_machine_id"
  add_index "production_order_items", ["nr"], :name => "index_production_order_items_on_nr"
  add_index "production_order_items", ["production_order_id"], :name => "index_production_order_items_on_production_order_id"

  create_table "production_orders", :force => true do |t|
    t.string "nr"
    t.integer "state", :default => 0
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer "type", :default => 100
  end

  add_index "production_orders", ["nr"], :name => "index_production_orders_on_nr"

  create_table "production_plans", :force => true do |t|
    t.string "assembly"
    t.string "product_line"
    t.integer "planned"
    t.integer "produced", :default => 0
    t.datetime "date"
    t.integer "user_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer "trigger_min", :default => 0
    t.integer "trigger_max", :default => 0
    t.boolean "is_confirmed", :default => false
    t.integer "index"
    t.string "remark"
  end

  add_index "production_plans", ["user_id"], :name => "index_production_plans_on_user_id"

  create_table "report_snaps", :force => true do |t|
    t.string "desc"
    t.integer "type"
    t.string "type_string"
    t.integer "user_id"
    t.text "data"
    t.integer "tenant_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "report_snaps", ["tenant_id"], :name => "index_report_snaps_on_tenant_id"
  add_index "report_snaps", ["user_id"], :name => "index_report_snaps_on_user_id"

  create_table "resource_group_parts", :force => true do |t|
    t.integer "part_id"
    t.integer "resource_group_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "resource_group_parts", ["part_id"], :name => "index_resource_group_parts_on_part_id"
  add_index "resource_group_parts", ["resource_group_id"], :name => "index_resource_group_parts_on_resource_group_id"

  create_table "resource_groups", :force => true do |t|
    t.string "nr"
    t.integer "type"
    t.string "name"
    t.string "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "resource_groups", ["nr"], :name => "index_resource_groups_on_nr"
  add_index "resource_groups", ["type"], :name => "index_resource_groups_on_type"

  create_table "roles", :force => true do |t|
    t.string "name"
    t.integer "resource_id"
    t.string "resource_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "roles", ["name", "resource_type", "resource_id"], :name => "index_roles_on_name_and_resource_type_and_resource_id"
  add_index "roles", ["name"], :name => "index_roles_on_name"

  create_table "settings", :force => true do |t|
    t.string "var", :null => false
    t.text "value"
    t.integer "target_id", :null => false
    t.string "target_type", :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "settings", ["target_type", "target_id", "var"], :name => "index_settings_on_target_type_and_target_id_and_var", :unique => true

# <<<<<<< HEAD
# =======
#   create_table "snapshots", :force => true do |t|
#     t.integer  "attachment_id"
#     t.integer  "user_id"
#     t.integer  "alert_id"
#     t.string   "upper_boundary"
#     t.string   "lower_boundary"
#     t.string   "current_value"
#     t.datetime "created_at",     :null => false
#     t.datetime "updated_at",     :null => false
#   end

  add_index "snapshots", ["attachment_id"], :name => "index_snapshots_on_attachment_id"
  add_index "snapshots", ["user_id"], :name => "index_snapshots_on_user_id"

  create_table "storages", :force => true do |t|
    t.string "nr"
    t.integer "warehouse_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer "part_id"
    t.integer "position_id"
    t.integer "quantity"
  end

  add_index "storages", ["warehouse_id"], :name => "index_storages_on_warehouse_id"

# >>>>>>> de2bf57a69ad6bca36efc9aa2ef1f0e2acae9e09
  create_table "stories", :force => true do |t|
    t.string "title"
    t.string "description"
    t.integer "user_id"
    t.integer "story_set_id"
    t.integer "tenant_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer "comment_count", :default => 0
    t.integer "chart_count", :default => 0
    t.integer "chart_type", :default => 0
  end

  add_index "stories", ["story_set_id"], :name => "index_stories_on_story_set_id"
  add_index "stories", ["tenant_id"], :name => "index_stories_on_tenant_id"
  add_index "stories", ["user_id"], :name => "index_stories_on_user_id"

  create_table "story_set_users", :force => true do |t|
    t.integer "story_set_id"
    t.integer "user_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "story_set_users", ["story_set_id"], :name => "index_story_set_users_on_story_set_id"
  add_index "story_set_users", ["user_id"], :name => "index_story_set_users_on_user_id"

  create_table "story_sets", :force => true do |t|
    t.string "title"
    t.integer "user_id"
    t.integer "tenant_id"
    t.string "description"
    t.boolean "email_alert", :default => true
    t.boolean "sms_alert", :default => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer "story_count", :default => 0
    t.integer "comment_count", :default => 0
    t.integer "chart_count", :default => 0
    t.integer "user_count", :default => 0
  end

  add_index "story_sets", ["tenant_id"], :name => "index_story_sets_on_tenant_id"
  add_index "story_sets", ["user_id"], :name => "index_story_sets_on_user_id"

  create_table "tenants", :force => true do |t|
    t.string "company_name", :null => false
    t.string "edition", :null => false
    t.string "subscription_reference"
    t.string "expire_at", :null => false
    t.integer "subscription_status"
    t.string "customer_first_name"
    t.string "customer_last_name"
    t.string "customer_email"
    t.string "customer_phone"
    t.integer "user_id"
    t.string "domain"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string "access_key"
  end

  add_index "tenants", ["user_id"], :name => "index_tenants_on_user_id"

  create_table "tools", :force => true do |t|
    t.string "nr"
    t.integer "resource_group_id"
    t.integer "part_id"
    t.integer "mnt", :default => 0
    t.integer "used_days"
    t.integer "rql"
    t.integer "tol", :default => 0
    t.datetime "rql_date"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string "nr_display"
    t.boolean "locked", :default => false
  end

  add_index "tools", ["nr"], :name => "index_tools_on_nr"
  add_index "tools", ["part_id"], :name => "index_tools_on_part_id"
  add_index "tools", ["resource_group_id"], :name => "index_tools_on_resource_group_id"

  create_table "user_departments", :force => true do |t|
    t.integer "user_id"
    t.integer "department_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "user_departments", ["department_id"], :name => "index_user_departments_on_department_id"
  add_index "user_departments", ["user_id"], :name => "index_user_departments_on_user_id"

  create_table "user_entity_groups", :force => true do |t|
    t.integer "user_id"
    t.integer "entity_group_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "user_entity_groups", ["entity_group_id"], :name => "index_user_entity_groups_on_entity_group_id"
  add_index "user_entity_groups", ["user_id"], :name => "index_user_entity_groups_on_user_id"

  create_table "user_kpi_items", :force => true do |t|
    t.integer "entity_id"
    t.integer "user_id"
    t.integer "kpi_id"
    t.float "target_max"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.float "target_min", :default => 0.0
  end

  add_index "user_kpi_items", ["entity_id"], :name => "index_user_kpi_items_on_entity_id"
  add_index "user_kpi_items", ["kpi_id"], :name => "index_user_kpi_items_on_kpi_id"
  add_index "user_kpi_items", ["user_id"], :name => "index_user_kpi_items_on_user_id"

  create_table "users", :force => true do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email", :null => false
    t.string "encrypted_password", :null => false
    t.string "password_salt"
    t.integer "sign_in_count", :default => 0, :null => false
    t.integer "failed_attempts", :default => 0, :null => false
    t.datetime "last_request_at"
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.integer "status", :default => 0, :null => false
    t.boolean "confirmed", :default => false, :null => false
    t.integer "tenant_id"
    t.boolean "is_tenant", :default => false
    t.integer "entity_id"
    t.integer "role_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.boolean "is_sys", :default => false
    t.string "title"
    t.integer "department_id"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "reset_password_token"
    t.string "remember_token"
    t.datetime "remember_created_at"
    t.string "unlock_token"
    t.datetime "locked_at"
    t.string "tel"
    t.string "phone"
    t.string "image_url"
    t.string "stuff_id"
    t.string "current_project_id", :default => ""
    t.string "current_location", :default => ""
    t.string "device_id", :default => ""
    t.boolean "is_online", :default => false
  end

  add_index "users", ["confirmation_token"], :name => "index_users_on_confirmation_token", :unique => true
  add_index "users", ["department_id"], :name => "index_users_on_department_id"
  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["entity_id"], :name => "index_users_on_entity_id"
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true
  add_index "users", ["tenant_id"], :name => "index_users_on_tenant_id"
  add_index "users", ["unlock_token"], :name => "index_users_on_unlock_token", :unique => true

  create_table "users_roles", :id => false, :force => true do |t|
    t.integer "user_id"
    t.integer "role_id"
  end

  add_index "users_roles", ["user_id", "role_id"], :name => "index_users_roles_on_user_id_and_role_id"

  create_table "versions", :force => true do |t|
    t.string "item_type", :null => false
    t.integer "item_id", :null => false
    t.string "event", :null => false
    t.string "whodunnit"
    t.text "object"
    t.datetime "created_at"
  end

  add_index "versions", ["item_type", "item_id"], :name => "index_versions_on_item_type_and_item_id"

  create_table "warehouse_regexes", :force => true do |t|
    t.string "regex"
    t.string "warehouse_nr"
    t.string "desc"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "warehouses", :force => true do |t|
    t.string "nr"
    t.string "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string "regex"
  end

  create_table "wire_groups", :force => true do |t|
    t.string "group_name", :default => ""
    t.string "wire_type", :default => ""
    t.decimal "cross_section", :precision => 6, :scale => 4, :default => 0.0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "wire_groups", ["group_name"], :name => "index_wire_groups_on_group_name"
  add_index "wire_groups", ["wire_type"], :name => "index_wire_groups_on_wire_type"

end
