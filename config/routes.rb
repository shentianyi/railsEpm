IFEpm::Application.routes.draw do

  root :to => 'welcome#index'
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

  resource :user_sessions
  resource :user_confirmations
  resource :subscriptions

  resources :kpis do
    collection do
      put :update
      post :assign
      get :get_by_category
      post :import
    end
    member do
      get :assign
    end
  end

  resources :kpi_categories do
    collection do
      put :update
    end
  end

  resources :kpi_entries do
    collection do
      post :entry
      post :refresh_entry
      match :analyse
    # post :kpi_option
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

  resources :entity_group_items

  namespace :api,defaults:{format:'json'} do
    controller :kpi_entries do
      match 'kpi_entries/entry'=>:entry
      match 'kpi_entries/analyse'=>:analyse
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

  resources :dashboards

  mount Resque::Server.new, :at=>"/admin/resque"

  # The priority is based upon order of creation:
  # first created -> highest priority.
  match 'DashboardItems/item_by_dashboard_id' => 'DashboardItems#item_by_dashboard_id'

  namespace :admin do
  resources :sessions
    resources :kpi_templates do
      collection do
        get :categoried
      end
    end
    [:kpi_templates,:kpi_category_templates].each do |model|
      resources model do
        collection do
          post :updata
          get :import
        end
      end
    end
  end

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  match ':controller(/:action(/:id))(.:format)'
end
