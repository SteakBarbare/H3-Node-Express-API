const express = require("express");
const router = express.Router();
const pokemon = require("../services/getAllShit.js");

router.get("/", async function (req, res, next) {
  try {
    res.json(await pokemon.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting Shit data`, err.message);
    next(err);
  }
});

module.exports = router;
