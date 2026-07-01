// 对字符串字面量类型的值域进行约束
type World = "World";
type Greeting = `Hello ${World}`; // string | number | boolean | null | undefined | bigint 都会被转换成string

// 可使用类型填充
type Greeting2 = `Hello ${number}`; // 此处string入参符合结构性兼容原则

const greeting: Greeting2 = `Hello null`;

// 相当于做联合类型的分发，只是在这里分发的对象不同
type Brand = "iphone" | "xiaomi" | "honor";
type Memory = "16G" | "64G";
type ItemType = "official" | "second-hand";
type SKU = `${Brand}-${Memory}-${ItemType}`;

/**
 * for (const b of Brand) {
 *  for(const m of Memor) {
 *      for(const i of  ItemType) {
 *      yield `${Brand}-${Memory}-${ItemType}`
 * }
 * }
 * }
 */

const iphone17: SKU = "iphone-64G-official"; // 构建字符串枚举字典

// 重命名键
// as后面的模板字符串是never的话会过滤当前这个键值对
type CopyWithRename<T extends object> = {
  [K in keyof T as `modified_${string & K}`]: T[K]; // as 重命名为新的键  string & K 作用是为了过滤symbol
};

/*
function applyStringMapping(symbol, str) {
  switch (kind) {
    case Uppercase: return str.toUpperCase();
    case Lowercase: return str.toLowerCase();
    case Capitalize: return str.charAt(0).toUpperCase() + str.slice(1);
    case Uncapitalize: return str.charAt(0).toLowerCase() + str.slice(1);
  }
}
*/

type CopyWithRename2<T extends object> = {
  // 此处字面量类型被当成一个值在做字符串变量转换，编译期常量求值
  [K in keyof T as `modified${Capitalize<string & K>}`]: T[K];
};

// 同样可以使用infer提取参数
// First只匹配第一个空格前面的参数 剩余的通通塞给Last
type ReverseName<Str extends string> =
  Str extends `${infer First} ${infer Last}`
    ? `${Capitalize<Last>} ${First}`
    : Str;

{
  type A = `${"x" | "y"}_${"1" | "2"}`; // 这个联合类型最终会展开成几个字面量成员
  const A1: A = "x_1";
  const A2: A = "x_2";
}

{
  type Test<S extends string> = S extends `${infer A}${infer B}`
    ? [A, B]
    : never;
  // 模板字符串匹配永远是"在原字符串上找切割点"，不是"把模板片段拼成新字符串再做整体比较"
  type Include<
    Str extends string,
    Search extends string,
    // _R1 _R2没有任何意义，只做模板占位，以匹配解构
    // 作用是做结构拆解匹配
  > = Str extends `${infer _R1}${Search}${infer _R2}` ? true : false;
  // Include<lin, ''> ${infer _R1}${infer _R2} _R1 l _R2 in true
  // Include<lin, 'l'>${infer _R1}l${infer _R2}

  type TrimLeft<Str extends string> = Str extends ` ${infer R}`
    ? TrimLeft<R>
    : Str;

  type Replace<
    Str extends string,
    Search extends string,
    Replacement extends string,
  > = Str extends `${infer Head}${Search}${infer Tail}`
    ? Replace<`${Head}${Replacement}${Tail}`, Search, Replacement>
    : Str;
}

// "" a aa  baa
// b a a bba
// bb a '' bbb

// head "" search:a tail:aa aaa
// head "" search:a tail:aa aaa
// 递归终止条件在于是否在某种可度量的意义上"变小"或者"逼近某个终止条件"

{
  type Split<
    Str extends string,
    Search extends string,
  > = Str extends `${infer Head}${Search}${infer Tail}`
    ? [Head, ...Split<Tail, Search>]
    : [Str];
}

//字符串工具的操作是操作字面量类型
// 真正的边界：操作对象的结构形态不同，但底层都是同一套"结构化类型系统 + 条件类型求解"

{
  type Join<
    List extends Array<string | number>,
    Delimiter extends string,
  > = List extends [string | number, ...infer Rest]
    ? `${List[0]}${Delimiter}${Join<Rest, Delimiter>}`
    : string;
}
// Join<['lin', 'bu', 'du'], '-'>
// 'lin_' ['bu','bu']
// 'bu_' ['bu']
// 'bu_' []
// lin_bu_bu_

{
  type Join<
    List extends Array<string | number>,
    Delimiter extends string,
  > = List extends []
    ? ""
    : List extends [string | number] // 注意：这里没有 ...infer Rest，精确匹配"只有一个元素"
      ? `${List[0]}`
      : // infer 的推导是局部的
        List extends [string | number, ...infer Rest]
        ? // @ts-expect-error
          `${List[0]}${Delimiter}${Join<Rest, Delimiter>}`
        : string;
}

{
  type SnakeCase2CamelCase<S extends string> =
    S extends `${infer Head}${"_"}${infer Rest}`
      ? `${Head}${SnakeCase2CamelCase<Capitalize<Rest>>}`
      : S;

  // foo_bar_baz Head foo _ Rest bar_baz foo(SnakeCase2CamelCase<Bar_baz>)
  // Bar_baz Head Bar _ Rest baz  Bar(foo(SnakeCase2CamelCase<Baz>))
  // Baz
  // fooBarBaz
}

{
  type DelimiterCase2CamelCaseAuto<S extends string> =
    S extends `${infer Head}${infer Delim}${infer Rest}`
      ? `${Head}${DelimiterCase2CamelCaseAuto<Capitalize<Rest>>}`
      : S;

  //  foo_bar-baz  foo _bar-baz "" f o o_bar-baz 在没有锚点的情况下，应尽量短，那么单个字符就是最短
  //  foo_bar-baz f o o_bar-baz  f <O_bar-baz>
  //  O_bar-baz O _ bar-baz  O<Bar-baz>
  //  Bar-baz B a r-baz B<R-baz>
  //  R-baz R - baz R<Baz>
  //  Baz B a z B<z>
  // z
  // fOBRBz
}

{
  type DelimiterCase2CamelCaseAuto<S extends string> =
    S extends `${infer Head}${"_" | "-" | " "}${infer Rest}`
      ? `${Head}${DelimiterCase2CamelCaseAuto<Capitalize<Rest>>}`
      : S;

  // foo__bar foo _bar foo <_bar>
  // _bar "" bar  ""<Bar>
  // Bar Bar
  // fooBar
}
