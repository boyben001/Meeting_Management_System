let express = require('express');
require('dotenv').config();
let app = express();

app.use(express.static('./public'));

/* INFO: ejs */
app.set('views', './views');
app.set('view engine', 'ejs');

/* INFO: 登入路由 */
let login = require('./routes/login');
app.use('/login', login);

/* INFO: 首頁(儀表板)路由 */
let dashboard = require('./routes/dashboard');
app.use('/dashboard', dashboard);

/* INFO: 設定路由 */
let settings = require('./routes/settings');
app.use('/settings', settings);

let meeting = require('./routes/meeting');
app.use('/meeting', meeting);

app.use((req, res) => {
    res.status(404).render('error', {
        errmsg: '404 Not Found.'
    });
});

app.use((err, req, res) => {
    res.status(500).render('error', {
        errmsg: err
    });
});

let port = process.env.PORT || 3000;
app.listen(port);
