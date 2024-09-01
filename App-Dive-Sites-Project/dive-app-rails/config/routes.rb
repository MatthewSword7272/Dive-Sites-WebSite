Rails.application.routes.draw do
  resources :users
  resources :sites, only: [:index, :show, :update] do
    resources :site_comments
  end

  get '/user', to: 'users#user'

  post '/login',    to: 'sessions#create'
  post '/logout',   to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'

  namespace :my do
    resources :sites
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # Defines the root path route ("/")
  # root "articles#index"
end
