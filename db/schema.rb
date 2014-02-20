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

ActiveRecord::Schema.define(:version => 20140220034859) do

  create_table "admin_kpi_category_templates", :force => true do |t|
    t.string   "name"
    t.string   "description"
    t.integer  "kpi_quantity", :default => 0
    t.datetime "created_at",                  :null => false
    t.datetime "updated_at",                  :null => false
  end

  create_table "admin_kpi_templates", :force => true do |t|
    t.string   "description"
    t.string   "name"
    t.integer  "unit"
    t.integer  "frequency"
    t.float    "target"
    t.boolean  "is_calculated",                  :default => false
    t.integer  "direction"
    t.integer  "period"
    t.string   "formula"
    t.string   "formula_string"
    t.integer  "admin_kpi_category_template_id"
    t.datetime "created_at",                                        :null => false
    t.datetime "updated_at",                                        :null => false
  end

  add_index "admin_kpi_templates", ["admin_kpi_category_template_id"], :name => "index_admin_kpi_templates_on_admin_kpi_category_template_id"

  create_table "attachments", :force => true do |t|
    t.string   "name"
    t.string   "path"
    t.string   "size"
    t.string   "type"
    t.string   "pathname"
    t.integer  "attachable_id"
    t.string   "attachable_type"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  add_index "attachments", ["attachable_id"], :name => "index_attachments_on_attachable_id"
  add_index "attachments", ["attachable_type"], :name => "index_attachments_on_attachable_type"

  create_table "contacts", :force => true do |t|
    t.string   "name"
    t.string   "department"
    t.string   "tel"
    t.string   "phone"
    t.string   "email"
    t.string   "title"
    t.integer  "tenant_id"
    t.string   "image_url"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "contacts", ["tenant_id"], :name => "index_contacts_on_tenant_id"

  create_table "dashboard_conditions", :force => true do |t|
    t.integer  "dashboard_item_id"
    t.string   "entity_group",      :null => false
    t.string   "kpi_id",            :null => false
    t.string   "calculate_type",    :null => false
    t.string   "time_string",       :null => false
    t.datetime "created_at",        :null => false
    t.datetime "updated_at",        :null => false
    t.integer  "count"
  end

  create_table "dashboard_items", :force => true do |t|
    t.integer  "dashboard_id", :null => false
    t.integer  "sequence"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
    t.integer  "interval"
    t.string   "title"
    t.string   "chart_type"
    t.integer  "row"
    t.integer  "col"
    t.integer  "sizex"
    t.integer  "sizey"
    t.string   "last_update"
  end

  create_table "dashboards", :force => true do |t|
    t.integer  "user_id",     :null => false
    t.string   "name",        :null => false
    t.string   "description"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "departments", :force => true do |t|
    t.string   "name"
    t.string   "ancestry"
    t.integer  "tenant_id"
    t.integer  "user_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "departments", ["ancestry"], :name => "index_departments_on_ancestry"
  add_index "departments", ["tenant_id"], :name => "index_departments_on_tenant_id"
  add_index "departments", ["user_id"], :name => "index_departments_on_user_id"

  create_table "emails", :force => true do |t|
    t.string   "sender"
    t.string   "receivers"
    t.string   "file_path"
    t.integer  "user_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "content"
    t.string   "title"
  end

  add_index "emails", ["user_id"], :name => "index_emails_on_user_id"

  create_table "entities", :force => true do |t|
    t.string   "name"
    t.integer  "status"
    t.integer  "user_quantity", :default => 0
    t.integer  "tenant_id"
    t.datetime "created_at",                   :null => false
    t.datetime "updated_at",                   :null => false
    t.string   "description"
    t.string   "code"
  end

  add_index "entities", ["tenant_id"], :name => "index_entities_on_tenant_id"

  create_table "entity_contacts", :force => true do |t|
    t.integer  "contactable_id"
    t.string   "contactable_type"
    t.integer  "contact_id"
    t.integer  "tenant_id"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

  add_index "entity_contacts", ["contact_id"], :name => "index_entity_contacts_on_contact_id"
  add_index "entity_contacts", ["contactable_id"], :name => "index_entity_contacts_on_contactable_id"
  add_index "entity_contacts", ["contactable_type"], :name => "index_entity_contacts_on_contactable_type"
  add_index "entity_contacts", ["tenant_id"], :name => "index_entity_contacts_on_tenant_id"

  create_table "entity_group_items", :force => true do |t|
    t.integer  "entity_id"
    t.integer  "entity_group_id"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  add_index "entity_group_items", ["entity_group_id"], :name => "index_entity_group_items_on_entity_group_id"
  add_index "entity_group_items", ["entity_id"], :name => "index_entity_group_items_on_entity_id"

  create_table "entity_groups", :force => true do |t|
    t.string   "name"
    t.integer  "user_id"
    t.datetime "created_at",                     :null => false
    t.datetime "updated_at",                     :null => false
    t.boolean  "is_public",   :default => false
    t.string   "description"
    t.string   "code"
  end

  add_index "entity_groups", ["user_id"], :name => "index_entity_groups_on_user_id"

  create_table "kpi_categories", :force => true do |t|
    t.string   "name",         :default => "Default"
    t.integer  "kpi_quantity", :default => 0
    t.string   "description"
    t.integer  "tenant_id"
    t.datetime "created_at",                          :null => false
    t.datetime "updated_at",                          :null => false
  end

  add_index "kpi_categories", ["tenant_id"], :name => "index_kpi_categories_on_tenant_id"

  create_table "kpi_entries", :force => true do |t|
    t.string   "entry_at"
    t.integer  "frequency"
    t.float    "value"
    t.float    "original_value"
    t.datetime "parsed_entry_at"
    t.integer  "user_kpi_item_id"
    t.integer  "kpi_id"
    t.boolean  "abnormal",         :default => false
    t.datetime "created_at",                          :null => false
    t.datetime "updated_at",                          :null => false
    t.integer  "user_id"
    t.integer  "entity_id"
    t.float    "target_max"
    t.float    "target_min",       :default => 0.0
  end

  add_index "kpi_entries", ["entity_id"], :name => "index_kpi_entries_on_entity_id"
  add_index "kpi_entries", ["entry_at"], :name => "index_kpi_entries_on_entry_at"
  add_index "kpi_entries", ["parsed_entry_at"], :name => "index_kpi_entries_on_parsed_entry_at"
  add_index "kpi_entries", ["user_id"], :name => "index_kpi_entries_on_user_id"
  add_index "kpi_entries", ["user_kpi_item_id"], :name => "index_kpi_entries_on_user_kpi_item_id"

  create_table "kpi_items", :force => true do |t|
    t.integer  "item_id"
    t.integer  "kpi_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "kpi_items", ["item_id"], :name => "index_kpi_items_on_item_id"
  add_index "kpi_items", ["kpi_id"], :name => "index_kpi_items_on_kpi_id"

  create_table "kpis", :force => true do |t|
    t.string   "name"
    t.string   "description"
    t.integer  "kpi_category_id"
    t.integer  "unit"
    t.integer  "frequency"
    t.float    "target_max"
    t.boolean  "is_calculated",   :default => false
    t.integer  "direction"
    t.integer  "period"
    t.text     "formula"
    t.text     "formula_string"
    t.integer  "user_id"
    t.integer  "tenant_id"
    t.datetime "created_at",                         :null => false
    t.datetime "updated_at",                         :null => false
    t.float    "target_min",      :default => 0.0
  end

  add_index "kpis", ["kpi_category_id"], :name => "index_kpis_on_kpi_category_id"
  add_index "kpis", ["tenant_id"], :name => "index_kpis_on_tenant_id"
  add_index "kpis", ["user_id"], :name => "index_kpis_on_user_id"

  create_table "tenants", :force => true do |t|
    t.string   "company_name",           :null => false
    t.string   "edition",                :null => false
    t.string   "subscription_reference"
    t.string   "expire_at",              :null => false
    t.integer  "subscription_status"
    t.string   "customer_first_name"
    t.string   "customer_last_name"
    t.string   "customer_email"
    t.string   "customer_phone"
    t.integer  "user_id"
    t.string   "domain"
    t.datetime "created_at",             :null => false
    t.datetime "updated_at",             :null => false
    t.string   "access_key"
  end

  add_index "tenants", ["user_id"], :name => "index_tenants_on_user_id"

  create_table "user_departments", :force => true do |t|
    t.integer  "user_id"
    t.integer  "department_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "user_departments", ["department_id"], :name => "index_user_departments_on_department_id"
  add_index "user_departments", ["user_id"], :name => "index_user_departments_on_user_id"

  create_table "user_kpi_items", :force => true do |t|
    t.integer  "entity_id"
    t.integer  "user_id"
    t.integer  "kpi_id"
    t.float    "target_max"
    t.datetime "created_at",                  :null => false
    t.datetime "updated_at",                  :null => false
    t.float    "target_min", :default => 0.0
  end

  add_index "user_kpi_items", ["entity_id"], :name => "index_user_kpi_items_on_entity_id"
  add_index "user_kpi_items", ["kpi_id"], :name => "index_user_kpi_items_on_kpi_id"
  add_index "user_kpi_items", ["user_id"], :name => "index_user_kpi_items_on_user_id"

  create_table "users", :force => true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email",                                  :null => false
    t.string   "crypted_password",                       :null => false
    t.string   "password_salt",                          :null => false
    t.string   "persistence_token",                      :null => false
    t.string   "single_access_token",                    :null => false
    t.string   "perishable_token",                       :null => false
    t.integer  "login_count",         :default => 0,     :null => false
    t.integer  "failed_login_count",  :default => 0,     :null => false
    t.datetime "last_request_at"
    t.datetime "current_login_at"
    t.datetime "last_login_at"
    t.string   "current_login_ip"
    t.string   "last_login_ip"
    t.integer  "status",              :default => 0,     :null => false
    t.boolean  "confirmed",           :default => false, :null => false
    t.integer  "tenant_id"
    t.boolean  "is_tenant",           :default => false
    t.integer  "entity_id"
    t.integer  "role_id"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
    t.boolean  "is_sys",              :default => false
    t.string   "title"
  end

  add_index "users", ["entity_id"], :name => "index_users_on_entity_id"
  add_index "users", ["tenant_id"], :name => "index_users_on_tenant_id"

end
