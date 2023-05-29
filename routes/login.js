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

router.get('/', (req, res) => {
    let cookies = req.cookies;
    for (let prop in cookies)
        res.clearCookie(prop);
    res.render('login');
});

router.post('/', urlencodedParser, (req, res) => {
    let accInput = req.body.account;
    let pwdInput = req.body.password;
    let dbConnection = mysql.createConnection(dbOption);

    let findAccQuery = 'SELECT * FROM 使用者 WHERE 帳號 = "' + accInput + '"'; // 尋找資料庫是否有輸入者所輸入的帳號
    dbConnection.query(findAccQuery, (err, rows, fields) => {
        if (err) res.render('login', {         
            errmsg: '無法跟資料庫取得連線'
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
            res.cookie('userIdentity', rows[0]['身分'], {
                maxAge: 86400000,
                httpOnly: true
            });
            res.redirect('/dashboard');
        }

        dbConnection.end();
    });
});

module.exports = router;
