"use strict";

const bcrypt = require("bcrypt");
const { env } = require("../../config/env.ts");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash(env.ADMIN_PASSWORD, 10);

    await queryInterface.bulkInsert("users", [
      {
        first_name: "Admin",
        last_name: "User",
        phone: "555-5555",
        birth: new Date("1990-01-01"),
        email: env.ADMIN_EMAIL,
        password: hashedPassword,
        role: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", {
      email: "admin@email.com",
    });
  },
};
