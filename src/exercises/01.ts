let siteName: string = "TypeScript Bootcamp";
let lessonCount: number = 1;
let isFinished: boolean = false;

// 数组边界：只允许 number 进入
const scores: number[] = [1, 2, 3, 4];

// 函数边界：保护输入与输出
function formatPrice(price: number): string {
  return "¥" + price;
}

formatPrice(99);

// -------------------------
// 以下是工程化分层练习
// API输入 -> 领域模型 -> 视图输出
// -------------------------

// API层：外部输入通常更宽，需要先防御
type ApiUser = {
  id: number | string;
  name?: unknown;
  age?: unknown;
  is_admin?: unknown;
  [key: string]: unknown;
};

// 领域层：内部稳定契约，尽量收紧
type DomainUser = {
  id: number;
  name: string;
  age: number;
  isAdmin: boolean;
};

// 视图层：只暴露页面需要的数据，避免泄漏内部结构
type ViewUser = {
  displayName: string;
  tag: "管理员" | "普通用户";
};

// 输入保护：把不可信的外部数据收敛为可信领域模型
function toDomainUser(input: ApiUser): DomainUser {
  const id = Number(input.id);
  if (!Number.isFinite(id)) {
    throw new Error("id 非法");
  }

  if (typeof input.name !== "string" || input.name.trim() === "") {
    throw new Error("name 非法");
  }

  if (typeof input.age !== "number" || input.age < 0) {
    throw new Error("age 非法");
  }

  if (typeof input.is_admin !== "boolean") {
    throw new Error("is_admin 非法");
  }

  return {
    id,
    name: input.name,
    age: input.age,
    isAdmin: input.is_admin,
  };
}

// 输出保护：把领域模型转换为视图模型，明确页面消费契约
function toViewUser(user: DomainUser): ViewUser {
  return {
    displayName: `${user.name}（${formatPrice(user.age)}岁版）`,
    tag: user.isAdmin ? "管理员" : "普通用户",
  };
}

const apiUser: ApiUser = {
  id: "101",
  name: "Hans",
  age: 30,
  is_admin: true,
  male: "man",
};

const domainUser = toDomainUser(apiUser);
const viewUser = toViewUser(domainUser);

console.log(siteName, lessonCount, isFinished, scores, viewUser);

