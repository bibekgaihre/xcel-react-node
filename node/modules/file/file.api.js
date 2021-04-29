const router = require("express").Router();
// const { processData } = require("./file.controller");
const Controller = require("./file.controller");

router.get("/", Controller.onTestApi);

router.post("/uploadfile1", Controller.onSaveData1);
router.post("/uploadfile2", Controller.onSaveData2);
router.get("/processdata", Controller.processData);
router.get("/getusers", Controller.getUsers);
// router.get("/UpdateData", Controller.updateData);

module.exports = router;
