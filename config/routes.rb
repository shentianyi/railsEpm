IFEpm::Application.routes.draw do
  use_doorkeeper do
    controllers :applications => 'oauth/applications'
    controllers :authorizations => nil
    controllers :tokens => nil
  end

  devise_for :users, :controllers => {sessions: :user_sessions, registrations: :user_registrations}
  devise_scope :user do
    root :to => 'welcome#index'
    post '/user_sessions/locale' => 'user_sessions#locale'
    get '/user_sessions/new' => 'user_sessions#new'
    post '/user_sessions/' => 'user_sessions#create'
    get '/user_sessions/destroy' => 'user_sessions#destroy'
    delete '/api/user_sessions/' => 'user_sessions#destroy'
    post '/api/user_sessions/' => 'user_sessions#create'
    get '/user_sessions/finish_guide' => 'user_sessions#finish_guide'
  end

  resources :emails do
    collection do
      get '/analyse/:id' => :analyse
    end
  end

  resources :entity_contacts

  resources :contacts
  resources :avatars
  resources :user_entity_groups
  resources :files do
    member do
      get :template
    end
  end

  resources :entities do
    collection do
      put :update
    end
  end

  resources :users do
    collection do
      get 'index/:id' => :index
      match :login
      post :add
      put :update
      get :applications
    end
  end

  resource :user_sessions do
    collection do
      post :locale
    end
  end

  resource :user_confirmations

  resource :subscriptions do
    collection do
      post :change_password
    end
  end

  match '/api/subscriptions/change_password' => 'subscriptions#change_password'

  resources :kpis do
    collection do
      get '/c/:id' => :index
      put :update
      post :assign
      post :import
      get :template
      get :condition
      get :access
      [:categoried, :user, :list].each do |a|
        get "#{a}/:id" => a
      end
    end
  end

  resources :kpi_categories do
    collection do
      get 'index/:id' => :index
      put :update
      get :template
      get :list
    end
  end

  resources :kpi_entries do
    collection do
      match :analyse
      get :recents
      post :import
    end
  end

  resources :entity_groups do
    collection do
      get 'index/:id' => :index
      put :update
    end
  end
  resources :user_kpi_items do
    collection do
      put :update
    end
  end

  resources :dashboards do
    collection do
      get '/fullsize/:id' => :fullsize
      post '/import_dashboards' => :import_dashboards
    end
  end

  resources :dashboard_items do
    collection do
      post :save_grid
      get :items_by_dashboard_id
      get :get_data
      get :update_sequence
    end
  end

  controller :welcome do
    match 'welcome' => :index
    match 'welcome/users' => :users
    match 'welcome/statistics' => :statistics
  end

  resources :entity_group_items

  # api routes
  mount ApplicationAPI => '/api'
  namespace :api, :defaults => {:format => 'json'} do
    resources :kpi_entries do
      collection do
        get :analyse, :defaults => {:format => 'html'}
        get :data
      end
    end

    resources :dashboards do
      collection do
        get '/fullsize/:id' => :fullsize
      end
    end
    resources :dashboard_items do
      collection do
        get 'dashboard_items/get_data' => :get_data
        get 'dashboard_items/items_by_dashboard_id' => :items_by_dashboard_id
        get 'dashboard_items/update_sequence' => :update_sequence
      end
    end

    resource :user_sessions do
      collection do
        post :locale
      end
    end

    resources :emails do
      collection do
        get 'analyse/:id' => :analyse, :defaults => {:format => 'html'}
      end
    end

    resources :files do
      collection do
        match :upload
      end
    end

    controller :kpis do
      match 'kpis/kpis_by_category' => :kpis_by_category
    end

    resources :entity_groups do
      member do
        get :contacts
        get :kpis
        get :detail
      end
    end
    resources :kpi_categories
    controller :settings do
      get 'settings/validate_ios_app_version' => :validate_ios_app_version
    end
  end

  mount Resque::Server.new, :at => "/admin/resque"
  #require 'sidekiq/web'
  #mount Sidekiq::Web => '/admin/sidekiq'

  # The priority is based upon order of creation:
  # first created -> highest priority.
  # match 'DashboardItems/item_by_dashboard_id' => 'DashboardItems#item_by_dashboard_id'

  namespace :admin do
    [:kpi_templates, :kpi_category_templates, :contacts,:entity_contacts].each do |model|
      resources model do
        collection do
          post :updata
          get :import
        end
      end
    end
    resources :kpi_templates do
      collection do
        get :categoried
      end
    end

    resources :settings do
      collection do
        post :version_save
        get :version
      end
    end

    resources :dashboards do
      collection do
        post '/import_dashboards' => :import_dashboards
        get '/error_file' => :error_file
      end
    end
    resources :tenants
    get '/' => 'tenants#index'

  end

  resources :departments do
    collection do
      post 'add_entity' => :add_entity
      delete 'remove_entity' => :remove_entity
      post 'add_user' => :add_user
      delete 'remove_user' => :remove_user
      get 'sub_departments' => :sub_departments
      get 'sub_entities' => :sub_entities
      get 'users' => :users
      get 'entity_users' => :entity_users
      #get the valid entities can be added to the department
      get 'valid_entities' => :valid_entities
      #get the valid users can be added to the department
      get 'valid_users' => :valid_users
      get 'new_entities' => :new_entities

      get 'jsontree' => :jsontree
    end
  end

  #controller :departments do
  #  get 'departments' => :index
  #  post 'departments' => :create
  #  delete 'departments/:id' => :destroy
  #  post 'departments/add_entity' => :add_entity
  #  delete 'departments/remove_entity' => :remove_entity
  #  post 'departments/add_user' => :add_user
  #  delete 'departments/remove_user' => :remove_user
  #  get 'departments/sub_departments' => :sub_departments
  #  get 'departments/sub_entities' => :sub_entities
  #  get 'departments/users' => :users
  #  get 'departments/entity_users' => :entity_users
  #  get 'departments/new_entities' => :new_entities
  #end


  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  match ':controller(/:action(/:id))(.:format)'
end

