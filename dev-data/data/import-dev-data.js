const dotenv = require('dotenv');
const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('./../../models/tourModels');

dotenv.config({ path: './../../config.env' });

console.log(process.env.DATABASE, ' process.env.DATABASE');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASS
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: false,
  })
  .then((con) => {
    console.log('DB connected');
  });

//   read json file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//import data into db
const importDataToDb = async () => {
  try {
    await Tour.create(tours);
    console.log('data exported');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//delete all collection
const deleteAllData = async () => {
  try {
    await Tour.deleteMany();
    console.log('all db gone ');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

console.log(process.argv);

if (process.argv[2] === '--import') {
  importDataToDb();
} else if (process.argv[2] === '--delete') {
  deleteAllData();
}
