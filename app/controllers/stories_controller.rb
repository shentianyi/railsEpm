class StoriesController < ApplicationController
  before_filter :get_ability_category, :get_kpis_by_category, :get_user_entity_groups, :only => [:index, :new]
  # GET /stories
  # GET /stories.json
  def index
    @stories = current_user.stories
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @stories }
    end
  end

  # GET /stories/1
  # GET /stories/1.json
  def show
    @story = Story.find(params[:id])
    @comments=CommentPresenter.init_presenters(Comment.detail_by_commentable(@story).all)
    @chart_conditions=ChartConditionPresenter.init_presenters(ChartCondition.detail_by_chartable(@story).all)
    render partial: 'detail'
  end

  # GET /stories/new
  # GET /stories/new.json
  def new

    @story = Story.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @story }
    end
  end

  # GET /stories/1/edit
  def edit
    @story = Story.find(params[:id])
  end

  # POST /stories
  # POST /stories.json
  def create
    @msg=Message.new(result: true)
    @story = Story.new(params[:story].except(:attachments, :chart_conditions))
    @story.user=current_user
    Attachment.add(params[:story][:attachments].values, @story) unless params[:story][:attachments].blank?
    unless params[:story][:chart_conditions].blank?
      params[:story][:chart_conditions].each do |index, c|
        StoryService.add_chart_condition(c, @story)
      end
    end
    @story.save
    @msg.content=@story
    render json: @msg
  end

  # PUT /stories/1
  # PUT /stories/1.json
  def update
    @story = Story.find(params[:id])

    respond_to do |format|
      if @story.update_attributes(params[:story])
        format.html { redirect_to @story, notice: 'Story was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @story.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /stories/1
  # DELETE /stories/1.json
  def destroy
    @story = Story.find(params[:id])
    @story.destroy

    respond_to do |format|
      format.html { redirect_to stories_url }
      format.json { head :no_content }
    end
  end


  def comment
    @msg=Message.new
    if @story= Story.find_by_id(params[:id])
      @comment=Comment.new(params[:comment].except(:attachments))
      @comment.commentable=@story
      @comment.user=current_user
      Attachment.add(params[:comment][:attachments].values, @comment) unless params[:comment][:attachments].blank?
      @comment.save
      @msg.content=@comment
      @msg.result=true
    end
    render json: @msg
  end
end
