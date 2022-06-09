const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");
const multer = require("multer");
const path = require("path");
const webpush = require("web-push");

const UsuarioModel = require("./models/Usuario");

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());
webpush.setVapidDetails(
  "mailto: `tarquibrian@gmail.com`",
  "BPbU7_Hb0ty5-1HqE2UYrqHrl1rDak6zvI1x_JqsqHUBv-rRpBvOQIZ52kPQu090IIfdRtQ--PLb-GP0fFRp9cI",
  "yQTkqyWbkImhthrM1OimulENCOqzxqTo_3N6tMInOzc"
);

// Directorio Público
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

// Lectura de imagenes
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/users", require("./routes/users"));
app.use("/api/sitios", require("./routes/sitios"));

app.use("/api/notification", require("./routes/pushNotification"));

app.get("api/usuarios", async (req, res) => {
  UsuarioModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.delete("/api/usuarios/:id", async (req, res) => {
  try {
    const post = await UsuarioModel.findById(req.params.id);

    await post.delete();
    res.status(200).json("Post has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
