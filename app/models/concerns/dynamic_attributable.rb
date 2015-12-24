module DynamicAttributable
  def dynamic_attributes
    attributes.keys - _protected_attributes[:default].to_a - fields.keys
  end

  def localized_attributes
    attributes.keys - dynamic_attributes
  end
end