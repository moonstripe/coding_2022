const router = require('express').Router();

const authMiddleware = require('./../../middlewares/authMiddleware')

router.use(authMiddleware)

router.get('/', async (req, res) => {
    res.send('made it!')
});

// Todo
// router.use(importRoutes);

module.exports = router;