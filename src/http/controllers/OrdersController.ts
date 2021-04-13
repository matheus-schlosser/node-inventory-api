import {Request, Response} from 'express'
import { CreateMessage } from '../../helper/CreateErrorMessage'
import { createOrderValidator, editOrderValidator } from '../validators/ordersValidator'
import { verifyAuthToken } from '../middlewares/VerifyAuthToken'
import {withMiddlewares} from "../../helper/withMiddlewares"
import ClientsRepository from '../../repositories/ClientsRepository'
import ProductsRepository from '../../repositories/ProductsRepository'
import OrdersRepository from '../../repositories/OrdersRepository'

export default class OrdersController {

    public static createOrder = withMiddlewares(
        verifyAuthToken,
        createOrderValidator,
        async (req: Request, res: Response) => {
            try {
                const data = req.body
                const checkClient = await ClientsRepository.getClient(data.ord_cl_id)
                const checkProduct = await ProductsRepository.getProduct(data.ord_pdt_id)
                if(checkClient && checkProduct){
                    await OrdersRepository.createOrder(data)
                    res.status(200).send({success: true, message: 'Order Created Successfully'})
                }else{
                    CreateMessage.createErrorMessage(req, res, 404, "Please check the data before send.")
                }
            }catch (err) {
                CreateMessage.createServerErrorMessage(req, res, err, "An error occurred while creating order")
            }
        }
    )

    public static editOrder = withMiddlewares(
        verifyAuthToken,
        editOrderValidator,
        async (req: any, res: Response) => {
            try {
                const orderId = req.params.id
                const data = req.body
                await OrdersRepository.updateOrder(data, orderId)     
                res.status(200).send({success: true, message: 'Order Updated Successfully'})
            }
            catch (err) {
                CreateMessage.createServerErrorMessage(req, res, err, "An error occurred while updating order")
            }
        }
    )

    public static deleteOrder = withMiddlewares(
        verifyAuthToken,
        async (req: any, res: Response) => {
            try {
                const orderId = req.params.id
                const checkExistingOrder = await OrdersRepository.getOrder(orderId)
                if(checkExistingOrder) {
                    await OrdersRepository.deleteOrder(orderId)     
                    res.status(200).send({success: true, message: 'Order Deleted Successfully'})
                }
                else {
                    CreateMessage.createErrorMessage(req, res, 404, "Order not Found")
                }    
            }
            catch (err) {
                CreateMessage.createServerErrorMessage(req, res, err, "An error occurred while deleting order")
            }
        }
    )

    public static getOrders = withMiddlewares(
        verifyAuthToken,
        async (req: Request, res: Response) => {
            const orders = await OrdersRepository.getOrders()
            if(orders.length) {
                res.send(orders)
            }
            else {
                CreateMessage.createErrorMessage(req, res, 404, "Orders not found")
            }
        }
    )

    public static getOrder = withMiddlewares(
        verifyAuthToken,
        async (req: any, res: Response) => {
            const orderId = req.params.id
            const order = await OrdersRepository.getOrder(orderId)
            if(order) {
                res.send(order)
            }
            else {
                CreateMessage.createErrorMessage(req, res, 404, "Order not Found")
            }
        }
    )

}