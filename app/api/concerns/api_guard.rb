# Guard API with OAuth 2.0 Access Token

require 'rack/oauth2'

module APIGuard
  extend ActiveSupport::Concern

  included do |base|
    # OAuth2 Resource Server Authentication
    use Rack::OAuth2::Server::Resource::Bearer, 'The API' do |request|
      puts 'api request'
      request.access_token
    end

    #use Grape::Middleware::Auth::Basic do |user,pwd|
    #  puts 'api user pwd'
    #  @user=user
    #  @pwd=pwd
    #end

    helpers HelperMethods

    install_error_responders(base)
  end

# Helper Methods for Grape Endpoint
  module HelperMethods
    # Invokes the doorkeeper guard.
    #
    # If token string is blank, then it raises MissingTokenError.
    #
    # If token is presented and valid, then it sets @current_user.
    #
    # If the token does not have sufficient scopes to cover the requred scopes,
    # then it raises InsufficientScopeError.
    #
    # If the token is expired, then it raises ExpiredError.
    #
    # If the token is revoked, then it raises RevokedError.
    #
    # If the token is not found (nil), then it raises TokenNotFoundError.
    #
    # Arguments:
    #
    #   scopes: (optional) scopes required for this guard.
    #           Defaults to empty array.
    #
    def guard!(scopes= [])
      if request.env['HTTP_AUTHORIZATION'].split(' ')[0]=='Bearer'
        guard_by_token(scopes)
      else
        guard_by_basic
      end
    end

    def current_user
      @current_user
    end

    def current_tenant
      @current_tenant
    end

    private
    def guard_by_basic
      auth_header = env['HTTP_AUTHORIZATION'].split(' ')
      user, pass = Base64.decode64(auth_header[1]).split(':')

      if (user=User.find_for_database_authentication(:email => user)) && user.valid_password?(pass)
        @current_user=user
        @current_tenant=user.tenant
      else
        raise BasicAuthError
      end
    end

    def guard_by_token(scopes= [])
      token_string = get_token_string()

      if token_string.blank?
        raise MissingTokenError

      elsif (access_token = find_access_token(token_string)).nil?
        raise TokenNotFoundError

      else
        case validate_access_token(access_token, scopes)
          when Oauth2::AccessTokenValidationService::INSUFFICIENT_SCOPE
            raise InsufficientScopeError.new(scopes)
          when Oauth2::AccessTokenValidationService::EXPIRED
            raise ExpiredError
          when Oauth2::AccessTokenValidationService::REVOKED
            raise RevokedError
          when Oauth2::AccessTokenValidationService::VALID
            @current_tenant=Tenant.find(access_token.resource_owner_id)
            raise ExpiredError if @current_tenant.expire_at.to_time.utc < Time.now.utc
            @current_user = @current_tenant.super_user if @current_tenant
        end
      end
    end


    def get_token_string
      # The token was stored after the authenticator was invoked.
      # It could be nil. The authenticator does not check its existence.
      request.env[Rack::OAuth2::Server::Resource::ACCESS_TOKEN]
    end

    def find_access_token(token_string)
      Doorkeeper::AccessToken.authenticate(token_string)
    end

    def validate_access_token(access_token, scopes)
      Oauth2::AccessTokenValidationService.validate(access_token, scopes: scopes)
    end
  end

  module ClassMethods
    # Installs the doorkeeper guard on the whole Grape API endpoint.
    #
    # Arguments:
    #
    #   scopes: (optional) scopes required for this guard.
    #           Defaults to empty array.
    #
    def guard_all!(scopes=[])
      before do
        guard! scopes: scopes
      end
    end

    private
    def install_error_responders(base)
      error_classes = [BasicAuthError, MissingTokenError, TokenNotFoundError,
                       ExpiredError, RevokedError, InsufficientScopeError]

      base.send :rescue_from, *error_classes, oauth2_bearer_token_error_handler
    end

    def oauth2_bearer_token_error_handler
      Proc.new { |e|
        response = case e
                     when BasicAuthError
                       Rack::OAuth2::Server::Resource::Bearer::Unauthorized.new(
                           :invalid_token,
                           "Invalid User Info.")
                     when MissingTokenError
                       Rack::OAuth2::Server::Resource::Bearer::Unauthorized.new

                     when TokenNotFoundError
                       Rack::OAuth2::Server::Resource::Bearer::Unauthorized.new(
                           :invalid_token,
                           "Bad Access Token.")
                     when ExpiredError
                       Rack::OAuth2::Server::Resource::Bearer::Unauthorized.new(
                           :invalid_token,
                           "Token is expired. You can either do re-authorization or token refresh.")

                     when RevokedError
                       Rack::OAuth2::Server::Resource::Bearer::Unauthorized.new(
                           :invalid_token,
                           "Token was revoked. You have to re-authorize from the user.")

                     when InsufficientScopeError
                       # FIXME: ForbiddenError (inherited from Bearer::Forbidden of Rack::Oauth2)
                       # does not include WWW-Authenticate header, which breaks the standard.
                       Rack::OAuth2::Server::Resource::Bearer::Forbidden.new(
                           :insufficient_scope,
                           Rack::OAuth2::Server::Resource::ErrorMethods::DEFAULT_DESCRIPTION[:insufficient_scope],
                           {:scope => e.scopes})
                   end

        response.finish
      }
    end
  end

#
# Exceptions
#

  class BasicAuthError<StandardError;
  end
  class MissingTokenError < StandardError;
  end

  class TokenNotFoundError < StandardError;
  end

  class ExpiredError < StandardError;
  end

  class RevokedError < StandardError;
  end

  class InsufficientScopeError < StandardError
    attr_reader :scopes

    def initialize(scopes)
      @scopes = scopes
    end
  end
end