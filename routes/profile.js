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

/* INFO: 當 getSqlAndRender() 出錯的時候 */
function sqlError(res, err) {
    res.render('error', {
        errmsg: err.stack
    });
}

/* INFO: 取得 SQL 資料並渲染網頁 */
function getSqlAndRender(req, res, username) {
    let dbConnection = mysql.createConnection(dbOption);
    let findUserDataQuery = `SELECT * FROM 使用者 WHERE 使用者編號 = "${req.cookies.userID}";`; // 透過編號搜尋使用者資料
    dbConnection.query(findUserDataQuery, (err, rows, fields) => {
        if (err) sqlError(res, err);
        else {
            /* NOTE: 每位使用者必備欄位 */
            let basicData = {
                username: username,
                id: req.cookies.userID,
                identity: req.cookies.userIdentity,
                accountInput: rows[0]['帳號'],
                passwordInput: rows[0]['密碼'],
                genderInput: rows[0]['性別'],
                emailInput: rows[0]['e-mail'],
                telInput: rows[0]['電話號碼']
            }

            if (rows[0]['身分'] == '系上老師') {
                let findDepTeacherQuery = `SELECT * FROM 系上老師 WHERE 使用者編號 = ${req.cookies.userID};`;
                dbConnection.query(findDepTeacherQuery, (err, rowsDepTeacher, fields) => {
                    if (err) sqlError(res, err);
                    else {
                        basicData.departmentTeacherJobInput = rowsDepTeacher[0]['職級'];
                        res.render('profile', basicData);
                    }
                    dbConnection.end();
                });
            } else if (rows[0]['身分'] == '學生代表') {
                let findStudentQuery = `SELECT * FROM 學生代表 WHERE 使用者編號 = ${req.cookies.userID};`;
                dbConnection.query(findStudentQuery, (err, rowsStudent, fields) => {
                    if (err) sqlError(res, err);
                    else {
                        basicData.studentIdInput = rowsStudent[0]['學號'];
                        basicData.studentSystemInput = rowsStudent[0]['學制'];
                        basicData.studentClassInput = rowsStudent[0]['班級'];
                        res.render('profile', basicData);
                    }
                    dbConnection.end();
                });
            } else if (rows[0]['身分'] == '系助理') {
                let findAssistQuery = `SELECT * FROM 系助理 WHERE 使用者編號 = ${req.cookies.userID};`;
                dbConnection.query(findAssistQuery, (err, rowsAssist, fields) => {
                    if (err) sqlError(res, err);
                    else {
                        basicData.departmentAssistantTelInput = rowsAssist[0]['辦公室電話'];
                        res.render('profile', basicData);
                    }
                    dbConnection.end();
                });
            } else if (rows[0]['身分'] == '校外老師') {
                let findOutTeacherQuery = `SELECT * FROM 校外老師 WHERE 使用者編號 = ${req.cookies.userID};`;
                dbConnection.query(findOutTeacherQuery, (err, rowsOutTeacher, fields) => {
                    if (err) sqlError(res, err);
                    else {
                        basicData.outsideTeacherSchoolInput = rowsOutTeacher[0]['任職學校'];
                        basicData.outsideTeacherDepartmentInput = rowsOutTeacher[0]['系所'];
                        basicData.outsideTeacherTitleInput = rowsOutTeacher[0]['職稱'];
                        basicData.outsideTeacherTelInput = rowsOutTeacher[0]['辦公室電話'];
                        basicData.outsideTeacherAddrInput = rowsOutTeacher[0]['聯絡地址'];
                        basicData.outsideTeacherBankInput = rowsOutTeacher[0]['銀行帳號'];
                        res.render('profile', basicData);
                    }
                    dbConnection.end();
                });
            } else if (rows[0]['身分'] == '業界專家') {
                let findExpertQuery = `SELECT * FROM 業界專家 WHERE 使用者編號 = ${req.cookies.userID};`;
                dbConnection.query(findExpertQuery, (err, rowsExpert, fields) => {
                    if (err) sqlError(res, err);
                    else {
                        basicData.industryExpertCompanyInput = rowsExpert[0]['任職公司'];
                        basicData.industryExpertTitleInput = rowsExpert[0]['職稱'];
                        basicData.industryExpertTelInput = rowsExpert[0]['辦公室電話'];
                        basicData.industryExpertAddrInput = rowsExpert[0]['聯絡地址'];
                        basicData.industryExpertBankInput = rowsExpert[0]['銀行帳號'];
                        res.render('profile', basicData);
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
    } else getSqlAndRender(req, res, req.cookies.username);
});

router.post('/', urlencodedParser, (req, res) => {
    if (Object.keys(req.cookies).length != process.env.NUM_OF_COOKIES) {
        res.redirect('/login');
    } else {
        let form = req.body; // 使用者傳送的表單內容
        res.cookie('username', form.nameInput, {
            maxAge: 86400000,
            httpOnly: true
        });
        let isAdmin; // 該使用者是否為管理者
        let dbConnection = mysql.createConnection(dbOption);
        let findUserDataQuery = `SELECT * FROM 使用者 WHERE 使用者編號 = ${req.cookies.userID};`; // 透過編號搜尋使用者資料
        dbConnection.query(findUserDataQuery, (err, rows, fields) => {
            if (err) sqlError(res, err);
            else {
                isAdmin = (rows[0]['管理者'] == '1') ? true : false; // 判斷該使用者是否為管理者
                let deleteUserQuery = `DELETE FROM 使用者 WHERE 使用者編號 = ${req.cookies.userID};`; // 刪除該使用者資料
                dbConnection.query(deleteUserQuery, (err, row, fields) => {
                    if (err) sqlError(res, err);
                    else {
                        let addUserQuery = `INSERT INTO 使用者 VALUES(${req.cookies.userID}, "${form.accountInput}", "${form.passwordInput}", "${form.nameInput}", ${form.genderInput}, "${form.telInput}", "${form.emailInput}", "${req.cookies.userIdentity}", ${isAdmin});`; // 重新加回使用者資料(共同)
                        dbConnection.query(addUserQuery, (err, row, fields) => {
                            if (err) sqlError(res, err);
                        });

                        if (req.cookies.userIdentity == '系上老師') {
                            let addDepTeacherQuery = `INSERT INTO 系上老師 VALUES(${req.cookies.userID}, "${form.departmentTeacherJobInput}");`;
                            dbConnection.query(addDepTeacherQuery, (err, row, fields) => {
                                if (err) sqlError(res, err);
                                else getSqlAndRender(req, res, form.nameInput);
                                dbConnection.end();
                            });
                        } else if (req.cookies.userIdentity == '學生代表') {
                            let addStudentQuery = `INSERT INTO 學生代表 VALUES(${req.cookies.userID}, "${form.studentIdInput}", "${form.studentSystemInput}", "${form.studentClassInput}");`;
                            dbConnection.query(addStudentQuery, (err, row, fields) => {
                                if (err) sqlError(res, err);
                                else getSqlAndRender(req, res, form.nameInput);
                                dbConnection.end();
                            });

                        } else if (req.cookies.userIdentity == '系助理') {
                            let addAssistQuery = `INSERT INTO 系助理 VALUES(${req.cookies.userID}, "${form.departmentAssistantTelInput}");`;
                            dbConnection.query(addAssistQuery, (err, row, fields) => {
                                if (err) sqlError(res, err);
                                else getSqlAndRender(req, res, form.nameInput);
                                dbConnection.end();
                            });

                        } else if (req.cookies.userIdentity == '校外老師') {
                            let addOutTeacherQuery = `INSERT INTO 校外老師 VALUES(${req.cookies.userID}, "${form.outsideTeacherSchoolInput}", "${form.outsideTeacherDepartmentInput}", "${form.outsideTeacherTitleInput}", "${form.outsideTeacherTelInput}", "${form.outsideTeacherAddrInput}", "${form.outsideTeacherBankInput}");`;
                            dbConnection.query(addOutTeacherQuery, (err, row, fields) => {
                                if (err) sqlError(res, err);
                                else getSqlAndRender(req, res, form.nameInput);
                                dbConnection.end();
                            });

                        } else if (req.cookies.userIdentity == '業界專家') {
                            let addExpertQuery = `INSERT INTO 業界專家 VALUES(${req.cookies.userID}, "${form.industryExpertCompanyInput}", "${form.industryExpertTitleInput}", "${form.industryExpertTelInput}", "${form.industryExpertAddrInput}", "${form.industryExpertBankInput}");`;
                            dbConnection.query(addExpertQuery, (err, row, fields) => {
                                if (err) sqlError(res, err);
                                else getSqlAndRender(req, res, form.nameInput);
                                dbConnection.end();
                            });
                        }
                    }
                });
            }
        });

    }
});

module.exports = router;
