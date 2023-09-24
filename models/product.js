'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: 'category_id'})
      Product.belongsTo(models.Status, {foreignKey: 'status_id'})
    }
  }
  Product.init({
    name_product: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty :{
          msg : "name is required"
        },
        notNull : {
          msg : "name is required"
        }
      }
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull : false,
      validate: {
        notEmpty : {
          msg : "price is required"
        },
        notNull : {
          msg : "price is required"
        },
      }
    },
    category_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};