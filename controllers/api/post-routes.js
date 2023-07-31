const router = require('express').Router();
const { Blogpost, User } = require('../../models')

router.post('/', async (req, res) => {
    try {
        console.log('SESION ID',req.session.id);
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

// add comment (post which is connected to the blogpost)


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