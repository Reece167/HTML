require('./models/database');

const express = require('express');
const controller = require('./controllers/controller');
const path = require('path');
const exphandle = require('express-handlebars');
const bodyparser = require('body-parser');

let app = express();
let port = 1111

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.set('views', path.join(__dirname, '/view/'));
app.engine('hbs', exphandle({ extname: 'hbs', defaultLayout: 'mainlayout', layoutsDir: __dirname + '/view/layouts'}));
app.set('view engine', 'hbs');
app.use('/ToDo', controller);



app.listen(port, () => {
   console.log(`Express server started on port ${port}`);
});