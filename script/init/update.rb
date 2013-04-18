#encoding: utf-8
###########################################################   
###########################################################   实体__公式__定制
["ENTITY:Leoni", "ENTITY:MB", "ENTITY:COC"].each do |key|
  (0..3).each do |i|
    k = "FORMULA:#{i}"
    puts "#{key}---#{i}"
    puts Specific.find_by_kE_hF( key, k ).destroy
    if i==0
      if key=="ENTITY:Leoni"
        Specific.new( :kEntity=>key, :hFormula=>k, :leastKPI=>0, :targetKPI=>130 ).save
      else
        Specific.new( :kEntity=>key, :hFormula=>k, :leastKPI=>0, :targetKPI=>65 ).save
      end
    elsif i==3
      Specific.new( :kEntity=>key, :hFormula=>k, :leastKPI=>0, :targetKPI=>35.5 ).save
    else
      Specific.new( :kEntity=>key, :hFormula=>k, :leastKPI=>0, :targetKPI=>1 ).save
    end
  end
end
