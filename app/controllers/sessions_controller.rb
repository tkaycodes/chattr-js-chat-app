class SessionsController < ApplicationController
  def new
  end
  
  def create
    username = params[:username]
    session[:user_name] = username
    redirect_to :back
  end
end
