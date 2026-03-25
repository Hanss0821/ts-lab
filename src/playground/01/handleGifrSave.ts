type FailureReason = "no_cp_users" |
    "no_family_users" |
    "no_tat_users" |
    "not_same_area_users" |
    "noble_limit_list" |
    "not_exit_resource_list" |
    "not_exit_rid_list" |
    "signature_limit_list" 
    // | "vip_level_limit"

type FailureGroup = {
    users: number[],
    type: FailureReason
}

const notSourceUsers: FailureGroup[] = [
    { users: [], type: "no_cp_users" },
    { users: [], type: "no_family_users" },
    { users: [], type: "no_tat_users" },
    { users: [], type: "not_same_area_users" },
    { users: [], type: "noble_limit_list" },
    { users: [], type: "not_exit_resource_list" },
    { users: [], type: "not_exit_rid_list" },
    { users: [], type: "signature_limit_list" }
];

const typeText:Record<FailureReason, string> = {
    no_cp_users: "不是cp用户",
    no_family_users: "不是家族用户",
    no_tat_users: "不是房间用户",
    not_same_area_users: "不是同区域用户",
    noble_limit_list: "贵族限制",
    not_exit_resource_list: "资源不存在",
    not_exit_rid_list: "资源ID不存在",
    signature_limit_list: "签名限制",
} 

function getFailureMessage(type:FailureReason): string {
    return typeText[type];
    // switch (type) {
    //     case "no_cp_users":            return "不是cp用户";
    //     case "no_family_users":        return "不是家族用户";
    //     case "no_tat_users":           return "不是房间用户";
    //     case "not_same_area_users":    return "不是同区域用户";
    //     case "noble_limit_list":       return "贵族限制";
    //     case "not_exit_resource_list": return "资源不存在";
    //     case "not_exit_rid_list":      return "资源ID不存在";
    //     case "signature_limit_list":   return "签名限制";
    //     default:                       return assertNever(type); // 如果漏掉任何一个 case，这里编译报错
    //   }
}

function run() {
    notSourceUsers.forEach(({ users, type }) => {
        if (Array.isArray(users) && users.length) {
            alert(`下发资源失败，${users.join(",")}${getFailureMessage(type) || ""}`);
        }
    });
}
run();


function collectFailureMessages(list: FailureGroup[]): string[] {
    return list.filter(({ users })=>users.length > 0)
    .map(({users,type})=>`下发资源失败,${users.join(',')} - ${getFailureMessage(type)}`)
}

type K = "a" | "b";

const obj1: Record<K, number> = {
  a: 1,
};

const obj2 = {
  a: 1,
} satisfies Record<K, number>;

declare const key: K;

obj1[key]; // 因为定义的时候obj1的类型Record<K, number> 和key的类型K是符合的
obj2[key]; // 在定义的时候看成 Record<K, number>，但实际类型是 {a:number} 不符合key


type RouteMeta = {
    title: string;
    requiresAuth: boolean;
  };


  const routes = {
    home: { title: "首页", requiresAuth: false },
    profile: { title: "个人中心", requiresAuth: true },
  } satisfies Record<string, RouteMeta>;

  const routes2:Record<string,RouteMeta> = {
    home: { title: "首页", requiresAuth: false },
    profile: { title: "个人中心", requiresAuth: true },
  }
  
  routes.home.requiresAuth
  routes2.home.requiresAuth