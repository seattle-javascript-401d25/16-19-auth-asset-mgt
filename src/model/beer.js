'use strict';

import mongoose from 'mongoose';

/*
  SQL equivalent:
  CREATE TABLE BEER (
    title VARCHAR,
    url VARCHAR,
    fileName VARCHAR,
    accountId VARCHAR,
  )
*/

const beerSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  // this url will map back to the AWS url that AWS S3 gives me after succesful upload
  url: {
    type: String,
    required: true,
  },
  // also comes from AWS
  fileName: {
    type: String,
  },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
}, { timestamps: true });


const skipInit = process.env.NODE_ENV === 'development';
export default mongoose.model('beers', beerSchema, 'beers', skipInit);
