var RAND = {};

/*rate*/
RAND.rate = function(a,rate,b){
    var res = Math.floor((Math.random()*100)+1);
    if(res < rate){return a;}
    else{return b;}
}