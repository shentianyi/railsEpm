module Entry
  #class OperateService
  #support create,update,remove operate for kpientry
  class OperateService
    #base attributes
    #these attributes must be set when create a entry
    #user_id,entity_id,entry_at,parsed_entry_at,tenant_id,target_max,target_min,user_kpi_item_id
    @base_attrs = ["value", "user_id", "entity_id", "entry_at", "parsed_entry_at", "kpi_id", "entrytype", "frequency", "tenant_id", "target_max", "target_min", "user_kpi_item_id"]
    @fill_attrs = ["user_id", "entity_id", "entry_at", "parsed_entry_at", "tenant_id", "target_max", "target_min", "user_kpi_item_id", "entrytype"]
    #function sdk_upload
    #params
    #@records:Hash ,kpi ids,values and attributes
    #e.g. not need every kpis match the attribute,it will fetch
    #create and update
    #records:{
    #    attrs:["attr1","attr2","attr3"],
    #    attr_vals:[["1","2","3"],["2","4","6"]],
    #    kpi_ids:["2","3","5"],
    #    entries:[["1","3","5"],["2","3","43"]],
    #    email:"IT_User@cz-tek.com"
    #}
    #remove
    #records:{
    #    entry_ids:["1","2","3"]
    #}
    #@operator:String
    #"creata","update","remove"
    def upload records, operator
      kpi_entries = filter(records, operator)
      case operator
        when 'create'
          insert_entries(kpi_entries, KpiEntry)
        when 'update'
          update_entries(kpi_entries, KpiEntry)
        when 'remove'
          remove_entries(kpi_entries, KpiEntry)
        else
      end
    end

    private
    #function filter
    #filter and return hash of kpientries
    #@records:Hash ,kpi ids,values and attributes
    #e.g. not need every kpis match the attribute,it will fetch
    #create and update
    #records:{
    #    attrs:["attr1","attr2","attr3"],
    #    attr_vals:[["1","2","3"],["2","4","6"]],
    #    kpi_ids:["2","3","5"],
    #    entries:[["1","3","5"],["2","3","43"]],    attributes
    #    email:"IT_User@cz-tek.com"
    #}
    #remove
    #records:{
    #    entry_ids:["1","2","3"]
    #}
    #@operator:String
    #"creata","update","remove"
    #return create
    #[{kpi_id}]
    def filter records, operator
      case operator
        when "create"
          create_filter(records)
        when "update"
          update_filter(records)
        when "remove"
          remove_filter(records)
        else
          nil
      end
    end

    #function create_filter
    #params
    #@records:Hash ,kpi ids,values and attributes
    #e.g. not need every kpis match the attribute,it will fetch
    #records:{
    #    attrs:["attr1","attr2","attr3"],
    #    attr_vals:[["1","2","3"],["2","4","6"]],
    #    kpi_ids:["2","3","5"],
    #    entries:[["1","3","5"],["2","3","43"]],    attributes
    #    email:"IT_User@cz-tek.com"
    #}
    def create_filter records
      attrs = []
      records[:kpi_ids].each_index do |index|
        records[:attr_vals].each_index do |val_index|
          #kpi attributes
          entry_attrs = []
          Kpi.find_by_id(id).kpi_properties.each {|attr|
            entry_attrs << Hash[attr.name,attr.id]
          }
          #all attributes include base kpientry attributes
          full_attrs = Kpi.find_by_id(id).attributes + @base_attrs
          #attributes really need to fetch
          fetch_attrs = records[:attrs] & full_attrs
          #base kpientry attributes not included
          new_attrs = @base_attrs - records[:attrs]
          h = {}
          new_attrs.each { |n| h[n]=nil }
          #need to transfer kpi attrs to attr ids
          h = Hash[Hash[records[:attrs].zip(records[:attr_vals][val_index])].select { |k, v| fetch_attrs.include?(k) }.to_a | h.to_a]
          h.keys.each {|key|
            #replace all the kpi attributes with attribute id
            key = entry_attrs[key] if entry_attrs.keys.include?(key)
          }
          h["value"] = records[:entries][val_index][index]
          attrs << h
        end
        #fill values
        fill_attrs(attrs, records[:kpi_ids][index])
      end
      attrs
    end

    #function update_filter
    #params
    #@records:Hash ,kpi ids,values and attributes
    #e.g. not need every kpis match the attribute,it will fetch
    #records:{
    #    attrs:["attr1","attr2","attr3"],
    #    attr_vals:[["1","2","3"],["2","4","6"]],
    #    kpi_ids:["2","3","5"],
    #    entries:[["1","3","5"],["2","3","43"]],    attributes
    #    email:"IT_User@cz-tek.com"
    #}
    def update_filter records

    end

    #function create_filter
    #params
    #@records:Hash ,kpi ids,values and attributes
    #e.g. not need every kpis match the attribute,it will fetch
    #records:{
    #    entry_ids:["1","2","3"]
    #}
    def remove_filter records

    end

    #function fill_attrs
    #fill all the nil attrs
    #params
    #@attrs,array of hash attributes
    #e.g.
    #attrs:[{attr1:"1",attr2:"2"},{attr1:"2",attr2:"43"}]
    #@id, id of kpi
    #@email, email of user
    def fill_attrs attrs, id, email
      #fill all the Nonil attr
      nonillattr = {}
      user = User.find_by_email(email)
      kpi = Kpi.find_by_id(id)
      nonillattr["user_id"] = user.id
      nonillattr["tenant_id"] = user.tenant_id
      nonillattr["entity_id"] = user.entity_id
      nonillattr["entry_at"] = Time.now.utc
      nonillattr["parsed_entry_at"] = KpiEntriesHelper.parse_entry_date(kpi.frequency, nonillattr["entry_at"])
      nonillattr["tenant_id"] = user.tenant_id
      nonillattr["target_max"] = kpi.target_max
      nonillattr["target_min"] = kpi.target_min
      nonillattr["user_kpi_item_id"] = UserKpiItem.where("user_id = ? AND kpi_id = ?",user.id,kpi.id).first
      nonillattr["entrytype"] = 0
      nonillattr["frequency"] = kpi.frequency


      #fill all the attrs
      attrs.each {|attr|
        attr.each {|key,val|
          val = nonillattr[key] if @fill_attrs.include?(key)
        }
      }
      attrs
    end

    #function insert_entries
    #params
    #@kpi_entries,hash of kpi_entry attributes
    #@model of KpiEntry
    def insert_entries kpi_entries, model
      model.collection.insert(kpi_entries)
    end

    #function update_entries
    #params
    #@kpi_entries,hash of kpi_entry attributes,include kpi_id
    #@model of KpiEntry
    def update_entries kpi_entries, model
      kpi_entries.each do |entry|
        model.find(entry.id).update_attributes(kpi_entries.except(:id))
      end
    end

    #function remove_entries
    #params
    #@kpi_entries hash of kpi_entries ids
    #@model of KpiEntry
    def remove_entries kpi_entries, model

    end
  end
end