const express = require("express");
const router = express.Router();
const pokemon = require("../services/getTypesInteractionById.js");

router.get("/:id", async function (req, res, next) {
  try {
    res.json(await pokemon.getMultiple(req.query.page, req.params.id));
  } catch (err) {
    console.error(`Error while getting Pokemon data`, err.message);
    next(err);
  }
});

module.exports = router;
