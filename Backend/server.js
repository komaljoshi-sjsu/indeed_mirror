const conn2 = require('./config/mongo_connection')
const conn1 = require('./config/mysql_connection')
const express = require('express')
const app = express()
const session = require('express-session')
var cors = require('cors')
app.use(cors())

// Connect to MySQL database
conn1.mysqlCon
// Connect to MongoDB
conn2()

// Init Middleware
app.use(express.json({ extended: false }))

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }),
)

//Define all the models

require('./models/JobSeeker');
require('./models/Company');

//Define all the routes
app.use(require("./routes/loginRoute"));
app.use(require("./routes/postNewJob"));
app.use(require("./routes/signupRoute"));
app.use(require('./routes/jobSeekerHome'))
app.use(require('./routes/getEmployerProfile'))
app.use(require('./routes/editEmployerDetails'))
app.use(require('./routes/editCompanyDetails'))
app.use(require('./routes/salaryReviewRoute'));
//Define all the routes
//app.use('/postNewJob', postNewJob)

const PORT = process.env.PORT || 5000
//Server code will be running on port 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
