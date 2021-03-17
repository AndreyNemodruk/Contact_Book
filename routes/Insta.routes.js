const { Router } = require("express");
const router = Router();
const auth = require("../midlware/auth.midlware");

router.get("/get_inst/:userName", auth, async (req, res) => {
  try {
    await request(
      `https://www.instagram.com/${req.params.userName}/?__a=1`,
      async (err, response, body) => {
        if (err) return res.status(500).send({ message: err });
        const result = await JSON.parse(body).graphql.user
          .edge_owner_to_timeline_media;
        return res.status(200).json(result);
      }
    );
  } catch (e) {
    res.status(500).json({ message: "error, try again!!!!!!!" });
  }
});

module.exports = router;
