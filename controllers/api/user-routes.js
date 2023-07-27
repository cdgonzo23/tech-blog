const router = require('express').Router();
const { User } = require('../../models');

// sign in
router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(dbUserData);
        })
    } catch (err) {
        console.log(err);
        res.status.json(err);
    }
});

// Log In
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!dbUserData) {
            res.status(400).json({ message: 'Incorrect username or password' })
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password' })
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json({ user: dbUserData, message: 'Logged in successfully!' });
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;
