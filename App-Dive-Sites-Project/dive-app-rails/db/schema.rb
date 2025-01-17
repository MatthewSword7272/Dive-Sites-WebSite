# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_04_26_001653) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "sites", force: :cascade do |t|
    t.bigint "user_id"
    t.string "name"
    t.integer "max_depth"
    t.integer "min_depth"
    t.string "features"
    t.string "certification"
    t.string "spearfishing"
    t.string "port_phillip"
    t.text "description"
    t.string "latitude"
    t.string "longitude"
    t.string "image_url"
    t.string "video_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "site_access"
    t.index ["user_id"], name: "index_sites_on_user_id"
  end

  create_table "site_comments", force: :cascade do |t|
    t.text "comment", null: false
    t.bigint "site_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["site_id"], name: "index_site_comments_on_site_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "sites", "users"
  add_foreign_key "site_comments", "sites"
  add_foreign_key "site_comments", "users"
end
