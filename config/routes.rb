Rails.application.routes.draw do
  # Define a namespace for the API
  namespace :api do
    # Define a resource for recipes with only the index and create actions available
    resources :recipes, only: [:index, :create]
    # Define a route for user signup
    post "/signup", to: "users#create"
    # Define a route for getting the current user
    get "/me", to: "users#show"
    # Define a route for user login
    post "/login", to: "sessions#create"
    # Define a route for user logout
    delete "/logout", to: "sessions#destroy"
  end

  # Define a route for handling any GET requests that are not for the API and not for an asset file
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  # Define resources for users with all RESTful actions available
  resources :users
  # Define a route for user login
  post '/login', to: 'sessions#create'
  # Define a route for user signup
  post '/signup', to: 'users#create'
  # Define a route for getting the signup page
  get '/signup', to: 'users#index'
  # Define a route for user logout
  delete '/logout', to: 'sessions#destroy'
  # Define a route for updating a user with the specified ID
  put '/users/:id', to: 'users#update'

  # Define resources for messages with only the create and index actions available
  resources :messages, only: [:create, :index]
  # Define a route for getting all messages
  get '/messages', to: 'messages#index'

  # Mount the Action Cable server at /cable
  mount ActionCable.server => '/cable'

  # Define resources for animals with all RESTful actions available
  resources :animals do
    # Define a route for updating an animal with the specified ID
    patch '/animals/:id', to: 'animals#update'
    # Define a route for updating the likes count for an animal with the specified ID
    post 'update_likes', to: 'animals#update_likes'
    # Define a route for creating a new comment for an animal with the specified ID
    post 'comments', to: 'animals#create_comment'
    # Define a route for creating a new reply for a comment with the specified ID
    post 'comments/:comment_id/replies', to: 'animals#create_reply'
    # Define a route for updating the likes count for a comment with the specified ID
    post '/comments/:id/update_comment_likes', to: 'animals#update_comment_likes'
    # Define a route for deleting a comment with the specified ID
    delete 'comments/:id', to: 'animals#destroy_comment'
  end
end

