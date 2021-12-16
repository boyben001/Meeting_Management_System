let express = require('express');

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

let router = express.Router();

router.get('/', (req, res) => {
    res.render('login', {
        errmsg: ''
    });
});

router.post('/', urlencodedParser, (req, res) => {
    let accInput = req.body.account;
    let pwdInput = req.body.password;
    let dbConnection = mysql.createConnection(dbOption);

    let errString = ['發生錯誤，請稍後再試一次', '帳號或密碼錯誤'];
    let findAccQuery = 'SELECT * FROM 使用者 WHERE 帳號 = "' + accInput + '"' // 尋找資料庫是否有輸入者所輸入的帳號
    dbConnection.query(findAccQuery, (err, rows, fields) => {
        if (err) res.render('login', {
            errmsg: '發生錯誤，請稍後再試一次'
        });
        else if (rows.length == 0 || rows[0]['密碼'] != pwdInput) res.render('login', {
            errmsg: '帳號或密碼錯誤'
        });
        else res.redirect('/dashboard');
    });
    dbConnection.end();
});

module.exports = router;
