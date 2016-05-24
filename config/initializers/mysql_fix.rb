module ActiveRecord::ConnectionAdapters
  class Mysql2Adapter
    alias_method :execute_without_retry, :execute
    NATIVE_DATABASE_TYPES[:primary_key] = "int(11) auto_increment PRIMARY KEY"
    def execute(*args)
      execute_without_retry(*args)
    rescue ActiveRecord::StatementInvalid => e
      if e.message =~ /server has gone away/i
        warn "Server timed out, retrying"
        reconnect!
        retry
      else
        raise e
      end
    end
  end
end
