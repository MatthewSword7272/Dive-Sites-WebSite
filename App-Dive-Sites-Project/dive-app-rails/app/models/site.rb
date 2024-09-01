class Site < ApplicationRecord
  belongs_to :user
  has_many :site_comments, dependent: :delete_all

  FEATURES = ['Reef Dive', 'Bommie Dive', 'Drift Dive', 'Wall Dive', 'Wreak Dive', 'Night Dive'].freeze
  SITE_ACCESS = ['Boat', 'Shore', 'Pier'].freeze
  CERTIFICATIONS = ['Open Water', 'Advanced Open Water', 'Deep Water', 'Technical'].freeze

  validates :id, uniqueness: true
  validates :user_id, :features, presence: true
  validates :name, presence: true, uniqueness: true, length: { minimum: 4, maximum: 30 }
  validates :min_depth, presence: true, numericality: { greater_than_or_equal_to: 0, less_than: :max_depth }
  validates :max_depth, presence: true, numericality: { greater_than: :min_depth, less_than_or_equal_to: 110 }
  validates :latitude, presence: true, uniqueness: { scope: :longitude }, numericality: { greater_or_equal_to: -90, less_than_or_equal_to: 90 },
            format: { with: /\A-?([1-8]?\d(\.\d+)?|90(\.0+)?)\z/ }
  validates :longitude, presence: true, uniqueness: { scope: :latitude }, numericality: { greater_or_equal_to: -180, less_than_or_equal_to: 180 },
            format: { with: /\A-?(180(\.0+)?|((1[0-7]\d)|[1-9]?\d))(\.\d+)?\z/ }
  validates :certification, presence: true, inclusion: { in: CERTIFICATIONS }
  validates :port_phillip, presence: true, inclusion: { in: ['Inside', 'Outside'] }
  validates :spearfishing, presence: true, inclusion: { in: ['Yes', 'No'] }
  validates :description, presence: true, allow_blank: true, length: { maximum: 350 }
  validates :site_access, presence: true, inclusion: { in: SITE_ACCESS }
  validates :image_url, presence: true,
            format: { with: /\A(http)?s?:?(\/\/[^"']*\.(?:jpg|jpeg|gif|png|svg))\z/ },
            allow_blank: true, uniqueness: true
  validates :video_id, presence: true, allow_blank: true, format: { with: /\A[\w\d-]{11}\z/ }, uniqueness: true
  validate :validate_features

  def validate_features
    if !features.empty?
      features.each do |i|
        if FEATURES.exclude?(i)
          errors.add(:features, 'not in list')
          false
        end
      end
    else
      errors.add(:features, 'not present')
    end
    true
  end
end
