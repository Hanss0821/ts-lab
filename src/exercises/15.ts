// @ts-ignore
const name: string = 123;

// @ts-expect-error
// 只有在真正有问题的时候才会忽略
const num: number = 123;
// @ts-check js文件开启类型检查
// @ts-nocheck 关闭js文件类型检查
// tsconfig 里开 checkJs: true 在少数不需要检查的开@ts-nocheck
// declare 的本质是：只描述类型形状，不提供实现
declare var f1: () => void;
declare interface Foo {
  prop: string;
}
declare function foo(input: Foo): Foo;
