const router = require('express').Router();
const { Blogpost, User } = require('../../models')

router.post('/', async (req, res) => {
    try {
        const blogpostData = await Blogpost.create({
            title: req.body.title,
            description: req.body.description,
            user_id: req.session.id,
        });
        res.render('dashboard', { loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get("/:id", async (req, res) => {
    try {
      const blogpostData = await Blogpost.findByPk(req.params.id, { include: [{ model: User, attributes: ["username"] }] });
      const blogpost = blogpostData.get({ plain: true });
      res.render("updateBlogpost", { blogpost, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
});

router.put("/:id", async (req, res) => {
    try {
      const blogpostData = await Blogpost.update(
        {
            title: req.body.title,
            description: req.body.description,
        },
        {
            where: { id: req.params.id },
        }
      );
      res.render("dashboard", { loggedIn: req.session.loggedIn });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const blogpostData = await Blogpost.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(blogpostData);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;