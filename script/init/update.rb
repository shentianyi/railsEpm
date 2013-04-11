#encoding: utf-8
###########################################################   
###########################################################   实体__公式__定制
["ENTITY:Leoni", "ENTITY:MB", "ENTITY:COC"].each do |key|
  (0..3).each do |i|
    k = "FORMULA:#{i}"
    puts "#{key}---#{i}"
    puts Specific.find_by_kE_hF( key, k ).destroy
    target = (key=="ENTITY:MB") ? 200 : 100
    Specific.new( :kEntity=>key, :hFormula=>k, :leastKPI=>0, :targetKPI=>target ).save
  end
end
