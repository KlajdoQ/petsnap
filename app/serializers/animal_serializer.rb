class AnimalSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :breed, :hobbies, :likes_count, :user_id, :created_at, :updated_at
  has_many :comments
  has_many :likes

  def likes_count
    object.likes.size
  end
end
