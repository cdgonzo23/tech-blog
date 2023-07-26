const router = require('express').Router();
const { Blogpost, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const dbBlogpostData = await Blogpost.findAll({
            attributes: ['title', 'author', 'createdOn', 'description']
        });
        const blogposts = dbBlogpostData.map((blogpost) => 
            blogpost.get({ plain: true})
        );
        res.render('homepage', {
            blogposts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;