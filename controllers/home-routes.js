const router = require('express').Router();
const { Blogpost, Comments, User } = require('../models');

router.get('/', async (req, res) => {
    try {
       
        const dbBlogpostData = await Blogpost.findAll({
            include: [User]
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
});

// GET FOR EACH POST TO ADD COMMENT AND SEE DESCRIPTION
router.get("/blogpost/:id", async (req, res) => {
    try {
      const blogpostData = await Blogpost.findByPk(req.params.id, { include: [User] });
      const commentData = await Comments.findAll({ where: { id: req.params.id }, include: [User]});

      const blogpost = blogpostData.get({ plain: true});
      const comments = commentData.map((comment) => comment.get({ plain: true }));

      res.render("addComment", { 
        blogpost,
        comments,
        loggedIn: req.session.loggedIn,
    });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
});


router.get('/dashboard', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
      } else {
        try {
            const dbBlogpostData = await Blogpost.findAll({
                where: { user_id: req.session.user_id },
            })
            const blogposts = dbBlogpostData.map((blogpost) => 
            blogpost.get({ plain: true})
        );
        res.render('dashboard', {
            blogposts,
            loggedIn: req.session.loggedIn,
        });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
      }
});

// GET FOR USER POST TO EDIT OR DELETE
router.get("/dashboard/:id", async (req, res) => {
    try {
      const blogpostData = await Blogpost.findByPk(req.params.id, { include: [{ model: User, attributes: ["username"] }] });
      const blogpost = blogpostData.get({ plain: true });
      res.render("updateBlogpost", { blogpost, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    };
    res.render('login');
});

module.exports = router;