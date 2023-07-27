const router = require('express').Router();
const { Blogpost, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const dbBlogpostData = await Blogpost.findAll();
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

router.get('/blogpost/:id', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
      try {
         const dbBlogpostData = await Blogpost.findByPk(req.params.id);
         const blogpost = dbBlogpostData.get({ plain: true });
         res.render('blogpost', { blogpost, loggedIn: req.session.loggedIn });
      } catch (err) {
          console.log(err);
          res.status(500).json(err);
      }
    }
})

// router.get('/dashboard', async (req, res) => {
//     if (!req.session.loggedIn) {
//         res.redirect('/login');
//       } else {
//         try {
           
//         } catch (err) {
//             console.log(err);
//             res.status(500).json(err);
//         }
//       }
// });

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    };
    res.render('login');
});

module.exports = router;