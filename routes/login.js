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
    res.render('login');
});

router.post('/', urlencodedParser, (req, res) => {
    let accInput = req.body.account;
    let pwdInput = req.body.password;
    let dbConnection = mysql.createConnection(dbOption);

    let errString = ['發生錯誤，請稍後再試一次', '帳號或密碼錯誤'];

    let findAccQuery = 'SELECT * FROM 使用者 WHERE account = "' + accInput + '"' // 尋找資料庫是否有輸入者所輸入的帳號
    dbConnection.query(findAccQuery, (err, rows, fields) => {
        if (err) console.log('錯誤: ' + err); // TODO: 傳送發生錯誤提示訊息
        else if (rows.length == 0) console.log('帳號或密碼錯誤');
        else if (rows[0].password != pwdInput) console.log('帳號或密碼錯誤');
        else res.redirect('/dashboard');
    });
    dbConnection.end();
});

module.exports = router;
