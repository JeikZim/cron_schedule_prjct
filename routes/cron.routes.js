const { Router } = require("express");
const cronLineValidation = require("../middlewares/cronLineValidation.middleware");

const router = Router();

router.post("/create", cronLineValidation, (req, res) => {
    let cronLines = req.body.cronLines;

    // ...Implementation of saving CRON rows to the database for further use

    console.log(cronLines);

    return res.status(200).json({ message: "Lines was created" });
});

module.exports = router;
