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


// 获取订单列表
export function getOrderList(data) {
    return request({
      url: '/order/list',
      method: 'post',
      data,
    })
  }
  
  // 获取订单详情
  export function getOrderDetail(data) {
    return request({
      url: '/order/detail',
      method: 'post',
      data,
    })
  }
  
  // 创建订单
  export function createOrder(data) {
    return request({
      url: '/order/create',
      method: 'post',
      data,
    })
  }
  
  // 更新订单状态
  export function updateOrderStatus(data) {
    return request({
      url: '/order/update_status',
      method: 'post',
      data,
    })
  }
  
  // 取消订单
  export function cancelOrder(data) {
    return request({
      url: '/order/cancel',
      method: 'post',
      data,
    })
  }