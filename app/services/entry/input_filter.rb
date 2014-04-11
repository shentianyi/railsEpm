module Entry
  class InputService
    # function sdk_upload
    # for sdk upload
    # params
    # @records
    # array of attributes and kpis, all kpis should contain those attributes
    # e.g. records : {attrs:[{attr1:"1",attr2:"2"},{attr1:"1",attr2:"2"}],kpis:["E1-Total","E1-Normal"]}
    def sdk_upload records
      
    end

    # function input
    # insert kpientries into mongodb
    # params
    # @attributes: array of hash parameters with attributes
    # e.g. attributes : [{attr1:"1",attr2:"2",attr3:"3",E1-Total:"1",kpi2:"kpi2",kpi3:"kpi3"}]
    # @kpis: selected kpis
    # e.g. kpis: ["E1-Total","E1-Normal"]
    # @model: model for insert into mongo
    def input attributes,kpis,model
      kpientries = filter(attributes,kpis)
      model.collection.insert(kpientries)
    end

    # function filter
    # filter input record to specific hash model
    # params
    # @record: one line of record,hash parameters
    # return
    # hash of kpientries
    def filter records,kpis
      kpientries = []
      records.each do |record|
        # get all attributes
        attributes = Hash[record.to_a - kpis.to_a]
        kpis.each do |kpi|

        end
      end
    end

    #
  end
end
