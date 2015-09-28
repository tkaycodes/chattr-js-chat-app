class MessagesController < ApplicationController
  def index
    render text: "hello"
  end

  def create
    render text: params
  end
end
