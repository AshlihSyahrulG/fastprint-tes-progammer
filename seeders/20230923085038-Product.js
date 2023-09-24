'use strict';
const fs = require("fs");
const { Category, Status } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
    
    let array_insert = await Promise.all(data.map(async (el) => {
      try {
        let category = await Category.findOne({ where: { name_category: el.kategori } });
        let status = await Status.findOne({ where: { name_status: el.status } });
        // console.log(category, "<><>");
        return {
          name_product: el.nama_produk,
          price: el.harga,
          category_id: category.id,
          status_id: status.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      } catch (error) {
        console.log(error);
      }
    }));

    // console.log(array_insert);

    return queryInterface.bulkInsert('Products', array_insert);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('NamaTabelProduk', null, {});
     */
  }
};