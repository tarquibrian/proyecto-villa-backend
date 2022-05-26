const fs = require("fs");
const vapid = require("./vapid.json");
const urlsafeBase64 = require("urlsafe-base64");
const webpush = require("web-push");
let suscripciones = require("./subs-db.json");
webpush.setVapidDetails(
  "mailto:tarquibrian@gmail.com",
  vapid.publicKey,
  vapid.privateKey
);

module.exports.getKey = () => {
  return urlsafeBase64.decode(vapid.publicKey);
};

module.exports.addSubcription = (susctiption) => {
  suscripciones.push(susctiption);
  fs.writeFileSync(`${__dirname}/subs-db.json`, JSON.stringify(suscripciones));
};

module.exports.sendPush = (post) => {
  const notificacionesEnviadas = [];
  suscripciones.forEach((suscripcion, i) => {
    const pushProm = webpush
      .sendNotification(suscripcion, JSON.stringify(post))
      .then(console.log("Notificacion enviada "))
      .catch((err) => {
        console.log("Notificación falló");

        if (err.statusCode === 410) {
          // GONE, ya no existe
          suscripciones[i].borrar = true;
        }
      });
    notificacionesEnviadas.push(pushProm);
  });
  Promise.all(notificacionesEnviadas).then(() => {
    suscripciones = suscripciones.filter((subs) => !subs.borrar);

    fs.writeFileSync(
      `${__dirname}/subs-db.json`,
      JSON.stringify(suscripciones)
    );
  });
};
