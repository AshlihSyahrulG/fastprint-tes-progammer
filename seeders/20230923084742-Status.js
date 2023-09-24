'use strict';
const fs = require ("fs")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = JSON.parse(fs.readFileSync("./data.json", "utf-8"))
      // console.log(data);
      let array_status = []
      let array_insert = []
      data.forEach((el) => {
        if (!array_status.includes(el.status)){
            array_status.push(el.status)
            array_insert.push( {
              name_status: el.status,
              createdAt: el.createdAt = new Date(),
              updatedAt: el.updatedAt = new Date() 
            })}
      });
      
      // console.log(array_insert);
      return queryInterface.bulkInsert('Statuses', array_insert)
  },

  async down (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Statuses', null,{});
  }
};
