/**
 * 第 1 关（unknown + 收窄）
    目标：外部输入先用 unknown 承接，再通过 shape 校验进入业务流。
 */

interface DressupItem {
    dressup_manage_id: string | number;
    dressup_type: string | number;
    dressup_cn_name?: string;
    sort_num?: number;
    checked?: boolean;
    isPool?: boolean;
}

type DragPayload = DressupItem | DressupItem[]
type DragPayloadKind = 'single' | 'list'

// 2) unknown 承接外部输入
function safeParse(raw: string):unknown {
    try{
        return JSON.parse(raw);
    }catch{
        return null
    }
}

// TODO 1: 实现 isRecord
function isRecord(v: unknown): v is Record<string, unknown> {
    return typeof v === 'object' && v !== null
}

/**
  TODO 2: 实现 isDressupItem
  补充：类型校验更加收窄
*/ 
function isDressupItem(v: unknown): v is DressupItem {
    // return isRecord(v) && 'dressup_manage_id' in v && 'dressup_type' in v
    return isRecord(v)&&
    isStringOrNumber(v.dressup_manage_id)&&
    isStringOrNumber(v.dressup_type)&&
    isNumberOrUndefined(v.sort_num)&&
    isBooleanOrUndefined(v.checked)
}

function isStringOrNumber(v:unknown): v is string | number {
  return typeof v === 'string' || typeof v === 'number';
}
function isNumberOrUndefined(v:unknown): v is number | undefined {
  return v === undefined || typeof v === 'number';
}
function isBooleanOrUndefined(v:unknown): v is boolean | undefined {
  return  v === undefined || typeof v === 'boolean';
}
// TODO 3: 实现数组守卫
function isDressupItemArray(v: unknown): v is DressupItem[] {
  return Array.isArray(v) && v.every(isDressupItem)
}

// TODO 4: 实现解析函数，返回 DragPayload | null
function parseDragPayload(raw: string): DragPayload | null {
  const parsed = safeParse(raw)
  if (isDressupItemArray(parsed)) return parsed
  if (isDressupItem(parsed)) return parsed
  return null
}

function getKind(payload: DragPayload): DragPayloadKind {
    return Array.isArray(payload) ? 'list' : 'single'
}

function assertNever(x: never): never {
    throw new Error(`Unexpected kind: ${String(x)}`)
}

function handlePayload(payload: DragPayload) {
  if (Array.isArray(payload)) {
    return payload.map((i) => i.dressup_manage_id)
  }

  return payload.dressup_manage_id
}

// ===== 测试 =====
const goodSingle = JSON.stringify({ dressup_manage_id: 1, dressup_type: 2, isPool: true })
const goodList = JSON.stringify([
  { dressup_manage_id: 1, dressup_type: 2 },
  { dressup_manage_id: 2, dressup_type: 2 }
])
const bad = JSON.stringify({ foo: 1 })


function run(raw: string) {
    const payload = parseDragPayload(raw);
    if (payload === null) {
      console.log("非法 payload");
      return;
    }
    console.log(handlePayload(payload));
  }

  run(goodSingle);
  run(goodList);
  run(bad);