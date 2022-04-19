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

router.delete("/:id", async (req, res) => {
  try {
    const sitio = await Sitio.findById(req.params.id);
    await sitio.delete();
    res.status(200).json("Post has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
