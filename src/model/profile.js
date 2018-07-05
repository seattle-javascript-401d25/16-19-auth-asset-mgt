import mongoose from 'mongoose';

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

// profileSchema.pre('findOne', function preHookCallback(done) {
//   this.populate('accountId');
//   done();
// });

const skipInit = process.env.NODE_ENV === 'development';
export default mongoose.model('profiles', profileSchema, 'profiles', skipInit);
