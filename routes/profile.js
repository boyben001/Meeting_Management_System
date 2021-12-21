let express = require('express');

let router = express.Router();

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
        function getUserData(callback) {
            let dbConnection = mysql.createConnection(dbOption);
            let findUserDataQuery = 'SELECT * FROM 使用者 WHERE 使用者編號 = "' + req.cookies.userID + '"' // 透過編號搜尋使用者資料
            dbConnection.query(findUserDataQuery, (err, rows, fields) => {
                if (err) res.render('login', {
                    errmsg: '發生錯誤，請稍後再試一次'
                });
                else {
                    dbConnection.end();
                    return callback({
                        account: rows[0]['帳號'],
                        identity: rows[0]['身分']
                    });
                }
            });

        }

        getUserData((userData) => {
            res.render('profile', {
                username: req.cookies.username,
                id: req.cookies.userID,
                identity: userData['identity'],
                accountInput: userData['account']
            });
        });
    }
});

module.exports = router;
