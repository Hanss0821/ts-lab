// 1a. 平台支持的语言代码（字面量联合类型）
// 支持：'zh' | 'en' | 'ar' | 'ja'
type LangCode = 'zh' | 'en' | 'ar' | 'ja' /* 你来写 */

// 1b. 用户角色
// 支持：'guest' | 'member' | 'admin'
type UserRole = 'guest' | 'member' | 'admin' /* 你来写 */

// 1c. 用户基础信息 Interface
// 必填：id(number), nickname(string), role(UserRole), lang(LangCode)
// 可选：avatarUrl(string), bio(string)
interface UserBase {
    id: number;
    nickname: string;
    role: UserRole;
    lang: LangCode;
    avatarUrl?: string;
    bio?: string;
 }

// 1d. 礼物 Interface
// 必填：giftId(number), name(string), price(number), animationType('static' | 'dynamic')
// 可选：duration(number) —— 只有 dynamic 类型才有意义，但类型层面先标可选
interface Gift { 
    giftId: number;
    name: string;
    price: number;
    animationType: 'static' | 'dynamic';
    duration?: number;
 }

 // 2a. 用 as const 定义礼物价格档位映射，key 是档位名，value 是金币数
// 档位：'bronze'=10, 'silver'=50, 'gold'=200, 'diamond'=1000
// as const 能更精确的收窄为字面量类型
const GIFT_TIERS = {
    'bronze': 10, 
    'silver': 50, 
    'gold': 200, 
    'diamond':1000
} as const

// 2b. 从 GIFT_TIERS 派生出两个类型，不手写字面量
// GIFT_TIERS是值，ts中 typeof可以获得类型
type GiftTier =   keyof typeof GIFT_TIERS  // 'bronze' | 'silver' | 'gold' | 'diamond'
// TS 的 T[K] 是编译时对类型集合的全量查询，K 是联合类型时自动分发，结果是所有可能返回值类型的并集。
type GiftPrice =  typeof GIFT_TIERS[GiftTier]   // 10 | 50 | 200 | 1000


// 3a. API 响应通用结构（泛型）
interface ApiResponse<T> { 
    code: number;
    msg: string;
    data: T;
}

// 3b. 函数：根据 GiftTier 获取对应价格，返回值从 GIFT_TIERS 派生，不手写 number
function getTierPrice(tier: GiftTier): GiftPrice {
  return GIFT_TIERS[tier]
}

// 3c. 泛型函数：从对象数组中提取某个字段的所有值
// 约束：K 必须是 T 的合法 key
function pluck<T, K extends keyof T>(arr: T[], key: K): T[K][] {
    return arr.map(item => item[key])
}

// 使用示例（写出来验证类型是否正确）：
// const nicknames = pluck(userList, 'nickname')  // 应推断为 string[]
// const prices = pluck(giftList, 'price')        // 应推断为 number[]

// 已有完整的活动类型：
interface Activity {
    id: number
    name: string
    startTime: string
    endTime: string
    status: 0 | 1 | 2   // 0=未开始 1=进行中 2=已结束
    maxParticipants: number
    rewardGiftId: number
  }
  
  // 4a. 列表接口返回类型：不需要 rewardGiftId
  type ActivityListItem = Omit<Activity,'rewardGiftId'>
  
  // 4b. 创建活动请求类型：不需要 id 和 status
  type CreateActivityReq = Omit<Activity, 'id' | 'status'>
  
  // 4c. 更新活动请求类型：id 必填，其余字段全部可选
  //  Partial<Activity> & {id: number};
  type UpdateActivityReq = Partial<Activity> & Pick<Activity,'id'>;
  
  // 4d. 只读配置快照：所有字段只读
  type ActivitySnapshot = Readonly<Activity>


  // 活动 API 返回两种结果：
type ActivityResult =
| { code: 200; data: Activity }
| { code: 400; error: string }
| { code: 500; error: string; retryAfter?: number }

// 5a. 写一个 is 谓词函数 isSuccess，
// 收窄到 code === 200 的分支
// { code: 200; data: Activity }
function isSuccess(result: ActivityResult): result is Extract<ActivityResult, { code: 200 }>{
    return result.code === 200;
}

// 5b. 写函数 handleActivityResult，
// 成功时打印 data.name，失败时打印 error，
// 500 时额外打印 retryAfter（如果存在）
// 要求：不使用任何类型断言（as），所有分支 TS 编译通过
function handleActivityResult(result: ActivityResult): void {
    if (isSuccess(result)) {
        console.log(result.data.name)  // 收窄到 { code: 200; data: Activity }
        return
      }
      console.error(result.error)
      if (result.code === 500 && result.retryAfter) {
        console.log(result.retryAfter)
      }
}

// ActivityResult（联合类型）—— 应该用 type 还是 interface？为什么？
/**
 * 应该用type,因为它描述的是一个联合类型，interface更多是对结构化数据的描述
 */
// UserBase（对象结构，未来可能被 AdminUser extends）—— 应该用哪个？
/**
 * interface, interface对于结构化数据具有集成的属性
 */
// GiftTier（字符串字面量联合）—— 应该用哪个？
/**
 * 用type，因为是联合类型，也不属于结构化数据的描述
 */