const multer = require("multer");
const path = require("path");
const fs = require("fs");

const pastaUploads = path.join(__dirname, "..", "uploads");
fs.mkdirSync(pastaUploads, { recursive: true });

const EXTENSOES = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, pastaUploads),
  filename: (req, file, cb) => {
    // o nome é gerado pelo servidor, nunca o que veio do usuário
    cb(null, `user-${req.usuario.id}-${Date.now()}${EXTENSOES[file.mimetype]}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
  fileFilter: (req, file, cb) => {
    if (EXTENSOES[file.mimetype]) return cb(null, true);
    cb(new Error("TIPO_INVALIDO"));
  },
});

module.exports = { upload, pastaUploads };
