class MessageController < ApplicationController
  def create
    @message = Message.new(message_params)
    if @message.save
      ActionCable.server.broadcast "user_channel_#{@message.user_id}", @message
      render json: @message, status: :created
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  def index
    messages = Message.where(user_id: params[:user_id])
    render json: messages
  end
  private

  def message_params
    params.require(:message).permit(:user_id, :content)
  end
end
