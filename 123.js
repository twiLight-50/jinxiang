// for(var a=0;a<=100;a++){
//     if(a%2===0){
//         var sum=0
//         sum+=a*a
//     }
// }
// console.log(sum);



var arr = [6, 6, 6, 5, 3, 13, 4, 4, 4, 32, 8465, 22];
const newArr= arr.reduce( (prev, curr)=> {
    prev.indexOf(curr) === -1 &&prev.push(curr);
    return prev;
  },[]);


console.log(newArr);

let sum =0
for(var i=0;i<=100;i++){
    if(i%2==0){
        sum+=i*i
    }
}
console.log(sum);

var a = 10;
function foo() {
    console.log(a); // ??
    var a = 20;
}
foo();

var obj = [' x: 1',' y: 2', 'z: 3' ];
console.log(...obj);

function test(person) {
    person.age = 26
    person = {
        name: 'hzj',
        age: '18'
    }
    return person
}
const p1 = {
    name: 'fyq',
    age: 19
}
const p2 = test(p1)
console.log(p1)
console.log(p2)

const box = {
    x: 10,
    y: 20
};
Object.freeze(box);
const shape = box;
shape.x = 100;
console.log(shape)


const { cname: myName } = { cname: "Lydia" };
console.log(myName);

let newList = [1,2,3].push(8)
console.log(newList)

function giveLady() {
    return 'HHHHHHH'
}
const giveGentMan = () => 'MMMMMMMMMMMMM'
console.log(giveLady.prototype)
console.log(giveGentMan.prototype)

function nums(a, b) {
    if (a > b)
        console.log("a is bigger")
    else
        console.log("b is bigger")
    return
    a + b
}
console.log(nums(4, 2))
console.log(nums(1, 2))

const info = {
    [Symbol('a')]: 'b'
}
console.log(info)
console.log(Object.keys(info))


// filter去重
let brr=[1,2,3,4,5,6,7,8,8,75,4,23,21,5]
const  nArr=brr.filter((item,index,brr)=>{
const newIndex=brr.indexOf(item)

return newIndex===index
})
console.log(nArr);

let crr=[1,2,3,4,5,6,7,8,8,75,4,23,21,5]
let sa=Array.from(new Set(crr))
console.log(sa);

let drr=[1,2,3,4,5,6,7,8,8,75,4,23,21,5]
const newLis=drr.reduce((prev,item)=>{
prev.indexOf(item)===-1&&prev.push(item)
return prev
},[])
console.log(newLis);

var arr = [1, 2, 3, 4, 5, 6, 7, 8]
arr = arr.map(function (x) {
    return x * x
    // [1,4,9,16,25,36,49,64]
}).reduce(function (acc, x, i) {
        acc.push(x)
        acc.push(i)
        // [1,0,4,1,9,2,16,3,25,4,36,5,49,6,64,7]
        return acc
    }, []).filter((x) =>
         x % 2
    ).join(",")
console.log(arr)

var arr=[45,1,32,21,56,87,43,12,34,45];
    for(var i=0;i<arr.length;i++){
    var n=i;
    while(arr[n]>arr[n+1] && n>=0){
 	    var temp=arr[n];
	    arr[n]=arr[n+1];
 	    arr[n+1]=temp;
	    n--;
    }
}

//性能一般
var arr=[1,23,5,8,11,78,45];
let len = arr.length;
for(let k = 0; k < len - 1; k++) {
    for(let m = k + 1; m < len; m++) {
        if(arr[k] > arr[m]){
            let val = arr[m];
            arr[m] = arr[k];
            arr[k] = val;
        }
    }
}
 
console.log(arr)

//性能一般
let arr=[1,5,7,9,16,2,4];
//冒泡排序,每一趟找出最大的,总共比较次数为arr.length-1次,每次的比较次数为arr.length-1次，依次递减
for(let k = 0; k < arr.length - 1; k++) {
    for(let m = 0; m < arr.length - k - 1; m++) {
        if(arr[m] > arr[m+1]){
            let val = arr[m];
            arr[m] = arr[m+1];
            arr[m+1] = val;
        }
    }
}
 
console.log(arr)

//快速排序 