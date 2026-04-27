export const GIFT_TIERS = {
    'bronze': 10, 
    'silver': 50, 
    'gold': 200, 
    'diamond':1000
} as const

export interface Gift { 
    giftId: number;
    name: string;
    price: number;
    animationType: 'static' | 'dynamic'; 
    duration?: number 
}

// 2b. 从 GIFT_TIERS 派生出两个类型，不手写字面量
// GIFT_TIERS是值，ts中 typeof可以获得类型
export type GiftTier =   keyof typeof GIFT_TIERS  // 'bronze' | 'silver' | 'gold' | 'diamond'
// TS 的 T[K] 是编译时对类型集合的全量查询，K 是联合类型时自动分发，结果是所有可能返回值类型的并集。
export type GiftPrice =  typeof GIFT_TIERS[GiftTier]   // 10 | 50 | 200 | 1000