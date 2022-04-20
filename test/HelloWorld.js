function Counter(){
    this.num = 0;
    this.tmer = setInterval(
        function add(){
            console.log(this.num);
        }.bind(this)
    ,1000);

}

function Counter2(){
    this.num = 99;
    this.timer = setInterval(()=>{
        this.num--
        console.log(this.num);
        },1000)

}
//var a = new Counter();
var b=new Counter2();