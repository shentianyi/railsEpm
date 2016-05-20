ActiveRecord::Base.transaction do

  Department.where('id>200').group(:name).having('count(*)>1').all.each do |d|
    p d

    Department.where(name: d.name).offset(1).each do |dd|
      p dd
        dd.destroy
    end

  end


  if ddd= Department.where(name: 'Q-C69Q-C70').first
    ddd.destroy
  end
end