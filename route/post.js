const express = require("express");
const PostController = require("../controller/post");
const checkAuth = require("../middleware/check-out");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //cb = call back
    cb(null, "./images/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname); // nombre del archivo
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  try {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } catch {
    next();
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 200, // para setear un tamaño en pixeles y con un tamaño limitado de 200 mb
  },
  fileFilter: fileFilter, //hace referencia a la constante de arriba
});

router.get("/", checkAuth, PostController.get_all);
router.post(
  "/",
  checkAuth,
  upload.single("postImage"),
  PostController.create_post
);
router.get("/:uId", checkAuth, PostController.get_post);
router.delete("/:postId", checkAuth, PostController.delete_post);
router.patch("/:postId", checkAuth, PostController.update_post);

module.exports = router;
