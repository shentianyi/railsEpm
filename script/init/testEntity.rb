
p = Entity.new(:key=>"Entity:Leoni", :name=>"LEONI")
p.save

eins = Entity.new(:key=>"Entity:MB", :name=>"MB")
eins.save
eins.add_parent(p.key)

zwei = Entity.new(:key=>"Entity:COC", :name=>"COC")
zwei.save
zwei.add_parent(p.key)


p.add_son(eins.key)
p.add_son(zwei.key)
