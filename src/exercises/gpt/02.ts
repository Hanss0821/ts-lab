/**
 * 使用联合类型
    使用 type 作为辨识字段
    写一个 renderField(field) 函数
    在函数内部通过 field.type 自动获得正确类型
    尝试封装一个：
 */

interface InputField {
    type: 'input',
    label: string,
    value: string // 输入框值类型固定
}

interface SelectField {
    type: 'select',
    label: string,
    value: string | number
    options: Array<{label:string,value: string | number}>
}

interface SwitchField {
    type: 'switch',
    label: string,
    value: boolean
}

type Field = 
    | InputField
    | SelectField
    | SwitchField

function renderField(field: Field) {
    switch (field.type) {
        case 'input':
        return 'el-input'
          case 'select':
        return 'el-select'
          case 'switch':
        return 'el-switch'
        default: {
            // field.type 不能的原因是因为收窄到never后，已经不在具备可访问属性
            const exhaustiveCheck:never = field;
            return exhaustiveCheck;
        }
    }
}

function isSelectField(field: Field): field is SelectField{
    return field.type === 'select'
}

// typeof 消灭重复类型定义

export const ActivityStatus = {
    DRAFT: 0,
    ONLINE: 1,
    OFFLINE: 2
}  as const // 获取字面量类型

// 字面量拓宽
type ActivityStatusType = typeof ActivityStatus;

// 此处是对类型的访问，前面没有typeof是值的访问
type ActivityStatus = (typeof ActivityStatus)[keyof typeof ActivityStatus]