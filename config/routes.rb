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
      post :kpi_option
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
       post :kpi_option
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
     end
   end


  resources :dashboards


  mount Resque::Server.new, :at=>"/admin/resque"

#	constraints(Subdomain) do
#
#	  resourses :users
#	end
# The priority is based upon order of creation:
# first created -> highest priority.
 match 'DashboardItems/item_by_dashboard_id' => 'DashboardItems#item_by_dashboard_id'
# Sample of regular route:
#   match 'products/:id' => 'catalog#view'
# Keep in mind you can assign values other than :controller and :action

# Sample of named route:
#   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
# This route can be invoked with purchase_url(:id => product.id)

# Sample resource route (maps HTTP verbs to controller actions automatically):
#   resources :products

# Sample resource route with options:
#   resources :products do
#     member do
#       get 'short'
#       post 'toggle'
#     end
#
#     collection do
#       get 'sold'
#     end
#   end

# Sample resource route with sub-resources:
#   resources :products do
#     resources :comments, :sales
#     resource :seller
#   end

# Sample resource route with more complex sub-resources
#   resources :products do
#     resources :comments
#     resources :sales do
#       get 'recent', :on => :collection
#     end
#   end

# Sample resource route within a namespace:
#   namespace :admin do
#     # Directs /admin/products/* to Admin::ProductsController
#     # (app/controllers/admin/products_controller.rb)
#     resources :products
#   end

# You can have the root of your site routed with "root"
# just remember to delete public/index.html.
# root :to => 'welcome#index'

# See how all your routes lay out with "rake routes"

# This is a legacy wild controller route that's not recommended for RESTful applications.
# Note: This route will make all actions in every controller accessible via GET requests.
 match ':controller(/:action(/:id))(.:format)'
end
