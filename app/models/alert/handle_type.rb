module Alert
  class HandleType
    MANUAL=100
    AUTO=200

    def self.display(v)
      case v
        when MANUAL
          'manual read'
        when AUTO
          'auto read'
        else
          'manual read'
      end
    end
  end
end