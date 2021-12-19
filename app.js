let express = require('express');
let app = express();

app.use(express.static('./public'));

/* ejs */
app.set('views', './views');
app.set('view engine', 'ejs');

/* INFO: 根路由 */

/* INFO: 登入路由 */
let login = require('./routes/login');
app.use('/login', login);

/* INFO: 首頁(儀表板)路由 */
let dashboard = require('./routes/dashboard');
app.use('/dashboard', dashboard);

/* INFO: 個人資料路由 */
let profile = require('./routes/profile');
app.use('/profile', profile);

app.use((req, res) => {
    res.status(404).send('404 Not Found.');
});

app.use((err, req, res) => {
    console.log(err);
    res.status(500).send('Internal server error.\n\n' + err);
});

let port = process.env.PORT || 3000;
app.listen(port);
