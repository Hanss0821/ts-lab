// Pick 提取字段
/**
 * 1. ts中K的取值必须要有意义，需要限定是T的键类型，keyof T 拿到T的键的联合类型
 * 2. []的取值必须是number，string，symbol 需要映射才能使用
 */
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
/**
 * 1.对象类型才需要keyof进行映射
 * 2.工具类型的使用可以组合
 * 3.我需要过滤的是键，首先先把键排除，在给定对应的值
 */
type MyOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};
// Partial 每个字段增加可选参数
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};
// Required 可选变必填
// 可选参数是联合类型 类型 | undefined（显示声明则必须实现）
type MyRequired<T> = {
  [K in keyof T]-?: T[K];
};
// Record 构建字典
type MyRecord<K extends keyof any, T> = {
  [P in K]: T;
};
// Exclude 排除字段 利用联合类型的分发运算
/**
 * extends左边的参数才会进行类和类型的分发
 */
type MyExclude<T, K> = T extends K ? never : T;
// Extract 提取两个联合类型中相同的类型
type MyExtract<T, K> = T extends K ? T : never;
// NonNullable 排除 null 和 undefined
type MyNonNullable<T> = Exclude<T, null | undefined>;

/**
 * DTO 不要手写重复结构，优先从领域模型派生
 *
 * 新增用 Omit，更新用 Partial + Omit
 *
 * 表单草稿态可以 Partial，提交态不要 Partial
 *
 * 状态、权限、类型枚举优先用联合类型，再用 Exclude / Extract 派生
 *
 * unknown 优先于 any
 */
type ComponentType = "text" | "image" | "button";

type ComponentSchema = {
  id: string;
  type: ComponentType;
  name: string;
  props: Record<string, unknown>;
  style: Record<string, string | number>;
  visible: boolean;
  locked: boolean;
  createdAt: string;
  updatedAt: string;
};

// 请你完成下面 6 个类型：

// 1. 创建组件时，不允许传 id / createdAt / updatedAt
type CreateComponentDTO = Omit<
  ComponentSchema,
  "id" | "createdAt" | "updatedAt"
>;

// 2. 更新组件时，可以只传部分字段，但不能更新 id / createdAt / updatedAt
type UpdateComponentDTO = Partial<CreateComponentDTO>;

// 3. 组件列表项，只展示 id / type / name / visible
type ComponentListItem = Pick<
  ComponentSchema,
  "id" | "type" | "name" | "visible"
>;

// 4. 可编辑状态字段，只允许修改 props / style / visible / locked
type EditableComponentFields = Pick<
  ComponentSchema,
  "props" | "style" | "visible" | "locked"
>;
type UpdateEditableComponentDTO = Partial<EditableComponentFields>;

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {}; // & {}ts类型展开，增加ide的展示效果

type ReadonlyExcept<T, K extends keyof T> = Prettify<
  Readonly<Omit<T, K>> & Pick<T, K>
>;

type EditableComponentSchema = ReadonlyExcept<
  ComponentSchema,
  "props" | "style" | "visible" | "locked"
>;
// 5. 组件配置注册表，key 是 ComponentType
type ComponentConfigMap = Record<
  ComponentType,
  {
    label: string;
    defaultProps: Record<string, unknown>;
  }
>;

// 6. 从组件类型中排除 button
type NonButtonComponentType = Exclude<ComponentType, "button">;

/*其中第 5 题的 value 结构你自己设计，例如：
{
  label: string
  defaultProps: Record<string, unknown>
}
*/
