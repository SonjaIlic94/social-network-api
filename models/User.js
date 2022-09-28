const { Schema, model, Types } = require('mongoose');


const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'the email is invalid']
    },
    thoughts:
        [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought"
            }
        ]

    // Array of _id values referencing the Thought model
    ,
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
    // Array of _id values referencing the User model (self-reference)

}, {
    toJSON: {
        virtuals: true
    },
    id: false
}
);

UserSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model('User', UserSchema);
module.exports = User;