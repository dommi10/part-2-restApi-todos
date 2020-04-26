const models = require("../models");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");

function checkError(req) {
  let message = null;
  if (!req.body.username || !req.body.passwords)
    message = "completer tous les champs";
  else if (req.body.username === null || req.body.passwords === null)
    message = "completer tous les champs";
  else if (req.body.username.length < 4)
    message = "le nom d'utilisateur trop court";
  else if (req.body.passwords.length < 8)
    message = "le mot de passe est trop court";

  return message;
}

module.exports = {
  signup: async function (req, res) {
    try {
      if (checkError(req) != null)
        return res.status(400).json({ error: checkError(req), result: null });

      let item = {
        id: uuid.v1(),
        username: req.body.username,
        passwords: await bcrypt.hash(req.body.passwords, 12),
      };

      if (
        (await models.users.findOne({
          where: {
            username: item.username,
          },
        })) != null
      ) {
        return res.status(400).json({
          error: "le nom d'utilisateur choisi existe deja",
          result: null,
        });
      }

      item = await models.users.create(item);
      res.status(200).json({ error: null, result: item });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "une erreur se produite, veiller ressayer!",
        result: null,
      });
    }
  },
  login: async function (req, res) {
    try {
      if (checkError(req))
        return res.status(400).json({ error: checkError(req), result: null });

      let user = {
        username: req.body.username,
        passwords: req.body.passwords,
      };
      user = await models.users.findOne({ where: { username: user.username } });
      if (user) {
        if (await bcrypt.compare(req.body.passwords, user.passwords)) {
          res.status(200).json({ error: null, result: user });
        }
      }
      return res
        .status(400)
        .json({ error: "username or passwords incorrect", result: null });
    } catch (error) {
      res.status(400).json({
        error: "une erreur s'est produite, reessayer",
        result: null,
      });
    }
  },
};
