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
    if (Object.keys(req.cookies).length != process.env.NUM_OF_COOKIES) {
        res.redirect('/login');
    } else {
        let dbConnection = mysql.createConnection(dbOption);
        let findUserDataQuery = `SELECT * FROM 使用者;`; // 透過編號搜尋使用者資料
        dbConnection.query(findUserDataQuery, (err, rows, fields) => {
            if (err) sqlError(res, err);
            let dataNum = -1;
            let people = []; // 儲存要回傳給ejs前端資料的陣列
            for (let i in rows) { //抓取目前使用者編號為rows中第幾筆資料
                if (rows[i]['使用者編號'] == req.cookies.userID) {
                    dataNum = i;
                }
                let temp = []; // 儲存每個人要回傳給前端ejs的資料，並逐步push到people之中
                temp.push(rows[i]['使用者編號']);
                temp.push(rows[i]['帳號']);
                temp.push(rows[i]['姓名']);
                temp.push(rows[i]['身分']);
                temp.push(rows[i]['管理者']);
                people.push(temp);
            }
            if (rows[dataNum]['管理者']) {
                res.render('meeting/edit', {
                    username: req.cookies.username,
                    people: people
                });
            } else {
                res.redirect('/dashboard?code=1'); // code 1: 存取被拒
            }
        });
    }
});

function sqlError(res, err) {
    res.render('error', {
        errmsg: err.stack
    });
}

router.post('/edit', urlencodedParser, (req, res) => {
    let createQuery = `insert into 會議 values(NULL, '${req.body.meetingName}', '${req.body.meetingLocation}', '${req.body.meetingTime}', '${req.body.chairmanSpeech}', '${req.body.announcements}');`;

    let dbConnection = mysql.createConnection(dbOption);
    dbConnection.query(createQuery, (err, rows, fields) => {
        if (err) sqlError(res, err);
        else {
            findIdQuery = `select 會議編號 from 會議 where 會議名稱="${req.body.meetingName}" and 開會時間="${req.body.meetingTime}";`;
            dbConnection.query(findIdQuery, (err, rows, fields) => {
                if (err) sqlError(res, err);
                else {
                    let meetingId = rows[0]['會議編號'];
                    for (i in req.body) {
                        if (i.includes('participate')) {
                            let userId = i.substring(11);
                            let query = [meetingId, userId];
                            query.push(req.body[`participate${userId}`] == '0' ? 0 : req.body[`meetingIdentity${userId}`]);
                            query.push(req.body[`view${userId}`] == 'on' ? true : false);
                            query.push(req.body[`edit${userId}`] == 'on' ? true : false);

                            createJoinQuery = `insert into 參與 values(${query[0]}, ${query[1]}, ${query[2]}, ${query[3]}, ${query[4]});`;
                            dbConnection.query(createJoinQuery);
                        } else if (i.includes('Title')) {
                            let discussStr = i.substring(0, i.length - 5);
                            let query = [meetingId, req.body[i]];
                            query.push(req.body[discussStr + 'Content'] == undefined ? '' : req.body[discussStr + 'Content']);
                            query.push(req.body[discussStr + 'Resolution'] == undefined ? '' : req.body[discussStr + 'Resolution']);
                            query.push(req.body[discussStr + 'Implementation'] == undefined ? '' : req.body[discussStr + 'Implementation']);
                            createDiscussQuery = `insert into 討論事項 values(NULL, ${query[0]}, "${query[1]}", "${query[2]}", "${query[3]}", "${query[4]}");`;
                            dbConnection.query(createDiscussQuery);
                        }
                    }
                    dbConnection.end();
                    res.redirect('/dashboard?code=2');
                }
            });
        }
    });
});

router.get('/overview', (req, res) => {
    if (Object.keys(req.cookies).length != process.env.NUM_OF_COOKIES) {
        res.redirect('/login');
    } else {
        let meetingDict = {};

        let isAdminQuery = `select 管理者 from 使用者 where 使用者編號=${req.cookies.userID};`;
        let dbConnection = mysql.createConnection(dbOption);
        dbConnection.query(isAdminQuery, (err, rows, fields) => {
            if (err) sqlError(res, err);
            else if (rows[0]['管理者'] == 1) {
                let listAllMeetingQuery = `select 會議編號, 會議名稱, 開會時間 from 會議 order by 開會時間 desc;`;
                dbConnection.query(listAllMeetingQuery, (err, rows, fields) => {
                    if (err) sqlError(res, err);
                    else {
                        for (i in rows) {
                            let date = rows[i]['開會時間'].substring(0, 10);
                            if (meetingDict[date] == undefined)
                                meetingDict[date] = [
                                    [rows[i]['會議編號'], rows[i]['會議名稱'], rows[i]['開會時間'].substring(11), 1, 1] // 最後兩個為編輯權限 & 刪除權限
                                ];
                            else
                                meetingDict[date].push([rows[i]['會議編號'], rows[i]['會議名稱'], rows[i]['開會時間'].substring(11), 1, 1]);
                        }
                        console.log(meetingDict);
                        res.render('meeting/overview', {
                            username: req.cookies.username,
                            meetings: meetingDict
                        });
                    }
                });
            } else {
                let listMeetingQuery = `select 會議編號, 會議名稱, 開會時間, 編輯權限 from 會議 natural join 參與 where 使用者編號=${req.cookies.userID} and 閱讀權限=1 order by 開會時間 desc;`;
                dbConnection.query(listMeetingQuery, (err, rows, fields) => {
                    if (err) sqlError(res, err);
                    else {
                        for (i in rows) {
                            let date = rows[i]['開會時間'].substring(0, 10);
                            if (meetingDict[date] == undefined)
                                meetingDict[date] = [
                                    [rows[i]['會議編號'], rows[i]['會議名稱'], rows[i]['開會時間'].substring(11), rows[i]['編輯權限'], 0] // 最後兩個為編輯權限 & 刪除權限
                                ];
                            else
                                meetingDict[date].push([rows[i]['會議編號'], rows[i]['會議名稱'], rows[i]['開會時間'].substring(11), rows[i]['編輯權限'], 0]);
                        }
                        res.render('meeting/overview', {
                            username: req.cookies.username,
                            meetings: meetingDict
                        });
                    }
                });
            }
        });
    }
});

module.exports = router;
