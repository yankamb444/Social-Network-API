const {
  Schema,
  model
} = require('mongoose');

// Schema to create a course model
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,

  },
  email: {
    type: String,
    default: true,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Your email is invail']
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'thoughtsModel'
  }],

  friends: [{
    type: Schema.Types.ObjectId,
    // Sets a default value of 12 weeks from now
    ref: 'userModel'
  }],

}, {
  toJSON: {
    virtuals: true,
  },
  id: false,
});

userSchema.virtual("friendCount").get(function(){
  return this.friends.length
})

const User = model('userModel', userSchema);

module.exports = User;