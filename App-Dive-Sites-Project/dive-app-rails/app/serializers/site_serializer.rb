class SiteSerializer < ActiveModel::Serializer
  attributes \
    :id,
    :name,
    :site_created_by,
    :min_depth,
    :max_depth,
    :certification,
    :features,
    :latitude,
    :longitude,
    :port_phillip,
    :spearfishing,
    :description,
    :image_url,
    :video_id,
    :site_access,
    :created_at

  def site_created_by
    object.user.username
  end
end
