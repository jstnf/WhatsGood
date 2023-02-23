// Starter code: https://adamtheautomator.com/https-nodejs/

// Dependencies
const https = require("https");
const express = require("express");
const fs = require("fs");

// Routes
const loginRoute = require("./routes/login.route");

const app = express();
app.use(express.json());
const PORT = 4000;
https
  .createServer(
    {
      key: fs.readFileSync("ssl/key.pem"),
      cert: fs.readFileSync("ssl/cert.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  });

// Routes
app.use("/login", loginRoute);

app.get("/", (req, res)=>{
  console.log("GET /")
  res.send("API homepage of What's Good.")
})