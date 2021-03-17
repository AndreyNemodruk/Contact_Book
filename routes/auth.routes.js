const { Router } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const router = Router();
const jwt = require("jsonwebtoken");
require("dotenv").config;
const auth = require("../midlware/auth.midlware");

// api/auth/login

router.post(
  "/login",
  [
    check("email", "Почтовый ящик указан некорректно").isEmail(),
    check("password", "Минимальная длина пароля 6 символов").isLength({
      min: 6,
    }),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректно введены данные",
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "Такой пользователь не зарегистрирован",
        });
      }
      const isMatchPass = await bcrypt.compare(password, user.password);
      if (!isMatchPass) {
        return res.status(500).json({
          message: "Неверно введены логин или пароль пользователя",
        });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.status(200).json({
        userId: user.id,
        email,
        token,
        firstName: user.firstName,
        secondName: user.secondName,
        phone: user.phone,
        file: user.file,
      });
    } catch (e) {
      return res.status(500).json({ message: "Ошибка, севера" });
    }
  }
);

//api/auth/register
router.post(
  "/register",
  [
    check("email", "Почтовый ящик указан некорректно").isEmail(),
    check("password", "Минимальная длина пароля 6 символов").isLength({
      min: 6,
    }),
    check("phone", "Телефон указан некорректно").isMobilePhone("uk-UA"),
    check("firstName", "Введите имя").isLength({ min: 2 }),
    check("secondName", "Введите фамилию").isLength({ min: 2 }),
    check("file", "Допустимый размер фалйа 4 Мб").isLength({ min: 2 }),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректно введены данные при регистрации",
        });
      }
      const { email, password, phone, firstName, secondName, file } = req.body;
      const newUser = await User.findOne({ email });
      if (newUser) {
        return res.status(400).json({
          message: "Такой пользователь уже зарегистрирован",
        });
      }

      const hashedPass = await bcrypt.hash(password, 12);
      const user = new User({
        email,
        password: hashedPass,
        phone,
        firstName,
        secondName,
        file,
      });

      await user.save();

      return res.status(201).json({
        message: "Новый пользователь создан",
      });
    } catch (e) {
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }
);

router.post(
  "/edit_user",
  auth,
  [
    check("email", "Почтовый ящик указан некорректно").isEmail(),
    check("phone", "Телефон указан некорректно").isMobilePhone("uk-UA"),
    check("firstName", "Введите имя").isLength({ min: 2 }),
    check("secondName", "Введите фамилию").isLength({ min: 2 }),
    check("file", "Допустимый размер фалйа 4 Мб").isLength({ min: 2 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректно введены данные при регистрации",
        });
      }
      const { phone, firstName, secondName, file, userId, email } = req.body;
      //const updatableUser = await User.findById(userId);
      //const data = { ...updatableUser, phone, firstName, secondName, file };
      const updatedUser = await User.findByIdAndUpdate(
        { _id: userId },
        { phone, firstName, secondName, file, email }
      );
      return res.status(201).json({
        message: "Данные обновлены",
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }
);

module.exports = router;
