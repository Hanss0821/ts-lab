function formatValue(value: string | number) {
    // TODO
    if(typeof value === 'string') {
        console.log('string', value)
        return value.toUpperCase();
    }else {
        console.log('number', value)
        return value.toFixed(2);
    }
  }


  type Admin = {
    name: string
    permissions: string[]
  }
  
  type Visitor = {
    name: string
    visitReason: string
  }
  
  function getDisplayText(user: Admin | Visitor) {
    // TODO
    // if(user.name === 'Admin') {
    //     return `管理员:${user.name}`;
    // }else {
    //     return `访客:${user.name}`;
    // }
    if('permissions' in user) {
        return `管理员:${user.name}`;
    }
    return `访客:${user.name}`;
  }

  type RequestState =
  | { status: 'loading' }
  | { status: 'success'; data: string[] }
  | { status: 'error'; message: string }

function renderState(state: RequestState) {
  // TODO
  switch (state.status) {
    case 'loading':
        return '加载中...'
    case 'success':
        return `数据条数: ${state.data.length}`
    case 'error':
        return `错误:${state.message}`
    default: {
        // never 做穷尽检查
        // 新增分支忘记处理会报错
        const exhaustiveCheck: never = state
        return exhaustiveCheck
    }
  }
}


function isStringArray(value: unknown): value is string[] {
    // TODO
    return Array.isArray(value)&&value.every((item)=>typeof item === 'string')
}


  type Cat = {
    name: string
    meow: () => void
  }
  
  type Dog = {
    name: string
    bark: () => void
  }
  
  function speak(animal: Cat | Dog) {
    // 补全
    if('meow' in animal) {
        animal.meow();
        return;
    }
    animal.bark();
  }

  type Result =
  | { type: 'ok'; value: number }
  | { type: 'fail'; error: string }
//   | { type: 'pending' }

function formatResult(result: Result) {
  // 补全
  switch (result.type) {
    case 'ok':
        return `成功 ${result.value}`;
    case 'fail':
        return `失败 ${result.error}`;
    default: {
        const exhaustiveCheck: never = result
        return exhaustiveCheck
    }
  }
}


type FetchState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }

/**
 * 
导致多个状态同时存在
type BadState<T> = {
  loading: boolean
  data?: T
  error?: string
}
 *  idle -> "未开始"
    loading -> "加载中"
    success -> 返回 "用户: xxx, 年龄: xxx"
    error -> 返回 "请求失败: xxx"
    用 switch
    加上 never 穷尽检查
 */
function renderUserState(state: FetchState<{ name: string; age: number }>) {
  // 你来补全
  switch (state.status) {
    case 'idle':
        return '未开始'
    case 'loading':
        return '加载中'
    case 'success':
        return `用户${state.data.name} 年龄${state.data.age}`
    case 'error':
        return `请求失败,${state.error}`
    default: {
        const exhaustiveCheck:never = state;
        return exhaustiveCheck;
    }
  }
}