import { Request, Response } from 'express'
import { CreateMessage } from "../../helper/CreateErrorMessage"
import CategoriesRepository from "../../repositories/CategoriesRepository"
import ClientsRepository from "../../repositories/ClientsRepository"
import OrdersRepository from "../../repositories/OrdersRepository"

export default class StatsController{

    public static getStats = async (req: Request, res: Response) => {
        try{
            const clients = await ClientsRepository.getClients()
            const products = await CategoriesRepository.getCategories()
            const orders = await OrdersRepository.getOrders()
            
            res.send ({
                clients: clients.length,
                products: products.length,
                orders: orders.length
            })
        }catch{
            CreateMessage.createErrorMessage(req, res, 500, "Couldn't get data")
        }
    }
}