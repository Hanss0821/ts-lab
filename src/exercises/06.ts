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

    // function isArrayOf<T>(
    //     value: unknown,
    //     itemGuard: (value: unknown) => value is T
    //   ): value is T[] {
    //     // 你来写
    //     return Array.isArray(value) && value.every(itemGuard);
    //   }

    //   function isProductArray(value: unknown): value is Product[] {
    //     return isArrayOf(value,isProduct);
    //   }

      type ApiResponse<T> =
    | { success: true; data: T }
    | { success: false; message: string }
 }