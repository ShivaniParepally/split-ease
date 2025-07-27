
import mongoose from 'mongoose';

export interface IGroup extends mongoose.Document {
  name: string;
  description: string;
  members: { userId: mongoose.Types.ObjectId }[];
}

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  members: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }],
}, { timestamps: true });

export default mongoose.model<IGroup>('Group', GroupSchema);
