require 'redis'

# Redis session storage for Rails, and for Rails only. Derived from
# the MemCacheStore code, simply dropping in Redis instead.
#
# Options:
#  :key     => Same as with the other cookie stores, key name
#  :secret  => Encryption secret for the key
#  :host    => Redis host name, default is localhost
#  :port    => Redis port, default is 6379
#  :db      => Database number, defaults to 0. Useful to separate your session storage from other data
#  :key_prefix  => Prefix for keys used in Redis, e.g. myapp-. Useful to separate session storage keys visibly from others
#  :expire_after => A number in seconds to set the timeout interval for the session. Will map directly to expiry in Redis

class RedisSessionStore < ActionDispatch::Session::AbstractStore

  def initialize(app, options = {})
    super

    @default_options = {
      :namespace => 'rack:session'
    }.merge(options)

    @redis = Redis.new(@default_options)
  end

  private
    def prefixed(sid)
      "#{@default_options[:key_prefix]}#{sid}"
    end

    def get_session(env, sid)
      sid ||= generate_sid
      session = {}
      begin
        # data = @redis.get(prefixed(sid))
        data = @redis.hget(prefixed(sid), "rails")
        # if data.nil?
        # else
              # data.each do |k,v|
                    # v=@redis.hget(prefixed(sid), k)
                    # session[k]=@redis.hget(prefixed(sid), k)
              # end
        # end
        session = data.nil? ? {} : Marshal.load(data)
        # session = data.nil? ? {} : string_to_h(data)
      rescue Errno::ECONNREFUSED
        session = {}
      end
      [sid, session]
    end

    def set_session(env, sid, session_data, options)
      options = env['rack.session.options']
      expiry  = options[:expire_after] || nil
      if session_data
          if expiry
              # session_data.each do |k,v|
                    # v=v.to_s
                    # @redis.hset(prefixed(sid), k, v)
              # end
            @redis.hset(prefixed(sid), "rails", Marshal.dump(session_data))
            @redis.hset(prefixed(sid), "node", session_data["user_id"] )         if session_data["user_id"]
            @redis.expire(prefixed(sid), expiry)
            # @redis.setex(prefixed(sid), expiry, Marshal.dump(session_data))
            # @redis.setex(prefixed(sid), expiry, session_data.to_s )
          else
            @redis.set(prefixed(sid), Marshal.dump(session_data))
          end
      else
          @redis.del(prefixed(sid))
      end
      sid
    rescue Errno::ECONNREFUSED
      return false
    end
    
    def  destroy_session(env, sid, options)
      @redis.del(prefixed(sid))
      generate_sid
    end
    
    ############################# Helper
    # def  string_to_h(ses)
         # ha={}
         # unless ses.length==0
             # ses.split(',').each do |s|
                  # arr=s.split('=>')
                  # ha[ arr[0].strip ]= arr[1].strip
             # end
         # end
         # ha
    # end
#     
    # def  hash_to_str(ses)
          # str=ses.to_s.delete ' " '
          # str=str.delete "{"
          # str=str.delete "}"
    # end
end
