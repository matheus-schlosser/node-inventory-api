import {Request, Response} from 'express'
import {withMiddlewares} from "../../helper/withMiddlewares"
import ClientsRepository from "../../repositories/ClientsRepository"
import { CreateMessage } from '../../helper/CreateErrorMessage'
import { verifyAuthToken } from '../middlewares/VerifyAuthToken'
import { createClientValidator, editClientValidator } from '../validators/clientsValidator'
import OrdersRepository from '../../repositories/OrdersRepository'

export default class ClientsController {

    public static createClient = withMiddlewares(
        verifyAuthToken,
        createClientValidator,
        async (req: Request, res: Response) => {
            try {
                const data = req.body
                const checkExistingClient = await ClientsRepository.verifyExistingClient(data.cl_name)
                if (!checkExistingClient){
                    await ClientsRepository.createClient(data)
                    res.status(200).send({success: true, message: 'Client Created successfully'})
                }else{
                    CreateMessage.createValidationMessage(req, res, 400, "client", "The client already exists!", "The client has already been created")
                }
            }
            catch (err) {
                CreateMessage.createServerErrorMessage(req, res, err, "An error occurred while creating a client")
            }
        }
    )

    public static editClient = withMiddlewares(
        verifyAuthToken,
        editClientValidator,
        async (req: any, res: Response) => {
            try {
                const clientId = req.params.id
                const data = req.body

                const checkExistingClient = await ClientsRepository.verifyExistingClientById(clientId)
                if (!checkExistingClient){
                    return CreateMessage.createErrorMessage(req, res, 404, "Client not Found!")
                }

                await ClientsRepository.updateClient(data, clientId)     
                res.status(200).send({success: true, message: 'Client Updated Successfully'})
            }
            catch (err) {
                CreateMessage.createServerErrorMessage(req, res, err, "An error occurred while updating a client")
            }
        }
    )

    public static deleteClient = withMiddlewares(
        verifyAuthToken,
        async (req: any, res: Response) => {
            try {
                const clientId = req.params.id

                const checkExistingClient = await ClientsRepository.verifyExistingClientById(clientId)
                if (!checkExistingClient){
                    return CreateMessage.createErrorMessage(req, res, 404, "Client not Found!")
                }
                
                const checkExistingClientsOrders = await OrdersRepository.getClientsOrders(clientId)
                if (!checkExistingClientsOrders){
                    await ClientsRepository.deleteClient(clientId)     
                    res.status(200).send({success: true, message: 'Client Deleted Successfully'})
                }else{
                    CreateMessage.createValidationMessage(req, res, 400, "Category", "Cannot remove a client that contains related orders", "Cannot remove a client that contains related orders")
                }    
            }
            catch (err) {
                CreateMessage.createServerErrorMessage(req, res, err, "An error occurred while deleting a client")
            }
        }
    )

    public static getClients = withMiddlewares(
        verifyAuthToken,
        async (req: any, res: Response) => {
            const clients = await ClientsRepository.getClients()
            if (clients.length) {
                res.send(clients)
            }
            else {
                res.status(404).send({message: 'Clients not Found'})
            }
        }
    )

    public static getClient = withMiddlewares(
        verifyAuthToken,
        async (req: any, res: Response) => {
            const clientId = req.params.id
            const client = await ClientsRepository.getClient(clientId)
            if (client) {
                res.send(client)
            }
            else {
                CreateMessage.createErrorMessage(req, res, 404, "Client not found")
            }
        }
    )

}