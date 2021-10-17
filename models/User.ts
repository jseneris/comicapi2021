import mongoose from 'mongoose';
import { userConnection } from '../connection';
// import { Password } from '../services/password';
// import { LocationDoc } from './Location';

interface UserAttrs {
  userName: string;
  email: string;
  auth0Id: string;
  password: string;
  firebaseId: string;
}

export interface UserDoc extends mongoose.Document {
  userName: string;
  email: string;
  password: string;
  firebaseId: string;
  createdDate: Date;
  // locations: LocationDoc[];
  cookie: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attr: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    oldId: Number,
    userName: String,
    email: String,
    password: String,
    firebaseId: String,
    createdDate: Date,
    locations: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Location',
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
        delete ret.old;
      },
    },
  }
);

// userSchema.pre('save', async function (done) {
//   if (this.isModified('password')) {
//     const hashed = await Password.toHash(this.get('password'));

//     this.set('password', hashed);
//   }
//   done();
// });

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = userConnection.model('User', userSchema);

export { User };

// public class UserMigrationModel
// {
//   public int id { get; set; }
//   public string userName {get;set;}
//   public string password { get; set; }
//   public string firebaseId { get; set; }
// }
