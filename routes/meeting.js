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
    render
} = require('express/lib/response');
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
        if (req.query.meetingid != undefined) {
            // TODO: req.query.meetingid 這個編號的會議存不存在
            // 不存在 console.log()
            // 存在 => 檢查參與 table，該使用者編號(req.cookies.userID)有沒有編輯權限
            // 有權限 => 會議和討論事項 table, render
            // 沒權限 => console.log()
            let str = `select * from 會議 where 會議編號 = ${req.query.meetingid}`;
            let dbConnection = mysql.createConnection(dbOption);
            dbConnection.query(str, (err, rows, fields) => {
                if (rows.length == 0) {
                    console.log('無此編號會議'); //紫紅幫忙
                } else {
                    let str = `select * from 參與 left join 會議 on 會議.會議編號 = 參與.會議編號 left join 使用者 on 參與.使用者編號 = 使用者.使用者編號 left join 討論事項 on 討論事項.會議編號=參與.會議編號 where 參與.會議編號 = ${req.query.meetingid};`;
                    let dbConnection = mysql.createConnection(dbOption);
                    dbConnection.query(str, (err, rows, fields) => {
                        let people = [];
                        let discuss = [];
                        for (let i in rows) {
                            if (rows[i]['使用者編號'] == req.cookies.userID) {
                                if (rows[i]['編輯權限'] == 0) {
                                    console.log('該使用者未有權限編輯'); //紫紅幫忙
                                }
                            }
                            let temp_people = []; // 儲存每個人要回傳給前端ejs的資料，並逐步push到people之中
                            let temp_discuss = [];
                            temp_people.push(rows[i]['使用者編號']);
                            temp_people.push(rows[i]['帳號']);
                            temp_people.push(rows[i]['姓名']);
                            temp_people.push(rows[i]['身分']);
                            temp_people.push(rows[i]['管理者']);
                            people.push(temp_people);
                            temp_discuss.push(rows[i]['討論事項編號']);
                            temp_discuss.push(rows[i]['案由']);
                            temp_discuss.push(rows[i]['說明']);
                            temp_discuss.push(rows[i]['決議事項']);
                            temp_discuss.push(rows[i]['執行情況']);
                            temp_discuss.push(rows[i]['會議編號']);
                            discuss.push(temp_discuss);
                        }

                        function multiDimensionalUnique(arr) { //二維陣列的重複值刪除
                            var uniques = [];
                            var itemsFound = {};
                            for (var i = 0, l = arr.length; i < l; i++) {
                                var stringified = JSON.stringify(arr[i]);
                                if (itemsFound[stringified]) {
                                    continue;
                                }
                                uniques.push(arr[i]);
                                itemsFound[stringified] = true;
                            }
                            return uniques;
                        }

                        people = multiDimensionalUnique(people);
                        discuss = multiDimensionalUnique(discuss);
                        res.render('meeting/edit', {
                            username: req.cookies.username,
                            people: people,
                            meeting_id: rows[0]['會議編號'],
                            meeting_title: rows[0]['會議名稱'],
                            meeting_time: rows[0]['開會時間'],
                            meeting_place: rows[0]['開會地點'],
                            meeting_speech: rows[0]['主席致詞'],
                            meeting_content: rows[0]['報告內容'],
                            meeting_discuss: discuss
                        });
                    })
                    dbConnection.end();
                }

            });
            dbConnection.end();
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
                        people: people,
                        meeting_discuss: []
                    });
                } else {
                    res.redirect('/dashboard?code=1'); // code 1: 存取被拒
                }
            });
        }
    }
});

function sqlError(res, err) {
    res.render('error', {
        errmsg: err.stack
    });
}

router.post('/edit', urlencodedParser, (req, res) => {
    if (req.query.meetingid != undefined) {
        console.log(req.body);
        let meeting_str = `update 會議 set 會議名稱="${req.body.meetingName}",開會時間="${req.body.meetingTime}",開會地點="${req.body.meetingLocation}",主席致詞 = "${req.body.chairmanSpeech}",報告內容 = "${req.body.announcements}" where 會議編號 = ${req.query.meetingid}`;
        let dbConnection = mysql.createConnection(dbOption);
        dbConnection.query(meeting_str);
        dbConnection.end();

        //更新參與table

        for (let i in req.body) {
            if (i.includes('Title')) {
                let number = parseInt(String(i).substring(5));
                let discuss_str = `update 討論事項 set 案由 = "${req.body[i]}" where 討論事項編號 = ${number};`;
                let dbConnection = mysql.createConnection(dbOption);
                dbConnection.query(discuss_str);
                dbConnection.end();
            } else if (i.includes('Content')) {
                let number = parseInt(String(i).substring(7));
                let discuss_str = `update 討論事項 set 說明 = "${req.body[i]}" where 討論事項編號 = ${number};`;
                let dbConnection = mysql.createConnection(dbOption);
                dbConnection.query(discuss_str);
                dbConnection.end();
            } else if (i.includes('Resolution')) {
                let number = parseInt(String(i).substring(10));
                let discuss_str = `update 討論事項 set  決議事項 = "${req.body[i]}" where 討論事項編號 = ${number};`;
                let dbConnection = mysql.createConnection(dbOption);
                dbConnection.query(discuss_str);
                dbConnection.end();
            } else if (i.includes('Implementation')) {
                let number = parseInt(String(i).substring(14));
                let discuss_str = `update 討論事項 set 執行情況 = "${req.body[i]}" where 討論事項編號 = ${number};`;
                let dbConnection = mysql.createConnection(dbOption);
                dbConnection.query(discuss_str);
                dbConnection.end();
            }
        }

        res.redirect('/dashboard?code=3');

    } else {
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
    }

});

router.get('/overview', (req, res) => {
    if (Object.keys(req.cookies).length != process.env.NUM_OF_COOKIES) {
        res.redirect('/login');
    } else {
        res.render('meeting/overview', {
            username: req.cookies.username
        });
    }
});

module.exports = router;
