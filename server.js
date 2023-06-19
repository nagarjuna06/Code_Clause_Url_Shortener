require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const linkModel = require("./model/schema");
app.use(express.static(path.join(__dirname, "Frontend")));
app.use(express.json());
const connection = process.env.MONGO_DB_URI;
const port = process.env.PORT;

mongoose
  .connect(connection)
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log("Server started on port 3000");
});

//home page
app.get("/", (req, res) => {
  res.sendFile("Frontend/index.html", { root: __dirname });
});

//submit form
app.post("/shorten", async (req, res) => {
  try {
    const { alias, link } = req.body;
    const { origin } = req.headers;
    let code;
    let linkExist = false;
    const data = await linkModel.findOne({ link });
    if (data !== null) {
      linkExist = true;
    } else if (alias !== "") {
      code = alias;
    } else {
      let rString = (Math.random() + 1).toString(36).substring(7);
      req.body.alias = rString;
      code = rString;
    }

    if (alias === "" && linkExist) {
      code = data.alias;
    } else {
      const newData = new linkModel(req.body);
      await newData.save();
    }
    res.send({ success: true, shortLink: `${origin}/${code}` });
  } catch (err) {
    res.status(400);
    res.send({ success: false, msg: "This name is already Reserved!" });
  }
});

app.get("/update-url", (req, res) => {
  res.sendFile("Frontend/update.html", { root: __dirname });
});

app.post("/update", async (req, res) => {
  const { link, alias, pin } = req.body;
  const { origin } = req.headers;
  try {
    const data = await linkModel.findOne({ alias });
    if (data) {
      if (data.pin == pin) {
        await linkModel.updateOne({ alias }, { link, updatedAt: Date.now() });
        res.send({ success: true, shortLink: `${origin}/${alias}` });
      } else {
        res.send({ success: false, msg: "Invalid PIN" });
      }
    } else {
      res.send({ success: false, msg: "Invalid Alias" });
    }
  } catch (err) {
    res.status(500);
    res.send({ success: false, msg: err.message });
  }
});

// Redirect to alias
app.get("/:alias", async (req, res) => {
  const { alias } = req.params;
  try {
    const data = await linkModel.findOneAndUpdate(
      { alias },
      { updatedAt: Date.now() }
    );
    if (data !== null) {
      res.redirect(data.link);
    } else {
      res.sendFile("Frontend/invalid.html", { root: __dirname });
    }
  } catch (err) {
    res.status(500);
    res.send({ msg: err.message });
  }
});
