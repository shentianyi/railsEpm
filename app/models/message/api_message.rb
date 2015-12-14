class ApiMessage<CZ::BaseClass
  attr_accessor  :result_code, :messages

  def default
    {result_code: 0, messages: []}
  end

  # def as_json
  #   {
  #       result_code: self.result_code,
  #       messages: self.messages
  #   }
  # end
end