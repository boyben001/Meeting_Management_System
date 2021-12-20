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
    if (req.cookies.username == null) {
        res.redirect('/login');
    } else {
        let dbConnection = mysql.createConnection(dbOption);
        function getData(callback){
            let findUserDataQuery = 'SELECT * FROM 使用者 WHERE 使用者編號 = "' + req.cookies.userID + '"' //透過編號搜尋使用者資料
            dbConnection.query(findUserDataQuery, (err, rows, fields) => {
                if (err) res.render('login', {
                    errmsg: '發生錯誤，請稍後再試一次'
                });
                account = rows[0]['帳號'];
                return callback(account);
            });
            dbConnection.end();
        }
        let account = '';
        getData(function(result){
            account = result;
            let renderData = {
                username: req.cookies.username,
                accountInput: account
            }
            res.render('profile', renderData);
        });
        //資料庫抓取資料，跟宏明溝通
        
        
    }
});

module.exports = router;