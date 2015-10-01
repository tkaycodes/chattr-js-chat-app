class UsersController < ApplicationController
  
  
  
  def index
    @users=User.online_now
  end


  def create
    # if user exists in db log them in
    if User.exists?(name: params[:username])
       session[:user_name] =  params[:username]
       redirect_to :back
    else
      # otherwise create user in db, then log them in
      @user = User.new(name: params[:username])
      if @user.save
        session[:user_name] =  params[:username]
        redirect_to :back
      else
        redirect_to :back, notice: "cant create"
      end
    end
  end


  


end
