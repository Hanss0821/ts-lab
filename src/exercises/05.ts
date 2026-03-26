{
    type User = {
        name: string
        age: number
      }
      
      function isString(value: unknown): value is string {
        return typeof value === 'string'
      }
      
      function isNumber(value: unknown): value is number {
        return typeof value === 'number'
      }
      
      function isObject(value: unknown): value is Record<string, unknown> {
        return typeof value === 'object' && value !== null
      }
      
      function isUser(value: unknown): value is User {
        return (
          isObject(value) &&
          'name' in value &&
          isString(value.name) &&
          'age' in value &&
          isNumber(value.age)
        )
      }
      
      // 题 1
      function isUserArray(value: unknown): value is User[] {
        // 你来写
        return Array.isArray(value)&&value.every(isUser);
      }
      
      // 题 2
      type ApiResponse<T> =
        | { success: true; data: T }
        | { success: false; message: string }
        // 因为value不知有success一个键
        function hasBooleanSuccess(value:unknown):value is Record<string,unknown>&{success:boolean} {
            return isObject(value)&&
            ('success' in value) &&
            typeof value.success == 'boolean' && 
            value.success === true
        }
      function isApiResponseUser(value: unknown): value is ApiResponse<User> {
        // 你来写
        // if(!isObject(value))return false;
        // if(!('success' in value)) return false;
        // if(typeof value.success !== 'boolean') return false;
        if(!hasBooleanSuccess(value))return false;
        if(value.success) {
            return 'data' in value && isUser(value.data);
        }
        return 'message' in value &&isString(value.message);
        // if(isObject(value)&&'success' in value) {
        //     // value.success && typeof value.success === 'boolean'
        //     if(value.success === true) {
        //         return isUser(value.data);
        //     }
        //     return isString(value.message)
        // }
        // 类型守卫的职责告诉外部这个职是不是目标类型 true/false
        // throw new Error('is no ApiResponse')
        // return false
      }

}

{
    type User = {
        name: string
        age: number
      }
      
      type ApiResponse<T> =
        | { success: true; data: T }
        | { success: false; message: string }
      
      function isString(value: unknown): value is string {
        return typeof value === 'string'
      }
      
      function isNumber(value: unknown): value is number {
        return typeof value === 'number'
      }
      
      function isObject(value: unknown): value is Record<string, unknown> {
        return typeof value === 'object' && value !== null
      }
      
      function isUser(value: unknown): value is User {
        return (
          isObject(value) &&
          'name' in value &&
          isString(value.name) &&
          'age' in value &&
          isNumber(value.age)
        )
      }
    
      function hasBooleanSuccess(value:unknown): value is Record<string,unknown> & {success: boolean} {
        return isObject(value) && "success" in value && typeof value.success === 'boolean'
      }
      function isApiResponseUser(value: unknown): value is ApiResponse<User> {
        // 不看笔记，自己重写
        if(!hasBooleanSuccess(value)) return false;
        if(value.success) {
            return "data" in value && isUser(value.data);
        } 
        return "message" in value && isString(value.message);
      }
}