// connect to database

const mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose
  .connect('mongodb://saasify-devcontainer_devcontainer_mongo_1:27017/saas', {
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
