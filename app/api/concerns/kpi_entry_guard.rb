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

    # validate single input
    def guard_entry!
      @entry_p=validate_params_integrated(params, ParamKeys)
      yield(@entry_p) if block_given?
    end

    def guard_entries!
      raise ArgumentError unless params.has_key?(:entries)
      params[:entries] = JSON.parse(params[:entries])
      raise ArgumentError unless params[:entries].is_a?(Array)
      error=false
      params[:entries].each_with_index do |entry|
        if  @entry_p=validate_params_integrated(entry, ParamKeys, false)
          if block_given?
            begin
              yield(@entry_p)
            rescue ArgumentError
              error=true
            end
          end
        else
          error=true
        end
      end
      raise ArgumentError if error
      true
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
                     Rack::OAuth2::Server::Abstract::Error.new(422, e.message)
                 end
        response.finish
      }
    end
  end
end