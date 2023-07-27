// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
  const allowedOrigins = ["http://localhost:3000"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.enable("trust proxy");

app.post("/api/fetchStockData", async (req, res) => {
  // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION
  const { symbol, dateFrom, dateTo } = req.body;
  try {
    // Assuming you have obtained the API key from Polygon
    const apiKey = "2hVxRONFz9ULcnJ9DxJhUjWjkfkwdKEt";
    const response = await axios.get(
      `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${dateFrom}/${dateTo}?adjusted=true&sort=asc&limit=120&apiKey=${apiKey}`
    );
    const stockData = response.data.results;
    // console.log(stockData);

    if (!stockData) {
      return res
        .status(404)
        .json({ error: "Data not found for the specified date and symbol." });
    }

    return res.json(stockData);
  } catch (error) {
    console.error("Error fetching stock data:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
