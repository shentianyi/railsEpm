class StorySetsController < ApplicationController
  before_filter :get_ability_category, :get_kpis_by_category, :get_user_entity_groups, :only => [:story]
  # GET /story_sets
  # GET /story_sets.json
  def index
    @story_sets =current_user.collaborated_story_sets.all
    UserMessage.clean_story_set_message(current_user.id)
    UserMessage.clean_story_comment_message(current_user.id)
    UserMessage.clean_new_story_message(current_user.id)
    @messages=EventMessageBox.all_story_set_message(current_user.id)
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @story_sets }
    end
  end

  # GET /story_sets/1
  # GET /story_sets/1.json
  def show
    @story_set = StorySet.find(params[:id])
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @story_set }
    end
  end

  # GET /story_sets/new
  # GET /story_sets/new.json
  def new
    @story_set = StorySet.new
    @users=User.where('id <> ?', current_user.id).where(role_id: Role.director).all
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @story_set }
    end
  end

  # GET /story_sets/1/edit
  def edit
    @story_set = StorySet.find(params[:id])
  end

  # POST /story_sets
  # POST /story_sets.json
  def create
    msg = Message.new
    msg.result = false

    @story_set = StorySet.new(params[:story_set])
    @story_set.user = current_user
    @story_set.collaborators = [current_user]+StorySetService.gen_collaborators(params[:users])


    if msg.result = @story_set.save
      msg.content= @story_set
    else
      msg.content = @story_set.errors.full_messages
    end
    render json: msg
  end

  # PUT /story_sets/1
  # PUT /story_sets/1.json
  def update
    @story_set = StorySet.find(params[:id])

    respond_to do |format|
      if @story_set.update_attributes(params[:story_set])
        format.html { redirect_to @story_set, notice: 'Story set was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @story_set.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /story_sets/1
  # DELETE /story_sets/1.json
  def destroy
    @story_set = StorySet.find(params[:id])
    @story_set.destroy

    respond_to do |format|
      format.html { redirect_to story_sets_url }
      format.json { head :no_content }
    end
  end

  def story
    @stories=[]
    @story_set_id=params[:id]
    if params.has_key?(:comment)
      @comment=Comment.find_by_id(params[:id])
      @default_story=@comment.commentable
      @story_set_id = @default_story.story_set_id
    elsif params.has_key?(:story)
      @default_story=Story.find_by_id(params[:id])
      @story_set_id = @default_story.story_set_id
    end
    if @story_set=StorySet.find_by_id(@story_set_id)
      @stories=StoryPresenter.init_presenters(Story.detail_by_set_id(@story_set.id).all)
      if @default_story.nil? && @stories.count>0
        @default_story=@stories.first
      end
    end
    @default_story_id =@default_story.id if @default_story
  end

  def add_chart
  end
end
