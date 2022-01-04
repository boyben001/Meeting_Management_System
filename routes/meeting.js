let express = require('express');
let router = express.Router();

/* INFO: body-parser */
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({
    extended: false
});

/* INFO: cookie-parser */
let cookieParser = require('cookie-parser');
router.use(cookieParser('PurpleRed is awesome!!'));

/* INFO: MySQL */
let mysql = require('mysql');
dbOption = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
};

router.get('/edit', (req, res) => {
    let dbConnection = mysql.createConnection(dbOption);
    let findUserDataQuery = `SELECT * FROM 使用者 WHERE 使用者編號 = "${req.cookies.userID}";`; // 透過編號搜尋使用者資料
    dbConnection.query(findUserDataQuery, (err, rows, fields) => {
        if (err) sqlError(res, err);
        else if (rows[0]['管理者']) {
            res.render('./meeting/edit', {
                username: req.cookies.username
            });
        } else {
            res.redirect('/dashboard?errcode=1'); // error code 1: 存取被拒
        }
    })
});

module.exports = router;
