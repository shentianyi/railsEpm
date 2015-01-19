#encoding: utf-8
module SystemHelper
  # ws : get os name
  def self.get_os_name user_agent
    user_agent=user_agent.downcase
    [/windows/,/linux/,/macintosh/].each do |o|
      if os=o.match(user_agent)
      return os[0]
      end
    end
  end

  # ws : csv encode
  def self.csv_read_encode user_agent
    user_agent=user_agent.downcase
    os= get_os_name(user_agent)
    case os
    when 'windows'
      return 'GB18030:UTF-8'
    when 'linux','macintosh'
      return 'UTF-8:UTF-8'
    else
    return nil
    end
  end
end