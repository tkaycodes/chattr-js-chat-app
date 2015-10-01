Rails.application.routes.draw do

  root "home#index"

  # creating and destroying messages are nested within user
  resources :users, only: [:new]

  resources :users, only:[:create, :index], defaults: {format: :json} do 
    resources :messages, only: [:create], defaults: {format: :json}
  end

  # all messages 
  resources :messages, only: [:index, :destroy], defaults: {format: :json}
  
  
end



