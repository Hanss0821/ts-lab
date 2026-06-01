/**
 * 背景
    活动页低代码平台中，有一个活动配置：
 */



{
    interface ActivityConfig {
            id: number
            title: string
            startTime: string
            endTime: string
            enabled: boolean
    }
    // 题目 1：字段名联合类型
    type ActivityFieldKey = keyof ActivityConfig;

    // 题目 2：字段配置
    type FormField<T> = {
        key: keyof T;
        label: string // label的值不是所有字段的值，固定为string
    }

    const field: FormField<ActivityConfig> = {
        key: "title",
        label: "活动标题"
    }

    // 题目 3：字段值类型读取
    // 索引键的约束只能是string numebr symbol
    type FieldValue<T, K extends keyof T> = T[K]

    // 题目 4：把所有字段变成可编辑字段
    type Editable<T> = {
        [k in keyof T]: {
            value: T[k],
            editable: boolean
        }
    }
        
}