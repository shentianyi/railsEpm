module Entry
  #class OperateService
  #support create,update,remove operate for kpientry
  class OperateService

    #base attributes
    #these attributes must be set when create a entry
    #user_id,entity_id,entry_at,parsed_entry_at,tenant_id,target_max,target_min,user_kpi_item_id
    @base_attrs = ["value", "user_id", "entity_id", "entry_at", "parsed_entry_at", "kpi_id", "frequency", "tenant_id", "target_max", "target_min", "user_kpi_item_id"]
    @fill_attrs = ["user_id", "entity_id", "entry_at", "parsed_entry_at", "tenant_id", "target_max", "target_min", "user_kpi_item_id"]

    #function doc_upload_filter
    # filter for xsl or xsls upload
    # entry_type should be 1 if not defined
    #params
    #@params{
    # kpi_id: 1
    # kpi_name: 2
    # date: value
    # email: test
    # value:4
    # entry_type: 0
    # attr1:1
    # attr2:2
    # attr3:3
    # }
    #@return params for validator
    # {
    # kpi_id: id,
    # kpi_name: name,
    # date: date,
    # value: value,
    # email: email
    # kpi_properties: {
    #  attr1: 1
    #  attr2: 2
    # }
    # }
    def doc_upload_filter params
      attrs = {}
      attrs[:kpi_id] = params[:kpi_id]
      attrs[:kpi_name] = params[:kpi_name]
      attrs[:date] = params[:date]
      attrs[:value] = params[:value]
      attrs[:email] = params[:email]
      attrs[:entry_type] = params[:entry_type].nil? ? 1 : params[:entry_type]
      attrs[:kpi_properties] = {}
      #fillter attributes
      (params.keys-doc_attr).each { |k|
        attrs[:kpi_properties][k] = params[k]
        #attrs[k] = params[k]
      }
      return attrs
    end

    #@function
    #insert or update an entry
    #call this before validate
    #e.g.
    #entry :{
    # base_attrs : {
    #
    # },
    # kpi_properties : {
    #
    # }
    # }
    def insert_entry entry
      entry.symbolize_keys!
      attrs = {}
      attrs = attrs.merge(entry[:base_attrs])

      #fetch kpi_properties
      kpi = Kpi.includes(:kpi_properties).find_by_id(attrs['kpi_id'])
      if kpi && !entry[:kpi_properties].nil?
        properties = {}
        kpi.kpi_properties.each {|p|
          properties[p.name] = p.id
        }
        fetch_attrs = properties.keys.to_a
        fetch_attrs = fetch_attrs & entry[:kpi_properties].keys.to_a
        fetch_attrs.each {|f|
          if !entry[:kpi_properties][f].blank?
            if entry[:kpi_properties][f].is_a?(String)
              attrs["a"+properties[f].to_s] = entry[:kpi_properties][f].strip
            else
              attrs["a"+properties[f].to_s] = entry[:kpi_properties][f]
            end

          end
        }
      end
      #dependet on entry_type
      case attrs['entry_type']
        when 0
          kpi_entry = KpiEntry.where(user_kpi_item_id: attrs['user_kpi_item_id'], entry_at: attrs['entry_at'], entity_id: attrs['entity_id'],entry_type: attrs['entry_type']).first
        when 1
          kpi_entry = KpiEntry.where(user_kpi_item_id: attrs['user_kpi_item_id'], parsed_entry_at: attrs['parsed_entry_at'], entity_id: attrs['entity_id'],entry_type: attrs['entry_type']).first
      end
      #update
      if kpi_entry
        #puts "update!"
        case attrs['entry_type']
          when 0
            kpi_entry.update_attributes(attrs);
          when 1
            kpi_entry.update_attribute(:original_value, attrs['original_value'])
        end

      else
        #puts "new!"
        kpi_entry = KpiEntry.new(attrs)
        kpi_entry.save
        return kpi_entry
      end
    end
    
    def remove_entry id

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
    #    kpis:["2","3","5"],
    #    values:[["1","3","5"],["2","3","43"]],
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
    #    kpis:["2","3","5"],
    #    values:[["1","3","5"],["2","3","43"]],
    #    email:"IT_User@cz-tek.com"
    #}
    def create_filter records
      attrs = []
      records[:kpi_ids].each_index do |index|
        records[:attr_vals].each_index do |val_index|
          entry_attrs = []
          kpi_name = records[:kpis][index]
          #1. find all kpi properties with name and id
          kpi = Kpi.find_by_name(kpi_name)
          kpi.kpi_properties.each {|attr|
            entry_attrs << Hash[attr.name,attr.id]
          }
          #2. combine base properties to kpi attributes
          full_attrs = kpi.kpi_properties.pluck(:name) + @base_attrs
          #3. properties contained in the upload file
          fetch_attrs = records[:attrs] & full_attrs
          #4. base properties not been included
          new_attrs = @base_attrs - fetch_attrs

          h = {}
          #5. set not included base properties to nil and set it to the new hash h = {}
          new_attrs.each { |n| h[n]=nil }
          #6. combine all properties this kpi has and all the base properties not included in this upload file
          # and set to hg
          h = Hash[Hash[records[:attrs].zip(records[:attr_vals][val_index])].select { |k, v| fetch_attrs.include?(k) }.to_a | h.to_a]
          #7. transfer all properties' name to id
          h.keys.each {|key|
            #replace kpi properties' name wtih id, not base properties
            key = entry_attrs[key] if entry_attrs.keys.include?(key)
          }
          #8. set current kpi value
          h["value"] = records[:values][val_index][index]
          attrs << h
        end
        #9. fill all the properties value and kpi value
        fill_attrs(attrs, kpi.id ,records[:email])
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
    #    kpis:["2","3","5"],
    #    values:[["1","3","5"],["2","3","43"]],
    #    email:"IT_User@cz-tek.com"
    #}
    def update_filter records
      attrs = []
      records[:kpi_ids].each_index do |index|
        records[:attr_vals].each_index do |val_index|
          entry_attrs = []
          kpi_name = records[:kpis][index]
          #1. find all kpi properties with name and id
          kpi = Kpi.find_by_name(kpi_name)
          kpi.kpi_properties.each {|attr|
            entry_attrs << Hash[attr.name,attr.id]
          }
          #2. combine base properties to kpi attributes
          full_attrs = kpi.kpi_properties.pluck(:name) + @base_attrs
          #3. properties contained in the upload file
          fetch_attrs = records[:attrs] & full_attrs
          #4. base properties not been included
          #new_attrs = @base_attrs - fetch_attrs

          h = {}
          #5. set not included base properties to nil and set it to the new hash h = {}
          #new_attrs.each { |n| h[n]=nil }
          #6. combine all properties this kpi has and all the base properties not included in this upload file
          # and set to hg
          h = Hash[records[:attrs].zip(records[:attr_vals][val_index])].select { |k, v| fetch_attrs.include?(k) }.to_a
          #7. transfer all properties' name to id
          h.keys.each {|key|
            #replace kpi properties' name wtih id, not base properties
            key = entry_attrs[key] if entry_attrs.keys.include?(key)
          }
          #8. set current kpi value
          h["value"] = records[:values][val_index][index] unless records[:values][val_index][index].nil?
          attrs << h
        end
      end
      attrs
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
      #defaule entry_type is 0 means this is a detail
      #nonillattr["entrytype"] = 0
      nonillattr["frequency"] = kpi.frequency

      #fill all the attrs
      attrs.each {|attr|
        attr.each {|key,val|
          if key == "entry_at" && !val.nil?
            attr["parsed_entry_at"] = KpiEntriesHelper.parse_entry_date(kpi.frequency, val)
          end
          val = nonillattr[key] if @fill_attrs.include?(key) && val.nil?
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

    #function validate_records
    #validate kpis,kpi properties for this user
    #e.g. not need every kpis match the attribute,it will fetch
    #create and update
    #records:{
    #    attrs:["attr1","attr2","attr3"],
    #    attr_vals:[["1","2","3"],["2","4","6"]],
    #    kpi_ids:["2","3","5"],
    #    values:[["1","3","5"],["2","3","43"]],
    #    email:"IT_User@cz-tek.com"
    #}
    #remove
    #records:{
    #    entry_ids:["1","2","3"]
    #}
    def validate_records records,operator
      msg = Message.new
      msg.result = false
      if (user = User.find_by_email(records.email)).nil?
        return msg.content << "User not found!"
      end
      a = records["kpis"]
      if a!=(a&user.kpis.pluck(:name))
        return msg.content << "Contains kpi user does not have,plase check!"
      end
      msg.result = true
    end

    def doc_attr
      [:kpi_id,:kpi_name,:date,:value,:email,:entry_type]
    end
  end
end