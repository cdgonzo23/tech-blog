const router = require('express').Router();
const { Blogpost, Comments } = require('../../models')

// add new blogpost route
router.post('/', async (req, res) => {
    try {
        const blogpostData = await Blogpost.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(blogpostData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

// add comment route
router.post('/:id', async (req, res) => {
    try {
        const newCommentData = await Comments.create(
            {
                description: req.body.description,
                blogpost_id: req.params.id,
                user_id: req.session.user_id,
            },
        );
        console.log('added comment');
        res.status(200).json(newCommentData);
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});



// update blogpost route
router.put("/:id", async (req, res) => {
    try {
      const blogpostData = await Blogpost.update(
        req.body,
        {
            where: { id: req.params.id },
        }
      );
      res.json(blogpostData)
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
});

// delete blogpost route
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