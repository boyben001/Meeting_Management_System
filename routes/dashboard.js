let express = require('express');
let router = express.Router();

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
    if (Object.keys(req.cookies).length != process.env.NUM_OF_COOKIES) {
        res.redirect('/login');
    } else {
        let userID = req.cookies.userID;
        let str = `select 管理者 from 使用者 where 使用者編號 = ${userID};`;
        let dbConnection = mysql.createConnection(dbOption);
        dbConnection.query(str, (err, rows, field) => {
            if (rows[0].管理者) {
                let findMeeting = 'select * from 會議 order by 開會時間;';
                dbConnection.query(findMeeting, (err, rows, field) => {
                    let day = new Date();
                    let str = day.getFullYear() + '-' + day.getMonth() + 1 + '-' + day.getDate();
                    let meetingTitle = new Array();
                    let meetingTime = new Array();
                    for (let i in rows) {
                        let content = rows[i]['開會時間'].split('-')[0]+'-'+rows[i]['開會時間'].split('-')[1]+'-'+rows[i]['開會時間'].split('-')[2].substring(0, 2);
                        let temp1 = new Date(content);
                        let temp2 = new Date(str);
                        if (temp1 >= temp2 && (temp1.getFullYear()==temp1.getFullYear() && temp1.getMonth()==temp2.getMonth())) { //今天之後的內容才要傳到前端
                            meetingTitle.push(rows[i]['會議名稱']);
                            meetingTime.push(rows[i]['開會時間']);
                        }
                    }
                    res.render('dashboard', {
                        username: req.cookies.username,
                        meeting_title: meetingTitle,
                        meeting_time: meetingTime
                    });
                })
            } else {
                let search = `select * from 參與 left join 會議 on 會議.會議編號=參與.會議編號 where 使用者編號 = ${userID} order by 開會時間;`;
                dbConnection.query(search, (err, rows, field) => {
                    let meetingTitle = new Array();
                    let meetingTime = new Array();
                    for (let i in rows) {
                        if (rows[i].閱讀權限) {
                            let day = new Date();
                            let str = day.getFullYear() + '-' + day.getMonth() + 1 + '-' + day.getDate();
                            let temp1 = new Date(rows[i]['開會時間'].split('-')[0] + '-' + rows[i]['開會時間'].split('-')[1] + '-' + rows[i]['開會時間'].split('-')[2].substring(0, 2));
                            let temp2 = new Date(str);
                            if ((temp1 >= temp2) && (temp1.getFullYear()==temp1.getFullYear() && temp1.getMonth()==temp2.getMonth())) { //今天之後的內容才要傳到前端
                                meetingTitle.push(rows[i]['會議名稱']);
                                meetingTime.push(rows[i]['開會時間']);
                            }
                        }
                    }
                    res.render('dashboard', {
                        username: req.cookies.username,
                        meeting_title: meetingTitle,
                        meeting_time: meetingTime
                    });
                })
            }

        })
    }
});
module.exports = router;