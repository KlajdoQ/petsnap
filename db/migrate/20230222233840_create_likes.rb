class CreateLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :likes do |t|
      t.integer :animal_id
      t.integer :user_id
      t.integer :likes, default: 0

      t.timestamps
    end
  end
end
