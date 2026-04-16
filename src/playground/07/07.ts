interface StatusB {
  code: number;
}
interface StatusB {
  message: string;
} // ?

const s: StatusB = {
  code: 200,
  message: "请求成功",
};

type Serializable = {
  toJSON: () => string;
};

type Loggable = {
  log: () => void;
};

type AuditRecord = Serializable & Loggable;

// 题 2：实现一个函数，接收 AuditRecord，先 log 再返回 toJSON 结果
function audit(record: AuditRecord): string {
  // 你来写
  record.log();
  return record.toJSON();
}

// 题 3：下面的 C 是什么类型？用注释写出你的推导过程
type X = { value: string };
type Y = { value: number };
type Z = X & Y;
// X.value 是string Y.value是number string&number是不存在的类型,返回never
// Z.value 是never

// ─── 练习 3：readonly 的边界 ────────────────────────────────────────────────
interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
  retries: number;
}

// 题 1：下面哪行会报 TS 错误？
declare const cfg: Config;
cfg.retries = 3; // ?
cfg.timeout = 5000; // ?
cfg.apiUrl = "xxx"; // ?

// cfg.timeout = 5000   cfg.apiUrl = 'xxx'  readonly字段在类型层面只能读取不能写入

{
  const arr: readonly number[] = [1, 2, 3];
  arr.push(4); // ? 能,但只是编译层面的报错,只读数组上不存在push这个属性
  arr[0] = 99; // ? 能,但只是编译层面的报错,成员值不能被修改
  const copy = [...arr]; // 不能阻止,因为这不是在操作原数组自身
}

interface BadConfig {
  [key: string]: string | number;
  port: number;
  host: string;
}

// 题 2：设计一个 RouteMetaMap，满足：
// - 可以用任意 string 作为路由名 key
// - value 必须是 { title: string; requiresAuth: boolean }
// - 同时有一个具名字段 version: string 表示路由表版本
{
  type RouteMeta = {
    title: string;
    requiresAuth: boolean;
  };

  interface RouteMetaMap {
    // 你来写
    [key: string]: RouteMeta | string;
    version: string;
  }
}

type RouteRegistry = {
  version: string;
  routes: Record<string, RouteMeta>;
};

// ─── 练习 5：综合 — 设计一个事件总线类型契约 ─────────────────────────────
// 要求：
// - EventMap 是一个索引签名，key 是事件名（string），value 是回调函数类型
// - EventBus interface 有三个方法：
//     on(event: string, handler: Function): void
//     off(event: string, handler: Function): void
//      off(event: string, handler: Function): void
// - emittedCount 是一个 readonly 字段，记录触发次数，外部只读
// - 用 & 把 EventBus 和 Loggable（练习2里的）合并成 LoggableEventBus

interface EventMap {
  [key: string]: (event: string, handler: () => void) => void;
}
interface EventBus {
  // 你来写
  on(event: string, handler: Function): void;
  off(event: string, handler: Function): void;
  emitted(event: string, ...args: unknown[]): void;
}

type LoggableEventBus = EventBus & Loggable; /* 你来写 */
