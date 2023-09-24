const error = async (error, req, res, next) => {
    console.error(error)
    if(error.name == 'SequelizeValidationError' || error.name == "SequelizeUniqueConstraintError"){
        const message = error.errors[0].message
        res.status(400).json({
            message
        })
    } else if (error.name === "ProductNotFound"){
        res.status(404).json({
            message : "Product Not Found"
        })
    }
     else {
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

module.exports = error