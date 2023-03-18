class ChatChannel < ApplicationCable::Channel
  def subscribed
    # Stream messages from the chat_channel to the client
    stream_from "chat_channel"
  end

  def unsubscribed
    # Stop streaming messages from all channels
    stop_all_streams
  end

  def send_message(data)
    # Find the user with the ID passed in from the client
    user = User.find_by_id(data["user_id"])
    if user.present?
      # If the user is found, create a new message with the content and user object
      message = Message.create(content: data["content"], user: user)
      # Render the message content
      rendered_message = render_message(message)
      # Log the rendered message to the console
      puts "Rendered message: #{rendered_message}"
      # Broadcast the message to all clients subscribed to the chat_channel stream
      ActionCable.server.broadcast("chat_channel", message: rendered_message, user_id: user.id, receiver_id: data["receiver_id"])
    else
      # If the user is not found, log an error to the console
      puts "User not found with ID: #{data["user_id"]}"
    end
  end

  private def render_message(message)
    message.content
  end
end
