function isCat(animal:Cat | Dog): animal is Cat {
    return 'meow' in animal
}

function speak(animal: Cat | Dog) {
    if (isCat(animal)) {
      animal.meow()
    } else {
      animal.bark()
    }
  }


function isString(value: unknown): value is string {
    // 补全
    return typeof value === 'string';
}
  
  function printUpperCase(value: unknown) {
    if (isString(value)) {
      return value.toUpperCase()
    }
    return 'not string'
  }

  type User = {
    name: string
    age: number
  }

//   function isObject(value:unknown):value is object {
//     // 为什么unknown不能直接参与&&运算
//     return !!value && typeof value === 'object'
//   }

function isObject(value:unknown): value is Record<string,unknown> {
    /**
     * 所以 TS 对 unknown 的策略是：
        允许你做“安全的存在性/类型判断”
        不允许你直接把它当成某个具体类型去用
     */
    return value !== null && typeof value !== 'object'
}

  function isNumber(value:unknown):value is number {
    return typeof value === 'number';
  }

  function isUser(value: unknown): value is User {
    return isObject(value)&&
    'name' in value && isString(value.name)&&
    'age' in value && isNumber(value.age);
  }


  function test(value:unknown) {
    return value && typeof value === 'object'
  }

  function a(value: string | undefined) {
    if (value) {
      return value.toUpperCase()
    }
  }
  
  function b(value: unknown) {
    if (value) {
      return value
    }
  }
  
  function c(value: unknown) {
    if (!!value) {
      return value
    }
  }
  
  function d(value: unknown) {
    if (typeof value === 'string') {
      return value.toUpperCase()
    }
  }
  
  function e(value: unknown) {
    if (typeof value === 'object' && value !== null) {
      return value
    }
  }
  
  function f(value: unknown) {
    if (
      typeof value === 'object' &&
      value !== null &&
      'name' in value
    ) {
      return value.name
    }
  }


  function isObject(value: unknown): value is Record<string, unknown> {
    // 你来写
    return value !== null && typeof value === 'object';
  }

  function hasName(value: unknown): value is Record<string, unknown> & { name: string } {
    // 你来写
    return isObject(value)&& 'name' in value&& typeof value.name === 'string';
  }


  type ErrorResponse = {
    success: false
    message: string
    code: number
  }
  
  function isErrorResponse(value: unknown): value is ErrorResponse {
    // 你来写
    return isObject(value) && 
    typeof value.success === 'boolean'&&
    value.success === false && 
    'message' in value && typeof value.message === 'string'&&
    'code' in value && typeof value.code === 'number'
  }

  type SuccessResponse<T> = {
    success: true;
    data: T;
  };
  
  type User = {
    name: string;
    age: number;
  };
  
  function isUser(value: unknown): value is User {
    // 你来写
    return isObject(value) && 
    'name' in value &&
    typeof value.name === 'string'&&
    'age' in value &&
    typeof value.age === 'number'
  }
  
  function isSuccessResponseUser(value: unknown): value is SuccessResponse<User> {
    // 你来写
    if(!isObject(value))return false;
    if('success' in value && value.success !== true) return false;
    return 'data' in value && isUser(value.data);
  }

  type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; message: string; code: number };

  function isApiResponseUser(value:unknown): value is ApiResponse<User> {
    if(!isObject(value))return false;
      if(!('success' in value)) return false;
      if(value.success === true) {
        if (!('data' in value)) return false;
        return isUser(value.data);
    }
    if(value.success === false) {
      if (!('message' in value)) return false;
      if (typeof value.message !== 'string') return false;
      if (!('code' in value)) return false;
      if (typeof value.code !== 'number') return false;
    } 
    return false;
  }


  function parseAndRenderUser(value: unknown): string {
    // 你来写
    if(!isApiResponseUser(value)) return "非法响应";
    switch (value.success) {
      case true:
        return `响应成功:${JSON.stringify(value.data)}`;
      case false:
        return `响应失败:${value.code},${value.message}`;
      default: {
        const exhaustivecheck:never = value;
        return exhaustivecheck
      }
    }
  }