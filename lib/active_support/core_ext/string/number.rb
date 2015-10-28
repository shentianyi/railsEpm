#encoding: utf-8
class String
  def is_number?
    true if Float(self) rescue false
    # self.sub!(/[.0]+$/,'')
    # self.to_f.to_s == self.to_s || self.to_i.to_s == self.to_s
  end
end
