module BaseGuard
  def validate_params_integrated params, keys
    p={}
    keys.each do |k|
      params.has_key?(k) ? p[k]=params[k] : (raise ArgumentError)
    end
    return p
  end
end