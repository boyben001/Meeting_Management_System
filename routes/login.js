let express = require('express');
let router = express.Router();

/* body-parser */
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({
    extended: false
});

/* MySQL */
let mysql = require('mysql');
let dbOption = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '0000',
    database: 'Meeting_System_SQL'
};

/* cookies */
let cookieParser = require('cookie-parser');
router.use(cookieParser('PurpleRed is awesome!!'));

router.get('/', (req, res) => {
    res.clearCookie('username');
    res.render('login');
});

router.post('/', urlencodedParser, (req, res) => {
    let accInput = req.body.account;
    let pwdInput = req.body.password;
    let dbConnection = mysql.createConnection(dbOption);

    let findAccQuery = 'SELECT * FROM 使用者 WHERE 帳號 = "' + accInput + '"' // 尋找資料庫是否有輸入者所輸入的帳號
    dbConnection.query(findAccQuery, (err, rows, fields) => {
        if (err) res.render('login', {
            errmsg: '發生錯誤，請稍後再試一次'
        });
        else if (rows.length == 0 || rows[0]['密碼'] != pwdInput) res.render('login', {
            errmsg: '帳號或密碼錯誤'
        });
        else {
            res.cookie('username', rows[0]['姓名'], {
                maxAge: 86400000,
                httpOnly: true
            });
            res.cookie('userID', rows[0]['使用者編號'], {
                maxAge: 86400000,
                httpOnly: true
            });
            res.redirect('/dashboard');
        }
    });
    dbConnection.end();
});

module.exports = router;
