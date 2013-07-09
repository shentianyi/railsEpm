#encoding: utf-8
class Role
  @@roles={:'100'=>'user',:'200'=>'manager',:'300'=>'director',:'400'=>'admin'}

  class<<self
    [:admin?,:manager?,:director?,:user?].each do |m|
      define_method(m){|role|
        @@roles[role.to_s.to_sym]==m.to_s.sub(/\?/,'')
      }
    end
  end
end
