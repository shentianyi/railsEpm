class UserConfirmationMailer < ActionMailer::Base

  def deliver_confirmation(user)
    @user=user
    @url = Rails.configuration.domain +  edit_user_confirmations_url(:only_path=>true,:id=>@user.perishable_token)
    mail(:to=>@user.email, :subject=> 'Confirm your registration by' )

  end

  def deliver_password_reset(user)
    @user=user
    @url = Rails.configuration.domain + edit_password_reset_url(:id=>@user.perishable_token,:only_path=>true)
    mail(:to=>@user.email, :subject=> 'Confirm your registration by' )
  end

  def edit_confirmation_url(perishable_token)
   Rails.configuration.domain +  edit_user_confirmations_url(:only_path=>true,:id=>perishable_token)
  end
end
