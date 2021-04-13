import {Request, Response} from 'express'
import {withMiddlewares} from "../../helper/withMiddlewares"
import ProductsRepository from "../../repositories/ProductsRepository"
import { CreateMessage } from '../../helper/CreateErrorMessage'
import { verifyAuthToken } from '../middlewares/VerifyAuthToken'
import CategoriesRepository from '../../repositories/CategoriesRepository'
import { createProductValidator, editProductValidator } from '../validators/productsValidator'

export default class ProductsController {

    public static createProduct = withMiddlewares(
        verifyAuthToken,
        createProductValidator,
        async (req: Request, res: Response) => {
            try {
                const data = req.body
                const checkExistingCategory = await CategoriesRepository.verifyExistingCategoryById(data.pdt_cat_id)
                if (checkExistingCategory){
                    await ProductsRepository.createProduct(data)
                    res.status(200).send({success: true, message: 'Product Created Successfully'})
                }else{
                    CreateMessage.createErrorMessage(req, res, 400, "Please check the data before send!")
                }
            }catch (err) {
                CreateMessage.createServerErrorMessage(req, res, err, "An error occurred while creating a product")
            }
        }
    )

    public static editProduct = withMiddlewares(
        verifyAuthToken,
        editProductValidator,
        async (req: any, res: Response) => {
            try {
                const productId = req.params.id
                const data = req.body
                await ProductsRepository.updateProduct(data, productId)     
                res.status(200).send({success: true, message: 'Product Updated Successfully'})
            }
            catch (err) {
                CreateMessage.createServerErrorMessage(req, res, err, "An error occurred while updating a product")
            }
        }
    )

    public static deleteProduct = withMiddlewares(
        verifyAuthToken,
        async (req: any, res: Response) => {
            try {
                const productId = req.params.id
                
                const checkExistingProduct = await ProductsRepository.getProduct(productId)
                if (checkExistingProduct){
                    await ProductsRepository.deleteProduct(productId)     
                    res.status(200).send({success: true, message: 'Product Deleted Successfully'})
                }else{
                    CreateMessage.createErrorMessage(req, res, 404, "Product not Found")
                }    
            }
            catch (err) {
                CreateMessage.createServerErrorMessage(req, res, err, "An error occurred while deleting a product")
            }
        }
    )

    public static getProducts = withMiddlewares(
        verifyAuthToken,
        async (req: any, res: Response) => {
            const products = await ProductsRepository.getProducts()
            if (products.length) {
                res.send(products)
            }
            else {
                CreateMessage.createErrorMessage(req, res, 404, "Products not Found")
            }
        }
    )

    public static getProduct = withMiddlewares(
        verifyAuthToken,
        async (req: any, res: Response) => {
            const productId = req.params.id
            const product = await ProductsRepository.getProduct(productId)
            if (product) {
                res.send(product)
            }
            else {
                CreateMessage.createErrorMessage(req, res, 404, "Product not Found")
            }
        }
    )

}