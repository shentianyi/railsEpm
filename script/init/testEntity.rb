#encoding: utf-8
$redis.flushdb

###########################################################   
###########################################################   公式
fma = DataFormula.new( "key"=>"FORMULA:0", :formula=>"people/100.0", 
                                                    :name=>"Attendance", :desc=>"The ratio of arrivals to behoove." )
fma.save

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
c0 = Contact.new("key"=>"CONTACT:leoni", :title=>"chef", :name=>"eins", :email=>"eins@leoni.cn", :tel=>"102", :photoUrl=>"http://dfd.png")
c0.save
p.add_contact c0

c1 = Contact.new("key"=>"CONTACT:MB", :title=>"chef", :name=>"zwei", :email=>"zwei@leoni.cn", :tel=>"102", :photoUrl=>"http://dfd.png")
c1.save
son1.add_contact c1

c2 = Contact.new("key"=>"CONTACT:COC", :title=>"chef", :name=>"drei", :email=>"drei@leoni.cn", :tel=>"102", :photoUrl=>"http://dfd.png")
c2.save
son2.add_contact c2

###########################################################   实体__公式__定制
spec0 = Specific.new( :kEntity=>p.key, :hFormula=>fma.key, :leastKPI=>0, :targetKPI=>100, :currentKPI=>0 )
spec0.save
spec1 = Specific.new( :kEntity=>son1.key, :hFormula=>fma.key, :leastKPI=>0, :targetKPI=>200, :currentKPI=>0 )
spec1.save
spec2 = Specific.new( :kEntity=>son2.key, :hFormula=>fma.key, :leastKPI=>0, :targetKPI=>100, :currentKPI=>0 )
spec2.save
###########################################################   用户
user = User.new( "key"=>"USER:epm", :name=>"administrator", :kEntity=>"ENTITY:MB" )
user.save
user.subscription_update([fma.key])
