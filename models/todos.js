/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "todos",
    {
      id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      descriptions: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      completeted: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
      },
      users: {
        type: DataTypes.STRING(50),
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      tableName: "todos",
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    }
  );
};
