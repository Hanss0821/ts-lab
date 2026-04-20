import request from './request';
interface Order {
    id: number
    orderNo: string        // 订单号
    userId: number
    status: 0 | 1 | 2 | 3 // 0待支付 1已支付 2已发货 3已完成
    totalAmount: number
    items: OrderItem[]
    createdAt: string
    updatedAt: string
}

interface OrderItem {
    productId: number
    productName: string
    quantity: number
    price: number
}

interface OrderListReq {
    page:number;
    pageSize: number;
    // status: number;
    status?:Order['status']
}

interface OrderListData {
    total:number;
    list: Order[]
}

// 获取订单列表
export function getOrderList(data:OrderListReq) {
    return request<OrderListData>({
      url: '/order/list',
      method: 'post',
      data,
    })
}
  
  // 获取订单详情
  export function getOrderDetail(data:Pick<Order,'id'>) {
    return request<Order>({
      url: '/order/detail',
      method: 'post',
      data,
    })
  }
  
  // 创建订单
  export function createOrder(data:Omit<Order,'id' | 'orderNo' | 'createdAt' | 'updatedAt'>) {
    return request<Order>({
      url: '/order/create',
      method: 'post',
      data,
    })
  }
  
  // 更新订单状态
  export function updateOrderStatus(data:Pick<Order,'id' | 'status'>) {
    return request<null>({
      url: '/order/update_status',
      method: 'post',
      data,
    })
  }
  
  // 取消订单
  export function cancelOrder(data:Pick<Order,'id'>) {
    return request<null>({
      url: '/order/cancel',
      method: 'post',
      data,
    })
  }

  type ApiResult<T> =
  | { code: 200; data: T }
  | { code: 500; msg: string }

  function isSuccess<T>(result: ApiResult<T>):result is  { code: 200; data: T } {
    return result.code === 200
  }


  function handleOrderResult(result:ApiResult<Order>) {
    if(isSuccess(result)){
      console.log(result.data.orderNo);
    }else {
      console.error(result.msg)
    }
  }


  interface Admin  { role: 'admin';  permissions: string[]; department: string }
  interface Editor { role: 'editor'; permissions: string[]; assignedTo: string  }
  interface Viewer { role: 'viewer'; readOnly: true }

  type User = Admin | Editor | Viewer

  function isAdmin(user:User):user is Admin {
    return user.role === 'admin';
  }

  function getPermissions(user: User): string[] {
    if (isAdmin(user) || user.role === 'editor') {
      return user.permissions  // 不需要再加 'in' 守卫
    }
    return []
  }

  type Nullable<T> ={
    [P in keyof T]: T[P] | null
  }
  
  type NullableOrder = Nullable<Order>

  // 期望效果：
type A = UnpackArray<Order[]>   // Order
type B = UnpackArray<string[]>  // string
type C = UnpackArray<number>    // number（不是数组，原样返回）

type UnpackArray<T> = T extends (infer U)[] ? U : T 