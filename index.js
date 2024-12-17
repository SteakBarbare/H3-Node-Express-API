const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const pokemonByNameRouter = require("./routes/getPokemonByName.js");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.get("/", function (req, res) {
  res.send("Tempête de feur");
});

app.get("/unsouslien/", function (req, res) {
  res.send("Tornade de feur");
});

app.use("/getPokemonByName", pokemonByNameRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Application launched on port ${port}`);
});

let server = app.listen(8081, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log(`Server running at http://${host}${port}`);
});

app.use(express.static("public"));
