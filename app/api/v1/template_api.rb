module V1
  class TemplateAPI < Base
    guard_all!


    get :templates do
      p current_user

      templates=[]
      templates<<{

          app_id: Settings.app.id,
          invoke_address: "http://#{Settings.server.host}/api/v2/plans/upload",
          template_id: 'PLAN',
          template_name: 'PLAN',
          template_description: 'IMPORT PLAN',
          columns: {
              assembly: {
                  type: 'string',
                  allow_null: false,
                  default_value: nil,
              },
              product_line: {
                  type: 'string',
                  allow_null: false,
                  default_value: nil,
              },
              planned: {
                  type: 'int',
                  allow_null: false,
                  default_value: nil,
              },
              date: {
                  type: 'utc',
                  allow_null: false,
                  default_value: nil,
              }
          }
      }


      templates
      #
      # current_user.kpis.each do |kpi|
      #   kpi_properties={}
      #   kpi.kpi_properties.each do |kp|
      #     kpi_properties[kp.name] = {
      #         type: 'string',
      #         allow_null: true,
      #         default_value: nil
      #     }
      #   end
      #   templates<<{
      #       app_id: Settings.app.id,
      #       invoke_address: "http://#{Settings.server.host}/api/v1/upload",
      #       template_id: kpi.id,
      #       template_name: kpi.name,
      #       template_description: kpi.description,
      #       columns: {
      #           kpi_id: {
      #               type: 'int',
      #               allow_null: false,
      #               default_value: kpi.id
      #           },
      #           email: {
      #               type: 'string',
      #               allow_null: false,
      #               default_value: current_user.email
      #           },
      #           value: {
      #               type: 'float',
      #               allow_null: false,
      #               default_value: nil
      #           },
      #           date: {
      #               type: 'utc',
      #               allow_null: false,
      #               default_value: nil
      #           },
      #           kpi_properties: kpi_properties.blank? ? nil : kpi_properties
      #       },
      #       auth: true
      #   }
      # end
    end
  end
end
