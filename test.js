let a = 1;
let b = 2;

// 람다식 : Lambda Expression
const sum2 = (a, b) => a + b;
// sum2의 자료형? 객체
// 함수, 객체, 배열 -> 객체

// 객체
// 원시 자료형이 아닌 변수
const yousun = {
  name: "yusun", // string
  height: 163, // int
  weight: 54.3, // float
};

const findName = (obj) => obj.name;

console.log(findName(yousun));

/*
console.log(typeof yousun); // object
console.log(typeof sum2); // function
console.log(typeof yousun.name); // string
console.log(typeof yousun.height); // number
console.log(typeof yousun.weight); // number
*/
