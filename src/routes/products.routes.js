import { Router } from "express"

import productController from '../controllers/product.controller.js'

import productsDao from "../daos/dbManager/products.dao.js"

const router = Router()

router.get("/", async (req, res) => {
    try {
        const products = await productsDao.getAll()
        res.json(products)
    } catch (error) {
        res.status(500).json( {error: error.message} )
    }
})

router.get("/:id", async (req, res) => {
    try {
        const product = await productsDao.getById(req.params.id)
        res.json(product)
    } catch (error) {
        res.status(500).json( {error: error.message} )
    }
})

router.post("/", async (req, res) => {
    try {
        //Agregar Validación de Campos
        const product = await productsDao.create(req.body)
        //res.json(product)
        res.redirect('/?message=product created successfully')
    } catch (error) {
        res.status(500).json( {error: error.message} )
    }
})

router.put("/:id", async (req, res) => {
    try {
        //Agregar Validación de Campos
        const product = await productsDao.update(req.params.id, req.body)
        res.json(product)
    } catch (error) {
        res.status(500).json( {error: error.message} )
    }
})

//Delete
// router.delete("/:id", async (req, res) => {
//     try {
//         const product = await productsDao.delete(req.params.id)
//         res.redirect('/?message=product deleted successfully')
//         res.json(products)
//     } catch (error) {
//         res.status(500).json( {error: error.message} )
//     }
// })

router.get('/delete/:id', productController.deleteProduct)

export default router