class MessageController < ApplicationController
  # Create a new message
  def create
    # Create a new message using message_params
    @message = Message.new(message_params)
    # If the message is valid and saved successfully, broadcast it to the user channel and render it as JSON
    if @message.save
      ActionCable.server.broadcast "user_channel_#{@message.user_id}", @message
      render json: @message, status: :created
    # If the message is invalid, render the error messages as JSON with status code unprocessable_entity
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  # Get all messages for a user by user_id
  def index
    messages = Message.where(user_id: params[:user_id])
    render json: messages
  end

  private 
  
  def message_params
    params.require(:message).permit(:user_id, :content)
  end
end
