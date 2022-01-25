const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOption = {
    origin: 'http://localhost:3001'
}

app.use(cors(corsOption));

//request of content type application/json
app.use(bodyParser.json());

// request of content type -application/x-www-form-urlcodede;
app.use(bodyParser.urlencoded({ extended: true }));

// simple route

app.get('/', (req, res) => {
    res.json({ message: "Welcome to api application" })
});

// 


const db = require('./app/models');
db.sequelize.sync({ force: false }).then(() => {
    console.log('Drop and re-sync db');
})


require('./app/router/users.routes')(app);

// set port listing for request
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is runnig on port ${PORT}`);
})






// https://www.bezkoder.com/node-js-express-sequelize-mysql/
// https://www.esparkinfo.com/node-js-with-mysql-using-sequelize-express.html