#encoding: utf-8
class String
  def is_date?
    true if Time.parse(self) rescue false
  end
end
