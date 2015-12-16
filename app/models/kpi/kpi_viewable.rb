#encoding: utf-8
class KpiViewable
  PRIVATE=100
  PUBLIC=200
  PARTIAL_ALLOW=300
  PARTIAL_BLOCK=400

  def self.display(v)
    case v
      when PRIVATE
        'private'
      when PUBLIC
        'public'
      when PARTIAL_ALLOW
        'partial_allow'
      when PARTIAL_BLOCK
        'partial_block'
      else
        raise 'Error KpiViewable value'
    end
  end

  def self.code(v)
    case v
      when PRIVATE
        'private'
      when PUBLIC
        'public'
      when PARTIAL_ALLOW
        'partial_allow'
      when PARTIAL_BLOCK
        'partial_block'
      else
        raise 'Error KpiViewable value'
    end
  end
end