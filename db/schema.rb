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

ActiveRecord::Schema.define(:version => 20130710085758) do

  create_table "entities", :force => true do |t|
    t.string   "name"
    t.integer  "status"
    t.integer  "user_quantity", :default => 0
    t.integer  "tenant_id"
    t.datetime "created_at",                   :null => false
    t.datetime "updated_at",                   :null => false
  end

  add_index "entities", ["tenant_id"], :name => "index_entities_on_tenant_id"

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
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
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
  end

  add_index "kpi_entries", ["entry_at"], :name => "index_kpi_entries_on_entry_at"
  add_index "kpi_entries", ["parsed_entry_at"], :name => "index_kpi_entries_on_parsed_entry_at"
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
    t.float    "target"
    t.boolean  "is_calculated",   :default => false
    t.integer  "direction"
    t.integer  "period"
    t.string   "formula"
    t.integer  "user_id"
    t.integer  "tenant_id"
    t.datetime "created_at",                         :null => false
    t.datetime "updated_at",                         :null => false
  end

  add_index "kpis", ["kpi_category_id"], :name => "index_kpis_on_kpi_category_id"
  add_index "kpis", ["tenant_id"], :name => "index_kpis_on_tenant_id"
  add_index "kpis", ["user_id"], :name => "index_kpis_on_user_id"

  create_table "tenants", :force => true do |t|
    t.string   "company_name",           :null => false
    t.string   "edition",                :null => false
    t.string   "subscription_reference"
    t.string   "expire_at",              :null => false
    t.integer  "subscription_status",    :null => false
    t.string   "customer_first_name"
    t.string   "customer_last_name"
    t.string   "customer_email"
    t.string   "customer_phone"
    t.integer  "user_id"
    t.string   "domain"
    t.datetime "created_at",             :null => false
    t.datetime "updated_at",             :null => false
  end

  add_index "tenants", ["user_id"], :name => "index_tenants_on_user_id"

  create_table "user_kpi_items", :force => true do |t|
    t.integer  "entity_id"
    t.integer  "user_id"
    t.integer  "kpi_id"
    t.float    "target"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "user_kpi_items", ["entity_id"], :name => "index_user_kpi_items_on_entity_id"
  add_index "user_kpi_items", ["kpi_id"], :name => "index_user_kpi_items_on_kpi_id"
  add_index "user_kpi_items", ["user_id"], :name => "index_user_kpi_items_on_user_id"

  create_table "users", :force => true do |t|
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
  end

  add_index "users", ["entity_id"], :name => "index_users_on_entity_id"
  add_index "users", ["tenant_id"], :name => "index_users_on_tenant_id"

end
