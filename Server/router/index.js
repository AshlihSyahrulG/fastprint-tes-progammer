const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')


router.post('/product',Controller.createProduct)
router.get('/product',Controller.readProduct)
router.delete('/product/:id',Controller.deleteProduct)
router.patch('/product/:id',Controller.updateProduct)


module.exports = router 