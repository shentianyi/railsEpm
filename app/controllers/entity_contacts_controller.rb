#encoding: utf-8
class EntityContactsController < ApplicationController
  before_filter :init_message ,:only=>[:create,:destroy]
  before_filter :get_entity_contact,:only=>[:destroy]
  before_filter :render_nil_msg , :only=>[:destroy]
  # POST /entity_contacts
  # POST /entity_contacts.json
  def create
    @entity_contact = EntityContact.new(params[:entity_contact])

    respond_to do |format|
      if @entity_contact.save
        format.html { redirect_to @entity_contact, notice: 'Entity contact was successfully created.' }
        format.json { render json: @entity_contact, status: :created, location: @entity_contact }
      else
        format.html { render action: "new" }
        format.json { render json: @entity_contact.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /entity_contacts/1
  # DELETE /entity_contacts/1.json
  def destroy
    @entity_contact = EntityContact.find(params[:id])
    @entity_contact.destroy

    respond_to do |format|
      format.html { redirect_to entity_contacts_url }
      format.json { head :no_content }
    end
  end

  private

  def get_entity_contact
    @entity_contact=EntityContact.find_by_id(params[:id])
  end

  def render_nil_msg
    unless @homework
      @msg.content= I18n.t "fix.not_exists"
      render :json=>@msg
    end
  end
end
