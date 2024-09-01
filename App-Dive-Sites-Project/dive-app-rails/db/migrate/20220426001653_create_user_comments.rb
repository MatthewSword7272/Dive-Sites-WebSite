class CreateSiteComments < ActiveRecord::Migration[7.0]
  def change
    create_table :site_comments do |t|
      t.string :comment
      t.references :user, null: false, foreign_key: true
      t.references :site, null: false, foreign_key: true
      t.timestamps
    end
  end
end
