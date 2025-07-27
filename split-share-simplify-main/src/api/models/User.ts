
import mongoose from 'mongoose';
import bcrypt from 'mongoose-bcrypt';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  status: 'active' | 'pending';
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, bcrypt: true },
  status: { 
    type: String, 
    enum: ['active', 'pending'],
    default: 'pending'
  },
}, { timestamps: true });

// Add bcrypt plugin for password hashing
UserSchema.plugin(bcrypt);

export default mongoose.model<IUser>('User', UserSchema);
