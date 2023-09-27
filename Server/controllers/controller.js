const {Product , Category, Status } = require ("../models/index");


class Controller{
    static async createProduct ( req, res, next) {
        try {
            const {name_product , price , category_id } = req.body
            const product = await Product.create({
                name_product , price , category_id, status_id: 1 
            })
            res.Status(201).json(product)
        } catch (error) {
            next(error)
        }
    }

    static async readProduct ( req , res, next){
        try {
            const product = await Product.findAll({ 
                where:{ status_id: 1 },
                include : [Status,Category]
            })
            res.status(200).json(product)
        } catch (error) {
            next(error)
        }
    }

    static async updateProduct (req, res,next) {
        try {
            const { id } = req.params
            const {name_product , price , category_id} = req.body
            const findProduct = await Product.findByPk(id)
            if(!findProduct){
                throw { name : "ProductNotFound"}
            }
            const product = await Product.update({name_product , price , category_id},{
                where : { id },
                returning : true
            })
            res.status(201).json({
                message : `Successfully update the product with id ${id}`
            })
        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct (req, res, next){
        try {
            const { id } = req.params
            const findProduct = await Product.findByPk(id)
            if(!findProduct){
                throw { name: "ProductNotFound"}
            }
            const product = await Product.destroy({
                where : { id }
            })
            res.status(200).json({
                message: `Successfully delete product with id ${id}`
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller