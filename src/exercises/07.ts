{
    type A = {
        email?:string
    }

    type B = {
        email: string | undefined
    }

    const a:A = {};
    const b:B ={};

    interface User {
        readonly id: number
        name: string
      }
    const user:User = {
        id: 1,
        name: 'hans'
    }
    
    // readonly 在类型层禁止你修改这个字段
    user.id = 2;

    interface FormValues {
        [key:string]: string | number | boolean | undefined
    }
}

{
    interface Product {
        readonly id: number;
        title: string;
        price: number;
        description?: string;
    }

    interface StatusMap {
        [key:string]: "pending" | "done"
    }

    // & 不是合并对象数据，而是叠加对象约束。
}

{
    type BaseEntity = {
        id: number
      }
      
      type Timestamp = {
        createdAt: string
      }
      
      type User = BaseEntity&Timestamp // 让 User 同时拥有 id 和 createdAt

      type A = {
        status: string
      }
      
      type B = {
        status: number
      }
      
      type C = A & B

      type a = number
      type b = string
      type c = a&b

}