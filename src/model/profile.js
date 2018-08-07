import mongoose from 'mongoose';

/*
  SQL equivalent:
  CREATE TABLE PROFILES (
    firstName VARCHAR,
    lastName VARCHAR,
    bio VARCHAR,
    profileImageUrl VARCHAR,
  )
*/

const profileSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  bio: { type: String },
  profileImageUrl: { type: String },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
});

const skipInit = process.env.NODE_ENV === 'development';
export default mongoose.model('profiles', profileSchema, 'profiles', skipInit);
