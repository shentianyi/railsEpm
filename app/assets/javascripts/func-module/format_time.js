var format_time={};
format_time.week_no={
    '0':"Sun",
    '1':"Mon",
    '2':"Tues",
    '3':"Wed",
    '4':"Thur",
    '5':"Fri",
    '6':"Sat"
}
format_time.month_name={
    '0':"January",
    '1':"February",
    '2':"March",
    '3':"April",
    '4':"May",
    '5':"June",
    '6':"July",
    '7':"August",
    '8':"September",
    '9':"October",
    '10':"November",
    '11':"December"
}
format_time.current_time=function(){
    var current_date=new Date();
    var day=format_time.week_no[current_date.getDay()+''],
        date=current_date.getDate(),
        month=format_time.month_name[current_date.getMonth()],
        year=current_date.getFullYear();
    return day+" "+date+" "+month+" "+year;
}