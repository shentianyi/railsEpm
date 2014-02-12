#encoding: utf-8
class Role
  RoleMethods=[:admin?,:manager?,:director?,:user?]
  @@roles={:'100'=>{:name=>'user',:display=>(I18n.t 'manage.user.role.user')},
                    # :'200'=>{:name=>'manager',:display=>(I18n.t 'manage.user.role.manager')},
                    :'300'=>{:name=>'director',:display=>(I18n.t 'manage.user.role.director')},
                    :'400'=>{:name=>'admin',:display=>(I18n.t 'manage.user.role.admin')}}

  class<<self
    RoleMethods.each do |m|
      define_method(m){|id|
        @@roles[id_sym(id)][:name]==m.to_s.sub(/\?/,'')
      }
    end
  end
  
  def self.display id
    @@roles[id_sym(id)][:display]
  end
  
  def self.id_sym id
    id.to_s.to_sym
  end

  def self.role_items
   role_items=[]
   @@roles.each do |key,value|
          role_items<<RoleItem.new(id:key.to_s.to_i,name:value[:display])
   end
    return role_items
  end
end

class RoleItem<CZ::BaseClass
  attr_accessor :id,:name
end