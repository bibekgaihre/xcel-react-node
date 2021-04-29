const router = require("express").Router();

const FileRouter = require("../modules/file/file.api");

router.use("/api/file", FileRouter);

module.exports = router;
