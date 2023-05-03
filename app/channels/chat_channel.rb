class ChatChannel < ApplicationCable::Channel
    def subscribed
      stream_from "chat_channel"
    end
  
    def unsubscribed
      stop_all_streams
    end
    
    def send_message(data)
      user = User.find_by_id(data["user_id"])
      if user.present?
        message = Message.create(content: data["content"], user: user)
        rendered_message = render_message(message)
        puts "Rendered message: #{rendered_message}"
        ActionCable.server.broadcast("chat_channel", message: rendered_message, user_id: user.id, receiver_id: data["receiver_id"])
      else
        puts "User not found with ID: #{data["user_id"]}"
      end
    end
  
    private
  
    def render_message(message)
     message.content
    end
  end
  