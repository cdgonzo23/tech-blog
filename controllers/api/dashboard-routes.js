const router = require('express').Router();
const { Blogpost } = require('../../models')

router.get("/", (req, res) => {
    res.render("newBlogpost", { loggedIn: req.session.loggedIn });
});

router.get("/:id", (req, res) => {
    res.render("updateBlogpost", { loggedIn: req.session.loggedIn });
});


module.exports = router;
