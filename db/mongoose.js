const mongoose = require('mongoose');
const url = process.env.MONGOLAB_URI;
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
