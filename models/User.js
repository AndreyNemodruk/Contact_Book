const{Schema, model, Types} = require('mongoose')
const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  phone: {type: String, required: false, unique: false},
  firstName: {type: String, required: true, unique: false},
  secondName: {type: String, required: true, unique: false},
  file: {type: Object, required: true, unique: false},
})

module.exports = model('User', schema)