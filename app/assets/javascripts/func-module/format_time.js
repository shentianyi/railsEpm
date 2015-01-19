define([],function(){
    var week_no={
        '0':"Sun",
        '1':"Mon",
        '2':"Tues",
        '3':"Wed",
        '4':"Thur",
        '5':"Fri",
        '6':"Sat"
    }
    var month_name={
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
    function current_time(){
        var current_date=new Date();
        var day=week_no[current_date.getDay()+''],
            date=current_date.getDate(),
            month=month_name[current_date.getMonth()],
            year=current_date.getFullYear();
        return day+" "+date+" "+month+" "+year;
    }
    function current_time_clock(){
        var current_date=new Date().toString();
        return current_date.split(" ")[4];
    }

    return{
        current_time:current_time,
        current_time_clock:current_time_clock
    }
})
