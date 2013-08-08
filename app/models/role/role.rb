#encoding: utf-8
class Role
  @@roles={:'100'=>{:name=>'user',:display=>'普通用户'},
                    :'200'=>{:name=>'manager',:display=>'部门经理'},
                    :'300'=>{:name=>'director',:display=>'总经理'},
                    :'400'=>{:name=>'admin',:display=>'管理员'}}

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
