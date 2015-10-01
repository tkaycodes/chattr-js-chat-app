class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    session[:user_name]
  end
  helper_method :current_user

  def current_user_id
    User.find_by_name(session[:user_name]).id 
  end 
  helper_method :current_user_id
  
  def user_signed_in?
    session.has_key?(:user_name)
  end
  helper_method :user_signed_in?

end
