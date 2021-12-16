let express = require('express');

let router = express.Router();

/* cookies */
let cookieParser = require('cookie-parser');
router.use(cookieParser('PurpleRed is awesome!!'));

router.get('/', (req, res) => {
    if (req.cookies.username == null) {
        res.redirect('/login');
    } else {
        res.render('dashboard', {
            username: req.cookies.username
        });
    }
});

module.exports = router;
