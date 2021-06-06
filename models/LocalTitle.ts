import mongoose, { Schema } from 'mongoose';
import { catalogConnection } from '../connection';

interface LocalTitleAttrs {
  name: string;
}

export interface LocalTitleDoc extends mongoose.Document {
  name: string;
}

interface LocalTitleModel extends mongoose.Model<LocalTitleDoc> {
  build(attr: LocalTitleAttrs): LocalTitleDoc;
}

const localTitleSchema = new Schema(
  {
    oldId: Number,
    name: String,
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.oldId;
      },
    },
  }
);

localTitleSchema.statics.build = (attrs: LocalTitleAttrs) => {
  return new LocalTitle(attrs);
};

const LocalTitle = catalogConnection.model('LocalTitle', localTitleSchema);

export { LocalTitle };

// public class LocalTitleMigrationModel
// {
//   public int id { get; set; }
//   public string name { get; set; }
// }
