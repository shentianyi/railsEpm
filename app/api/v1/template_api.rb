module V1
  class TemplateAPI < Base
    guard_all!


    get :templates do
      p current_user

      templates=[]
      kpi_properties={}
      current_user.kpis.each do |kpi|
        kpi.kpi_properties.each do |kp|
          kpi_properties[kp.name] = {
              type: 'string',
              allow_null: true,
              default_value: nil
          }
        end
        templates<<{
            app_id: $APP_ID,
            invoke_address: 'http://112.124.28.10:8000/api/v1/upload',
            template_id: kpi.id,
            template_name: kpi.name,
            template_description: kpi.description,
            columns: {
                kpi_id: {
                    type: 'int',
                    allow_null: false,
                    default_value: kpi.id
                },
                email: {
                    type: 'string',
                    allow_null: false,
                    default_value: current_user.email
                },
                value: {
                    type: 'float',
                    allow_null: false,
                    default_value: nil
                },
                date: {
                    type: 'utc',
                    allow_null: false,
                    default_value: nil
                },
                kpi_properties: kpi_properties.blank? ? nil : kpi_properties
            },
            auth: true
        }
      end

      templates
    end
  end
end
