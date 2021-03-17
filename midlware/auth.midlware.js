const jwt = require('jsonwebtoken')
require("dotenv").config()

module.exports = (req, res, next) =>{
    if (req.method === 'OPTION'){
      return next()
    }
  try{
    const token = req.headers.authorization.split(' ')[1] //bearer TOKEN
    if(!token){
      return res.status(401).json({message: 'user not autorization'})
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  }catch(e){
    res.status(401).json({message: 'user not autorization'})
  }
}