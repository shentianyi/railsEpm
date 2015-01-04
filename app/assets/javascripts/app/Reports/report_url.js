define([],function(){
    return {
        currentStatus:function(){
            if(window.sessionStorage.currentStatus){
                return
            }
            var data=[10,20,30,40,50,0,100,27,0,18,46,2,1,5,1,26,57,29,19,20,100,40,50,0,100,27,0,18,46,2,1,5,1,26,57,29,19,20,100];
            window.sessionStorage.currentStatus=data;
            return data;
        },
        currentStatusTarget:function(){
            return{
                rows:[
                    { id:1, data: ["A Time to Kill", "John Grisham", "100"]},
                    { id:2, data: ["Blood and Smoke", "Stephen King", "1000"]},
                    { id:3, data: ["The Rainmaker", "John Grisham", "-200"]}
                ]
            }
        }
    }
})