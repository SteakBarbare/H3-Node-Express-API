const express = require("express");
const router = express.Router();
const frangipane = require("../services/frangipane.js");

router.get("/", async function (req, res, next) {
  try {
    res.json(await frangipane.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting my dear frangipane`, err.message);
    next(err);
  }
});

module.exports = router;
