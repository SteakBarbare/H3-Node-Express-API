const express = require("express");
const router = express.Router();
const shit = require("../services/getAllShit.js");

router.get("/", async function (req, res, next) {
  try {
    res.json(await shit.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting Shit data`, err.message);
    next(err);
  }
});

module.exports = router;
