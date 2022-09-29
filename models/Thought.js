const { Schema, model, Types } = require('mongoose');



const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 208,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [{
        type: Schema.Types.ObjectId,
        ref: "reactionSchema"
    }]
}, {
    toJSON: {
        virtuals: true
    },
    id: false
}
);

UserSchema.virtual("reactionCount").get(function () {
    return this.friends.length;
});

const User = model('User', UserSchema);
module.exports = User;