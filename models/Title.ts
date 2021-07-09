import mongoose, { ObjectId, Schema } from 'mongoose';
import { Utilities } from '../services/generate-seo';
import { catalogConnection } from '../connection';

import { PublisherDoc } from './Publisher';
import { LocalTitleDoc } from './LocalTitle';
import { IssueDoc } from './Issue';

interface TitleAttrs {
  name: string;
  // seoFriendlyName: string;
  // yearStart: number;
  // yearEnd: number;
  // issueBegin: string;
  // issueEnd: string;
  // lastUpdate: Date;
  // loneStarId: string;
  // firstIssue: IssueDoc;
  publisher: PublisherDoc;
  localTitle: LocalTitleDoc;
}

export interface TitleDoc extends mongoose.Document {
  name: string;
  seoFriendlyName: string;
  yearStart: number;
  yearEnd: number;
  issueBegin: string;
  issueEnd: string;
  firstIssue: mongoose.Types.ObjectId;
  // firstIssue: IssueDoc;
  lastUpdate: Date;
  loneStarId: string;
  publisher: PublisherDoc;
  localTitle: LocalTitleDoc;
}

interface TitleModel extends mongoose.Model<TitleDoc> {
  build(attr: TitleAttrs): TitleDoc;
}

const titleSchema = new Schema(
  {
    oldId: Number,
    name: String,
    seoFriendlyName: String,
    yearStart: Number,
    yearEnd: Number,
    issueBegin: String,
    issueEnd: String,
    // firstIssue: mongoose.Types.ObjectId,
    firstIssue: {
      type: mongoose.Types.ObjectId,
      ref: 'Issue',
    },
    LastUpdate: Date,
    loneStarId: String,
    oldPublisherId: Number,
    publisher: {
      type: mongoose.Types.ObjectId,
      ref: 'Publisher',
    },
    oldLocalTitleId: Number,
    localTitle: {
      type: mongoose.Types.ObjectId,
      ref: 'LocalTitle',
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
        delete ret.oldPublisherId;
        delete ret.oldLocalTitleId;
      },
    },
  }
);

titleSchema.pre('save', async function (done) {
  if (this.isNew) {
    this.set('createdDate', new Date());
  }
  if (this.isModified('name')) {
    const seoFriendlyName = await Utilities.generateSeo(this.get('name'));
    this.set('seoFriendlyName', seoFriendlyName);
  }
  this.set('modifiedDate', new Date());
  done();
});

titleSchema.statics.build = (attrs: TitleAttrs) => {
  return new Title(attrs);
};

const Title = catalogConnection.model('Title', titleSchema);

export { Title };

// [Id] [int] IDENTITY(1,1) NOT NULL,
// [Name] [nvarchar](max) NULL,
// [SeoFriendlyName] [nvarchar](max) NULL,
// [YearStart] [int] NOT NULL,
// [YearEnd] [int] NULL,
// [IssueBegin] [nvarchar](max) NULL,
// [IssueEnd] [nvarchar](max) NULL,
// [LastUpdate] [datetime] NULL,
// [LoneStarId] [nvarchar](max) NULL,
// [PublisherId] [int] NOT NULL,
// [LocalTitleId] [int] NULL,
