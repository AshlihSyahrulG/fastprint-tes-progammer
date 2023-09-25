'use strict';
const fs = require ("fs")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = JSON.parse(fs.readFileSync("./data.json", "utf-8"))
      // console.log(data);
      let array_category = []
      let array_insert = []
      data.forEach((el) => {
        if (!array_category.includes(el.kategori)){
            array_category.push(el.kategori)
            array_insert.push( {
              name_category: el.kategori,
              createdAt: el.createdAt = new Date(),
              updatedAt: el.updatedAt = new Date() 
            })}
      });
      
      // console.log(array_insert);
      return queryInterface.bulkInsert('Categories', array_insert)
  },

  async down (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Categories', null,{});
  }
};
