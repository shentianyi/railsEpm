module BaseGuard
  #keys include keys should not be nil
  def validate_params_integrated params, keys, raise_error=true
    p=params
    valid=true
    msgs=[]
    keys.each do |k|

      if params[k].blank?
        valid=false
        unless raise_error
          p= nil
          break
        end
        msgs<< "#{k} cannot be blank"
      end

      p[k]=params[k]
    end
    raise ArgumentError, msgs unless valid
    return p
  end
end