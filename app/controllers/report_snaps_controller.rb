class ReportSnapsController < ApplicationController
  # GET /report_snaps
  # GET /report_snaps.json
  def index
    @report_snaps = ReportSnap.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @report_snaps }
    end
  end

  # GET /report_snaps/1
  # GET /report_snaps/1.json
  def show
    @report_snap = ReportSnap.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @report_snap }
    end
  end

  # GET /report_snaps/new
  # GET /report_snaps/new.json
  def new
    @report_snap = ReportSnap.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @report_snap }
    end
  end

  # GET /report_snaps/1/edit
  def edit
    @report_snap = ReportSnap.find(params[:id])
  end

  # POST /report_snaps
  # POST /report_snaps.json
  def create
    @report_snap = ReportSnap.new(params[:report_snap])

    respond_to do |format|
      if @report_snap.save
        format.html { redirect_to @report_snap, notice: 'Report snap was successfully created.' }
        format.json { render json: @report_snap, status: :created, location: @report_snap }
      else
        format.html { render action: "new" }
        format.json { render json: @report_snap.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /report_snaps/1
  # PUT /report_snaps/1.json
  def update
    @report_snap = ReportSnap.find(params[:id])

    respond_to do |format|
      if @report_snap.update_attributes(params[:report_snap])
        format.html { redirect_to @report_snap, notice: 'Report snap was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @report_snap.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /report_snaps/1
  # DELETE /report_snaps/1.json
  def destroy
    @report_snap = ReportSnap.find(params[:id])
    @report_snap.destroy

    respond_to do |format|
      format.html { redirect_to report_snaps_url }
      format.json { head :no_content }
    end
  end
end
