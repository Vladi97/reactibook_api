const express = require("express");
const PostController = require("../controller/post");
const checkAuth = require('../middleware/check-out');

const router = express.Router();

router.get("/", checkAuth, PostController.get_all);
router.post("/", checkAuth, PostController.create_post);
router.get("/:postId", checkAuth, PostController.get_post);
router.delete("/:postId", checkAuth, PostController.delete_post);
router.patch("/:postId", checkAuth, PostController.update_post);

module.exports = router;