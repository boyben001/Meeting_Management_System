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
        let dbConnection = mysql.createConnection(dbOption);
        let findUserDataQuery = 'SELECT * FROM 使用者 WHERE 使用者編號 = "' + req.cookies.userID + '"' //透過編號搜尋使用者資料
        dbConnection.query(findUserDataQuery, (err, rows, fields) => {
            if (err) res.render('login', {
                errmsg: '發生錯誤，請稍後再試一次'
            });
            //學生代表 系助理 系上老師 校外老師 業界專家
            else {
                dbConnection.end();
                if (rows[0]['身分'] == '系上老師') {
                    let dbConnection = mysql.createConnection(dbOption);
                    let findDepTeaQuery = 'SELECT * FROM 系上老師 WHERE 使用者編號 = "' + req.cookies.userID + '"' //透過編號搜尋系上老師資料
                    dbConnection.query(findDepTeaQuery, (err, rowsDepTeacher, fields) => {
                        if (err) res.render('login', {
                            errmsg: '發生錯誤，請稍後再試一次'
                        });
                        else {
                            res.render('profile', {
                                username: req.cookies.username,
                                id: req.cookies.userID,
                                identity: rows[0]['身分'],
                                accountInput: rows[0]['帳號'],
                                passwordInput: rows[0]['密碼'],
                                nameInput: rows[0]['姓名'],
                                genderInput: rows[0]['性別'],
                                emailInput: rows[0]['e-mail'],
                                telInput: rows[0]['電話號碼'],
                                departmentTeacherJobInput: rowsDepTeacher[0]['職級']
                            });
                        }
                    });
                } else if (rows[0]['身分'] == '學生代表') {

                    let dbConnection = mysql.createConnection(dbOption);
                    let findDepTeaQuery = 'SELECT * FROM 學生代表 WHERE 使用者編號 = "' + req.cookies.userID + '"' //透過編號搜尋系上老師資料
                    dbConnection.query(findDepTeaQuery, (err, rowsStudent, fields) => {
                        if (err) res.render('login', {
                            errmsg: '發生錯誤，請稍後再試一次'
                        });
                        else {
                            res.render('profile', {
                                username: req.cookies.username,
                                id: req.cookies.userID,
                                identity: rows[0]['身分'],
                                accountInput: rows[0]['帳號'],
                                passwordInput: rows[0]['密碼'],
                                nameInput: rows[0]['姓名'],
                                genderInput: rows[0]['性別'],
                                emailInput: rows[0]['e-mail'],
                                telInput: rows[0]['電話號碼'],
                                studentIdInput: rowsStudent[0]['學號'],
                                studentSystemInput: rowsStudent[0]['學制'],
                                studentClassInput: rowsStudent[0]['班級']
                            });
                        }
                    });
                } else if (rows[0]['身分'] == '系助理') {
                    let dbConnection = mysql.createConnection(dbOption);
                    let findDepTeaQuery = 'SELECT * FROM 系助理 WHERE 使用者編號 = "' + req.cookies.userID + '"' //透過編號搜尋系上老師資料
                    dbConnection.query(findDepTeaQuery, (err, rowsAssist, fields) => {
                        if (err) res.render('login', {
                            errmsg: '發生錯誤，請稍後再試一次'
                        });
                        else {
                            res.render('profile', {
                                username: req.cookies.username,
                                id: req.cookies.userID,
                                identity: rows[0]['身分'],
                                accountInput: rows[0]['帳號'],
                                passwordInput: rows[0]['密碼'],
                                nameInput: rows[0]['姓名'],
                                genderInput: rows[0]['性別'],
                                emailInput: rows[0]['e-mail'],
                                telInput: rows[0]['電話號碼'],
                                departmentAssistantTelInput: rowsAssist[0]['辦公室電話']
                            });
                        }
                    });
                } else if (rows[0]['身分'] == '校外老師') {
                    let dbConnection = mysql.createConnection(dbOption);
                    let findDepTeaQuery = 'SELECT * FROM 校外老師 WHERE 使用者編號 = "' + req.cookies.userID + '"' //透過編號搜尋系上老師資料
                    dbConnection.query(findDepTeaQuery, (err, rowsOutTeacher, fields) => {
                        if (err) res.render('login', {
                            errmsg: '發生錯誤，請稍後再試一次'
                        });
                        else {
                            console.log(rowsOutTeacher[0]);
                            res.render('profile', {
                                username: req.cookies.username,
                                id: req.cookies.userID,
                                identity: rows[0]['身分'],
                                accountInput: rows[0]['帳號'],
                                passwordInput: rows[0]['密碼'],
                                nameInput: rows[0]['姓名'],
                                genderInput: rows[0]['性別'],
                                emailInput: rows[0]['e-mail'],
                                telInput: rows[0]['電話號碼'],
                                outsideTeacherSchoolInput: rowsOutTeacher[0]['任職學校'],
                                outsideTeacherDepartmentInput: rowsOutTeacher[0]['系所'],
                                outsideTeacherTitleInput: rowsOutTeacher[0]['職稱'],
                                outsideTeacherTelInput: rowsOutTeacher[0]['辦公室電話'],
                                outsideTeacherAddrInput: rowsOutTeacher[0]['聯絡地址'],
                                outsideTeacherBankInput: rowsOutTeacher[0]['銀行帳號']
                            });
                        }
                    });
                } else if (rows[0]['身分'] == '業界專家') {
                    let dbConnection = mysql.createConnection(dbOption);
                    let findDepTeaQuery = 'SELECT * FROM 業界專家 WHERE 使用者編號 = "' + req.cookies.userID + '"' //透過編號搜尋系上老師資料
                    dbConnection.query(findDepTeaQuery, (err, rowsExpert, fields) => {
                        if (err) res.render('login', {
                            errmsg: '發生錯誤，請稍後再試一次'
                        });
                        else {
                            res.render('profile', {
                                username: req.cookies.username,
                                id: req.cookies.userID,
                                identity: rows[0]['身分'],
                                accountInput: rows[0]['帳號'],
                                passwordInput: rows[0]['密碼'],
                                nameInput: rows[0]['姓名'],
                                genderInput: rows[0]['性別'],
                                emailInput: rows[0]['e-mail'],
                                telInput: rows[0]['電話號碼'],
                                industryExpertCompanyInput: rowsExpert[0]['任職公司'],
                                industryExpertTitleInput: rowsExpert[0]['職稱'],
                                industryExpertTelInput: rowsExpert[0]['辦公室電話'],
                                industryExpertAddrInput: rowsExpert[0]['聯絡地址'],
                                industryExpertBankInput: rowsExpert[0]['銀行帳號']
                            });
                        }
                    });
                }
            }
        });
    }
});

module.exports = router;
