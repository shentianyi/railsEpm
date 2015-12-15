module V2
  class SearchAPI <Base
    namespace :search do

      namespace :full_text do

        params do
          requires :input_chars, type: String, desc: 'query string'
        end
        get :users do

        end
      end
    end
  end
end