{
    // 期望效果：
    type A = First<[1, 2, 3]>  // 1
    type B = First<[]>          // never

    // type First<T extends any[]> = T[0] extends undefined ? never : T[0];
    type First<T extends any[]> = T extends [infer F, ...any[]] ? F : never
}

{
    // 期望效果：
    type A = Last<[1, 2, 3]>  // 3
    type B = Last<[]>          // never
       
    // type Last<T extends any[]> = T[T["length"] - 1]  extends undefined ? never : T[T["length"] - 1];
    type Last<T extends any[]> = T extends [...args:any[], infer L] ?  L : never;

}

{

    type A = Length<[1, 2, 3]>     // 3
    type B = Length<['a', 'b']>    // 2
    type Length<T extends readonly any[]> = T["length"];
}

{
    // 期望效果：
    type A = If<true, 'yes', 'no'>   // 'yes'
    type B = If<false, 'yes', 'no'>  // 'no'

    type If<C,T,F> = C extends true ? T : F
}

{
    type A = Parameters<(a: string, b: number) => void>  // [string, number]
    type B = Parameters<() => void>                       // []

    type MyParameters<T> = T extends (...args:infer R) => any ? R : never; 
}   

{
    type A = Includes<[1, 2, 3], 1>      // true
    type B = Includes<[1, 2, 3], 4>      // false
    type C = Includes<[string, number], string>  // true

    type Equal<X, Y> = 
    (<T>() => T extends X ? 1 : 2) extends 
    (<T>() => T extends Y ? 1 : 2) ? true : false
  
  type Includes<T extends any[], U> =
    T extends [infer First, ...infer Rest]
      ? Equal<First, U> extends true
        ? true
        : Includes<Rest, U>
      : false        
    }      