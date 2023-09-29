const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://ashu:qnmbbeRAMcaPipaU@cluster0.mrkabfa.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(console.log("Connected to DB!!!!"))
  .catch((err) => {
    console.log(err);
  });
