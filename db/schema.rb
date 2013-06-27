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

ActiveRecord::Schema.define(:version => 20130627111543) do

  create_table "entities", :force => true do |t|
    t.string   "name"
    t.integer  "status"
    t.integer  "user_quantity"
    t.integer  "tenant_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
    t.string   "ancestry"
  end

  add_index "entities", ["ancestry"], :name => "index_entities_on_ancestry"
  add_index "entities", ["tenant_id"], :name => "index_entities_on_tenant_id"

  create_table "kpi_categories", :force => true do |t|
    t.string   "name"
    t.integer  "kpi_quantity", :default => 0
    t.integer  "tenant_id"
    t.datetime "created_at",                  :null => false
    t.datetime "updated_at",                  :null => false
  end

  add_index "kpi_categories", ["tenant_id"], :name => "index_kpi_categories_on_tenant_id"

  create_table "kpis", :force => true do |t|
    t.string   "name"
    t.string   "description"
    t.integer  "kpi_category_id"
    t.integer  "unit"
    t.integer  "entry_frequency"
    t.float    "target"
    t.boolean  "is_calculated"
    t.integer  "desired_direction"
    t.integer  "kpi_period"
    t.datetime "created_at",        :null => false
    t.datetime "updated_at",        :null => false
  end

  add_index "kpis", ["kpi_category_id"], :name => "index_kpis_on_kpi_category_id"

  create_table "tenants", :force => true do |t|
    t.integer  "edition_id"
    t.integer  "user_id"
    t.integer  "status"
    t.string   "company"
    t.integer  "user_quantity"
    t.datetime "expires_at"
    t.string   "domain"
    t.string   "phone_number"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  create_table "user_entities", :force => true do |t|
    t.integer  "user_id"
    t.integer  "entity_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "user_entities", ["entity_id"], :name => "index_user_entities_on_entity_id"
  add_index "user_entities", ["user_id"], :name => "index_user_entities_on_user_id"

  create_table "users", :force => true do |t|
    t.integer  "role_id"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "password"
    t.string   "salt"
    t.string   "remember_token"
    t.datetime "remember_token_expires_at"
    t.integer  "status"
    t.boolean  "is_tenant",                 :default => false
    t.integer  "tenant_id"
    t.datetime "created_at",                                   :null => false
    t.datetime "updated_at",                                   :null => false
  end

  add_index "users", ["tenant_id"], :name => "index_users_on_tenant_id"

end
