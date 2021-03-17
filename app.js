const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
request = require("request");
const path = require("path");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json({ extended: true }));
app.use("/api/img", express.static("images"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/upload", require("./routes/upload.routes"));
app.use("/api/", require("./routes/group.routes"));
app.use("/api", require("./routes/contact.routes"));
app.use("/api", require("./routes/Insta.routes"));
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(__dirname + "/client/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}
async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    app.listen(PORT, () =>
      console.log(`app has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log("Server error", e.message);
    process.exit(1);
  }
}

start();
