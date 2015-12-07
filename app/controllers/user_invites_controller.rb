class UserInvitesController < ApplicationController
  # GET /user_invites
  # GET /user_invites.json
  def index
    @user_invites = UserInvite.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @user_invites }
    end
  end

  # GET /user_invites/1
  # GET /user_invites/1.json
  def show
    @user_invite = UserInvite.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @user_invite }
    end
  end

  # GET /user_invites/new
  # GET /user_invites/new.json
  def new
    @user_invite = UserInvite.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @user_invite }
    end
  end

  # GET /user_invites/1/edit
  def edit
    @user_invite = UserInvite.find(params[:id])
  end

  # POST /user_invites
  # POST /user_invites.json
  def create
    @user_invite = UserInvite.new(params[:user_invite])

    respond_to do |format|
      if @user_invite.save
        format.html { redirect_to @user_invite, notice: 'User invite was successfully created.' }
        format.json { render json: @user_invite, status: :created, location: @user_invite }
      else
        format.html { render action: "new" }
        format.json { render json: @user_invite.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /user_invites/1
  # PUT /user_invites/1.json
  def update
    @user_invite = UserInvite.find(params[:id])

    respond_to do |format|
      if @user_invite.update_attributes(params[:user_invite])
        format.html { redirect_to @user_invite, notice: 'User invite was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @user_invite.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /user_invites/1
  # DELETE /user_invites/1.json
  def destroy
    @user_invite = UserInvite.find(params[:id])
    @user_invite.destroy

    respond_to do |format|
      format.html { redirect_to user_invites_url }
      format.json { head :no_content }
    end
  end
end
