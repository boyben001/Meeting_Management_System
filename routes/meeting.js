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
const {
    get
} = require('express/lib/response');
const {
    NULL
} = require('mysql/lib/protocol/constants/types');
dbOption = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
};

router.get('/edit', (req, res) => {
    let dbConnection = mysql.createConnection(dbOption);
    let findUserDataQuery = `SELECT * FROM 使用者;`; // 透過編號搜尋使用者資料
    dbConnection.query(findUserDataQuery, (err, rows, fields) => {
        if (err) sqlError(res, err);
        let dataNum = -1;
        let people = []; //儲存要回傳給ejs前端資料的陣列
        for (let i in rows) { //抓取目前使用者編號為rows中第幾筆資料
            if (rows[i]['使用者編號'] == req.cookies.userID) {
                dataNum = i;
            }
            let temp = []; //儲存每個人要回傳給前端ejs的資料，並逐步push到people之中
            temp.push(rows[i]['使用者編號']);
            temp.push(rows[i]['帳號']);
            temp.push(rows[i]['姓名']);
            temp.push(rows[i]['身分']);
            temp.push(rows[i]['管理者']);
            people.push(temp);
        }
        console.log(people);
        if (rows[dataNum]['管理者']) {
            res.render('./meeting/edit', {
                username: req.cookies.username,
                people: people
            });
        } else {
            res.redirect('/dashboard?errcode=1'); // error code 1: 存取被拒
        }
    })
});

module.exports = router;
