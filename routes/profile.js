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

/* INFO: 當 getSqlAndRender() 出錯的時候 */
function sqlError(res, err) {
    res.render('error', {
        errmsg: err.stack
    });
}

/* INFO: 取得 SQL 資料並渲染網頁 */
function getSqlAndRender(req, res) {
    let dbConnection = mysql.createConnection(dbOption);
    let findUserDataQuery = 'SELECT * FROM 使用者 WHERE 使用者編號 = "' + req.cookies.userID + '"' // 透過編號搜尋使用者資料
    dbConnection.query(findUserDataQuery, (err, rows, fields) => {
        if (err) sqlError(res, err);
        else {
            if (rows[0]['身分'] == '系上老師') {
                let findDepTeacherQuery = 'SELECT * FROM 系上老師 WHERE 使用者編號 = "' + req.cookies.userID + '"';
                dbConnection.query(findDepTeacherQuery, (err, rowsDepTeacher, fields) => {
                    if (err) sqlError(res, err);
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
                            isAdmin: rows[0]['管理者'],
                            departmentTeacherJobInput: rowsDepTeacher[0]['職級']
                        });
                    }
                    dbConnection.end();
                });
            } else if (rows[0]['身分'] == '學生代表') {
                let findStudentQuery = 'SELECT * FROM 學生代表 WHERE 使用者編號 = "' + req.cookies.userID + '"';
                dbConnection.query(findStudentQuery, (err, rowsStudent, fields) => {
                    if (err) sqlError(res, err);
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
                            isAdmin: rows[0]['管理者'],
                            studentIdInput: rowsStudent[0]['學號'],
                            studentSystemInput: rowsStudent[0]['學制'],
                            studentClassInput: rowsStudent[0]['班級']
                        });
                    }
                    dbConnection.end();
                });
            } else if (rows[0]['身分'] == '系助理') {
                let findAssistQuery = 'SELECT * FROM 系助理 WHERE 使用者編號 = "' + req.cookies.userID + '"';
                dbConnection.query(findAssistQuery, (err, rowsAssist, fields) => {
                    if (err) sqlError(res, err);
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
                            isAdmin: rows[0]['管理者'],
                            departmentAssistantTelInput: rowsAssist[0]['辦公室電話']
                        });
                    }
                    dbConnection.end();
                });
            } else if (rows[0]['身分'] == '校外老師') {
                let findOutTeacherQuery = 'SELECT * FROM 校外老師 WHERE 使用者編號 = "' + req.cookies.userID + '"';
                dbConnection.query(findOutTeacherQuery, (err, rowsOutTeacher, fields) => {
                    if (err) sqlError(res, err);
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
                            isAdmin: rows[0]['管理者'],
                            outsideTeacherSchoolInput: rowsOutTeacher[0]['任職學校'],
                            outsideTeacherDepartmentInput: rowsOutTeacher[0]['系所'],
                            outsideTeacherTitleInput: rowsOutTeacher[0]['職稱'],
                            outsideTeacherTelInput: rowsOutTeacher[0]['辦公室電話'],
                            outsideTeacherAddrInput: rowsOutTeacher[0]['聯絡地址'],
                            outsideTeacherBankInput: rowsOutTeacher[0]['銀行帳號']
                        });
                    }
                    dbConnection.end();
                });
            } else if (rows[0]['身分'] == '業界專家') {
                let findExpertQuery = 'SELECT * FROM 業界專家 WHERE 使用者編號 = "' + req.cookies.userID + '"';
                dbConnection.query(findExpertQuery, (err, rowsExpert, fields) => {
                    if (err) sqlError(res, err);
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
                            isAdmin: rows[0]['管理者'],
                            industryExpertCompanyInput: rowsExpert[0]['任職公司'],
                            industryExpertTitleInput: rowsExpert[0]['職稱'],
                            industryExpertTelInput: rowsExpert[0]['辦公室電話'],
                            industryExpertAddrInput: rowsExpert[0]['聯絡地址'],
                            industryExpertBankInput: rowsExpert[0]['銀行帳號']
                        });
                    }
                    dbConnection.end();
                });
            }
        }
    });
}

router.get('/', (req, res) => {
    if (Object.keys(req.cookies).length != process.env.NUM_OF_COOKIES) {
        res.redirect('/login');
    } else getSqlAndRender(req, res);
});

router.post('/', (req, res) => {
    if (Object.keys(req.cookies).length != process.env.NUM_OF_COOKIES) {
        res.redirect('/login');
    } else {
        // TODO: 寫入更新的值到 SQL
        getSqlAndRender(req, res);
    }
});

module.exports = router;
