class UsersController < ApplicationController

  def index
  users = User.all
    render json: users.as_json(only: [:id, :email, :full_name, :image])
  end

  def all_users
    users = User.all
    render json: users.as_json(only: [:id, :email, :full_name, :image])
  end

  def show
    user = User.find(params[:id])
    render json: user.as_json(only: [:id, :email, :full_name], methods: [:image_url, :image])
  end


  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      render json: user.as_json(only: [:id, :email, :full_name, :image]), status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def update
    user = User.find(params[:id])
    if user.update(user_params)
      render json: user.as_json(only: [:id, :email, :full_name, :image]), status: :ok
    else
      error_message = user.errors.full_messages.join(", ")
      puts "Update failed: #{error_message}"
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  private

  
  def user_params
    params.require(:user).permit(:full_name, :email, :password, :image)
  end

end
