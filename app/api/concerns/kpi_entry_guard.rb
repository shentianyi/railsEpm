require 'rack/oauth2'

module KpiEntryGuard
  ParamKeys=[:email, :kpi_id, :date, :value]
  extend ActiveSupport::Concern


  included do |base|
    helpers HelperMethods
    install_error_responders(base)
  end

  module HelperMethods
    include BaseGuard

    def guard_entry!
      if kpi_entry_param=validate_params_integrated(params, ParamKeys)
        validator=KpiEntryValidator.new(kpi_entry_param)
        validator.validate
        validator.valid ? validator.entry : (raise ArgumentError)
      end
    end

  end

  module ClassMethods
    private
    def install_error_responders(base)
      errors=[ArgumentError]
      base.send :rescue_from, *errors, kpi_entry_error_handler
    end

    def kpi_entry_error_handler
      Proc.new { |e|
        response=case e
                   when ArgumentError
                     Rack::OAuth2::Server::Abstract::Error.new(422, 'Argument Error')
                 end
        response.finish
      }
    end
  end
end