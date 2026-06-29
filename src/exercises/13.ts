// 属性修饰符
// 工具类型的约束应该尽可能宽，Record<string,unknown> 限制键类型为string
type DeepPartial<T extends object> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? DeepPartial<T[K]>
    : T[K];
};
type Flatten<T> = T & {};

type MarkPropsAsOptional<
  T extends object,
  K extends keyof T = keyof T,
> = Flatten<
  Partial<Pick<T, K>> & // 要改的那几个字段，Pick 切出来，套 Partial
    Omit<T, K> // 剩下不动的，Omit 切出来
>;

type T = { readonly a?: string };

type MarkPropsAsMutable<
  T extends object,
  K extends keyof T = keyof T,
> = Flatten<{ -readonly [P in K]: T[P] } & Omit<T, K>>;

// { [K in keyof T]: ... }[keyof T]
// [keyof T] 本质是在做值的映射，配合键
{
  type FuncStruct = (...args: any[]) => void;

  type Tmp<T extends object> = {
    [K in keyof T]: T[K] extends FuncStruct ? K : never;
  };
  // 获取函数类型的键
  type Result<T extends object> = Tmp<T>[keyof T]; // {'foo':()=>number}['foo']
  type num = Result<{ foo: () => number }>;
}

// 完全对等
{
  type Res<A, B> = A extends B ? (B extends A ? true : false) : false;
}

{
  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
  type XOR<T, U> = (Without<T, U> & U) | (Without<U, T> & T);
  interface VIP {
    vipExpires: number;
  }
  interface CommonUser {
    promotionUsed: boolean;
  }
  type XORUser =
    | (Without<VIP, CommonUser> & CommonUser) // { vipExpires?: never } & { promotionUsed: boolean }
    | (Without<CommonUser, VIP> & VIP);

  const a: XORUser = { promotionUsed: true }; // ✅ 走分支一
  const b: XORUser = { vipExpires: 30 }; // ✅ 走分支二
}

{
  type T = { name: string; vipExpires: number };
  type U = { name: string; level: number };
  // 返回A中，同时也属于B的成员类型
  type Intersection<A, B> = A extends B ? A : never; // 联合成员交集（条件类型分发）
  // 返回A中，不属于B的成员类型
  type Difference<A, B> = A extends B ? never : A; // 联合成员差集

  // 获取T中，同时属于U的键的类型
  type ObjectKeysIntersection<T, U> = Intersection<keyof T, keyof U>;
  // 获取T和U中相同类型的对象
  type ObjectIntersection<T, U> = Pick<T, ObjectKeysIntersection<T, U>>;
  // 获取T中不属于U的类型的对象
  type ObjectDifference<T, U> = Pick<T, Difference<keyof T, keyof U>>;

  type Merge<T extends object, U extends object> = ObjectDifference<T, U> &
    ObjectIntersection<T, U> &
    ObjectDifference<U, T>;
  type Res = Merge<T, U>;

  const obj: Res = {
    name: "hans",
    vipExpires: 10,
    level: 20,
  };
}

{
  type FunctionType = (...args: any[]) => any;
  type LastParameter<T extends FunctionType> = T extends (arg: infer P) => any // 只有一个参数？直接拿
    ? P
    : T extends (...args: infer R) => any // 先把所有参数提取成元组 R
      ? R extends [...any, infer Q] // 再从元组里拿最后一个
        ? Q
        : never
      : never;

  type Awaited<T> = T extends object & { then(onfulfilled: infer F): any }
    ? F extends (value: infer V, ...args: any) => any
      ? Awaited<V>
      : never
    : T;
}

{
  interface UserProfile {
    id: number;
    name: string;
    age: number;
    email: string;
    avatar: string;
  }
  /*
  要求实现 PickByValueType<T, ValueType>
  ——从 T 中取出所有值类型匹配 ValueType 的字段。
  **/

  type PickByValueType<T extends object, ValueType> = Pick<
    T,
    {
      [P in keyof T]: T[P] extends ValueType ? P : never;
    }[keyof T]
  >;

  type str = PickByValueType<UserProfile, string>;
}

{
  interface Config {
    host: string;
    port: number;
    debug: boolean;
    timeout: number;
    name: string;
  }

  type OmitByValueType<T extends object, ValueType> = Omit<
    T,
    {
      [P in keyof T]: T[P] extends ValueType ? P : never;
    }[keyof T]
  >;
  type Result = OmitByValueType<Config, number>;
}

{
  type DeepReadonly<T extends object> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
  };
}
