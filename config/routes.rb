IFEpm::Application.routes.draw do

  resources :emails do
    collection do
      get '/analyse/:id' => :analyse
    end
  end
  
  resources :entity_contacts

  resources :contacts
  resources :avatars
  resources :files do 
    member do
      get :template
    end
  end

  root :to => 'user_sessions#new'
  # get "welcome/navigate"



  resources :entities  do
    collection do
      put :update
    end
  end

  resources :users do
    collection do
      match :login
      post :add
      put :update
    end
  end

  resource :user_sessions do
    collection do
      post :locale
    end
  end
  resource :user_confirmations
  resource :subscriptions

  resources :kpis do
    collection do
      get '/c/:id'=>:index
      put :update
      post :assign
      post :import
      get :template
      get :condition
      [:categoried,:user,:list].each do |a|
        get "#{a}/:id"=>a
      end
    end
  end

  resources :kpi_categories do
    collection do
      get 'index/:f'=>:index
      put :update
      get :template
      get :list
    end
  end

  resources :kpi_entries do
    collection do
      #post :entry
     # get :refresh_entry
      match :analyse
      get :recents
      post :import
    end
  end

  resources :entity_groups do
    collection do
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

  namespace :api,defaults:{format:'json'} do
   resources :kpi_entries do
     collection do
       get :analyse ,:defaults=>{:format=>'html'}
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
        get 'dashboard_items/get_data'=>:get_data
        get 'dashboard_items/items_by_dashboard_id'=>:items_by_dashboard_id
        get 'dashboard_items/update_sequence' => :update_sequence
      end
    end
    resources :user_sessions

  resources :emails do
    collection do
      get 'analyse/:id'=> :analyse , :defaults =>{:format => 'html'}
      
    end
  end


    controller :kpis do
      match 'kpis/kpis_by_category'=>:kpis_by_category
    end

    #resources :user_sessions
    resources :entity_groups do
      member do
        get :contacts
        get :kpis
        get :detail
      end
    end
    resources :kpi_categories

  end

  mount Resque::Server.new, :at=>"/admin/resque"

  # The priority is based upon order of creation:
  # first created -> highest priority.
  # match 'DashboardItems/item_by_dashboard_id' => 'DashboardItems#item_by_dashboard_id'

  namespace :admin do
    resources :sessions

    [:kpi_templates, :kpi_category_templates].each do |model|
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

  end

  controller :departments do
    get 'departments'=>:index
    post 'departments'=>:create
    delete 'departments/:id'=>:destroy
    post 'departments/add_entity'=>:add_entity
  end
  
  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  match ':controller(/:action(/:id))(.:format)'
end
