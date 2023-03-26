class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.text :comment
      t.integer :user_id
      #t.references :user, null: false, foreign_key: true
      t.references :animal, null: false, foreign_key: true
      t.timestamps
    end
  end
  end
