class CreateSites < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest

      t.timestamps
    end

    create_table :sites do |t|
      t.references :user, foreign_key: true
      t.string :name
      t.integer :max_depth
      t.integer :min_depth
      t.string :types
      t.string :certification
      t.string :spearfishing
      t.string :port_phillip
      t.string :description
      t.string :latitude
      t.string :longitude
      t.string :image_url
      t.timestamps
    end
  end
end
