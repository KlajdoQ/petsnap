class AnimalsController < ApplicationController
  include ActionController::Cookies

  # Get all animals and their comments, including replies
  def index
    animals = Animal.all.includes(:comments)
    render json: animals.as_json(include: { comments: { include: :replies } })
  end

  # Get an animal by ID and its comments, including replies
  def show
    animal = Animal.includes(comments: [:replies]).find_by(id: params[:id])
    render json: animal
  end

  # Create a new animal
  def create
    animal = Animal.create(animal_params)
    render json: animal, status: :created
  end

  # Update the likes for an animal
  def update
    animal = Animal.find(params[:id])
    user_id = params[:user_id]
    like = animal.likes.find_by(user_id: user_id)

    # If the user has already liked the animal, remove the like
    if like
      like.destroy
    # If the user has not liked the animal, add a new like
    else
      like = animal.likes.create(user_id: user_id)
    end

    # Reload the animal to get the updated count of likes and render the updated animal
    animal.reload
    render json: animal, include: :user
  end

  # Update the likes count for an animal
  def update_likes
    animal = Animal.find(params[:animal_id])
    user_id = params[:user_id]
    like = animal.likes.find_by(user_id: user_id)

    # If the user has already liked the animal, remove the like
    if like
      like.destroy
    # If the user has not liked the animal, add a new like
    else
      like = animal.likes.create(user_id: user_id)
    end

    # Render the updated likes count for the animal
    render json: { likes_count: animal.likes.count }
  end

  private def animal_params
    params.require(:animal).permit(:name, :species, :description, :image_url)
  end
end

  ####################
  #      COMMENTS    #
  ####################
  def create_comment
    @animal = Animal.find(params[:animal_id])
    @comment = @animal.comments.create(comment_params)
    @comment.save
    render json: @comment
  end

  def update_comment_likes
    comment = Comment.find(params[:comment_id])
    user_id = params[:user_id]
    comment_like = comment.comment_likes.find_by(user_id: user_id)
  
    if comment_like
      comment_like.destroy
    else
      comment_like = comment.comment_likes.create(user_id: user_id)
    end
  
    render json: { comment_likes_count: comment.comment_likes.count }
  end
  
  def destroy_comment
    comment = Comment.find(params[:comment_id])
    comment.replies.destroy_all
    comment.destroy
    head :no_content
  end
  
  ####################
  #      REPLIES     #
  ####################
  def create_reply
    comment = Comment.find(params[:comment_id])
    reply = comment.replies.create(reply_params)
    render json: reply, status: :created
  end
  
  private

  def comment_params
      params.require(:comment).permit(:comment, :reply, :author_name, :user_id)
  end
      
  def reply_params
    params.require(:reply).permit(:reply, :user_id)
  end
      
  def animal_params
    params.require(:animal).permit(:name, :likes,:breed,:image, :hobbies, :user_id, comments_attributes: [:comment, :comment_likes, replies_attributes: [:reply]])
  end
      
  def authorize_request
    unless current_user
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end
end
end
