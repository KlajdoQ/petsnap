class SessionsController < ApplicationController
  # Authenticate a user based on their email and password
  def create
    # Find the user with the given email
    user = User.find_by(email: params[:email])
    # If the user is found and their password is correct, set the session user_id to their ID and render their user data as JSON
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user.as_json(only: [:id, :email, :full_name, :image]), status: :ok
    # If the user is not found or their password is incorrect, render an error message as JSON with status code unauthorized
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  # Log out a user by setting their session user_id to nil
  def destroy
    session[:user_id] = nil
    head :no_content
  end
end
