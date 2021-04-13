import express, {Request, Response, NextFunction} from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { apiDocumentation } from '../documentation/api_documentation'
import AuthUserController from '../http/controllers/AuthController'
import CategoriesController from '../http/controllers/CategoriesController'
import ClientsController from '../http/controllers/ClientsController'
import OrdersController from '../http/controllers/OrdersController'
import ProductsController from '../http/controllers/ProductsController'
import StatsController from '../http/controllers/StatsController'

const routes = express.Router()

routes.use(cors({
    origin: true,
    credentials: true
}))

routes.use(express.json())
routes.use(express.urlencoded({ extended: true }))
routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation))

routes.get('/', (req: express.Request, res: express.Response) => res.send('API 1.0.0'))

routes.post('/v1/users/register', AuthUserController.register)
routes.post('/v1/users/login', AuthUserController.login)

routes.get('/v1/stats', StatsController.getStats)

routes.get('/v1/clients', ClientsController.getClients)
routes.get('/v1/clients/:id', ClientsController.getClient)
routes.post('/v1/clients/create-client', ClientsController.createClient)
routes.put('/v1/clients/edit-client/:id', ClientsController.editClient)
routes.delete('/v1/clients/delete-client/:id', ClientsController.deleteClient)

routes.get('/v1/categories/products', ProductsController.getProducts)
routes.get('/v1/categories/products/:id', ProductsController.getProduct)
routes.post('/v1/categories/products/create-product', ProductsController.createProduct)
routes.put('/v1/categories/products/edit-product/:id', ProductsController.editProduct)
routes.delete('/v1/categories/products/delete-product/:id', ProductsController.deleteProduct)

routes.get('/v1/categories', CategoriesController.getCategories)
routes.get('/v1/categories/:id', CategoriesController.getCategory)
routes.post('/v1/categories/create-category', CategoriesController.createCategory)
routes.put('/v1/categories/edit-category/:id', CategoriesController.editCategory)
routes.delete('/v1/categories/delete-category/:id', CategoriesController.deleteCategory)

routes.get('/v1/orders', OrdersController.getOrders)
routes.get('/v1/orders/:id', OrdersController.getOrder)
routes.post('/v1/orders/create-order', OrdersController.createOrder)
routes.put('/v1/orders/edit-order/:id', OrdersController.editOrder)
routes.delete('/v1/orders/delete-order/:id', OrdersController.deleteOrder)

export {
    routes
}
