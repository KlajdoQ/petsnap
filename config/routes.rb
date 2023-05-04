Rails.application.routes.draw do
  # Define a namespace for the API
  namespace :api do
    # Define a resource for recipes with only the index and create actions available
    resources :recipes, only: [:index, :create]
    post "/signup", to: "users#create"
    get "/me", to: "users#show"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
  end

  # Define a route for handling any GET requests that are not for the API and not for an asset file
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  resources :users
  post '/login', to: 'sessions#create'
  post '/signup', to: 'users#create'
  get '/signup', to: 'users#index'
  delete '/logout', to: 'sessions#destroy'
  put '/users/:id', to: 'users#update'

  resources :messages, only: [:create, :index]
  get '/messages', to: 'messages#index'

  # Mount the Action Cable server at /cable
  mount ActionCable.server => '/cable'

  resources :animals do
    patch '/animals/:id', to: 'animals#update'
    post 'update_likes', to: 'animals#update_likes'
    post 'comments', to: 'animals#create_comment'
    post 'comments/:comment_id/replies', to: 'animals#create_reply'
    post '/comments/:id/update_comment_likes', to: 'animals#update_comment_likes'
    delete 'comments/:id', to: 'animals#destroy_comment'
  end
end

