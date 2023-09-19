const fs = require('fs');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

const Transaction = require('./../models/transactionModel');

//Connect to mongoose database
mongoose.connect(DB).then(() => {
  console.log('DB connection successful!');
});

//READ JSON FILE
const transactions = JSON.parse(
  fs.readFileSync(`${__dirname}/transactions.json`),
);

// IMPORT DATA into DB
const importData = async () => {
  try {
    await Transaction.create(transactions);
    console.log('Data successfully imported!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Transaction.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

console.log(process.argv);
// TERMINAL CONTROL (IMPORT/DELETE)
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
