const db = require("./db.js");
const helper = require("../helper.js");
const config = require("../config.json");

async function getMultiple(page = 1, name) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(`SELECT * FROM shit WHERE id="` + id + `"`);
  const data = helper.emptyOrRows(rows);
  const meta = { page };
  return {
    data,
    meta
  };
}

module.exports = {
  getMultiple
};
