var I18n = I18n || {};
I18n.translations = {"en":{"date":{"formats":{"default":"%Y-%m-%d","short":"%b %d","long":"%B %d, %Y"},"day_names":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"abbr_day_names":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"month_names":[null,"January","February","March","April","May","June","July","August","September","October","November","December"],"abbr_month_names":[null,"Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"order":["year","month","day"]},"time":{"formats":{"default":"%a, %d %b %Y %H:%M:%S %z","short":"%d %b %H:%M","long":"%B %d, %Y %H:%M"},"am":"am","pm":"pm"},"support":{"array":{"words_connector":", ","two_words_connector":" and ","last_word_connector":", and "}},"errors":{"format":"%{attribute} %{message}","messages":{"inclusion":"is not included in the list","exclusion":"is reserved","invalid":"is invalid","confirmation":"doesn't match %{attribute}","accepted":"must be accepted","empty":"can't be empty","blank":"can't be blank","too_long":{"one":"is too long (maximum is 1 character)","other":"is too long (maximum is %{count} characters)"},"too_short":{"one":"is too short (minimum is 1 character)","other":"is too short (minimum is %{count} characters)"},"wrong_length":{"one":"is the wrong length (should be 1 character)","other":"is the wrong length (should be %{count} characters)"},"not_a_number":"is not a number","not_an_integer":"must be an integer","greater_than":"must be greater than %{count}","greater_than_or_equal_to":"must be greater than or equal to %{count}","equal_to":"must be equal to %{count}","less_than":"must be less than %{count}","less_than_or_equal_to":"must be less than or equal to %{count}","odd":"must be odd","even":"must be even","present":"must be blank","record_invalid":"Validation failed: %{errors}","restrict_dependent_destroy":{"one":"Cannot delete record because a dependent %{record} exists","many":"Cannot delete record because dependent %{record} exist"},"taken":"has already been taken","other_than":"must be other than %{count}"},"template":{"body":"There were problems with the following fields:","header":{"one":"1 error prohibited this %{model} from being saved","other":"%{count} errors prohibited this %{model} from being saved"}}},"activerecord":{"errors":{"messages":{"taken":"has already been taken","record_invalid":"Validation failed: %{errors}","accepted":"must be accepted","blank":"can't be blank","present":"must be blank","confirmation":"doesn't match %{attribute}","empty":"can't be empty","equal_to":"must be equal to %{count}","even":"must be even","exclusion":"is reserved","greater_than":"must be greater than %{count}","greater_than_or_equal_to":"must be greater than or equal to %{count}","inclusion":"is not included in the list","invalid":"is invalid","less_than":"must be less than %{count}","less_than_or_equal_to":"must be less than or equal to %{count}","not_a_number":"is not a number","not_an_integer":"must be an integer","odd":"must be odd","restrict_dependent_destroy":{"one":"Cannot delete record because a dependent %{record} exists","many":"Cannot delete record because dependent %{record} exist"},"too_long":{"one":"is too long (maximum is 1 character)","other":"is too long (maximum is %{count} characters)"},"too_short":{"one":"is too short (minimum is 1 character)","other":"is too short (minimum is %{count} characters)"},"wrong_length":{"one":"is the wrong length (should be 1 character)","other":"is the wrong length (should be %{count} characters)"},"other_than":"must be other than %{count}"},"format":"%{attribute} %{message}","template":{"body":"There were problems with the following fields:","header":{"one":"1 error prohibited this %{model} from being saved","other":"%{count} errors prohibited this %{model} from being saved"}}}},"number":{"format":{"separator":".","delimiter":",","precision":3,"significant":false,"strip_insignificant_zeros":false},"currency":{"format":{"format":"%u%n","unit":"$","separator":".","delimiter":",","precision":2,"significant":false,"strip_insignificant_zeros":false}},"percentage":{"format":{"delimiter":"","format":"%n%"}},"precision":{"format":{"delimiter":""}},"human":{"format":{"delimiter":"","precision":3,"significant":true,"strip_insignificant_zeros":true},"storage_units":{"format":"%n %u","units":{"byte":{"one":"Byte","other":"Bytes"},"kb":"KB","mb":"MB","gb":"GB","tb":"TB"}},"decimal_units":{"format":"%n %u","units":{"unit":"","thousand":"Thousand","million":"Million","billion":"Billion","trillion":"Trillion","quadrillion":"Quadrillion"}}}},"datetime":{"distance_in_words":{"half_a_minute":"half a minute","less_than_x_seconds":{"one":"less than 1 second","other":"less than %{count} seconds"},"x_seconds":{"one":"1 second","other":"%{count} seconds"},"less_than_x_minutes":{"one":"less than a minute","other":"less than %{count} minutes"},"x_minutes":{"one":"1 minute","other":"%{count} minutes"},"about_x_hours":{"one":"about 1 hour","other":"about %{count} hours"},"x_days":{"one":"1 day","other":"%{count} days"},"about_x_months":{"one":"about 1 month","other":"about %{count} months"},"x_months":{"one":"1 month","other":"%{count} months"},"about_x_years":{"one":"about 1 year","other":"about %{count} years"},"over_x_years":{"one":"over 1 year","other":"over %{count} years"},"almost_x_years":{"one":"almost 1 year","other":"almost %{count} years"}},"prompts":{"year":"Year","month":"Month","day":"Day","hour":"Hour","minute":"Minute","second":"Seconds"}},"helpers":{"select":{"prompt":"Please select"},"submit":{"create":"Create %{model}","update":"Update %{model}","submit":"Save %{model}"},"button":{"create":"Create %{model}","update":"Update %{model}","submit":"Save %{model}"}},"will_paginate":{"previous_label":"&#8592; Previous","next_label":"Next &#8594;","page_gap":"&hellip;","page_entries_info":{"single_page":{"zero":"No %{model} found","one":"Displaying 1 %{model}","other":"Displaying all %{count} %{model}"},"single_page_html":{"zero":"No %{model} found","one":"Displaying <b>1</b> %{model}","other":"Displaying <b>all&nbsp;%{count}</b> %{model}"},"multi_page":"Displaying %{model} %{from} - %{to} of %{count} in total","multi_page_html":"Displaying %{model} <b>%{from}&nbsp;-&nbsp;%{to}</b> of <b>%{count}</b> in total"}},"activemodel":{"errors":{"format":"%{attribute} %{message}","messages":{"accepted":"must be accepted","blank":"can't be blank","present":"must be blank","confirmation":"doesn't match %{attribute}","empty":"can't be empty","equal_to":"must be equal to %{count}","even":"must be even","exclusion":"is reserved","greater_than":"must be greater than %{count}","greater_than_or_equal_to":"must be greater than or equal to %{count}","inclusion":"is not included in the list","invalid":"is invalid","less_than":"must be less than %{count}","less_than_or_equal_to":"must be less than or equal to %{count}","not_a_number":"is not a number","not_an_integer":"must be an integer","odd":"must be odd","record_invalid":"Validation failed: %{errors}","restrict_dependent_destroy":{"one":"Cannot delete record because a dependent %{record} exists","many":"Cannot delete record because dependent %{record} exist"},"taken":"has already been taken","too_long":{"one":"is too long (maximum is 1 character)","other":"is too long (maximum is %{count} characters)"},"too_short":{"one":"is too short (minimum is 1 character)","other":"is too short (minimum is %{count} characters)"},"wrong_length":{"one":"is the wrong length (should be 1 character)","other":"is the wrong length (should be %{count} characters)"},"other_than":"must be other than %{count}"},"template":{"body":"There were problems with the following fields:","header":{"one":"1 error prohibited this %{model} from being saved","other":"%{count} errors prohibited this %{model} from being saved"}}}},"welcome":{"title":"Welcome","sub_title":"Welcome EPM","entrys":{"title":"Entrance of your role","kpi_entry":"Entry KPI","analyse":"Analytics","dashboard":"Dashboard","manage_kpi":"Manage KPI"},"statistics":{"title":"Current statistics","staff":"Staff structure","table":"Statistics","item":{"kpi":"KPI","entity":"Entity","user":"User","view":"Entity Group"}}},"epm":{"base":{"title":"EPM","name":"IntelligentFactory","desc":"Secure, quick and accurate, EPM uncovers the potential of data","language":"Language","welcome":"Welcome"}},"auth":{"view":{"login_title":"Sign In","login_btn":"Sign in","sign_title":"Sign up Now","sign_btn":"Sign up","signout_btn":"Logout","submit_btn":"Ok","email":"Email","pwd":"Password","confirm":"Ok","con_pwd":"Password Confirmation","company":"Company Name"},"msg":{"login_success":"Login successfully!","login_require":"Please Login!","logout_success":"Logout successfully!","logout_require":"Please Sign up!","email_token":"Email has been Signed up!","sign_success":"Sign up successfully!","sign_close":"Registration is not open!","sign_fail":"Sign up failed!","local_account":"We're sorry, but we could not locate your account.If you are having issues try copying and pasting the URL from your email into your browser or restarting the reset password process."}},"menu":{"start":"Start","dashboard":"Dashboard","analytics":"Analytics","reports":"Report","manage":"Manage","kpi":"KPI","user":"User","view":"Entity Group","billing":"Account","entry_kpi":"KPI Entry","department":"Entity"},"analytics":{"title":"Analytics","kpi_category":"KPI Category","kpi":"KPI","view":"Entity Groups","begin_time":"Start Time","end_time":"End Time","sum":"Total","average":"Average","add_chart":"Analyse","date":"Data","percent":"Percent","target":"Target","sum_target":"Target Total","aver_target":"Target Average","value":"Actual Value","sum_value":"Actual Value Total","aver_value":"Actual Value Average","tcr":"TCR","close_btn":"Close"},"entry":{"desc":{"entry":"KPI Entry","category":"Category","trend":"Trend","actual":"Actual Value","recent":"Recent Value"}},"manage":{"base":{"delete_btn":"Delete","edit_btn":"Edit","add_btn":"Add","cancel_btn":"Cancel","enter_confirm":"Enter：  Confirm","esc_cancel":"ESC： Cancel","delete_confirm":"Are you sure to delete？","next":"Next","finish":"Finish"},"kpi":{"desc":{"create":"Create KPI","create_desc":"Create kpi in different category,then you can edit it's max target and min target","create_now":"Create Now","kpi_library_desc":"Create kpi in different category,then you can edit it's max target and min target","choose_now":"Choose Now","next_desc":"Create kpi in different category,then you can edit it's max target and min target"},"title":"Manage KPI","category":"KPI Category","kpi_library":"KPI Library","name":"Name","description":"Description","frequency":"Frequency","target":"Target Max","target_min":"Target Min","unit":"Unit","trend":"Trend","is_calculate_type":"Is need calculate","not_calculate_type":false,"calculate_type":true,"list":"Choose KPI","formula":"Formula","invalid":"Formula is not valid","cannot_repeat":"Can not repeat","freq_item":{"hourly":"Houly","daily":"Daily","weekly":"Weekly","monthly":"Monthly","quarterly":"Quarterly","yearly":"Yearly"},"trend_item":{"none":"None","up":"Up","down":"Down"}},"department":{"desc":{"dep":"Entity","manage":"Manage Entity","name":"Entity Name","create":"Create Entity","create_desc":"Department is the place to put your staff and the view is made up of departments","give_name":"Give it a name","next_desc":"After creating department , it's time to create user(staff) to your department so that they can contribute to their department's KPI"}},"user":{"desc":{"name":"User","manage":"Manage User","authority":"Authority","create":"Create User","create_desc":"User as well as your staff in different department who created by you and then entry the kpi assigned","create_now":"Create Now","assign":"Assign KPI","assign_desc":"User as well as your staff in different department who created by you and then entry the kpi assigned","assign_now":"Assign Now","next_desc":"User as well as your staff in different department who created by you and then entry the kpi assigned"},"role":{"admin":"Admin","director":"Director","manager":"Manager","user":"User"},"new":{"name":"Name","email":"Email","pwd":"Password","pwd_con":"Password Confirmation","dep":"Entity"}},"view":{"desc":{"name":"Entity Group","manage":"Manage Entity Group","dep_list":"Entity List","assign_dep":"Assign Entity","assign_desc":"Creating view first , then assign department to the view ,view is the base condition in analytics","next_desc":"Creating view first , then assign department to the view,view is the base condition in analytics"}}},"dashboard_group":{"base":{"restore":"Restore"},"group":{"name":"Dashboard Group","add":"Add","give_name":"Give it a name","edit":"Edit Group Name"},"dashboard":{"add":"Add Dashboard","add_desc":"Choose and create a dashboard ,add it to a dashboard group, so that you can look it over","add_now":"Add Now","full":"Full Screen","full_desc":"Show dashboards on the left in full screen mode, Press 'ESC' to quit","full_now":"Enter Full Screen","name":"Dashboard Name","name_desc":"Give your dashboard a name","choose_type":"Choose dashboard type","type":{"line":"Line","column":"Column","pie":"Pie","Scatter":"Scatter"},"content":"Create Dashboard Content","content_desc":"Add one or more series of data to your dashboard","add_series":"Add one series of data","select_group":"Choose Dashboard Group","create":"Create Now","serie":{"category":"KPI Category","view":"Entity Group","start_time":"Start Time","end_time":"End Time","total":"Total","average":"Average","add":"Add"},"close":"Close","add_type":{"cus":"Custom","temp":"Template"},"group":"Choose Dashboard Group","group_desc":"Choose the dashboard group you want to put your dashboard","finish":"Finish","finish_desc":"Publish the dashboard you just created"},"item":{"out_of_target":"Out of Target"}},"chart":{"value":"Value","target_range":"Target Range","percent":"Percentage","view":"Entity Group","line":{"out_of_target":"Out of Target","kpi_name":"KPI Name","total":"Total","record":"Record","average":"Average"},"pie":{"select":"Select","total":"Total"},"column":{"max":"Max Value","min":"Min Value"}}},"de":{"date":{"abbr_day_names":["So","Mo","Di","Mi","Do","Fr","Sa"],"abbr_month_names":[null,"Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],"day_names":["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],"formats":{"default":"%d.%m.%Y","long":"%e. %B %Y","short":"%e. %b"},"month_names":[null,"Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],"order":["day","month","year"]},"datetime":{"distance_in_words":{"about_x_hours":{"one":"etwa eine Stunde","other":"etwa %{count} Stunden"},"about_x_months":{"one":"etwa ein Monat","other":"etwa %{count} Monate"},"about_x_years":{"one":"etwa ein Jahr","other":"etwa %{count} Jahre"},"almost_x_years":{"one":"fast ein Jahr","other":"fast %{count} Jahre"},"half_a_minute":"eine halbe Minute","less_than_x_minutes":{"one":"weniger als eine Minute","other":"weniger als %{count} Minuten"},"less_than_x_seconds":{"one":"weniger als eine Sekunde","other":"weniger als %{count} Sekunden"},"over_x_years":{"one":"mehr als ein Jahr","other":"mehr als %{count} Jahre"},"x_days":{"one":"ein Tag","other":"%{count} Tage"},"x_minutes":{"one":"eine Minute","other":"%{count} Minuten"},"x_months":{"one":"ein Monat","other":"%{count} Monate"},"x_seconds":{"one":"eine Sekunde","other":"%{count} Sekunden"}},"prompts":{"day":"Tag","hour":"Stunden","minute":"Minuten","month":"Monat","second":"Sekunden","year":"Jahr"}},"errors":{"format":"%{attribute} %{message}","messages":{"accepted":"muss akzeptiert werden","blank":"muss ausgefüllt werden","confirmation":"stimmt nicht mit der Bestätigung überein","empty":"muss ausgefüllt werden","equal_to":"muss genau %{count} sein","even":"muss gerade sein","exclusion":"ist nicht verfügbar","greater_than":"muss größer als %{count} sein","greater_than_or_equal_to":"muss größer oder gleich %{count} sein","inclusion":"ist kein gültiger Wert","invalid":"ist nicht gültig","less_than":"muss kleiner als %{count} sein","less_than_or_equal_to":"muss kleiner oder gleich %{count} sein","not_a_number":"ist keine Zahl","not_an_integer":"muss ganzzahlig sein","odd":"muss ungerade sein","record_invalid":"Gültigkeitsprüfung ist fehlgeschlagen: %{errors}","taken":"ist bereits vergeben","too_long":"ist zu lang (mehr als %{count} Zeichen)","too_short":"ist zu kurz (weniger als %{count} Zeichen)","wrong_length":"hat die falsche Länge (muss genau %{count} Zeichen haben)"},"template":{"body":"Bitte überprüfen Sie die folgenden Felder:","header":{"one":"Konnte %{model} nicht speichern: ein Fehler.","other":"Konnte %{model} nicht speichern: %{count} Fehler."}}},"helpers":{"select":{"prompt":"Bitte wählen"},"submit":{"create":"%{model} erstellen","submit":"%{model} speichern","update":"%{model} aktualisieren"}},"number":{"currency":{"format":{"delimiter":".","format":"%n %u","precision":2,"separator":",","significant":false,"strip_insignificant_zeros":false,"unit":"€"}},"format":{"delimiter":".","precision":2,"separator":",","significant":false,"strip_insignificant_zeros":false},"human":{"decimal_units":{"format":"%n %u","units":{"billion":{"one":"Milliarde","other":"Milliarden"},"million":"Millionen","quadrillion":{"one":"Billiarde","other":"Billiarden"},"thousand":"Tausend","trillion":"Billionen","unit":""}},"format":{"delimiter":"","precision":1,"significant":true,"strip_insignificant_zeros":true},"storage_units":{"format":"%n %u","units":{"byte":{"one":"Byte","other":"Bytes"},"gb":"GB","kb":"KB","mb":"MB","tb":"TB"}}},"percentage":{"format":{"delimiter":""}},"precision":{"format":{"delimiter":""}}},"support":{"array":{"last_word_connector":" und ","two_words_connector":" und ","words_connector":", "}},"time":{"am":"vormittags","formats":{"default":"%A, %d. %B %Y, %H:%M Uhr","long":"%A, %d. %B %Y, %H:%M Uhr","short":"%d. %B, %H:%M Uhr"},"pm":"nachmittags"},"activemodel":{"errors":{"format":"%{attribute} %{message}","messages":{"accepted":"muss akzeptiert werden","blank":"muss ausgefüllt werden","confirmation":"stimmt nicht mit der Bestätigung überein","empty":"muss ausgefüllt werden","equal_to":"muss genau %{count} sein","even":"muss gerade sein","exclusion":"ist nicht verfügbar","greater_than":"muss größer als %{count} sein","greater_than_or_equal_to":"muss größer oder gleich %{count} sein","inclusion":"ist kein gültiger Wert","invalid":"ist nicht gültig","less_than":"muss kleiner als %{count} sein","less_than_or_equal_to":"muss kleiner oder gleich %{count} sein","not_a_number":"ist keine Zahl","not_an_integer":"muss ganzzahlig sein","odd":"muss ungerade sein","record_invalid":"Gültigkeitsprüfung ist fehlgeschlagen: %{errors}","taken":"ist bereits vergeben","too_long":"ist zu lang (mehr als %{count} Zeichen)","too_short":"ist zu kurz (weniger als %{count} Zeichen)","wrong_length":"hat die falsche Länge (muss genau %{count} Zeichen haben)"},"template":{"body":"Bitte überprüfen Sie die folgenden Felder:","header":{"one":"Konnte %{model} nicht speichern: ein Fehler.","other":"Konnte %{model} nicht speichern: %{count} Fehler."}}}},"activerecord":{"errors":{"format":"%{attribute} %{message}","messages":{"accepted":"muss akzeptiert werden","blank":"muss ausgefüllt werden","confirmation":"stimmt nicht mit der Bestätigung überein","empty":"muss ausgefüllt werden","equal_to":"muss genau %{count} sein","even":"muss gerade sein","exclusion":"ist nicht verfügbar","greater_than":"muss größer als %{count} sein","greater_than_or_equal_to":"muss größer oder gleich %{count} sein","inclusion":"ist kein gültiger Wert","invalid":"ist nicht gültig","less_than":"muss kleiner als %{count} sein","less_than_or_equal_to":"muss kleiner oder gleich %{count} sein","not_a_number":"ist keine Zahl","not_an_integer":"muss ganzzahlig sein","odd":"muss ungerade sein","record_invalid":"Gültigkeitsprüfung ist fehlgeschlagen: %{errors}","taken":"ist bereits vergeben","too_long":"ist zu lang (mehr als %{count} Zeichen)","too_short":"ist zu kurz (weniger als %{count} Zeichen)","wrong_length":"hat die falsche Länge (muss genau %{count} Zeichen haben)"},"template":{"body":"Bitte überprüfen Sie die folgenden Felder:","header":{"one":"Konnte %{model} nicht speichern: ein Fehler.","other":"Konnte %{model} nicht speichern: %{count} Fehler."}}}}},"zh":{"date":{"abbr_day_names":["日","一","二","三","四","五","六"],"abbr_month_names":[null,"1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],"day_names":["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],"formats":{"default":"%Y-%m-%d","long":"%Y年%b%d日","short":"%b%d日"},"month_names":[null,"一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],"order":["year","month","day"]},"datetime":{"distance_in_words":{"about_x_hours":{"one":"大约一小时","other":"大约 %{count} 小时"},"about_x_months":{"one":"大约一个月","other":"大约 %{count} 个月"},"about_x_years":{"one":"大约一年","other":"大约 %{count} 年"},"almost_x_years":{"one":"接近一年","other":"接近 %{count} 年"},"half_a_minute":"半分钟","less_than_x_minutes":{"one":"不到一分钟","other":"不到 %{count} 分钟"},"less_than_x_seconds":{"one":"不到一秒","other":"不到 %{count} 秒"},"over_x_years":{"one":"一年多","other":"%{count} 年多"},"x_days":{"one":"一天","other":"%{count} 天"},"x_minutes":{"one":"一分钟","other":"%{count} 分钟"},"x_months":{"one":"一个月","other":"%{count} 个月"},"x_seconds":{"one":"一秒","other":"%{count} 秒"}},"prompts":{"day":"日","hour":"时","minute":"分","month":"月","second":"秒","year":"年"}},"errors":{"format":"%{attribute} %{message}","messages":{"accepted":"必须是可被接受的","blank":"不能为空字符","confirmation":"与确认值不匹配","empty":"不能留空","equal_to":"必须等于 %{count}","even":"必须为双数","exclusion":"是保留关键字","greater_than":"必须大于 %{count}","greater_than_or_equal_to":"必须大于或等于 %{count}","inclusion":"不包含于列表中","invalid":"是无效的","less_than":"必须小于 %{count}","less_than_or_equal_to":"必须小于或等于 %{count}","not_a_number":"不是数字","not_an_integer":"必须是整数","odd":"必须为单数","record_invalid":"验证失败: %{errors}","taken":"已经被使用","too_long":"过长（最长为 %{count} 个字符）","too_short":"过短（最短为 %{count} 个字符）","wrong_length":"长度非法（必须为 %{count} 个字符）"},"template":{"body":"如下字段出现错误：","header":{"one":"有 1 个错误发生导致「%{model}」无法被保存。","other":"有 %{count} 个错误发生导致「%{model}」无法被保存。"}}},"helpers":{"select":{"prompt":"请选择"},"submit":{"create":"新增%{model}","submit":"储存%{model}","update":"更新%{model}"}},"number":{"currency":{"format":{"delimiter":",","format":"%u %n","precision":2,"separator":".","significant":false,"strip_insignificant_zeros":false,"unit":"CN¥"}},"format":{"delimiter":",","precision":3,"separator":".","significant":false,"strip_insignificant_zeros":false},"human":{"decimal_units":{"format":"%n %u","units":{"billion":"十亿","million":"百万","quadrillion":"千兆","thousand":"千","trillion":"兆","unit":""}},"format":{"delimiter":"","precision":1,"significant":false,"strip_insignificant_zeros":false},"storage_units":{"format":"%n %u","units":{"byte":{"one":"Byte","other":"Bytes"},"gb":"GB","kb":"KB","mb":"MB","tb":"TB"}}},"percentage":{"format":{"delimiter":""}},"precision":{"format":{"delimiter":""}}},"support":{"array":{"last_word_connector":", 和 ","two_words_connector":" 和 ","words_connector":", "}},"time":{"am":"上午","formats":{"default":"%Y年%b%d日 %A %H:%M:%S %Z","long":"%Y年%b%d日 %H:%M","short":"%b%d日 %H:%M"},"pm":"下午"},"activemodel":{"errors":{"format":"%{attribute} %{message}","messages":{"accepted":"必须是可被接受的","blank":"不能为空字符","confirmation":"与确认值不匹配","empty":"不能留空","equal_to":"必须等于 %{count}","even":"必须为双数","exclusion":"是保留关键字","greater_than":"必须大于 %{count}","greater_than_or_equal_to":"必须大于或等于 %{count}","inclusion":"不包含于列表中","invalid":"是无效的","less_than":"必须小于 %{count}","less_than_or_equal_to":"必须小于或等于 %{count}","not_a_number":"不是数字","not_an_integer":"必须是整数","odd":"必须为单数","record_invalid":"验证失败: %{errors}","taken":"已经被使用","too_long":"过长（最长为 %{count} 个字符）","too_short":"过短（最短为 %{count} 个字符）","wrong_length":"长度非法（必须为 %{count} 个字符）"},"template":{"body":"如下字段出现错误：","header":{"one":"有 1 个错误发生导致「%{model}」无法被保存。","other":"有 %{count} 个错误发生导致「%{model}」无法被保存。"}}}},"activerecord":{"errors":{"format":"%{attribute} %{message}","messages":{"accepted":"必须是可被接受的","blank":"不能为空字符","confirmation":"与确认值不匹配","empty":"不能留空","equal_to":"必须等于 %{count}","even":"必须为双数","exclusion":"是保留关键字","greater_than":"必须大于 %{count}","greater_than_or_equal_to":"必须大于或等于 %{count}","inclusion":"不包含于列表中","invalid":"是无效的","less_than":"必须小于 %{count}","less_than_or_equal_to":"必须小于或等于 %{count}","not_a_number":"不是数字","not_an_integer":"必须是整数","odd":"必须为单数","record_invalid":"验证失败: %{errors}","taken":"已经被使用","too_long":"过长（最长为 %{count} 个字符）","too_short":"过短（最短为 %{count} 个字符）","wrong_length":"长度非法（必须为 %{count} 个字符）"},"template":{"body":"如下字段出现错误：","header":{"one":"有 1 个错误发生导致「%{model}」无法被保存。","other":"有 %{count} 个错误发生导致「%{model}」无法被保存。"}}}},"welcome":{"title":"欢迎","sub_title":"欢迎使用EPM","entrys":{"title":"针对您角色的入口","kpi_entry":"输入KPI","analyse":"分析","dashboard":"仪表盘","manage_kpi":"管理KPI"},"statistics":{"title":"当前数据统计","staff":"人员结构","table":"数据统计","item":{"kpi":"KPI","entity":"部门","user":"用户","view":"观察点"}}},"authlogic":{"error_messages":{"login_blank":"不能为空","login_not_found":"是无效的","login_invalid":"只能包含字符，数字，空格和 .-_@","consecutive_failed_logins_limit_exceeded":"Consecutive failed logins limit exceeded, account is disabled.","email_invalid":"无效的邮箱格式.","password_blank":"不能为空","password_invalid":"是无效的"}},"epm":{"base":{"title":"EPM","name":"智能工厂","desc":"安全，迅速，快捷，EPM帮您挖掘隐藏的数据","language":"语言","welcome":"欢迎"}},"auth":{"view":{"login_title":"登 录","login_btn":"登 录","sign_title":"现 在 注 册","sign_btn":"注 册","signout_btn":"注销","submit_btn":"提 交","email":"邮箱","pwd":"密码","confirm":"确认","con_pwd":"确认密码","company":"公司"},"msg":{"login_success":"登录成功","login_require":"请先登录","logout_success":"注销成功","logout_require":"请先注册","email_token":"邮箱已被注册","sign_success":"注册成功","sign_close":"我们还没有开放注册","sign_fail":"注册失败","lock_account":"您的账户已经过期或被锁定，请联系网站管理员"}},"menu":{"start":"开始","dashboard":"仪表盘","analytics":"分析","reports":"报表","manage":"管理","kpi":"KPI","user":"用户","view":"观察点","billing":"账户","entry_kpi":"KPI输入","department":"部门"},"analytics":{"title":"分析","kpi_category":"KPI类别","kpi":"KPI","view":"观察点","begin_time":"开始时间","end_time":"结束时间","sum":"累计","average":"平均","add_chart":"分析","date":"时间","percent":"比例","target":"目标值","sum_target":"累计目标值","aver_target":"平均目标值","value":"实际值","sum_value":"累计实际值","aver_value":"平均实际值","tcr":"TCR","close_btn":"关闭"},"entry":{"desc":{"entry":"KPI输入","category":"类别","trend":"趋势","actual":"实际值","recent":"最近数据"}},"manage":{"base":{"delete_btn":"删除","edit_btn":"编辑","add_btn":"添加","cancel_btn":"取消","enter_confirm":"Enter：  确定","esc_cancel":"ESC： 取消","delete_confirm":"确定删除？","next":"下一步","finish":"完成"},"kpi":{"desc":{"create":"创建KPI","create_desc":"为不同的KPI类别创建KPI，你可以对KPI做相应的编辑","create_now":"现在创建","kpi_library_desc":"如果你需要一些常用的KPI，你可以方便的在KPI库中选择","choose_now":"现在选择","next_desc":"创建完成KPI后，你应该创建部门和用户，然后将KPI分配给相应部门中的用户内"},"title":"管理KPI","category":"KPI类别","kpi_library":"KPI 库","name":"名称","description":"描述","frequency":"周期","target":"目标值上限","target_min":"目标值下限","unit":"单位","trend":"趋势","is_calculate_type":"计算型","not_calculate_type":"否","calculate_type":"是","list":"选择KPI","formula":"计算公式","invalid":"公式不合法","cannot_repeat":"同一类别KPI不可重复","freq_item":{"hourly":"小时","daily":"天","weekly":"周","monthly":"月","quarterly":"季度","yearly":"年"},"trend_item":{"none":"无","up":"上升","down":"下降"}},"department":{"desc":{"dep":"部门","manage":"管理部门","name":"部门名称","create":"创建部门","create_desc":"部门是管理员工的地方，而观察点则建立在部门的基础上","give_name":"给它一个名字","next_desc":"完成部门创建后， 接下来你需要为你的部门创建员工这样他们为你的部门贡献KPI"}},"user":{"desc":{"name":"用户","manage":"管理用户","authority":"权限","create":"创建用户","create_desc":"用户，即你在不同部门创建的员工，完成创建后，你可以给他们分配KPI","create_now":"现在创建","assign":"分配KPI","assign_desc":"想分配任务一样给你的员工分配不同的KPI","assign_now":"现在分配","next_desc":"在分配完KPI后，你应该将你的部门放到你的观察点中，以观察点为基础，我们为你生成分析数据和仪表盘"},"role":{"admin":"管理员","director":"总经理","manager":"经理","user":"普通用户"},"new":{"name":"用户名","email":"邮箱","pwd":"密码","pwd_con":"确认密码","dep":"部门"}},"view":{"desc":{"name":"观察点","manage":"管理观察点","dep_list":"部门列表","assign_dep":"分配部门","assign_desc":"首先创建一个观察点，然后将部门加入到观察点中，一个观察点是查看分析数据的基础","next_desc":"完成管理中的所有部分后， 你可以让你的员工（用户）通过‘KPI输入’来输入KPI"}}},"dashboard_group":{"base":{"restore":"退出全屏"},"group":{"name":"仪表盘组","add":"添加","give_name":"给它一个名字","edit":"修改组名"},"dashboard":{"add":"添加仪表盘","add_desc":"选择一款你喜欢的图表样式进行创建，将其添加到仪表盘组中，方便您日后的查看","add_now":"现在添加","full":"全屏显示","full_desc":"将左侧的仪表板全屏显示，通过双击或者ESC来退出全屏模式","full_now":"进入全屏","name":"仪表盘名称","name_desc":"给你的仪表盘一个合适的名字","choose_type":"选择一种仪表盘类型","type":{"line":"折线图","column":"柱状图","pie":"饼图","Scatter":"散点图"},"content":"创建仪表盘内容","content_desc":"添加一个系列或者多个系列的数据给你的仪表盘","add_series":"添加一个系列数据","select_group":"选择仪表盘组","create":"现在发布","serie":{"category":"KPI类别","view":"观察点","start_time":"开始时间","end_time":"结束时间","total":"总数","average":"平均","add":"添加"},"close":"关闭","add_type":{"cus":"自定义添加","temp":"模板添加"},"group":"选择仪表盘所在组","group_desc":"选择一个仪表盘组来放置你的仪表盘","finish":"完成","finish_desc":"发布你刚才创建的仪表盘"},"item":{"out_of_target":"在目标范围外"}},"chart":{"value":"当前值","target_range":"目标值范围","percent":"百分比","view":"观察点","line":{"out_of_target":"超出目标值","kpi_name":"KPI 名称","total":"总值","record":"记录数","average":"平均值"},"pie":{"select":"选中值","total":"总值"},"column":{"max":"最大值","min":"最小值"}}}};