Rails.application.routes.draw do

  root "home#index"
  resources :messages, only: [:index, :create, :destroy], defaults: {format: :json}
  resources :sessions, only: [:new, :create]
  
end



