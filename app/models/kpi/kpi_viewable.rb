#encoding: utf-8
class KpiViewable
  include Enum
  KpiViewable.define :Private, 100, 'Private'
  KpiViewable.define :Public, 200, 'Public'
  KpiViewable.define :PartialAllow, 300, 'PartialAllow'
  KpiViewable.define :PartialBlock, 400, 'PartialBlock'
end