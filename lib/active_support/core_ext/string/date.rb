#encoding: utf-8
class String
  def is_date?
    true if Date.parse(self) rescue false
  end
end
