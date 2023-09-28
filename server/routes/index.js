var express = require("express");
var router = express.Router();
var UserModel = require("../models/UserModel");
/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("api called");
  res.render("index", { title: "Express" });
});

router.get("/checkUser", async (req, res, next) => {
  try {
    const { uid } = req.query;
    // console.log(uid);
    const user = await UserModel.findOne({ uid });
    // console.log(user);
    user
      ? res.send({ success: true, id: user._id })
      : res.send({ success: false });
  } catch (error) {
    console.log(error);
  }
});

router.post("/addUser", async (req, res, next) => {
  try {
    const { displayName, uid } = req.body;
    const user = await UserModel.create({ displayName, uid });
    await user.save();
    // console.log(user);
    res.status(200).send({ success: true, id: user._id });
  } catch (error) {
    console.log(error);
  }
});

router.put("/score", async (req, res, next) => {
  try {
    const { uid, scoreLocal } = req.body;
    // console.log(uid, scoreLocal);
    UserModel.findByIdAndUpdate(uid, { $inc: { score: scoreLocal } })
      .then(() => {
        return res.status(200).send({ success: true });
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/usersScore", async (req, res, next) => {
  try {
    const users = await UserModel.find();
    const scoreList = users.map((user) => ({
      displayName: user.displayName,
      score: user.score,
    }));
    res.send({ success: true, scoreList });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
