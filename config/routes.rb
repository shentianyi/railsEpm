EPM::Application.routes.draw do
  # The priority is based upon order of creation:
  # first created -> highest priority.

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

  controller :apitest do
    get 'testAPI1' => :testAPI1
    get 'testAPI2' => :testAPI2
    get 'testAPI3' => :testAPI3
    get 'testAPI4' => :testAPI4
    get 'apitest/test' => :test
  end
  
  controller :session do
    get "login" => :create
  end
  
  controller :background do
    get 'background/set_time' => :set_cron_time
  end
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
    namespace :dte do
      # Directs /admin/products/* to Admin::ProductsController
      # (app/controllers/admin/products_controller.rb)
      controller :entity do
        get 'getChildOrgnizationsWithParentOrgId' => :getChildOrgnizationsWithParentOrgId
        get 'getParentWithChildOrgId' => :getParentWithChildOrgId
        get 'rootOrganization' => :rootOrganization
        get 'getContactWithOrganizationId' => :getContactWithOrganizationId
        get 'getKpiDetails' => :getKpiDetails
        get 'getKpi' => :getKpi
        get 'getKpiNodeSequenceWithKpiId' => :getKpiNodeSequenceWithKpiId
      end
      
      controller :user do
        get 'getObservedKpiStatusWithOrgId' => :getObservedKpiStatusWithOrgId
        get 'getObservedKpiWithOrgId' => :getObservedKpiWithOrgId
        get 'getKpiList' => :getKpiList
        get 'setObservedKpiList' => :setObservedKpiList
      end
    end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
