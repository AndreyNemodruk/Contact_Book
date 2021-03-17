const {Router} = require('express')
const router = Router()
const auth = require('../midlware/auth.midlware')


router.get('/test',auth, async (req,res)=> {
    return res.status(200).json({
        message: 'Новый пользователь создан'
      })

    })

module.exports = router