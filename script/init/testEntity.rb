#encoding: utf-8
$redis.flushdb

###########################################################   
###########################################################   公式
fma = DataFormula.new( "key"=>"FORMULA:0", :formula=>"people", 
                                                    :name=>"Attendance", :desc=>"The current arrivals." )
fma.save

fmaRFT = DataFormula.new( "key"=>"FORMULA:1", :formula=>"rft/out",
                                                     :name=>"RFT", :desc=>"The ratio of first approved to the out.")
fmaRFT.save

fmaPPM = DataFormula.new( "key"=>"FORMULA:2", :formula=>"defeat/out",
                                                     :name=>"PPM", :desc=>"The ratio of the defeat to the out.")
fmaPPM.save

fmaE1 = DataFormula.new( "key"=>"FORMULA:3", :formula=>"people*8/out/0.1",
                                                     :name=>"E1", :desc=>"The ratio of pay to earn.")
fmaE1.save

###########################################################   实体
p = Entity.new( "key"=>"ENTITY:Leoni", :name=>"LEONI")
p.save

son1 = Entity.new( "key"=>"ENTITY:MB", :name=>"MB")
son1.save
son1.add_parent(p.key)

son2 = Entity.new( "key"=>"ENTITY:COC", :name=>"COC")
son2.save
son2.add_parent(p.key)

p.add_son(son1.key)
p.add_son(son2.key)

###########################################################   实体__联系人
c0 = Contact.new("key"=>"CONTACT:leoni", :title=>"chef", :name=>"Null", :email=>"null@leoni.cn", :tel=>"102", :photoUrl=>"http://dfd.png")
c0.save
p.add_contact c0

c1 = Contact.new("key"=>"CONTACT:MB", :title=>"chef", :name=>"eins", :email=>"eins@leoni.cn", :tel=>"102", :photoUrl=>"http://dfd.png")
c1.save
son1.add_contact c1

c2 = Contact.new("key"=>"CONTACT:COC", :title=>"chef", :name=>"zwei", :email=>"zwei@leoni.cn", :tel=>"102", :photoUrl=>"http://dfd.png")
c2.save
son2.add_contact c2

###########################################################   实体__公式__定制
[fma.key, fmaRFT.key, fmaPPM.key, fmaE1.key].each do |k|
  spec0 = Specific.new( :kEntity=>p.key, :hFormula=>k, :leastKPI=>0, :targetKPI=>100 )
  spec0.save
  spec1 = Specific.new( :kEntity=>son1.key, :hFormula=>k, :leastKPI=>0, :targetKPI=>200 )
  spec1.save
  spec2 = Specific.new( :kEntity=>son2.key, :hFormula=>k, :leastKPI=>0, :targetKPI=>100 )
  spec2.save
end
###########################################################   用户
user = User.new( :nr=>"epm", :name=>"administrator", :password=>"123", :kEntity=>"ENTITY:MB" )
user.save
user.subscription_update( son2.key, [fma.key, fmaRFT.key] )
