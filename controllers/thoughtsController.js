const {
    Thoughts,
    User
} = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thoughts.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a thought
    async getSingleThought(req, res) {
        try {
            const thoughts = await Thoughts.findOne({
                    _id: req.params.thoughtsId
                })
                .select('-__v');



            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a thought
    async createThought(req, res) {
        try {
            const thought = await Thoughts.create(req.body);
            if (thought) {
                await User.findOneAndUpdate({
                    _id: req.body.userId
                }, {
                    $addToSet: {
                        thoughts: thought._id
                    }
                }, {
                    new: true
                })
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thoughts.findOneAndDelete({
                _id: req.params.thoughtsId
            });

            if (thought) {
                await User.findOneAndUpdate({
                    _id: req.body.userId
                }, {
                    $pull: {
                        thoughts: thought._id
                    }
                }, {
                    new: true
                })
            }

            res.json({
                message: 'Thought deleted!'
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Update a Thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({
                _id: req.params.thoughtId
            }, {
                $set: req.body
            }, {
                runValidators: true,
                new: true
            });

            if (!thought) {
                res.status(404).json({
                    message: 'No thought with this id!'
                });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createReaction(req, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate({
                _id: req.params.thoughtId
            }, {
                $addToSet: {
                    reactions: req.body
                }
            }, {
                runValidators: true,
                new: true
            });

            if (!thought) {
                res.status(404).json({
                    message: 'No friend found'
                });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },


    async deleteReaction(req, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate({
                _id: req.params.thoughtId
            }, {
                $pull: {
                    reactions: req.params.reactionId
                }
            }, {
                runValidators: true,
                new: true
            });

            if (!thought) {
                res.status(404).json({
                    message: 'No reaction with this id!'
                });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}