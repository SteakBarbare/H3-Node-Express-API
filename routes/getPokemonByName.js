const express = require("express");
const router = express.Router();
const pokemon = require("../services/getPokemonByName.js");

router.get("/:name", async function (req, res, next) {
  try {
    res.json(await pokemon.getMultiple(req.query.page, req.params.name));
  } catch (err) {
    console.error(`Error while getting Pokemon data`, err.message);
    next(err);
  }
});

module.exports = router;
