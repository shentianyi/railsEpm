#encoding: utf-8
class Kpi::KpiViewable
  PUBLIC=0
  PRIVATE=1
  PARTIAL_PUBLIC=2
  PARTIAL_BLOCK=3

  def self.display(v)
    case v
      when PUBLIC
        'public'
      when PRIVATE
        'private'
      when PARTIAL_PUBLIC
        'partial_public'
      when PARTIAL_BLOCK
        'partial_block'
      else
        raise 'Error KpiViewable value'
    end
  end

  def self.code(v)
    case v
      when PUBLIC
        'public'
      when PRIVATE
        'private'
      when PARTIAL_APUBLIC
        'partial_public'
      when PARTIAL_BLOCK
        'partial_block'
      else
        raise 'Error KpiViewable value'
    end
  end
end