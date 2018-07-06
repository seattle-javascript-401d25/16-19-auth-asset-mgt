process.env.NODE_ENV = 'development';
process.env.PORT = 5000;
process.env.MONGODB_URI = 'mongodb://localhost/lab18';
process.env.SECRET_KEY = 'CODEFELLOWSRULES';

const isAwsMock = true;

if (isAwsMock) {
  process.env.AWS_BUCKET = 'fake';
  process.env.AWS_SECRET_ACCESS_KEY = 'fake';
  process.env.AWS_ACCESS_KEY_ID = 'fake';
  require('./setup');
} else {
  require('dotenv').config();
}
