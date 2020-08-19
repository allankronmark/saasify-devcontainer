// connect to database

const mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose
  .connect('mongodb://172.18.0.2:27017/saas', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('SUCCESS: DB connection ');
  })
  .catch((err) => {
    console.log('ERROR: DB connection ');
    console.log('err ', err);
  });
