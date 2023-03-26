class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment,  :user_id, :author_name
  has_many :replies

  def author_name
    object.user&.full_name
  end
  
end
