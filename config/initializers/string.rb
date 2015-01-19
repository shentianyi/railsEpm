#encoding: utf-8
class String
  def calculate
    # [:+,:-,:*,:/].each do |op|
      # factors=self.split(op.to_s)
      # return factors.map(&:calculate).inject(op) if factors.size>1
    # end
    eval("#{self}.to_f")
    # to_f
  end
  alias calc calculate
end
