class ConversationsController < ApplicationController
  def index
    begin
      @conversations = current_user.sent_conversations + current_user.received_conversations
      render json: @conversations
    rescue => e
      puts e.message
      puts e.backtrace.inspect
      render json: { error: 'An error occurred while fetching conversations.' }, status: :internal_server_error
    end
  end
  
    def show
      @conversation = Conversation.find(params[:id])
      render json: @conversation.as_json(include: [:messages])
    end
  
      def create
        sender_id = params.dig(:conversation, :sender_id)
        receiver_id = params.dig(:conversation, :receiver_id)
        # Ensure that both sender_id and receiver_id are present
        if sender_id.present? && receiver_id.present?
          @conversation = Conversation.find_or_create_by(sender_id: sender_id, receiver_id: receiver_id)
          if @conversation.persisted?
            render json: @conversation, status: :created
          else
            render json: @conversation.errors, status: :unprocessable_entity
          end
        else
          # Return an error message when either sender_id or receiver_id is missing
          render json: { error: 'Both sender_id and receiver_id are required.' }, status: :unprocessable_entity
        end
      end
      
  
    private
  
    
    def conversation_params
      params.require(:conversation).permit(:sender_id, :receiver_id)
    end
  end
  