class SiteCommentSerializer < ActiveModel::Serializer
  attributes \
    :id,
    :user_id,
    :created_by,
    :created_at,
    :updated_at,
    :comment,
    :site_id

  def created_by
    object.user.username
  end
end
