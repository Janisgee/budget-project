//server.js= ==> all the things relate to server. (database configurations, error handling stuff, environment variables)

//app.js ==> all the things relate to express.
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
// Replace the PASSWORD in config.env DATABASE variable
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
const app = require('./app');

//Connect to mongoose database
mongoose.connect(DB).then(() => {
  console.log('DB connection successful!');
});

console.log(app.get('env')); //development || production
// console.log(process.env);
// 3)START SERVERS
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});


