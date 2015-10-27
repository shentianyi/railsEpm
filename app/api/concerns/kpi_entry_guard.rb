require 'rack/oauth2'

module KpiEntryGuard
  ParamKeys=[:email, :kpi_id, :date, :value]
  extend ActiveSupport::Concern

  included do |base|
    helpers HelperMethods
    install_error_responders(base)
  end

  module HelperMethods
    def validate_params_integrated params, keys, raise_error=true
      p=params
      messages=[]
      keys.each do |k|
        if params[k].blank?
          messages<< "#{k} cannot be blank"
        end
        p[k]=params[k]
      end
      raise ArgumentError, messages if messages.length>0
      p
    end

    # validate single input
    def guard_entry!

      p params
      p '-----------------------------------99'
      p params[0]
      p params[1]
      params.each do |pp|
        puts '-----------------------**'
        puts pp
        puts '-----------------------**'
      end
      p params.length
      p '-----------------------------------99'
      entry_params=validate_params_integrated(params, ParamKeys)
      puts entry_params #[:kpi_properties]
      puts entry_params[:email]
      puts entry_params[:kpi_properties]


      unless entry_params[:kpi_properties].is_a?(Hashie::Mash)
        entry_params[:kpi_properties] = JSON.parse(entry_params[:kpi_properties])
      end if entry_params[:kpi_properties]

      vc= KpiEntryValidatorCollection.new
      entry_params[:validator_collection]=vc
      validator=KpiEntryValidator.new(entry_params)
      validator.validate #if params[:entry][:validate]==false
      if validator.valid
        yield(vc) if block_given?
      else
        raise ArgumentError, validator.invalid_messages
      end

    end

    # validate batch entries
    def guard_entries!(in_batch=true)
      Rails.logger.debug '--------------------------'
      Rails.logger.debug params
      Rails.logger.debug '--------------------------'
      if params[:entries].blank?
        puts '1......'
        params[:entries]=[]
        params.each do |p|
          puts '2-......'
          p p
          p p.class
          p p.second
          p p.second.class

          params[:entries] <<p.second if p.second.is_a?(Hash)
        end
      else
        params[:entries] = JSON.parse(params[:entries])
      end

      p params[:entries]

      raise ArgumentError unless params[:entries].is_a?(Array)
      raise ArgumentError, 'api argument error' unless params.has_key?(:entries)
      indexes=[]
      vc= KpiEntryValidatorCollection.new
      params[:entries].each_with_index do |entry, i|
        if entry_p=validate_params_integrated(entry, ParamKeys, true)
          entry_p[:validator_collection]=vc
          KpiEntryValidator.new(entry_p)
        else
          indexes<<i+1
        end
      end
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
                     # p e.instance_variables
                     # p e.methods.sort
                     # p e.hash
                     msg=begin
                       JSON.parse(e.message)
                     rescue
                       e.message
                     end
                     KpiEntryArgumentError.new(msg)
                 end
        response.finish
      }
    end
  end

  class KpiEntryError<StandardError
    # description is array
    attr_accessor :status, :error, :description, :uri, :realm

    def initialize(status, error, description = nil, options = {})
      @status = status
      @error = error.is_a?(Array) ? error : [error.to_s]
      @description = description
      @uri = options[:uri]
      @realm = options[:realm]
      super [error, description].compact.join(' :: ')
    end

    def protocol_params
      {
          result_code: '0',
          msg: @error
      }
    end

    def finish
      response = Rack::Response.new
      response.status = status
      yield response if block_given?
      unless response.redirect?
        response.header['Content-Type'] = 'application/json'
        response.write MultiJson.dump(compact_hash(protocol_params))
      end
      response.finish
    end

    def compact_hash(hash)
      hash.reject do |key, value|
        value.blank?
      end
    end

  end


  class KpiEntryArgumentError<KpiEntryError
    def initialize(error = :kpi_entry_argument_error, description = nil, options = {})
      super 200, error, description, options
    end
  end
end
