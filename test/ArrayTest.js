const hobbies=["123","456"];

//淺拷貝
const hobbiesClone=hobbies.slice();
//淺拷貝 等效寫法
const hobbiesClone1=[...hobbies]

//進行記憶體位置比較
console.log(hobbiesClone==hobbies);

//打印 等效寫法
console.log(hobbiesClone1);

//物件拷貝test
function Obj1(){
    this.realHeart="My love is Gone";
    this.say=function()
    {
        console.log(this.realHeart);
    }
}

 function User(){

        this.name="jason";
        this.age=30;
        this.hi=function()
        {
            console.log("My Name is"+this.name);
        }
        this.heart=new Obj1();

};


const testUser=new User();
//testUser.heart.say();
const userClone={...testUser};
userClone.heart.realHeart="OK Im Fine";
userClone.heart.say();
testUser.heart.say();
console.log(userClone);

//結論 slide只能淺拷貝 物件中的物件 還是同一個位置


//解構附值
function Output({name})
{
    console.log(name);
}
//Output(testUser);

const OutputName=({name})=>(console.log(name));
OutputName(testUser);
