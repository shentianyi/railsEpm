IFEpm::Application.routes.draw do

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
      put :update
      get :template
      get :list
    end
  end

  resources :kpi_entries do
    collection do
      post :entry
      post :refresh_entry
      match :analyse
      get :recents
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
      match '/fullsize/:id' => :fullsize
    end
  end

  resources :dashboard_items do
    collection do
      put :update
    end
  end

  controller :welcome do
    match 'welcome' => :index
    match 'welcome/users' => :users
    match 'welcome/statistics' => :statistics
  end

  resources :entity_group_items

  namespace :api,defaults:{format:'json'} do
    controller :kpi_entries do
      match 'kpi_entries/entry'=>:entry
      match 'kpi_entries/analyse'=>:analyse
       match 'kpi_entries/test_data'=>:test_data
    end
    resources :dashboards
    controller :dashboard_items do
      match 'dashboard_items/get_data'=>:get_data
      match 'dashboard_items/items_by_dashboard_id'=>:items_by_dashboard_id
      match 'dashboard_items/update_sequence' => :update_sequence
    end
    controller :user_sessions do
      match 'user_sessions/create' =>:create
      match 'user_sessions/destroy' => :destroy
    end

    controller :kpis do
      match 'kpis/kpis_by_category'=>:kpis_by_category
    end

    #resources :user_sessions
    resources :entity_groups
    resources :kpi_categories

  end

  mount Resque::Server.new, :at=>"/admin/resque"

  # The priority is based upon order of creation:
  # first created -> highest priority.
  match 'DashboardItems/item_by_dashboard_id' => 'DashboardItems#item_by_dashboard_id'

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

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  match ':controller(/:action(/:id))(.:format)'
end
