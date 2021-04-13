import Orders from "../entities/Orders"

export default class OrdersRepository {
  
  public static async createOrder(data: object) {
    return await Orders.create(data)
  }

  public static async updateOrder(data: object, orderId: number) {   
    return (await Orders.update(data, {
      where: {
        ord_id: orderId
      }
    }))
  }

  public static async getOrders() {   
    return await Orders.findAll({
      attributes: ['ord_id', 'ord_cl_id', 'ord_pdt_id', 'ord_quantity', 'ord_description', 'ord_status']
    })
  }

  public static async getOrder(orderId: number) {   
    return (await Orders.findOne({
      attributes: ['ord_id', 'ord_cl_id', 'ord_pdt_id', 'ord_quantity', 'ord_description', 'ord_status'],
      where: {
        ord_id: orderId
      }
    }))
  }

  public static async getClientsOrders(clientId: number) {   
    const response = (await Orders.findOne({
      attributes: ['ord_id'],
      where: {
        ord_cl_id: clientId
      }
    }) as Orders)

    return response
  }

  public static async deleteOrder(orderId: number) {   
    const response = (await Orders.findOne({
      where: {
        ord_id: orderId
      }
    }) as Orders)

    return response
  }
}