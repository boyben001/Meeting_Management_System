let express = require('express');

let router = express.Router();

/* cookies */
let cookieParser = require('cookie-parser');
router.use(cookieParser('PurpleRed is awesome!!'));

router.get('/edit', (req, res) => {
    if (Object.keys(req.cookies).length != process.env.NUM_OF_COOKIES) {
        res.redirect('/login');
    } else {
        res.render('meeting/edit', {
            username: req.cookies.username
        });
    }
});

router.get('/overview', (req, res) => {
    if (Object.keys(req.cookies).length != process.env.NUM_OF_COOKIES) {
        res.redirect('/login');
    } else {
        res.render('meeting/overview', {
            username: req.cookies.username
        });
    }
});

module.exports = router;
