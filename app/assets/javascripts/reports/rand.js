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