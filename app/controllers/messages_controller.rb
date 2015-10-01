class MessagesController < ApplicationController

  def index
     @messages = Message.all
  end

  def create
    @message      = Message.new(body: params[:message])
    if params[:user_id] != "undefined"
      @message.user = User.find(params[:user_id])
      @message.user.update_attributes(last_seen: Time.now)
    end
      if @message.save
        render status: 201, json: {message: 'created', details: @message.inspect}
      else
        render status: 422, json: {errors: @message.errors.full_messages}
      end
  end

  def destroy
    @message = Message.find(params[:id])
    if @message.delete
      render status: 200, json: {message: "message with id #{@message.id} deleted"}
    else
      render status: 500, json: {error: @message.errors.full_messages}
    end
  end

end
