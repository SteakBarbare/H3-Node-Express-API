const express = require("express");
const router = express.Router();
const pokemon = require("../services/getAllTypes.js");

router.get("/", async function (req, res, next) {
  try {
    res.json(await pokemon.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting Pokemon data`, err.message);
    next(err);
  }
});

module.exports = router;
