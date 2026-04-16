// 目标效果：
type A = MyReturnType<() => string>           // string
type B = MyReturnType<(x: number) => boolean> // boolean
type C = MyReturnType<() => Promise<number>>  // Promise<number>

// 实现：
type MyReturnType<T> =  T extends (...args:any[]) => infer R ? R : never;

{
    // 目标效果：
interface User { id: number; name: string; email: string; age: number }

type A = MyPick<User, 'id' | 'name'>
// 结果：{ id: number; name: string }

// 实现：
type MyPick<T , K extends keyof T> = {
    [P in K]: T[P]
}
}

{
    // 目标效果：
type A = MyNonNullable<string | null>           // string
type B = MyNonNullable<string | undefined>      // string
type C = MyNonNullable<string | null | undefined | number> // string | number

// 实现：
type MyNonNullable<T> = T extends (null | undefined) ? never : T 
}

