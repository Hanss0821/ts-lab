const arr: (User | null)[] = [
    { name: 'Hans', age: 28 },
    null,
    { name: 'Mike', age: 20 }
  ]
  
  function isNonNullable<T>(value: T): value is NonNullable<T> {
    return value != null
  }
  
  const result = arr.filter((item)=>{
    return isNonNullable(item)
  })

 {
    type Product = {
        id: number
        title: string
        price: number
      }
      
      type ApiResponse<T> =
        | { success: true; data: T }
        | { success: false; message: string; code: number }

    // 守卫
    function isObject(value:unknown): value is Record<string,unknown> {
        return value !== null && typeof value === 'object';
    }
       
    function isProduct(value: unknown): value is Product {
        // 你来写
        return isObject(value)&&
        'id' in value && 
        typeof value.id === 'number' &&
        'title' in value && 
        typeof value.title === 'string' &&
        'price' in value && 
        typeof value.price === 'number'
    }

    function isProductArray(value: unknown): value is Product[] {
        return Array.isArray(value) && value.every(isProduct);
    }
      
    function isApiResponseProductList(value: unknown): value is ApiResponse<Product[]> {
        // 你来写
        if(!isObject(value))return false;
        if(!('success' in  value)) return false;
        if(value.success === true) {
            if(!('data' in value))return false;
            return isProductArray(value.data);
        }

        if(value.success === false) {
            if(!('message' in value)) return false;
            if(typeof value.message !== 'string') return false;
            if(!('code' in value)) return false;
            if(typeof value.code !== 'number') return false;
            return true;
        }
        return false;
    }
 }

 {
    type Product = {
        id: number
        title: string
        price: number
      }

    function isProduct(value: unknown): value is Product {
        // 你来写
        return isObject(value)&&
        'id' in value && 
        typeof value.id === 'number' &&
        'title' in value && 
        typeof value.title === 'string' &&
        'price' in value && 
        typeof value.price === 'number'
    }

     function isArrayOf<T>(value:unknown,itemGuard:(value:unknown) => value is T) {
        return Array.isArray(value) && value.every(itemGuard);
     }

      function isProductArray(value: unknown) {
        return isArrayOf(value,isProduct);
      }

      type ApiResponse<T> =
    | { success: true; data: T }
    | { success: false; message: string }

    function isApiResponseOf<T>(value:unknown, dataGuard:(value:unknown) => value is T) {
      if(!isObject(value)) return false;
      if(!("success" in value)) return false;
      if(value.success === true && "data" in value) {
        return dataGuard(value.data)
      }
      if(value.success === false&&"message" in  value) {
        return typeof value.message === "string"
      }
      return false;
    }

    function isApiResponseProductList(value: unknown): value is ApiResponse<Product[]> {
      return isApiResponseOf<Product[]>(value, isProductArray);
    }
 }

 {
  type Product = {
    id: number
    title: string
    price: number
  }
  
  type ApiResponse<T> =
    | { success: true; data: T }
    | { success: false; message: string; code: number }
    function isProduct(value: unknown): value is Product {
      // 你来写
      return isObject(value)&&
      'id' in value && 
      typeof value.id === 'number' &&
      'title' in value && 
      typeof value.title === 'string' &&
      'price' in value && 
      typeof value.price === 'number'
  }
  // 判断是否Product Array
  function isArrayOf<T>(value:unknown,itemGraud:(value:unknown)=>value is T):value is T[] {
    return Array.isArray(value) && itemGraud(value);
  }

  function isProductArray(value: unknown) {
    return isArrayOf(value,isProduct);
  }

  // 判断是否ApiResponse类型
  function isApiResponseOf<T>(
    value:unknown, 
    dataGraud:(value:unknown)=> value is T): value is ApiResponse<T>{
      if(!isObject(value)) return false;
      if(!("success" in value)) return false;
      if(value.success === true && "data" in value) {
        return dataGraud(value.data);
      }
      if(value.success === false) {
        if("message" in value) {
          return typeof value.message === 'string';
        }
        if("code" in value) {
          return typeof value.code === 'number';
        }
      }
      return false;
  }

  function parseProductListResponse(raw: unknown): string {
    if (!isApiResponseOf(raw, isProductArray)) {
      return 'raw解析错误,不符合ApiResponse结构';
    }
    switch (raw.success) {
      case true:
        return `共 ${raw.data.length} 个商品`;
      case false:
        return `请求失败: ${raw.code} - ${raw.message}`;
      default: {
        const exhaustiveCheck: never = raw;
        return exhaustiveCheck;
      }
    }
  }
 }

{
  type Order = {
    id: number
    amount: number
  }
  function isObject(value:unknown): value is Record<string, unknown> {
    return value !== null && typeof value === 'object';
  }
  function isOrder(value: unknown): value is Order {
    // 你来写
    return isObject(value)&&
    "id" in value &&
    typeof value.id === 'number'&&
    "amount" in value &&
    typeof value.amount === 'number'
  }
  function isArrayOf<T>(value:unknown,
     itemGraud:(value:unknown)=> value is T):value is T[] {
    return Array.isArray(value) && value.every(itemGraud);
  }
  function isOrderArray(value: unknown): value is Order[] {
    // 你来写
    return isArrayOf(value, isOrder);
  }
  // 判断是否ApiResponse类型
  function isApiResponseOf<T>(
    value:unknown, 
    dataGraud:(value:unknown)=> value is T): value is ApiResponse<T>{
      if(!isObject(value)) return false;
      if(!("success" in value)) return false;
      if(value.success === true && "data" in value) {
        return dataGraud(value.data);
      }
      if(value.success === false) {
        if("message" in value) {
          return typeof value.message === 'string';
        }
        if("code" in value) {
          return typeof value.code === 'number';
        }
      }
      return false;
  }
  function parseOrderListResponse(raw: unknown): string {
    // 要求：
    // 1. 用 isApiResponseOf(raw, isOrderArray)
    if(!isApiResponseOf(raw,isOrderArray))return "解析失败，数据结构不符合"
    // 2. success: true -> 返回 `共 ${raw.data.length} 个订单`
    switch(raw.success){
        case true:
         return `共${raw.data.length}个订单`
        case false:
        return `请求失败: ${raw.code} - ${raw.message}`
        default: {
            const exhaustiveCheck :never = raw;
            return exhaustiveCheck;
        }
    }
    // if(raw.success) {
    //    return `共${raw.data.length}个订单`
    // }else {
    //    return `请求失败: ${raw.code} - ${raw.message}`
    // }
    // 不是if就是else不再需要穷尽检查
    // const exhaustiveCheck :never = raw;
    // return exhaustiveCheck;
  }
}