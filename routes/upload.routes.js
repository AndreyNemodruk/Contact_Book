const Image = require("../models/Image");
const express = require("express");
const shortId = require("shortid");
require("dotenv").config();
const url = require("url");
const multer = require("multer");
const { log } = require("console");
const router = express.Router();

const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

const LIMIT_FILE_TYPES = "LIMIT_FILE_TYPES";
const LIMIT_FILE_SIZE = "LIMIT_FILE_SIZE";
const MAX_SIZE = 3000000;

const code = shortId.generate();

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, code + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (!allowedTypes.includes(file.mimetype)) {
    const error = Error(`Type ${file.mimetype} not allowed`);
    error.code = LIMIT_FILE_TYPES;
    return cb(error, false);
  }

  return cb(null, true);
};

const upload = multer({
  storage: storageConfig,
  fileFilter: fileFilter,
  limits: {
    fileSize: MAX_SIZE,
  },
}).single("file");

function errorMiddleware(error, req, res, next) {
  if (error.code === LIMIT_FILE_TYPES) {
    res.status(422).json({ error: "только image/jpeg, image/png, image/gif" });
    return;
  }
  if (error.code === LIMIT_FILE_SIZE) {
    res.status(422).json({
      error: `Размер файла не должен превышать ${MAX_SIZE / 1000000} Mb`,
    });
    return;
  }
}

function fullUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get("host"),
  });
}

router.post("/", upload, errorMiddleware, async (req, res) => {
  try {
    if (req.file && req.file.filename) {
      const file = fullUrl(req) + "/api/img/" + req.file.filename;
      const image = new Image({
        url: file,
      });

      await image
        .save()
        .then((r) => res.status(200).json({ id: r._id, url: r.url }));
    } else {
      return res.status(422).json({ error: "invalid" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "some error occured" });
  }
});
module.exports = router;
