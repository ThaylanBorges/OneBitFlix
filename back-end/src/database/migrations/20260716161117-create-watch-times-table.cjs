"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("watch_times", {
      user_id: {
        allowNull: false,
        primaryKey: true,
        references: { model: "users", key: "id" },
        type: DataTypes.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      episode_id: {
        allowNull: false,
        primaryKey: true,
        references: { model: "episodes", key: "id" },
        type: DataTypes.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      seconds: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("watch_times");
  },
};
