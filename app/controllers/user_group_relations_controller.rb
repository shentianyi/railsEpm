class UserGroupRelationsController < ApplicationController
  # GET /user_group_relations
  # GET /user_group_relations.json
  def index
    @user_group_relations = UserGroupRelation.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @user_group_relations }
    end
  end

  # GET /user_group_relations/1
  # GET /user_group_relations/1.json
  def show
    @user_group_relation = UserGroupRelation.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @user_group_relation }
    end
  end

  # GET /user_group_relations/new
  # GET /user_group_relations/new.json
  def new
    @user_group_relation = UserGroupRelation.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @user_group_relation }
    end
  end

  # GET /user_group_relations/1/edit
  def edit
    @user_group_relation = UserGroupRelation.find(params[:id])
  end

  # POST /user_group_relations
  # POST /user_group_relations.json
  def create
    @user_group_relation = UserGroupRelation.new(params[:user_group_relation])

    respond_to do |format|
      if @user_group_relation.save
        format.html { redirect_to @user_group_relation, notice: 'User group relation was successfully created.' }
        format.json { render json: @user_group_relation, status: :created, location: @user_group_relation }
      else
        format.html { render action: "new" }
        format.json { render json: @user_group_relation.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /user_group_relations/1
  # PUT /user_group_relations/1.json
  def update
    @user_group_relation = UserGroupRelation.find(params[:id])

    respond_to do |format|
      if @user_group_relation.update_attributes(params[:user_group_relation])
        format.html { redirect_to @user_group_relation, notice: 'User group relation was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @user_group_relation.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /user_group_relations/1
  # DELETE /user_group_relations/1.json
  def destroy
    @user_group_relation = UserGroupRelation.find(params[:id])
    @user_group_relation.destroy

    respond_to do |format|
      format.html { redirect_to user_group_relations_url }
      format.json { head :no_content }
    end
  end
end
