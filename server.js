const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 🔥🔥 shutting down');
  console.log(err, err.name, err.message);
  process.exit(1);
});

const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, 
  //   {
  //   useNewUrlParser: true,
  //   useCreateIndex: true,
  //   useFindAndModify: false,
  //   useUnifiedTopology: true
  // }
)
  .then(() => {
    // console.log(con.Connection);
    console.log('DB connection successfully');
  });
  
// console.log(process.env);

const port = process.env.PORT || 3000;
const server = app.listen(port,'0.0.0.0', () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLER REJECTION! 🔥🔥 shutting down');
  console.log(err.name, err.message);
  server.close(err => {
    process.exit(1);
  });
});
