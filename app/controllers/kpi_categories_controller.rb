#encoding: utf-8
class KpiCategoriesController < ApplicationController
	def new
		render :partial=>'new'
	end
	def create
		if request.post?
		  @category=KpiCategory.new(params[:category])
		  if @category.save
			  render :json=>true
		  else
			  render :json=>false
		  end
		end
	end
	def edit
		@category=KpiCategory.find_by_id(params[:id])
	end
	def update
		@category=KpiCategory.find_by_id(params[:id])
		if @category and @category.update_attributes(params[:category])
render :json=>true
		else
			render :json=>false
		end
	end
	def destroy
	end
	def assign
	end
end
