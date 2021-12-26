let express = require('express');

let router = express.Router();

/* cookies */
let cookieParser = require('cookie-parser');
router.use(cookieParser('PurpleRed is awesome!!'));

router.get('/edit', (req, res) => {
    res.render('./meeting/edit', {
        username: req.cookies.username
    });
});

module.exports = router;
