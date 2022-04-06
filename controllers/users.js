const { response } = require("express");
const Users = require("../models/Usuario");

const getUsers = async (req, res) => {
  usuarios = await Users.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
};

const eliminarUser = async (req, res) => {
  const id = req.params._id;
  await Users.findByIdAndDelete(id);
  res.send("delete");
};

module.exports = {
  getUsers,
  eliminarUser,
};