module V2
  class KpiSubscribeAPI<Base
    guard_all!

    params do
      optional :user_id, type: String, desc: 'user id'
    end
    get :user_followed_kpis do
      user=params[:user_id].blank? ? current_user : User.accessible_by(current_ability).find_by_id(params[:user_id])
      KpiSubscribeService.generate_followed_kpis(user)
    end

    params do
      requires :kpi_id, type: Integer, desc: 'kpi id'
      requires :department_id, type: Integer, desc: 'department id'
      requires :lower_boundary, type: Float, desc: 'min boundary'
      requires :upper_boundary, type: Float, desc: 'max boundary'
      requires :auto_notification, type: Boolean, desc: 'app notification'
    end
    post :follow_kpi do
      puts '00000000000000000000000000000000000'
      KpiSubscribeService.follow_kpi({
                                         user: current_user,
                                         lower_boundary: params[:lower_boundary],
                                         upper_boundary: params[:upper_boundary],
                                         ks: {
                                           kpi_id: params[:kpi_id],
                                           department_id: params[:department_id],
                                           auto_notification: params[:auto_notification]
                                         }
                                     })
    end

  end
end