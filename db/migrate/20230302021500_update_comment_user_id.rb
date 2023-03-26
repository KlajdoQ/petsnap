class UpdateCommentUserId < ActiveRecord::Migration[7.0]
  def up
    Comment.all.each do |comment|
      comment.update(author_name: comment.user.name)
    end
  end

  def down
    # This migration is not reversible
  end
end
