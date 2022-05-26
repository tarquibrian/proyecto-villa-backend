const router = require("express").Router();
const Sitio = require("../models/Sitio");

router.get("/", async (req, res) => {
  try {
    const sitio = await Sitio.find({});
    res.status(200).json(sitio);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  const newSitio = new Sitio(req.body);
  try {
    const savedSitio = await newSitio.save();
    res.status(200).json(savedSitio);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/contador", async (req, res) => {
  try {
    const sitioId = req.body.id;
    await Sitio.updateOne({ _id: sitioId }, { $inc: { counter: 1 } }),
      function (error, info) {
        if (error) {
          res.json({
            resultado: false,
            msg: "No se pudo modificar el contador",
            err,
          });
        } else {
          res.json({
            resultado: true,
            info: info,
          });
        }
      };
    res.status(200).json("Counter actualizado...");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const sitio = await Sitio.findById(req.params.id);
    await sitio.delete();
    res.status(200).json("El sitio fue eliminado...");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
