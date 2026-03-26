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


