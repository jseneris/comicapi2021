import mongoose, { Schema } from 'mongoose';
import { Utilities } from '../services/generate-seo';
import { catalogConnection } from '../connection';

import { TitleDoc } from './Title';

interface IssueAttrs {
  //seoFriendlyName: string;
  issueNumber: string;
  //issueNumberOrdinal: number;
  // description: string;
  // coverPrice: number;
  // releaseDate: Date;
  // imageUrl: string;
  title: TitleDoc;
  // createdDate: Date;
}

export interface IssueDoc extends mongoose.Document {
  seoFriendlyName: string;
  issueNumber: string;
  issueNumberOrdinal: number;
  description: string;
  coverPrice: number;
  releaseDate: Date;
  imageUrl: string;
  title: TitleDoc;
  createdDate: Date;
}

interface IssueModel extends mongoose.Model<IssueDoc> {
  build(attr: IssueAttrs): IssueDoc;
}

const issueSchema = new Schema(
  {
    oldId: Number,
    seoFriendlyName: String,
    issueNumber: String,
    issueNumberOrdinal: Number,
    description: String,
    coverPrice: Number,
    releaseDate: Date,
    imageUrl: String,
    oldTitleId: Number,
    title: {
      type: mongoose.Types.ObjectId,
      ref: 'Title',
    },
    createdDate: Date,
    modifiedDate: Date,
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.oldId;
        delete ret.oldTitleId;
      },
    },
  }
);

issueSchema.pre('save', async function (done) {
  if (this.isNew) {
    this.set('createdDate', new Date());
  }
  if (this.isModified('issueNumber')) {
    const origIssueName = this.get('issueNumber');
    const seoFriendlyName = await Utilities.generateSeo(origIssueName);
    this.set('seoFriendlyName', seoFriendlyName);
    this.set('issueNumberOrdinal', parseInt(origIssueName));
  }
  this.set('modifiedDate', new Date());
  done();
});

issueSchema.statics.build = (attrs: IssueAttrs) => {
  return new Issue(attrs);
};

//const Issue = mongoose.model<IssueDoc, IssueModel>(
//  'Issue',
//  issueSchema
//);
const Issue = catalogConnection.model('Issue', issueSchema);

export { Issue };

// [Id] [int] IDENTITY(1,1) NOT NULL,
// [SeoFriendlyName] [nvarchar](max) NULL,
// [IssueNumberOrdinal] [int] NOT NULL,
// [Description] [nvarchar](max) NULL,
// [CoverPrice] [decimal](18, 2) NOT NULL,
// [ReleaseDate] [datetime] NULL,
// [ImageUrl] [nvarchar](max) NULL,
// [TitleId] [int] NOT NULL,
// [CreatedDated] [datetime] NOT NULL,
