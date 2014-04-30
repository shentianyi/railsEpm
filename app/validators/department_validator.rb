#encoding: utf-8
class DepartmentValidator
  attr_accessor :user_id,:department_id
  attr_accessor :valid,:content

  #
  def initialize args={}
    self.valid= true
    args.each do |k,v|
      instance_variable_set "@#{k}",v
    end
  end

  def valid_add_user
    if self.user_id.nil? || self.department_id.nil?
      self.valid = false
      txt = I18n.t "manage.department.desc.argument-err"
      self.content << txt
    end

    user = User.find_by_id(self.user_id)
    department = Department.find_by_id(self.department_id)

    if user.nil? || department.nil?
      self.valid = false
      txt = I18n.t "manage.department.desc.not-found"
      self.content << txt
    end

    user.departments.each do |d|
      if d.subtree.exists?(:name => department.name)
        self.valid = false
        txt = I18n.t "manage.department.desc.already-assign"
        self.content = txt+",["+d.name+"]"
      end
    end
  end
end