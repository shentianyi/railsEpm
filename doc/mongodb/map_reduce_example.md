Ruby:

  def self.map
    map=%Q{
           function(){
  emit({kpi_id:this.kpi_id,entity_id:this.entity_id},parseFloat(this.value));
      };
     }
    map1=%Q{
       function(){
           emit({date:this.parsed_entry_at.getFullYear()+'-'+(this.parsed_entry_at.getMonth()+1)+'-'+this.parsed_entry_at.getDate()},
               parseFloat(this.value));
        };
      }

    map=%Q{
           function(){
  emit({property:this.:1},parseFloat(this.value));
      };
     }

    reduce=%Q{
          function(key,values){
  return Array.sum(values);
  }
      }
    KpiEntry.where(kpi_id: 1, entry_type: 1).map_reduce(map1, reduce).out(inline: true)
  end

