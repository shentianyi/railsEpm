class CreateProductionPlans < ActiveRecord::Migration
  def change
    create_table :production_plans do |t|
      t.string :assembly
      t.string :product_line
      t.integer :planned
      t.integer :produced
      t.datetime :date
      t.references :user

      t.timestamps
    end
    add_index :production_plans, :user_id
  end
end
