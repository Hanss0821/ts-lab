// 练习 1：让 TS 自动推断类型
let city = 'Tokyo'  // string
let year = 2026 // number
let passed = true // boolean

let data: any = 'hello'
data = 10;
data.split(',');


// 练习 3：体验 unknown
let input: unknown = 'hello'
input.toUpperCase() // unknown类型上没有toUpperCase的方法
if(typeof input === 'string') {
    input.toUpperCase()
}

// 写一个 logMessage，参数 message: string，返回值 void
// 写一个 throwError，参数 message: string，返回值 never

function logMessage(message:string):void{
    console.log(message)
}

function throwError(message:string):never {
    throw new Error(message)
}

// 若函数不结束,死循环也是never
// function loopForever(): never {
//     while (true) {}
//   }