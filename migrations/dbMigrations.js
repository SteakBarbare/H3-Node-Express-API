const mysql = require("mysql");
const { dbConfig } = require("../config.json");

let con = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Successfully connected to the database");
  const sql = "INSERT INTO frangipane (amandes, quantity) VALUES ?";
  const values = [
    ["Plein", 200],
    ["Partout", 199],
    ["Nope", 20],
    ["Là", 2],
    ["Peut être", 666],
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Successfully inserted : " + result.affectedRows);
  });
});
