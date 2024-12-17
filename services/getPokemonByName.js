const db = require("./db.js");
const helper = require("../helper.js");
const config = require("../config.json");

async function getMultiple(page = 1) {
  console.log("Tripute");
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(`SELECT * FROM pokemon`);
  console.log("Pentapute");
  const data = helper.emptyOrRows(rows);
  const meta = { page };
  console.log("Quadrapute");
  return {
    data,
    meta
  };
}

module.exports = {
  getMultiple
};
