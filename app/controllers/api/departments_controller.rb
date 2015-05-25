#encoding: utf-8
#RESTFUL api
module Api
  class DepartmentsController < ApiController
    def index
      departments = []
      current_user.departments.each do |d|
        departments = Department.json_tree(d.subtree.arrange)
      end
      render :json => departments
    end
  end
end