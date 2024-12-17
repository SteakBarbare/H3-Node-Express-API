const express = require("express");
const router = express.Router();
const pokemon = require("../services/getPokemonByName.js");

router.get("/", async function (req, res, next) {
  try {
    console.log("Pute");

    res.json(await pokemon.getMultiple(req.query.page));
  } catch (err) {
    console.log("Bipute");
    console.error(`Error while getting Pokemon data`, err.message);
    next(err);
  }
});

module.exports = router;
