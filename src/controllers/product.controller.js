import productValidator from '../validators/product.validator.js'
import productsValidator from '../validators/products.validator.js'

class ProductController {

    constructor(productModel, productView) {
        this.productModel = productModel;
        this.productView = productView;
      }

    async deleteProduct(req, res) {

        
        try {

            const { id } = req.params
            
            const product = await productValidator.deleteProduct(id)

            if (product){
                const products = await productsValidator.getAllProducts()
                res.render('index', 
                { title: 'Home',
                products,
                user: req.session.user})
            }
            } catch (error) {
            res.json(error)
        }
    }
}

export default new ProductController()