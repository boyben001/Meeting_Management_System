let express = require('express');
let router = express.Router();

/* INFO: cookie-parser */
let cookieParser = require('cookie-parser');
router.use(cookieParser('PurpleRed is awesome!!'));

router.get('/', (req, res) => {
    if (Object.keys(req.cookies).length != process.env.NUM_OF_COOKIES) {
        res.redirect('/login');
    } else {
        res.render('dashboard', {
            username: req.cookies.username
        });
    }
});

module.exports = router;
