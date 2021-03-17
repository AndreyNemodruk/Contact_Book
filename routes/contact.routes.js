const { Router } = require("express");
const Contact = require("../models/Contact");
const { check, validationResult } = require("express-validator");
const router = Router();
const auth = require("../midlware/auth.midlware");
require("dotenv").config();
var mongoose = require("mongoose");

router.post(
  "/contact_create",
  auth,
  [
    check("phone", "Телефон указан некорректно").isMobilePhone("uk-UA"),
    check("email", "Почтовый ящик указан некорректно").isEmail(),
    check("birthday", "Дата указана некорректно").isDate({
      format: "DD/MM/YYYY",
    }),
    check("name", "Введите имя").isLength({ min: 2 }),
    check("surName", "Введите фамилию").isLength({ min: 2 }),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Данные введены некорректно",
        });
      }

      const {
        name,
        surName,
        description,
        phone,
        email,
        birthday,
        information,
        instagram,
        faceBook,
        group,
        url,
      } = req.body;
      const date = birthday.split("/").reverse().join("-");
      const user = await req.user.userId;
      const contact = new Contact({
        name,
        surName,
        description,
        phone,
        email,
        birthday: date,
        information,
        instagram,
        faceBook,
        url,
        group,
        owner: user,
      });
      await contact.save();
      const contacts = await Contact.aggregate([
        {
          $match: {
            owner: mongoose.Types.ObjectId(user),
          },
        },
        {
          $addFields: {
            dateString: {
              $dateToString: { format: "%d/%m/%Y", date: "$birthday" },
            },
          },
        },
      ]);

      if (contacts) {
        return res.status(201).json({ contacts });
      }
    } catch (e) {
      res.status(500).json({ message: "error, try again" });
    }
  }
);

router.put(
  "/edit_contact/:id",
  auth,
  [
    check("phone", "Телефон указан некорректно").isMobilePhone("uk-UA"),
    check("email", "Почтовый ящик указан некорректно").isEmail(),
    check("birthday", "Дата указана некорректно").isDate({
      format: "DD/MM/YYYY",
    }),
    check("name", "Введите имя").isLength({ min: 2 }),
    check("surName", "Введите фамилию").isLength({ min: 2 }),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Данные введены некорректно",
        });
      }
      const body = {
        ...req.body,
        birthday: req.body.birthday.split("/").reverse().join("-"),
        dateString: "",
      };
      await Contact.findByIdAndUpdate({ _id: req.params.id }, body);

      const contact = await Contact.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(req.params.id),
          },
        },
        {
          $addFields: {
            dateString: {
              $dateToString: { format: "%d/%m/%Y", date: "$birthday" },
            },
          },
        },
      ]);
      return res.status(201).json(contact[0]);
    } catch (e) {
      res.status(500).json({ message: "error, try again" });
    }
  }
);

router.get("/group_contacts/:id", auth, async (req, res) => {
  try {
    contacts = await Contact.aggregate([
      {
        $match: {
          category: mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $addFields: {
          dateString: {
            $dateToString: { format: "%d/%m/%Y", date: "$birthday" },
          },
        },
      },
    ]);
    return res.json({ contacts });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "error, try again!!!!!!!" });
  }
});

router.get("/all_contacts", auth, async (req, res) => {
  const userId = req.user.userId;
  try {
    const contacts = await Contact.aggregate([
      {
        $match: {
          owner: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $addFields: {
          dateString: {
            $dateToString: { format: "%d/%m/%Y", date: "$birthday" },
          },
        },
      },
    ]);
    return res.json({ contacts });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "error, try again!!!!!!!" });
  }
});

router.get("/all_contacts/birthday", auth, async (req, res) => {
  const userId = req.user.userId;
  const thisDay = new Date().getDate();
  const thisMonth = new Date().getMonth();
  const range = 60;
  const dateStart = new Date(1900, thisMonth, thisDay);
  const dateEnd = new Date(1900, thisMonth, `${+thisDay + range}`);
  const monthInRange = dateEnd.getMonth() + 1;

  try {
    const contacts = await Contact.aggregate([
      {
        $match: {
          owner: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $addFields: {
          year: {
            $year: "$birthday",
          },
          month: {
            $month: "$birthday",
          },
          day: {
            $dayOfMonth: "$birthday",
          },
          dateString: {
            $dateToString: { format: "%d/%m/%Y", date: "$birthday" },
          },
          sortDate: {
            $dateFromParts: {
              year: 1900,
              month: {
                $month: "$birthday",
              },
              day: {
                $dayOfMonth: "$birthday",
              },
            },
          },
        },
      },
      {
        $sort: {
          month: 1,
          day: 1,
        },
      },
      {
        $match: {
          $or: [
            {
              sortDate: {
                $gte: dateStart,
                $lt: dateEnd,
              },
            },
            {
              month: { $eq: monthInRange },
            },
          ],
        },
      },
      {
        $project: {
          day: 1,
          year: 1,
          month: 1,
          name: 1,
          surName: 1,
          birthday: 1,
          dateString: 1,
        },
      },
      {
        $limit: 4,
      },
    ]);
    return res.json({ contacts });
  } catch (e) {
    res.status(500).json({ message: "error, try again!!!!!!!" });
  }
});

router.delete("/del_conact/:_id", auth, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params._id);
    return res.json({ message: "contact delete" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "error, try again!!!!!!!" });
  }
});

module.exports = router;
