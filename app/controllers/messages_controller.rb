class MessagesController < ApplicationController

  def index
    render json: Message.all
  end

  def create
    @message = Message.new(body: params[:message])
    if @message.save
      head :created
    else
      render json: { errors: @message.errors.full_messages}, status: 422
    end
  end

end
