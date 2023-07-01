const express = require("express"),
  path = require("path"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  pending_contract = require("./routes/PendingContract.js"),
  ongoing_contract = require("./routes/OngoingContract.js"),
  expired_contract = require("./routes/ExpiredContract.js"),
  pending_withdraw = require("./routes/PendingWithdraw.js"),
  finished_withdraw = require("./routes/FinishedWithdraw.js"),
  user = require("./routes/User.js"),
  app = express(),
  port = process.env.PORT || 5001,
  mongoose = require("mongoose");


require("dotenv").config({ path: ".env" });
// app.use('/', express.static(`${__dirname}/Client/build/`))
app.use("/fly15/", express.static(`${__dirname}/admin/build/`));
app.use("/fly15/*", express.static(`${__dirname}/admin/build/`));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
const server = require("http").Server(app);
app.use("/pending_contract", pending_contract);
app.use("/ongoing_contract", ongoing_contract);
app.use("/expired_contract", expired_contract);
app.use("/pending_withdraw", pending_withdraw);
app.use("/finished_withdraw", finished_withdraw);
app.use("/user", user);

  mongoose
    .connect("mongodb://127.0.0.1:27017/telebot", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("mongodb connected!"))
    .catch(() => console.log("cannot access mongodb!"));

  server.listen(port, () => console.log(`Server is running on Port ${port}`));

