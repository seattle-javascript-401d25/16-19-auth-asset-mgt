
import mongoose from 'mongoose';
// this is used to generate a random hash
import bcrypt from 'bcrypt';

// used to generate random data
import crypto from 'crypto';
import jsonWebToken from 'jsonwebtoken';
import HttpErrors from 'http-errors';

const HASH_ROUNDS = 1;
const TOKEN_SEED_LENGTH = 50;

/*
  SQL equivalent:
  CREATE TABLE ACCOUNTS (
    username VARCHAR,
    password VARCHAR,
    email VARCHAR,
    tokenSeed VARCHAR,
  )
*/
const accountSchema = mongoose.Schema({
  passwordHash: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  tokenSeed: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });

accountSchema.methods.verifyPasswordPromise = function verifyPasswordPromise(password) {
  return bcrypt.compare(password, this.passwordHash)
    .then((result) => {
      if (!result) {
        throw new HttpErrors(401, 'ACCOUNT MODEL: incorrect data');
      }
      return this;
    })
    .catch((err) => {
      throw new HttpErrors(500, `ERROR CREATING TOKEN: ${JSON.stringify(err)}`);
    });
};

accountSchema.methods.createTokenPromise = function createTokenPromise() {
  this.tokenSeed = crypto.randomBytes(TOKEN_SEED_LENGTH).toString('hex');
  return this.save()
    .then((updatedAccount) => {
      return jsonWebToken.sign({ tokenSeed: updatedAccount.tokenSeed }, process.env.SECRET_KEY);
    })
    .catch((err) => {
      throw new HttpErrors(500, `ERROR SAVING ACCOUNT or ERROR WITH JWT: ${JSON.stringify(err)}`);
    });
};

const skipInit = process.env.NODE_ENV === 'development';

const Account = mongoose.model('accounts', accountSchema, 'accounts', skipInit);

/*
  SQL equivalent:
  INSERT INTO ACCOUNTS (username, email, password) (
    VALUES ('username', 'email', 'password');
  )
*/

Account.create = (username, email, password) => {
  if (!username || !password) {
    throw new HttpErrors(400, 'username and password required');
  }
  return bcrypt.hash(password, HASH_ROUNDS)
    .then((passwordHash) => {
      password = null; /*eslint-disable-line*/
      const tokenSeed = crypto.randomBytes(TOKEN_SEED_LENGTH).toString('hex');
      return new Account({
        username,
        email,
        passwordHash,
        tokenSeed,
      }).save();
    })
    .catch((err) => {
      console.log('!|!|!|!|!|', err);
      
      throw new HttpErrors(500, `ERROR WITH HASHING or ERR WITH SAVING ACCOUNT: ${JSON.stringify(err)}`);
    });
};

export default Account;
