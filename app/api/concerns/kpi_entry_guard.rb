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
      #entry_p=validate_params_integrated(params, ParamKeys)
      raise ArgumentError unless params.has_key?(:entry)
      #if params[:entry].is_a?(Hashie::Mash)

      #else
      params[:entry] = JSON.parse(params[:entry])
      #end

      entry_p = params[:entry]
      unless params[:entry][:kpi_properties].is_a?(Hashie::Mash)
        entry_p.kpi_properties = JSON.parse(params[:entry][:kpi_properties])
      end

      vc= KpiEntryValidatorCollection.new
      entry_p[:validator_collection]=vc
      validator=KpiEntryValidator.new(entry_p)
      validator.validate
      if validator.valid
        yield(vc) if block_given?
      else
        raise ArgumentError, validator.invalid_message
      end

    end

    # validate batch entries
    def guard_entries!(in_batch=false)
      raise ArgumentError unless params.has_key?(:entries)
      #if params[:entries].is_a?(Array)

      #else
      params[:entries] = JSON.parse(params[:entries])
      #end

      raise ArgumentError unless params[:entries].is_a?(Array)
      indexes=[]
      vc= KpiEntryValidatorCollection.new
      params[:entries].each_with_index do |entry, i|
        if  entry_p=validate_params_integrated(entry, ParamKeys, false)
          entry_p[:validator_collection]=vc
          KpiEntryValidator.new(entry_p)
        else
          indexes<<i+1
        end
      end
      # argument error
      if indexes.size>0
        raise ArgumentError, "data index:#{indexes.join(',')} Argument Error}"
      else
        vc.validators.each do |v|
          v.validate
          vc.valid=false unless v.valid
        end
        if vc.valid
          yield(vc) if block_given?
        else
          unless in_batch
            yield(vc) if block_given?
            raise(ArgumentError, vc.invalid_message)
          else
            raise(ArgumentError, vc.invalid_message)
          end
        end
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
                     Rack::OAuth2::Server::Abstract::Error.new(422, e.message)
                 end
        response.finish
      }
    end
  end
end