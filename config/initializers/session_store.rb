# Be sure to restart your server when you modify this file.

IFEpm::Application.config.session_store :cookie_store, key: '_IFEpm_session'
#,:domain=>:all

#request.domain(2)
#request.subdomain(2)


# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rails generate session_migration")
# IFEpm::Application.config.session_store :active_record_store
