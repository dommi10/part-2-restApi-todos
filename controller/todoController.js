const models = require("../models");
const uuid = require("uuid");

module.exports = {
  todos: async function (req, res) {
    try {
      let items = await models.todos.findAll();

      res.status(200).json({
        error: null,
        result: items,
      });
    } catch (error) {
      res.status(400).json({
        error: error,
        result: null,
      });
    }
  },
};
