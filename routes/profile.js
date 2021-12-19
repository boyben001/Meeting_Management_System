let express = require('express');

let router = express.Router();

/* cookies */
let cookieParser = require('cookie-parser');
router.use(cookieParser('PurpleRed is awesome!!'));

router.get('/', (req, res) => {
    res.render('profile', {
        username: req.cookies.username
    });
});

module.exports = router;
