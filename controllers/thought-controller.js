const { Thought } = require('../models');
const { User } = require('../models');

module.exports = {
    // the functions will go in here as methods
    // get all Thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbThoughtData => {
                // If no thought is found, send 404
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thoughts found with this id!' });
                    return;
                } res.json(dbThoughtData);

            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // createThought
    createThought({ body }, res) {
        Thought.create(body)
            //update the users thought array to have this data pushed into it
            .then((dbThoughtData) => {
                return User.findOneAndUpdate(
                    { _id: body.id },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }
                )
            }).then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err));
    },
    // update Thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    // delete thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    //create a reaction
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId },
            { $push: { reactions: { body } } },
            { new: true })
            .then(console.log("i am running"))
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                console.log('err running');
                res.status(400).json(err)
            });
    },

    // remove a reaction
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionsId } } },
            { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    }
};
