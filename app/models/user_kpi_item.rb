#encoding: utf-8
class UserKpiItem < ActiveRecord::Base
  include AutoAlert

  belongs_to :entity
  belongs_to :user
  belongs_to :assigner, class_name: 'User',foreign_key: :assigner_id
  belongs_to :kpi
  belongs_to :department

  has_many :kpi_entry
  has_many :alerts, :as => :alertable, :dependent => :destroy

  attr_accessible :target_max, :target_min, :kpi_id, :user_id,
                  :entity_id, :department_id, :remind_time, :frequency, :assigner_id, :auto_notification

  #after_create :create_department_kpi
  #after_destroy :destroy_department_kpi
  has_many :task_entry_items, :class_name => 'Task::EntryItem', :as => :taskable, :dependent => :destroy


  def self.details_by_user(user)
    user.user_kpi_items.joins(:kpi).joins(:department).select('kpis.name as kpi_name,departments.name as department_name,user_kpi_items.*')
  end

  def self.reinit_department_kpis belong, department_id, department_id_was
    belong.send(:user_kpi_items).each do |user_kpi_item|
      user_kpi_item.create_department_kpi_by_department(Department.find_by_id(department_id))
      user_kpi_item.destroy_department_kpi_by_department(Department.find_by_id(department_id_was))
    end
  end


  def create_department_kpi_by_department department
    department.path_ids.each do |id|
      if dk=self.department_kpi(id)
        dk.increment!(:kpi_quantity)
      else
        DepartmentKpi.create(kpi_id: self.kpi_id, department_id: id)
      end
    end if department
  end

  def destroy_department_kpi_by_department department
    department.path_ids.each do |id|
      if dk=self.department_kpi(id)
        if dk.kpi_quantity==1
          dk.destroy
        else
          dk.decrement!(:kpi_quantity)
        end
      end
    end if department
  end

  def department_kpi(id)
    DepartmentKpi.where(kpi_id: self.kpi_id, department_id: id).first
  end

  private

  def create_department_kpi
    create_department_kpi_by_department(self.department)
  end

  def destroy_department_kpi
    destroy_department_kpi_by_department(self.department)
  end

end
