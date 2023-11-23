const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });

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

const app = require('./app');



app.listen(3000, () => {
  console.log('server up and listening to port 3000');
});
