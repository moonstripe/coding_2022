const router = require('express').Router();
const exportRoutes = require('./exportRoutes')

const authMiddleware = require('./../../middlewares/authMiddleware')

router.use(authMiddleware)

router.use('/export', exportRoutes);

// Todo
// router.use(importRoutes);

module.exports = router;