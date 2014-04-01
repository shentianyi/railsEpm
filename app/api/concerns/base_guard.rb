module BaseGuard
  def validate_params_integrated params, keys, raise_error=true
    p={}
    keys.each do |k|
      if params[k].blank?
        unless raise_error
          p= nil
          break
        end
        raise ArgumentError
      end
      p[k]=params[k]
    end
    return p
  end
end