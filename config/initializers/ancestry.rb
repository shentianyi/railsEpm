module Ancestry
  module ClassMethods

    def subtree_ofs(objects)
      where(subtrees_conditions(objects))
    end

    def subtrees_conditions(objects)
      t = objects.first.send :get_arel_table
      primary_key_column=objects.first.send :get_primary_key_column
      ancestroy_column=objects.first.send :get_ancestry_column

      q=t[primary_key_column]
            .in(objects.collect { |o| o.id })

      objects.each do |object|
        q=q.or(t[ancestroy_column].matches("#{object.child_ancestry}/%"))
              .or(t[ancestroy_column].eq(object.child_ancestry))
      end
      q
    end
  end
end