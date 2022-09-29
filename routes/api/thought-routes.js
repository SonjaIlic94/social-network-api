const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/users
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router
    .route('/:id/reactions')
    .post(createReaction)

router
    .route('/:id/reactions/:reactionsid')
    .delete(removeReaction);

module.exports = router;