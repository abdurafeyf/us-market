const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
const sunburstDataRoute = require("./routes/sunburstData");

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "*"
})); // Enable CORS for all routes

app.get("/", (req, res) => {
  res.json({ message: "ok" }); // Send a JSON response instead of HTML
});

app.use("/sunburst-data", sunburstDataRoute);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode)
    .json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
