const{Schema, model, Types} = require('mongoose')
const User = require('./User')
const schema = new Schema({
  groupName:{type: String, required: true},
  owner: {type: Types.ObjectId, ref: 'User'},
})

module.exports = model('Group', schema)