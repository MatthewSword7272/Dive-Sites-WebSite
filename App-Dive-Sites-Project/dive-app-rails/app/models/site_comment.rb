class SiteComment < ApplicationRecord
  belongs_to :site
  belongs_to :user

  validates :id, uniqueness: true
  validates :comment, presence: true, length: { minimum: 1, maximum: 150 }
  validates :user_id, presence: true
  validates :site_id, presence: true
end
