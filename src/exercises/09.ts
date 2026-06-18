interface BlogPost {
  id: number;
  title: string;
  content: string;
  authorId: number;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  isDraft: boolean;
}

/**
   * CreatePostReq — 创建文章时前端提交的数据，id / publishedAt / updatedAt 由后端生成，不需要传
     PostListItem — 列表页只展示 id / title / authorId / publishedAt / isDraft
     UpdatePostReq — 编辑文章，id 必传用于定位，其余字段按需传
   */

type CreatePostReq = Omit<BlogPost, "id" | "publishedAt" | "updatedAt">;
type PostListItem = Pick<
  BlogPost,
  "id" | "title" | "authorId" | "publishedAt" | "isDraft"
>;
type UpdatePostReq = Partial<BlogPost> & Pick<BlogPost, "id">;

// 权限操作只有这四种
type Action = "read" | "create" | "update" | "delete";

// 路由名称是字符串
// 每个路由对应的权限是 Action 的子集（不一定全有）

type RoutePermissions = Record<string, Action[]>;

function hasPermission(
  permissions: RoutePermissions,
  route: string,
  action: Action,
): boolean {
  return true;
}

interface FormField {
  label: string;
  type: "text" | "number" | "select" | "checkbox";
  required: boolean;
  defaultValue: string | number | boolean;
  options?: string[]; // 仅 select 类型需要
}

type FormConfig = Record<string, FormField>;

function makeReadonlyForm(
  config: FormConfig,
): Record<string, Readonly<FormField>> {
  // 实现留空
  return config as Record<string, Readonly<FormField>>;
}

{
  let a: any = "";
  const b = a; // 交叉类型 &any 都是any类型

  type IsAny<T> = 0 extends 1 & T ? true : false;

  // infer做结构类型判断
  type IsUnknown<T> = unknown extends T
    ? IsAny<T> extends true
      ? false
      : true
    : false;

  type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : T;

  type ReverseKeyValue<T extends Record<string, unknown>> =
    T extends Record<infer K, infer V> ? Record<V & string, K> : never;
}
type GetRetuenType<T> = T extends (...args: any[]) => infer R ? R : never;

type GetString = (arg: string) => string;

const arr2: GetRetuenType<GetString> = "10";

{
  // type ArrayItem<T> = T extends [infer R,infer K] ? [R,K] : never
  type ArrayItem<T> = T extends Array<infer item> ? item : never;
  type C = ArrayItem<[string, number]>;
}

{
  type DeepUnwrapPromise<T> =
    T extends Promise<infer R> ? DeepUnwrapPromise<R> : T;

  type D = DeepUnwrapPromise<Promise<Promise<boolean>>>;

  // DeepUnwrapPromise<Promise<Promise<boolean>>> <Promise<Promise<boolean>>> extends Promise<infer R>
  // DeepUnwrapPromise<Promise<boolean>>>   Promise<boolean>> extends Promise<infer R>
  // DeepUnwrapPromise<boolean>
}
