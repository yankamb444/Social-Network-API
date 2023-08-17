const {
    Schema,
    model
} = require('mongoose');
const reactionSchema = require('./reactionSchema')

const formatGetter = require('../utils/formatData.js')

// Schema to create a course model
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,

    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => formatGetter(date) 

    },
    username: {
        type: String,
        required: true,

    },

    reactions: [
        reactionSchema
    ],

}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false,
});

const Thoughts = model('thoughtsModel', thoughtSchema);

module.exports = Thoughts;