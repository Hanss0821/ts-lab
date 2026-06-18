{
  type IsString<T> = T extends string ? true : false;
  type A = IsString<"hello">; // true
  type B = IsString<123>; // false
  type C = IsString<"hello" | 123>; // boolean
  type D = IsString<string | number>; // boolean

  type ApiResponse<T> = {
    code: number;
    message: string;
    data: T;
  };

  type ApiData<T> = T extends ApiResponse<infer Data> ? Data : never;

  type User = {
    id: number;
    name: string;
  };

  type E = ApiData<ApiResponse<User>>; // { id:number;name:string}
  type F = ApiData<ApiResponse<User[]>>; // User[]
  type G = ApiData<User>; // never

  type ArrayItem<T> = T extends Array<infer Item> ? Item : never;
  type arr = [string, number];
  type H = ArrayItem<string[]>; // string
  type I = ArrayItem<[string, number]>; // string | number
  type J = ArrayItem<User[]>; // User
  type K = ArrayItem<User>; // never

  type GetReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never;
  type getNumber = (arg: number) => number;
  type num = GetReturnType<getNumber>; // number 比 unknown 窄的多,兼容不了返回never
  // never走的是空分发， 分发逻辑大于逻辑判断，拿到的是never，因为没有成员做map
  type IsNeverWrong<T> = T extends never ? true : false;
  // 正确的never判断，停用分发
  type IsNeverWrong2<T> = [T] extends [never] ? true : false;
  // never会默认走联合类型的分发
  type Result = IsNeverWrong<never>; // never=[]  空集合没有任何成员类型可以处理，会停止分发,结果是never不是true
  type Result2 = IsNeverWrong2<never>;
}

{
  type FilterNumber<T> = T extends number ? T : never;
  type AllNumbers<T> = [T] extends [number] ? true : false;
  type Status = "draft" | "published" | "offline" | null | 0;

  type RemoveNull<T> = T extends null ? never : T;
  type A = FilterNumber<1 | "a" | 2 | false>; //  1 | 2
  type B = FilterNumber<number | string>; // number
  type C = FilterNumber<never>; // never
  type D = AllNumbers<1 | 2 | 3>; // true
  type E = AllNumbers<1 | 2 | "3">; //  false
  type F = AllNumbers<never>; // true // never是底层类型
  type G = RemoveNull<Status>; // "draft" | "published" | "offline"  | 0;
}

{
  type GetReturn<T> = T extends (...args: any[]) => infer R ? R : never;

  type GetParams<T> = T extends (...args: infer P) => any ? P : never;

  type First<T> = T extends readonly [infer F, ...unknown[]] ? F : never;

  type Tail<T> = T extends readonly [unknown, ...infer Rest] ? Rest : [];

  type DeepPromiseValue<T> =
    T extends Promise<infer V> ? DeepPromiseValue<V> : T;
  type ApiData<T> = T extends ApiResponse<infer Data> ? Data : never;
  type ArrayItem<T> = T extends Array<infer Item> ? Item : never;

  type A = GetReturn<(id: number) => Promise<string>>; // Promise<string>

  type B = GetParams<(id: number, config: { cache: boolean }) => void>; // number|{cache：boolean} // 是一个元组类型[id:number,config:{cache:boolean}]

  type C = First<["draft", number, boolean]>; // draft

  type D = Tail<["draft", number, boolean]>; // [number,boolean]

  type E = DeepPromiseValue<Promise<Promise<ApiResponse<User[]>>>>; // ApiResponse<User[]>

  type F = ApiData<E>; // User[]

  type G = ArrayItem<F>; // User
}
