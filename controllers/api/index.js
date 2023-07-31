const router = require('express').Router();

const userRoutes = require('./user-routes');
const dashboardRoutes = require('./dashboard-routes');
const postRoutes = require('./newPost-routes');

router.use('/users', userRoutes);
router.use('/userblogpost', dashboardRoutes);
router.use('/post', postRoutes);

module.exports = router;