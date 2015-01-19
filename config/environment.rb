# Load the rails application
require File.expand_path('../application', __FILE__)
# Authlogic::Session::Base.controller = Authlogic::ControllerAdapters::RailsAdapter.new(self)
# Initialize the rails application
IFEpm::Application.initialize!
