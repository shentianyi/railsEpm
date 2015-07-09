var RAND = {};

/*rate*/
RAND.rate = function(a,rate,b){
    var res = Math.floor((Math.random()*100)+1);
    if(res < rate){return a;}
    else{return b;}
}

/*int between*/
RAND.range_int = function(a,b){
    return Math.floor((Math.random()*(b-a))+a);
}

/*float between*/
RAND.range_float = function(a,b){
    return (Math.random()*(b-a)+a).toFixed(2);
}

/*enum random*/
RAND.enum = function(ary){
    var index = Math.floor((Math.random()*ary.length));
    return ary[index];
}

/*time*/
RAND.time = function(start,end){
    var start_time = Date.parse(start);
    var end_time = Date.parse(end);
    var now = new Date(Math.random()*(end_time-start_time)+1+start_time);
    return now.getFullYear()+"/"+(now.getMonth()+1)+"/"+now.getDate()+" "+now.getHours()+":"+now.getMinutes();
}

/*rand string*/
RAND.randstr = function(length){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        for( var i=0; i < length; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
}