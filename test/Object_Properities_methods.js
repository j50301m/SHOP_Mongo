const user={
    name:"jason",
    age:30,
    hi() {
        console.log(this.name);
    }
};
//-------數組練習
const arr= ["123","bbb","ccc"];
for(let item of arr)
{
   //console.log(item);
}

const newArr=arr.map((item,index,array)=>{
    console.log(index);
    console.log(array);
    return item+"_new";
});

const newArr1=arr.map(x=>x+"_new1");

newArr1.push("bsbsb");
//console.log(newArr);
//user.hi();
console.log(newArr1);
