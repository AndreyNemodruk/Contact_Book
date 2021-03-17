const{Schema, model, Types} = require('mongoose')
const User = require('./User')
const Group = require('./Group')

const schema = new Schema({
  name:{type: String, required: true},
  surName:{type: String, required: true},
  description:{type: String, required: false},
  phone:{type: String, required: true},
  email:{type: String, required: false},
  birthday:{type: Date, required: false},
  information:{type: String, required: false},
  instagram:{type: String, required: false},
  faceBook:{type: String, required: false},
  url:{type: String, required: false},
  category:[{type: Types.ObjectId, ref: 'Group'}],
  owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Contact', schema)