class User < ApplicationRecord
  has_secure_password

  has_many :animals
  has_many :likes
  has_many :comments
  has_many :comment_likes
  has_many :replies

  validates :email, presence: true
  validates :password, presence: true

  def image_url
    if image.present? && image.attached?
      rails_blob_path(image, only_path: true)
    end
  end
  
end
