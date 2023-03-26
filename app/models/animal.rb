class Animal < ApplicationRecord
    belongs_to :user 
    has_many :likes
    has_many :comments, dependent: :destroy

    has_many :replies, through: :comments
    accepts_nested_attributes_for :comments
  end