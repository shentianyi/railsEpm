kpi=Kpi.new(:name=>'att',:target=>12.33)

category=KpiCategory.first
user=User.first

kpi.kpi_category=category
kpi.creator=user
kpi.save


