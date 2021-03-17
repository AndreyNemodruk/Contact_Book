const { Router } = require("express");
const Group = require("../models/Group.js");
const Contact = require("../models/Contact.js");
const { check, validationResult } = require("express-validator");
const router = Router();
const auth = require("../midlware/auth.midlware");
//const shortId = require('shortid')
require("dotenv").config();

router.post(
  "/group_create",
  auth,
  [check("groupName", "Введите наименование группы").isLength({ min: 1 })],

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректно введено название группы",
        });
      }

      const { groupName } = req.body;
      const groups = await Group.find({ owner: req.user.userId });
      const groupsName = groups.map((item) => {
        return item.groupName;
      });
      if (groupsName.includes(groupName)) {
        return res.status(400).json({
          message: "Такая группа уже существует",
        });
      }

      const group = new Group({
        groupName,
        owner: req.user.userId,
      });
      await group.save();
      if (group) {
        return res.status(201).json(group);
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "error, try again" });
    }
  }
);

router.get("/get_groups", auth, async (req, res) => {
  try {
    const groups = await Group.find({ owner: req.user.userId });
    return res.json({ groups });
  } catch (e) {
    res.status(500).json({ message: "error, try again!!!!!!!" });
  }
});

router.put("/edit_group/:id", auth, async (req, res) => {
  try {
    const group = await Group.findById({ _id: req.params.id });
    if (group) {
      group.groupName = req.body.groupName;
      group.save();
      return res.status(201).json(group);
    }
    res.status(404).json({ message: "Group missing" });
  } catch (e) {
    res.status(500).json({ message: "error, try again" });
  }
});

router.delete("/delete_group/:id", auth, async (req, res) => {
  try {
    const delGroup = await Group.findByIdAndDelete(req.params.id);
    await Contact.updateMany(
      { category: req.params.id },
      { $pull: { category: req.params.id } },
      { multi: true }
    );
    return res.status(200).json(delGroup);
  } catch (e) {
    res.status(500).json({ message: "error, try again" });
  }
});

module.exports = router;
