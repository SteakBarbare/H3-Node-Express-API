const express = require("express");
const router = express.Router();
const shit = require("../services/getShitById.js");

router.get("/:id", async function (req, res, next) {
  try {
    res.json(await shit.getMultiple(req.query.page, req.params.id));
  } catch (err) {
    console.error(`Error while getting Shit data`, err.message);
    next(err);
  }
});

module.exports = router;
