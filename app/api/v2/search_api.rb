module V2
  class SearchAPI <Base
    guard_all!
    namespace :search do

      namespace :full_text do

        params do
          optional :input_chars, type: String, desc: 'query string'
        end
        get :users do
          SearchService.full_text_user(params[:input_chars], current_user)
        end


        params do
          optional :input_chars, type: String, desc: 'query string'
        end
        get :departments do
          SearchService.full_text_department(params[:input_chars], current_user)
        end

        params do
          optional :input_chars, type: String, desc: 'query string'
        end
        get :kpis do
          SearchService.full_text_access_kpi(params[:input_chars], current_user)
        end

        params do
          optional :input_chars, type: String, desc: 'query string'
        end
        get :followed_kpis do
          SearchService.full_text_followed_kpi(params[:input_chars], current_user)
        end
      end
    end
  end
end