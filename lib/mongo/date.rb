
module Mongo
  class Date
    def self.date_format(time_zone=$DEFAULT_TIME_ZONE)
      hour_off_set=Time.Time.zone_offset(time_zone)/(3600)

      %Q(
      Date.prototype.addHours= function(h){
       this.setHours(this.getHours()+h);
       return this;
      }

        var format = function (date,fmt) {
date.addHours(#{hour_off_set});
       var week_date = new Date(date);
    week_date.setHours(0, 0, 0);
    week_date.setDate(week_date.getUTCDate() + 4 - (week_date.getUTCDay() || 7));
    var week_number = Math.ceil((((week_date - new Date(week_date.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
    var o = {
        "M+": date.getMonth() + 1, // month
        "W+": week_number,  // week number
        "d+": date.getDate(), // day
        "h+": date.getHours(), // hour
        "m+": date.getMinutes(), // minute
        "s+": date.getSeconds(), // second
        "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
        "S": date.getMilliseconds() // millsecond
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
      )
    end


  end
end