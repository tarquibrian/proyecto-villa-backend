/*
    Event Routes
    /api/events
*/
const { Router } = require("express");
const { check } = require("express-validator");

const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getUsers,
  eliminarUser
} = require("../controllers/users");

const router = Router();


router.get("/", getUsers);

router.delete("/:id", eliminarUser);

module.exports = router;
