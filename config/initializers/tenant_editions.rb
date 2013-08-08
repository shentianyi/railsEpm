IFEpm::Application.configure do
  config.domain = 'http://localhost:3000'
end
$basic_edition_function = []

$professional_edition_function = $basic_edition_function|[]

$ultimate_edition_function=$professional_edition_function|[]

$tenant_editions={}

$tenant_editions['basic'.downcase] = {:name=>'basic',:limits=>{:user=>1000},:trial_period=>15.days,:functions=>$basic_edition_function}

$tenant_editions['professional'.downcase] ={}

$trial_edition = 'basic'

$product_name = 'EPM'






