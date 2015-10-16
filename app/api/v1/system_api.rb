module V1
  class SystemAPI < Base
    guard_all!

    namespace :system do
      get :utc do
        {date: Time.now.utc.to_s}
      end

      get :cities do
        # params
        puts params[:country_code]
        {
            A: [
                {
                    name: '阿坝',
                    key: 'A'
                },
                {
                    name: '阿拉善',
                    key: 'A'
                }
            ],
            B: [
                {
                    name: '百色',
                    key: 'B'
                },
                {
                    name: '亳州',
                    key: 'B'
                }
            ]
        }
      end
    end
  end
end
