#encoding: utf-8
class Role
  @@roles={:'100'=>{:name=>'user',:display=>(I18n.t 'manage.user.role.user')},
                    # :'200'=>{:name=>'manager',:display=>(I18n.t 'manage.user.role.manager')},
                    :'300'=>{:name=>'director',:display=>(I18n.t 'manage.user.role.director')},
                    :'400'=>{:name=>'admin',:display=>(I18n.t 'manage.user.role.admin')}}

  class<<self
    [:admin?,:manager?,:director?,:user?].each do |m|
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
end
