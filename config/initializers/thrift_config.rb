require 'thrift/hbase_types'
require 'thrift/hbase_constants'
require 'thrift/service'


# transport = ::Thrift::BufferedTransport.new(::Thrift::Socket.new('192.168.0.178', '9001'))
# protocol=::Thrift::BinaryProtocol.new(transport)
# $thrift = Epm::Hbase::Thrift::EService::Client.new(protocol)
# transport.open